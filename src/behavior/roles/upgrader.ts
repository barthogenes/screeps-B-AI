import { ITree } from 'behavior/ITree';
import { IBuildInfo } from 'behavior/util/build';
import { GrabEnergy, GrabEnergyImplementation, IGrabEnergyImplementation } from 'behavior/util/grabEnergy';
import { ISpawnInteractionImplementation, ISpawnInteractionInfo, SpawnInteractionImplementation } from 'behavior/util/spawnInteraction';
import { IUpgradeControllerImplementation, UpgradeController, UpgradeControllerImplementation } from 'behavior/util/upgradeController';

export const getUpgraderInfo = (creep: Creep): ISpawnInteractionInfo =>
{
	return {
		creep,
		spawn: creep.getSpawn(),
	};
}

export const UpgraderTreeImplementation: IUpgradeControllerImplementation & IGrabEnergyImplementation & ISpawnInteractionImplementation = {
	...UpgradeControllerImplementation,
	...GrabEnergyImplementation,
	...SpawnInteractionImplementation
}

export const UpgraderTree: ITree<IBuildInfo & ISpawnInteractionInfo, typeof UpgraderTreeImplementation> = {
	type: 'selector',
	nodes: [
		UpgradeController,
		GrabEnergy
	]
};
