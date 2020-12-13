import { Harvester } from 'behaviors/impl/harvest';
import { BuildOrGetEnergy, GetBuildTreeFunctions } from 'behaviortrees/build';
import { HarvesterTree } from 'behaviortrees/HarvesterTree';
import {
	GetUpgradeTreeFunctions,
	UpgradeOrGetEnergy
} from 'behaviortrees/impl/upgrade';
import { RunSpawnTree } from 'behaviortrees/spawning';
import { Run } from 'runner/runner';
import { ErrorMapper } from 'utils/ErrorMapper';
import { GarbageCollect } from 'utils/Memory';
import '../libs/screepsExtensions';
import '../libs/Traveler/Traveler';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	console.log(`Current game tick is ${Game.time}`);
	GarbageCollect();

	for (const name in Game.spawns) {
		const spawn = Game.spawns[name];
		if (!spawn.my) {
			continue;
		}

		RunSpawnTree(spawn);
	}

	for (const name in Game.creeps) {
		const creep = Game.creeps[name];
		if (!creep.my) {
			continue;
		}
		let result: ReturnType<typeof Run>;
		switch (creep.memory.role) {
			case 'harvester': {
				const tree = new HarvesterTree(creep);
				result = Run(tree.getObject(), Harvester, tree.getTree());
				break;
			}
			case 'upgrader':
			{
				const tree = new HarvesterTree(creep);
				result = Run(creep, GetUpgradeTreeFunctions(), UpgradeOrGetEnergy());
				break;
			}
			case 'builder':
				result = Run(creep, GetBuildTreeFunctions(), BuildOrGetEnergy());
				break;
		}

		if (!result.success)
		{
			console.log(`${creep.name} with role ${creep.memory.role} failed on task ${result.command}!`);
		}
	}
});
