import { isExtension } from './TypeGuards';

export function GetExtensionsCountInRoom(room: Room): number
{
	const extensions = room.find<StructureExtension>(FIND_MY_STRUCTURES, {
		filter: isExtension
	});
	const extensionConstructionSites = room.find(FIND_MY_CONSTRUCTION_SITES, {
		filter: isExtension
	});
	return extensions.length + extensionConstructionSites.length;
}

export function RandomNumberInRange(min: number, max: number): number
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const DefaultBuildList = {
	Containers: 5,
	Spawns: 0,
	Extensions: 0,
	Labs: 0,
	Towers: 0,
	Links: 0,
	Walls: false,
	Ramparts: false,
	Storage: false,
	Extractor: false,
	Terminal: false,
	Observer: false,
	PowerSpawn: false,
};

export type BuildList = typeof DefaultBuildList;

export function GetBuildList(controllerLevel?: number): BuildList
{
	let buildList = DefaultBuildList;
	if (!controllerLevel)
		return buildList;

	if (controllerLevel >= 1)
	{
		buildList = {
			...buildList,
			Spawns: 1
		};
	}
	if (controllerLevel >= 2)
	{
		buildList = {
			...buildList,
			Extensions: 5,
			Ramparts: true,
			Walls: true
		};
	}
	if (controllerLevel >= 3)
	{
		buildList = {
			...buildList,
			Extensions: 10,
			Towers: 1
		};
	}
	if (controllerLevel >= 4)
	{
		buildList = {
			...buildList,
			Extensions: 20,
			Storage: true
		};
	}
	if (controllerLevel >= 5)
	{
		buildList = {
			...buildList,
			Extensions: 30,
			Towers: 2,
			Links: 2
		};
	}
	if (controllerLevel >= 6)
	{
		buildList = {
			...buildList,
			Extensions: 40,
			Links: 3,
			Extractor: true,
			Labs: 3,
			Terminal: true
		};
	}
	if (controllerLevel >= 7)
	{
		buildList = {
			...buildList,
			Spawns: 2,
			Extensions: 50,
			Towers: 3,
			Links: 4,
			Labs: 6,
		};
	}
	if (controllerLevel >= 8)
	{
		buildList = {
			...buildList,
			Spawns: 3,
			Extensions: 60,
			Towers: 6,
			Links: 6,
			Labs: 10,
			Observer: true,
			PowerSpawn: true
		};
	}

	return buildList;
}
