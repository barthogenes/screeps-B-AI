export interface IBuilderInfo {
	creep: Creep;
	constructionSite: ConstructionSite<BuildableStructureConstant> | null;
	spawn: StructureSpawn;
}

export interface IBuilderTreeImplementation {
	'can I build?': (info: IBuilderInfo) => boolean,
	'build': (info: IBuilderInfo) => boolean,
	'move to construction site': (info: IBuilderInfo) => boolean,
	'grab energy': (info: IBuilderInfo) => boolean,
	'move to spawn': (info: IBuilderInfo) => boolean
}
