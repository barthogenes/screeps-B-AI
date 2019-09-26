import { roleHarvester } from 'creeperRoles/harvester';
import { roleUpgrader } from 'creeperRoles/upgrader';
import { roleSpawner } from 'structureRoles/spawner';
import profiler from 'screeps-profiler';
import { roleSpawner } from 'StructureRoles/spawner';
import { ErrorMapper } from 'Utils/ErrorMapper';
import { profilerUtils } from 'Utils/ProfilerUtils';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const mloop = () => {

	profilerUtils.profile();

	// Automatically delete memory of missing creeps
	for (const name in Memory.creeps) {
		if (!(name in Game.creeps)) {
			delete Memory.creeps[name];
		}
	}

	let error: any = null;
	for (const name in Game.creeps) {
		const creep = Game.creeps[name];
		const memory = creep.memory;
		if (creep.spawning) {
			continue;
		}
		try {
			if (memory.role === 'harvester') {
				roleHarvester.run(creep);
			}
			if (memory.role === 'upgrader') {
				roleUpgrader.run(creep);
			}
		} catch (e) {
			error = e;
		}
	}

	for (const name in Game.spawns) {
		const spawner = Game.spawns[name];
		if (!spawner.isActive()) {
			continue;
		}
		try {
			roleSpawner.run(spawner);
		} catch (e) {
			error = e;
		}
	}

	if (Game.time % 13 === 0) {
		console.log('Bucket :' + Game.cpu.bucket);
		console.log('Used :' + Game.cpu.getUsed());
	}

	Memory.rooms = Memory.rooms || {};

	if (Game.cpu.getUsed() > 50) {
		console.log('Used a lot of cpu : ', Game.cpu.getUsed(), Game.time);
	}

	if (error) {
		throw error;
	}
};

function ploop() {
	if (!!__PROFILER_ENABLED__) {
		profiler.wrap(mloop);
	} else {
		mloop();
	}
}

export const loop = ErrorMapper.wrapLoop(ploop);
