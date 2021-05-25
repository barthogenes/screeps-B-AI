import { ITree } from 'behavior/ITree';
import { Build, BuildImplementation, IBuildImplementation, IBuildInfo } from 'behavior/util/build';
import { GrabEnergy, GrabEnergyImplementation, IGrabEnergyImplementation } from 'behavior/util/grabEnergy';
import { ISpawnInteractionImplementation, ISpawnInteractionInfo, SpawnInteractionImplementation } from 'behavior/util/spawnInteraction';
import { IUpgradeControllerImplementation, UpgradeControllerImplementation } from 'behavior/util/upgradeController';
import { UpgraderTree } from './upgrader';

export const getBuilderInfo = (creep: Creep): IBuildInfo & ISpawnInteractionInfo =>
{
	return {
		creep,
		spawn: creep.getSpawn(),
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		constructionSite: creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES)!,
	};
}

export interface IBuilderTreeImplementation
{
	'are there construction sites that can be build?': (info: IBuildInfo) => boolean;
}

export const BuilderTreeImplementation: IBuilderTreeImplementation & IBuildImplementation & IGrabEnergyImplementation & ISpawnInteractionImplementation & IUpgradeControllerImplementation= {
	...BuildImplementation,
	...GrabEnergyImplementation,
	...SpawnInteractionImplementation,
	...UpgradeControllerImplementation,
	'are there construction sites that can be build?': ({ constructionSite }) => !!constructionSite
}

export const BuilderTree: ITree<IBuildInfo & ISpawnInteractionInfo, typeof BuilderTreeImplementation> = {
	type: 'selector',
	nodes: [
		{
			type: 'sequence',
			nodes: [
				'are there construction sites that can be build?',
				{
					type: 'selector',
					nodes: [
						Build,
						GrabEnergy
					]
				}
			]
		},
		UpgraderTree,
	]
};
