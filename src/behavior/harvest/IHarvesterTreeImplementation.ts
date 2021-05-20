
export interface IHarvesterInfo {
	creep: Creep;
	source: Source;
	spawn: StructureSpawn;
	closestNotFullExtension: StructureExtension | null;
}

export interface IHarvesterTreeImplementation {
	'can I carry some more?': (info: IHarvesterInfo) => boolean;
	'try to harvest': (info: IHarvesterInfo) => boolean;
	'move to source': (info: IHarvesterInfo) => boolean;
	'can I drop off my stuff at the spawn?': (info: IHarvesterInfo) => boolean;
	'transfer': (info: IHarvesterInfo) => boolean;
	'move to spawn': (info: IHarvesterInfo) => boolean;
}
