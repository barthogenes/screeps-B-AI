import { ITreeImplementation } from '../ITreeImplementation';

export interface BuilderInfo {
	creep: Creep;
	constructionSite: ConstructionSite<BuildableStructureConstant> | null;
	spawn: StructureSpawn;
}

export interface IBuilderTreeImplementation extends ITreeImplementation<BuilderInfo> {
	'build': (info: BuilderInfo) => boolean,
	'move to construction site': (info: BuilderInfo) => boolean,
	'grab energy': (info: BuilderInfo) => boolean,
	'move to spawn': (info: BuilderInfo) => boolean
}
