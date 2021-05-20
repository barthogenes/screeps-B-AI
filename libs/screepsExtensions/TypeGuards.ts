export function isStore(structure: AnyStructure): structure is AnyStoreStructure
{
	return (structure as AnyStoreStructure).store !== undefined;
}

export function isSpawn(structure: AnyStructure): structure is StructureSpawn
{
	return (structure as StructureSpawn).structureType === 'spawn';
}

export function isExtension(structure: AnyStructure): structure is StructureExtension
{
	return (structure as StructureExtension).structureType === 'extension';
}

export function isController(structure: AnyStructure): structure is StructureController
{
	return (structure as StructureController).structureType === 'controller';
}

export function isSource(structure: RoomObject): structure is Source
{
	return (structure as Source).ticksToRegeneration !== undefined;
}
