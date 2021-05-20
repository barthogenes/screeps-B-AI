import { IUpgraderTreeImplementation } from './IUpgraderTreeImplementation';

export const UpgraderTreeImplementation: IUpgraderTreeImplementation = {
	'can I upgrade?': ({ creep }) => creep.store.energy !== 0,
	'upgrade controller': ({ creep }) => {
		if (!creep.room.controller)
			return false;

		return creep.upgradeController(creep.room.controller) === OK;
	},
	'move to controller': ({ creep }) => {
		if (!creep.room.controller)
			return false;

		return creep.travelTo(creep.room.controller) === OK;
	},
	'grab energy': ({ creep, spawn }) => {
		return creep.withdraw(spawn, RESOURCE_ENERGY) === OK;
	},
	'move to spawn': ({ creep }) => {
		const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
		if (!spawn)
			return false;

		if (!spawn.memory.allowWithdraw)
			return false;

		return creep.travelTo(spawn) === OK;
	},
}
