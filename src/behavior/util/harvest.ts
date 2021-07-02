import { ITree, SelectorNodeType, SequenceNodeType } from 'behavior/ITree';

export interface IHarvestInfo {
	creep: Creep;
	source: Source;
}

export interface IHarvestImplementation {
	'can I carry some more?': (info: IHarvestInfo) => boolean;
	'try to harvest': (info: IHarvestInfo) => boolean;
	'move to source': (info: IHarvestInfo) => boolean;
}

export const HarvestImplementation: IHarvestImplementation =
{
	'can I carry some more?': ({ creep }) => creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
	'try to harvest': ({ creep, source }) => creep.harvest(source) === OK,
	'move to source': ({ creep, source }) => creep.travelTo(source) === OK,
};

export const Harvest: ITree<IHarvestInfo, typeof HarvestImplementation> = {
	type: SequenceNodeType,
	nodes: [
		'can I carry some more?',
		{
			type: SelectorNodeType,
			nodes: [
				'try to harvest',
				'move to source'
			]
		}
	]
};
