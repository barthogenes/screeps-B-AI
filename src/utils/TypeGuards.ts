export function isStore(structure: AnyStructure): structure is AnyStoreStructure
{
	return (structure as AnyStoreStructure).store !== undefined;
}

export function isSpawn(structure: AnyStructure): structure is StructureSpawn
{
	return (structure as StructureSpawn).structureType === STRUCTURE_SPAWN;
}

export function isExtension(structure: AnyStructure | null): structure is StructureExtension
{
	return (structure as StructureExtension)?.structureType === STRUCTURE_EXTENSION;
}

export function isTower(structure: AnyStructure | null): structure is StructureTower
{
	return (structure as StructureTower)?.structureType === STRUCTURE_TOWER;
}

export function isController(structure: AnyStructure): structure is StructureController
{
	return (structure as StructureController).structureType === STRUCTURE_CONTROLLER;
}

export function isSource(structure: RoomObject): structure is Source
{
	return (structure as Source).ticksToRegeneration !== undefined;
}
