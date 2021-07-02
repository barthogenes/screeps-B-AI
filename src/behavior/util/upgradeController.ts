import { ITree, SelectorNodeType, SequenceNodeType } from '../ITree';
import { ISpawnInteractionInfo } from './spawnInteraction';

export interface IUpgradeControllerImplementation {
	'do I have energy with me?': (info: ISpawnInteractionInfo) => boolean;
	'upgrade controller': (info: ISpawnInteractionInfo) => boolean;
	'move to controller': (info: ISpawnInteractionInfo) => boolean;
}

export const UpgradeControllerImplementation: IUpgradeControllerImplementation = {
	'do I have energy with me?': ({ creep }) => creep.store.energy !== 0,
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
}

export const UpgradeController: ITree<ISpawnInteractionInfo, typeof UpgradeControllerImplementation> = {
	type: SequenceNodeType,
	nodes: [
		'do I have energy with me?',
		{
			type: SelectorNodeType,
			nodes: [
				'upgrade controller',
				'move to controller'
			]
		}
	]
}
