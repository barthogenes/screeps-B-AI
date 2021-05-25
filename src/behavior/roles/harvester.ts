import { ITree } from 'behavior/ITree';
import { DropOffEnergy, DropOffEnergyImplementation, IDropOffEnergyImplementation, IDropOffInfo } from 'behavior/util/dropOffEnergy';
import { ExtensionInteractionImplementation, IExtensionInteractionImplementation } from 'behavior/util/extensionInteraction';
import { Harvest, HarvestImplementation, IHarvestImplementation, IHarvestInfo } from 'behavior/util/harvest';
import { ISpawnInteractionImplementation, SpawnInteractionImplementation } from 'behavior/util/spawnInteraction';
import { isExtension } from 'utils/TypeGuards';

export const getHarvesterInfo = (creep: Creep): IHarvestInfo & IDropOffInfo =>
{
	const closestNotFullExtension = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
		filter: (s) => s.structureType === STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
	});

	return {
		creep,
		source: creep.getAssignedSource(),
		spawn: creep.getSpawn(),
		closestEmptyExtension: isExtension(closestNotFullExtension) ? closestNotFullExtension : null,
		closestFullExtension: null
	};
}

export const HarvesterTreeImplementation: IHarvestImplementation & IDropOffEnergyImplementation & ISpawnInteractionImplementation & IExtensionInteractionImplementation = {
	...HarvestImplementation,
	...DropOffEnergyImplementation,
	...SpawnInteractionImplementation,
	...ExtensionInteractionImplementation
}

export const HarvesterTree: ITree<IHarvestInfo & IDropOffInfo, typeof HarvesterTreeImplementation> = {
	type: 'selector',
	nodes: [
		Harvest,
		DropOffEnergy
	]
};
