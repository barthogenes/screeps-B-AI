
export interface ISpawnerInfo {
	spawn: StructureSpawn;
}

export interface ISpawnerTreeImplementation extends Record<string, (input: ISpawnerInfo) => boolean> {
	'am I not already spawning something?': (info: ISpawnerInfo) => boolean,
	'spawn creeps': (info: ISpawnerInfo) => boolean,
}
