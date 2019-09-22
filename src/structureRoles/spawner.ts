class RoleSpawner implements StructureRole<StructureSpawn> {
	public run(spawner: StructureSpawn) {
		if (spawner.spawning) {
			return;
		}

		const harvesters = spawner.room.find(FIND_MY_CREEPS, {
			filter: creep => creep.memory.role === 'harvester'
		});

		if (harvesters.length < 1) {
			spawner.spawnCreep([WORK, CARRY, MOVE], 'Harvester1', {
				memory: {
					role: 'harvester',
					room: spawner.room.name,
					working: false
				}
			});
			return;
		}

		const upgraders = spawner.room.find(FIND_MY_CREEPS, {
			filter: creep => creep.memory.role === 'upgrader'
		});

		if (upgraders.length < 1) {
			spawner.spawnCreep([WORK, CARRY, MOVE], 'Upgrader1', {
				memory: {
					role: 'upgrader',
					room: spawner.room.name,
					working: false
				}
			});
			return;
		}
	}
}

export const roleSpawner = new RoleSpawner();
