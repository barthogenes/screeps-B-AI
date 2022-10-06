import { GetBestSimpleWorkerBodyPartsForCost } from 'utils/BodyPartsHelper';

export const SpawnCreeps = (spawn: StructureSpawn): void => {
	if (spawn.spawning)
		return;

	spawn.memory.allowWithdraw = false;

	const bodyParts = GetBestSimpleWorkerBodyPartsForCost(spawn.room.energyCapacityAvailable);

	const sources = spawn.room.find(FIND_SOURCES);
	const sourceID = sources.find(s => spawn.room.countCreepsAssignedToSource(s.id) < s.getFreeAdjacentSpacesCount())?.id;
	if (sourceID) {
		spawn.spawnCreep(bodyParts, `creep${Game.time}`, {
			memory: {
				role: 'harvester',
				source: sourceID,
				spawn: spawn.id
			}
		});
		return;
	}

	if (spawn.room.countCreepsWithRole('upgrader') < 3) {
		spawn.spawnCreep(bodyParts, `creep${Game.time}`, {
			memory: {
				role: 'upgrader',
				spawn: spawn.id
			}
		});
		return;
	}

	spawn.memory.allowWithdraw = spawn.store.energy >= 50;

	if (spawn.room.countCreepsWithRole('builder') < 2) {
		spawn.spawnCreep(bodyParts, `creep${Game.time}`, {
			memory: {
				role: 'builder',
				spawn: spawn.id
			}
		});
		return;
	}
}
