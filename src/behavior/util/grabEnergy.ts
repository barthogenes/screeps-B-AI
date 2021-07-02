import { ITree, SelectorNodeType, SequenceNodeType } from 'behavior/ITree';
import { ISpawnInteractionImplementation, ISpawnInteractionInfo, SpawnInteractionImplementation } from './spawnInteraction';

export interface IGrabEnergyImplementation {
	'am I allowed to grab energy?': (info: ISpawnInteractionInfo) => boolean;
	'grab energy': (info: ISpawnInteractionInfo) => boolean;
}

export const GrabEnergyImplementation: IGrabEnergyImplementation & ISpawnInteractionImplementation = {
	'am I allowed to grab energy?': ({ spawn }) => spawn.memory.allowWithdraw,
	'grab energy': ({ creep, spawn }) => creep.withdraw(spawn, RESOURCE_ENERGY) === OK,
	...SpawnInteractionImplementation
}

export const GrabEnergy: ITree<ISpawnInteractionInfo, typeof GrabEnergyImplementation> = {
	type: SelectorNodeType,
	nodes: [
		{
			type: SequenceNodeType,
			nodes: [
				'am I allowed to grab energy?',
				{
					type: SelectorNodeType,
					nodes: [
						'grab energy',
						'move next to spawn'
					]
				},
			]
		},
		'move to somewhere away from spawn',
	],
};
