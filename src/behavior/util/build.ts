import { ITree } from 'behavior/ITree';

export interface IBuildInfo {
	creep: Creep;
	constructionSite: ConstructionSite<BuildableStructureConstant>;
	spawn: StructureSpawn;
}

export interface IBuildImplementation {
	'can I build?': (info: IBuildInfo) => boolean,
	'build': (info: IBuildInfo) => boolean,
	'move to construction site': (info: IBuildInfo) => boolean,
}

export const BuildImplementation: IBuildImplementation = {
	'can I build?': ({ creep }) => creep.store.energy !== 0,
	'build': ({ creep, constructionSite }) => creep.build(constructionSite) === OK,
	'move to construction site': ({ creep, constructionSite }) => creep.travelTo(constructionSite) === OK,
}

export const Build: ITree<IBuildInfo, typeof BuildImplementation> = {
	type: 'sequence',
	nodes: [
		'can I build?',
		{
			type: 'selector',
			nodes: [
				'build',
				'move to construction site'
			]
		}
	]
}
