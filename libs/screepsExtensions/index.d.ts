
interface CreepRoleCounts {
	'harvester': number,
	'upgrader': number,
	'builder': number
}
type CreepRole = keyof CreepRoleCounts;

interface CreepMemory
{
	role: CreepRole;
	source?: Id<Source>;
	constructionSite?: Id<ConstructionSite>;
	spawn: Id<StructureSpawn>;
}

interface RoomMemory
{
	avoid: number;
	constructionSiteToBuild?: Id<ConstructionSite>
}

interface SpawnMemory
{
	allowWithdraw: boolean;
}

interface Creep
{
	getSpawn: () => StructureSpawn;
	getAssignedSource: () => Source;
	getClosestNotFullExtension: () => StructureExtension | null;
	getConstructionSite: () => ConstructionSite<BuildableStructureConstant> | null;
}

interface Memory
{
	uuid: number;
	log: any;
	empire: {
		hostileRooms: { [name: string]: RoomMemory };
	}
}

// `global` extensions
declare namespace NodeJS
{
	interface Global
	{
		log: any;
		ENVIRONMENT: string;
	}
}

