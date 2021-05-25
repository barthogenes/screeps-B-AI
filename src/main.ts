import { BuilderTree, BuilderTreeImplementation, getBuilderInfo } from 'behavior/roles/builder';
import { getHarvesterInfo, HarvesterTree, HarvesterTreeImplementation } from 'behavior/roles/harvester';
import { getUpgraderInfo, UpgraderTree, UpgraderTreeImplementation } from 'behavior/roles/upgrader';
import { SpawnCreeps } from 'behavior/spawn/spawnCreeps';
import { IRunResult, Run } from 'runner/Runner';
import { UpdateConstructionSites } from 'utils/ConstructionHelper';
import { ErrorMapper } from 'utils/ErrorMapper';
import { GetMyCreeps, GetMyRooms, GetMySpawns } from 'utils/GameUtil';
import { GarbageCollect } from 'utils/MemoryUtil';
import '../libs/Traveler/Traveler';
import './extensions/all';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	GarbageCollect();

	const rooms = GetMyRooms();
	for (const room of rooms) {
		UpdateConstructionSites(room);
	}

	const spawns = GetMySpawns();
	for (const spawn of spawns) {
		SpawnCreeps(spawn);
	}

	const creeps = GetMyCreeps();
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
	}
});
