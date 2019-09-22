interface UpgraderMemory extends CreepMemory {
	upgrading: boolean;
}

class RoleUpgrader implements CreeperRole {
	public run(creep: Creep) {
		const memory: UpgraderMemory = creep.memory as any;
		if (memory.upgrading && creep.carry.energy === 0) {
			memory.upgrading = false;
			creep.say('🔄 get from spawner');
		}
		if (!memory.upgrading && creep.carry.energy === creep.carryCapacity) {
			memory.upgrading = true;
			creep.say('⚡ upgrade');
		}

		if (memory.upgrading) {
			if (creep.upgradeController(creep.room.controller!) === ERR_NOT_IN_RANGE) {
				if (creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#ffffff' } }) > 0) {
					creep.say('error cannot move to controller!');
				}
			}
		} else {
			const sources = creep.room.find(FIND_MY_SPAWNS);
			if (creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
}

export const roleUpgrader = new RoleUpgrader();
