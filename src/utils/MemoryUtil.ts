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

export function exportStats(): void {
	// Reset stats object
	Memory.stats = {
		gcl: {},
		rooms: {},
		cpu: {},
	} as Memory['stats'];

	Memory.stats.time = Game.time;

	// Collect room stats
	for (const roomName in Game.rooms) {
		const room = Game.rooms[roomName];
		const isMyRoom = (room.controller ? room.controller.my : false);
		if (isMyRoom) {
			const roomStats = Memory.stats.rooms[roomName] = {} as Memory['stats']['rooms'][0];
			roomStats.storageEnergy = (room.storage ? room.storage.store.energy : 0);
			roomStats.terminalEnergy = (room.terminal ? room.terminal.store.energy : 0);
			roomStats.energyAvailable = room.energyAvailable;
			roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
			roomStats.controllerProgress = room.controller?.progress || 0;
			roomStats.controllerProgressTotal = room.controller?.progressTotal || 0;
			roomStats.controllerLevel = room.controller?.level || 0;
		}
	}

	// Collect GCL stats
	Memory.stats.gcl.progress = Game.gcl.progress;
	Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
	Memory.stats.gcl.level = Game.gcl.level;

	// Collect CPU stats
	Memory.stats.cpu.bucket = Game.cpu.bucket;
	Memory.stats.cpu.limit = Game.cpu.limit;
	Memory.stats.cpu.used = Game.cpu.getUsed();
}
