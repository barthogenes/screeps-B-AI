export function GetCreepMemories(): CreepMemory[] {
	const creepMemories = [];
	for (const name in Memory.creeps) {
		creepMemories.push(Memory.creeps[name])
	}
	return creepMemories;
}


/**
 * Automatically delete memory of missing creeps/spawns/sources
 */
export function GarbageCollect(): void {
	for (const name in Memory.creeps) {
		if (!(name in Game.creeps)) {
			delete Memory.creeps[name];
		}
	}

	for (const name in Memory.spawns) {
		if (!(name in Game.spawns)) {
			delete Memory.spawns[name];
		}
	}
}
