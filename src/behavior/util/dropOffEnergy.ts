import { ITree } from 'behavior/ITree';
import { ExtensionInteractionImplementation, IExtensionInteractionImplementation, IExtensionInteractionInfo } from './extensionInteraction';
import { ISpawnInteractionImplementation, ISpawnInteractionInfo, SpawnInteractionImplementation } from './spawnInteraction';
import { ITowerInteractionImplementation, ITowerInteractionInfo, TowerInteractionImplementation } from './towerInteraction';

export interface IDropOffInfo extends ISpawnInteractionInfo, IExtensionInteractionInfo, ITowerInteractionInfo {}

export interface IDropOffEnergyImplementation {
	'can I drop off my stuff at a not full tower?': (info: IDropOffInfo) => boolean;
	'transfer to empty tower': (info: IDropOffInfo) => boolean;
	'can I drop off my stuff at a not full extension?': (info: IDropOffInfo) => boolean;
	'transfer to empty extension': (info: IDropOffInfo) => boolean;
	'can I drop off my stuff at the spawn?': (info: IDropOffInfo) => boolean;
	'transfer to spawn': (info: IDropOffInfo) => boolean;
}

export const DropOffEnergyImplementation: IDropOffEnergyImplementation & ISpawnInteractionImplementation & IExtensionInteractionImplementation & ITowerInteractionImplementation = {
	'can I drop off my stuff at a not full tower?': ({ closestEmptyTower }) => !!closestEmptyTower,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	'transfer to empty tower': ({ creep, closestEmptyTower }) => creep.transfer(closestEmptyTower!, RESOURCE_ENERGY) === OK,
	'can I drop off my stuff at a not full extension?': ({ closestEmptyExtension }) => !!closestEmptyExtension,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	'transfer to empty extension': ({ creep, closestEmptyExtension }) => creep.transfer(closestEmptyExtension!, RESOURCE_ENERGY) === OK,
	'can I drop off my stuff at the spawn?': ({ spawn }) => spawn.store.getFreeCapacity(RESOURCE_ENERGY) >= 50,
	'transfer to spawn': ({ creep, spawn }) => creep.transfer(spawn, RESOURCE_ENERGY) === OK,
	...SpawnInteractionImplementation,
	...ExtensionInteractionImplementation,
	...TowerInteractionImplementation
}

export const DropOffEnergy: ITree<IDropOffInfo, typeof DropOffEnergyImplementation> = {
	type: 'selector',
	nodes: [
		{
			type: 'sequence',
			nodes: [
				'can I drop off my stuff at a not full tower?',
				{
					type: 'selector',
					nodes: [
						'transfer to empty tower',
						'move next to empty tower'
					]
				},
			]
		},
		{
			type: 'sequence',
			nodes: [
				'can I drop off my stuff at a not full extension?',
				{
					type: 'selector',
					nodes: [
						'transfer to empty extension',
						'move next to empty extension'
					]
				},
			]
		},
		{
			type: 'sequence',
			nodes: [
				'can I drop off my stuff at the spawn?',
				{
					type: 'selector',
					nodes: [
						'transfer to spawn',
						'move next to spawn'
					]
				},
			]
		},
		'move to somewhere away from spawn',
	],
};
