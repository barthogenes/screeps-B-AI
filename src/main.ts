import { roleHarvester } from "creeperRoles/harvester";
import { roleUpgrader } from "creeperRoles/upgrader";
import { roleSpawner } from "structureRoles/spawner";
import { ErrorMapper } from "utils/ErrorMapper";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	console.log(`Current game tick is ${Game.time}`);

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
			if (memory.role === "harvester") {
				roleHarvester.run(creep);
			}
			if (memory.role === "upgrader") {
				roleUpgrader.run(creep);
			}
		} catch (e) {
			error = e;
		}
	}

	for (const name in Game.spawns) {
		const spawner = Game.spawns[name];
		const memory = spawner.memory as any;
		if (!spawner.isActive()) {
			continue;
		}
		try {
			if (memory.role === "spawner") {
				roleSpawner.run(spawner);
			}
		} catch (e) {
			error = e;
		}
	}

	// Automatically delete memory of missing creeps
	for (const name in Memory.creeps) {
		if (!(name in Game.creeps)) {
			delete Memory.creeps[name];
		}
	}

	if (Game.time % 13 === 0) {
		console.log("Bucket :" + Game.cpu.bucket);
		console.log("Used :" + Game.cpu.getUsed());
	}

	Memory.rooms = Memory.rooms || {};

	if (Game.cpu.getUsed() > 50) {
		console.log("Used a lot of cpu : ", Game.cpu.getUsed(), Game.time);
	}

	if (error) {
		throw error;
	}
});
