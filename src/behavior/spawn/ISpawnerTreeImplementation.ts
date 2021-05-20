import { ITreeImplementation } from '../ITreeImplementation';

export interface SpawnerInfo {
	spawn: StructureSpawn;
}

export interface ISpawnerTreeImplementation extends ITreeImplementation<SpawnerInfo> {
	'am I not already spawning something?': (info: SpawnerInfo) => boolean,
	'spawn creeps': (info: SpawnerInfo) => boolean,
}
