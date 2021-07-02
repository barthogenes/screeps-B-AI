import { GetBuildList, GetExtensionsCountInRoom, RandomNumberInRange } from './RoomInfo';

export const UpdateConstructionSites = (room: Room): void => {
	const spawns = room.find(FIND_MY_SPAWNS);
	if (!spawns.length)
		return;

	const sources = room.find(FIND_SOURCES);
	const controller = room.controller;

	spawns.forEach(spawn => {
		updateRoadNetwork(spawn, sources, controller);

		const toBeBuildExtensionsCount = GetBuildList(room.controller?.level).Extensions - GetExtensionsCountInRoom(room);
		if (toBeBuildExtensionsCount > 0) {
			randomlyBuildExtensionsAround(room, spawn.pos, toBeBuildExtensionsCount);
		}
	});
}

function updateRoadNetwork (spawn: StructureSpawn, sources: Source[], controller?: StructureController) {
	let roadNetwork: PathStep[] = [];

	if (spawn.memory.lastRoadNetworkUpdate) {
		return;
	}

	spawn.memory.lastRoadNetworkUpdate = Game.time;
	roadNetwork = getRoadNetworkForSpawn(spawn, sources, controller);

	roadNetwork.forEach(pos => {
		// Place container instead of road before each source to enable container-mining.
		if (sources.findIndex(s => s.pos.isNearTo(pos.x, pos.y)) !== -1)
		{
			spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
		} else {
			spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
		}
	});
}

function getRoadNetworkForSpawn(spawn: StructureSpawn, sources: Source[], controller?: StructureController)
{
	const roadNetwork: PathStep[] = [];

	sources.forEach(source => {
		roadNetwork.push(...spawn.room.findPath(spawn.pos, source.pos, { range: 1 }));
	})

	if (controller)
		roadNetwork.push(...spawn.room.findPath(spawn.pos, controller.pos, { range: 1 }));

	return roadNetwork
}

function randomlyBuildExtensionsAround(room: Room, pos: RoomPosition, toBeBuildExtensionsCount: number) {
	const area = room.getAreaAroundPosition(pos, 5, { range: 1 });

	for (let index = 0; index < toBeBuildExtensionsCount; index++) {
		const randomIndex = RandomNumberInRange(0, area.length - 1);
		const randomPoint = area[randomIndex];
		room.createConstructionSite(randomPoint.x, randomPoint.y, STRUCTURE_EXTENSION);
	}
}
