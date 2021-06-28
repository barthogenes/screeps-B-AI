import { BuilderTree, BuilderTreeImplementation, getBuilderInfo } from 'behavior/roles/builder';
import { getHarvesterInfo, HarvesterTree, HarvesterTreeImplementation } from 'behavior/roles/harvester';
import { getUpgraderInfo, UpgraderTree, UpgraderTreeImplementation } from 'behavior/roles/upgrader';
import { SpawnCreeps } from 'behavior/spawn/spawnCreeps';
import { ProtectRoom } from 'behavior/tower/protectRoom';
import { IRunResult, Run } from 'runner/runner';
import { UpdateConstructionSites } from 'utils/ConstructionHelper';
import { ErrorMapper } from 'utils/ErrorMapper';
import { exportStats, GarbageCollect } from 'utils/MemoryUtil';
import { isTower } from 'utils/TypeGuards';
import '../libs/Traveler/Traveler';
import './extensions/all';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	GarbageCollect();

	const spawns = _.filter(Game.spawns, (s) => s.my);
	const rooms = [];
	for (const spawn of spawns) {
		if (rooms.findIndex(x => x.name === spawn.room.name) === -1) {
			rooms.push(spawn.room);
		}
		SpawnCreeps(spawn);
	}

	for (const room of rooms) {
		UpdateConstructionSites(room);
		const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, {
			filter: isTower
		})
		for (const tower of towers) {
			ProtectRoom(tower);
		}
	}

	const creeps = _.filter(Game.creeps, (c) => c.my);
	for (const creep of creeps) {
		if (creep.spawning)
			continue;

		let result: IRunResult;
		switch (creep.memory.role) {
			case 'harvester': {
				result = Run(HarvesterTree, HarvesterTreeImplementation, getHarvesterInfo(creep));
				break;
			}
			case 'builder': {
				result = Run(BuilderTree, BuilderTreeImplementation, getBuilderInfo(creep));
				break;
			}
			case 'upgrader': {
				result = Run(UpgraderTree, UpgraderTreeImplementation, getUpgraderInfo(creep));
				break;
			}
		}

		if (!result.success)
			console.log(`'${creep.name}' with role '${creep.memory.role}' failed on task '${result.command}'!`);

		exportStats();
	}
});
