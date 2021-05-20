import { BuilderTree } from 'behavior/build/BuilderTree';
import { BuilderTreeImplementation } from 'behavior/build/BuilderTreeImplementation';
import { HarvesterTree } from 'behavior/harvest/HarvesterTree';
import { HarvesterTreeImplementation } from 'behavior/harvest/HarvesterTreeImplementation';
import { SpawnerTree } from 'behavior/spawn/SpawnerTree';
import { SpawnerTreeImplementation } from 'behavior/spawn/SpawnerTreeImplementation';
import { UpgraderTree } from 'behavior/upgrade/UpgraderTree';
import { UpgraderTreeImplementation } from 'behavior/upgrade/UpgraderTreeImplementation';
import { IRunResult, Run } from 'runner/runner';
import { ErrorMapper } from 'utils/ErrorMapper';
import { GarbageCollect } from 'utils/Memory';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	console.log(`Current game tick is ${Game.time}`);
	GarbageCollect();

	RunSpawnTrees();

	for (const name in Game.creeps) {
		const creep = Game.creeps[name];
		if (!creep.my) {
			continue;
		}
		let result: IRunResult;
		switch (creep.memory.role) {
			case 'harvester': {
				const harvesterTree = new HarvesterTree(creep);
				result = Run(harvesterTree.HarvestOrBringBack(), HarvesterTreeImplementation, harvesterTree.getObject());
				break;
			}
			case 'upgrader': {
				const upgraderTree = new UpgraderTree(creep);
				result = Run(upgraderTree.UpgradeOrGetEnergy(), UpgraderTreeImplementation, upgraderTree.getObject());
				break;
			}
			case 'builder': {
				const builderTree = new BuilderTree(creep);
				result = Run(builderTree.BuildOrGetEnergy(), BuilderTreeImplementation, builderTree.getObject());
				break;
			}
		}

		if (!result.success)
			console.log(`${creep.name} with role ${creep.memory.role} failed on task ${result.command}!`);
	}
});

function RunSpawnTrees() {
	for (const name in Game.spawns) {
		const spawn = Game.spawns[name];
		if (!spawn.my) {
			continue;
		}

		const spawnerTree = new SpawnerTree(spawn);
		Run(spawnerTree.ShouldSpawn(), SpawnerTreeImplementation, spawnerTree.getObject());
	}
}
