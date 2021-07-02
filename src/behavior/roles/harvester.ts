import { ITree, SelectorNodeType } from 'behavior/ITree';
import { DropOffEnergy, DropOffEnergyImplementation, IDropOffEnergyImplementation, IDropOffInfo } from 'behavior/util/dropOffEnergy';
import { ExtensionInteractionImplementation, IExtensionInteractionImplementation } from 'behavior/util/extensionInteraction';
import { Harvest, HarvestImplementation, IHarvestImplementation, IHarvestInfo } from 'behavior/util/harvest';
import { ISpawnInteractionImplementation, SpawnInteractionImplementation } from 'behavior/util/spawnInteraction';
import { ITowerInteractionImplementation, TowerInteractionImplementation } from 'behavior/util/towerInteraction';
import { isExtension, isTower } from 'utils/TypeGuards';

export const getHarvesterInfo = (creep: Creep): IHarvestInfo & IDropOffInfo =>
{
	const closestNotFullExtension = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
		filter: (s) => isExtension(s) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
	});

	const closestNotFullTower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
		filter: (s) => isTower(s) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
	});

	return {
		creep,
		source: creep.getAssignedSource(),
		spawn: creep.getSpawn(),
		closestEmptyExtension: isExtension(closestNotFullExtension) ? closestNotFullExtension : null,
		closestFullExtension: null,
		closestEmptyTower: isTower(closestNotFullTower) ? closestNotFullTower : null,
		closestFullTower: null
	};
}

export const HarvesterTreeImplementation: IHarvestImplementation &
IDropOffEnergyImplementation &
ISpawnInteractionImplementation &
IExtensionInteractionImplementation &
ITowerInteractionImplementation = {
	...HarvestImplementation,
	...DropOffEnergyImplementation,
	...SpawnInteractionImplementation,
	...ExtensionInteractionImplementation,
	...TowerInteractionImplementation
}

export const HarvesterTree: ITree<IHarvestInfo & IDropOffInfo, typeof HarvesterTreeImplementation> = {
	type: SelectorNodeType,
	nodes: [
		Harvest,
		DropOffEnergy
	]
};
