import { ITreeImplementation } from '../ITreeImplementation';

export interface HarvesterInfo
{
	creep: Creep;
	source: Source;
	spawn: StructureSpawn;
	closestNotFullExtension: StructureExtension | null;
}

export interface IHarvesterTreeImplementation extends ITreeImplementation<HarvesterInfo>
{
	'can I carry some more?': (info: HarvesterInfo) => boolean;
	'am I next to my assigned source?': (info: HarvesterInfo) => boolean;
	'try to harvest': (info: HarvesterInfo) => boolean;
	'move to source': (info: HarvesterInfo) => boolean;
	'can I drop off my stuff at the spawn?': (info: HarvesterInfo) => boolean;
	'transfer': (info: HarvesterInfo) => boolean;
	'move to spawn': (info: HarvesterInfo) => boolean;
}
