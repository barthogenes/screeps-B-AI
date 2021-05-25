interface CreepRoleCounts {
	'harvester': number;
	'upgrader': number;
	'builder': number;
}
type CreepRole = 'harvester' | 'upgrader' | 'builder';

interface CreepMemory {
	spawn: Id<StructureSpawn>;
	role: CreepRole;
	source?: Id<Source>;
}

interface SpawnMemory {
	allowWithdraw: boolean;
	lastRoadNetworkUpdate: number;
}

interface RoomMemory {
	avoid?: number;
}

interface Creep {
	getSpawn: () => StructureSpawn;
	getAssignedSource: () => Source;
	travelToAndBuildRoad: typeof Creep.prototype.travelTo;
}

interface RoomObject {
	getFreeAdjacentSpacesCount: () => number;
}

interface Room {
	getAreaAroundPosition: (pos: RoomPosition, range: number, excludeSelfOptions?: { range: number }) => LookForAtAreaResultArray<Terrain, LOOK_TERRAIN>;
	countCreepsWithRole: (role: CreepRole) => number;
	countCreepsAssignedToSource: (sourceID: Id<Source>) => number;
}

interface Memory {
	uuid: number;
	log: any;
	empire: {
		hostileRooms?: { [name: string]: RoomMemory };
	}
}

// `global` extensions
declare namespace NodeJS {
	interface Global {
		log: any;
		ENVIRONMENT: string;
	}
}

