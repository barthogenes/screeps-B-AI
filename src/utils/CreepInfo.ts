
interface CreepData
{
	HarvestersPerSource: { sourceId: Id<Source>, creepCount: number }[];
	CreepRoleCounts: CreepRoleCounts;
}

export function GetCreepData(sourcesInRoom: Source[]): CreepData
{
	const creepData: CreepData = {
		HarvestersPerSource: sourcesInRoom.map((source) =>
		{
			return { sourceId: source.id, creepCount: 0 };
		}),
		CreepRoleCounts: {
			harvester: 0,
			upgrader: 0,
			builder: 0
		}
	};

	for (const name in Memory.creeps)
	{
		const creep = Memory.creeps[name];
		creepData.HarvestersPerSource.forEach((s) =>
		{
			if (s.sourceId === creep.source)
			{
				s.creepCount++;
			}
		});

		creepData.CreepRoleCounts[creep.role]++;
	}
	return creepData;
}
