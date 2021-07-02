export const GetAssignedSource = (sourceId: Id<Source> | undefined, getSource: (id: Id<Source>) => Source | null): Source => {
	if (!sourceId)
		throw new Error('No Source was assigned to this creep!');

	const source = getSource(sourceId);
	if (!source)
		throw new Error('Source not found!');

	return source;
}

export const GetSpawn = (spawnId: Id<StructureSpawn>, getSpawn: (id: Id<StructureSpawn>) => StructureSpawn | null): StructureSpawn => {
	const spawn = getSpawn(spawnId);
	if (!spawn)
		throw new Error('No spawn was assigned at creep creation!');

	return spawn;
}
