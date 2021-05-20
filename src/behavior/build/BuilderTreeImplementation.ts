import { IBuilderTreeImplementation } from './IBuilderTreeImplementation';

export const BuilderTreeImplementation: IBuilderTreeImplementation = {
	'can I build?': ({ creep }) => creep.store.energy !== 0,
	'build': ({ creep, constructionSite }) => {
		if (!constructionSite)
			return false;

		return creep.build(constructionSite) === OK;
	},
	'move to construction site': ({ creep, constructionSite }) => {
		if (!constructionSite)
			return false;

		return creep.travelTo(constructionSite) === OK;
	},
	'grab energy': ({ creep, spawn }) => {
		if (!spawn.memory.allowWithdraw)
			return false;

		return creep.withdraw(spawn, RESOURCE_ENERGY) === OK;
	},
	'move to spawn': ({ creep, spawn }) => {
		if (!spawn.memory.allowWithdraw)
			return false;

		return creep.travelTo(spawn) === OK;
	}
}
