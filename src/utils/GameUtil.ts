export function GetMyRooms(): Room[] {
	return GetMySpawns().reduce<Room[]>((prev, curr) => {
		if (prev.findIndex(x => x.name === curr.room.name) === -1) {
			prev.push(curr.room);
		}

		return prev;
	}, []);
}

export function GetMySpawns(): StructureSpawn[] {
	const spawns = [];

	for (const name in Game.spawns) {
		const spawn = Game.spawns[name];
		if (!spawn.my) {
			continue;
		}
		spawns.push(spawn);
	}

	return spawns;
}

export function GetMyCreeps(): Creep[] {
	const creeps = [];

	for (const name in Game.creeps) {
		const creep = Game.creeps[name];
		if (!creep.my) {
			continue;
		}
		creeps.push(creep);
	}

	return creeps;
}
