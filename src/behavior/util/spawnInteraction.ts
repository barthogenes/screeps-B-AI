export interface ISpawnInteractionInfo {
	spawn: StructureSpawn;
	creep: Creep;
}

export interface ISpawnInteractionImplementation {
	'move next to spawn': (info: ISpawnInteractionInfo) => boolean;
	'move to somewhere away from spawn': (info: ISpawnInteractionInfo) => boolean;
}

export const SpawnInteractionImplementation: ISpawnInteractionImplementation = {
	'move next to spawn': ({ creep, spawn }) => creep.travelTo(spawn) === OK,
	'move to somewhere away from spawn': ({ creep, spawn }) => {
		const result = creep.moveByPath(PathFinder.search(creep.pos, { pos: spawn.pos, range: 2 }, { flee: true }).path);
		return result === OK || result === ERR_NOT_FOUND;
	},
}
