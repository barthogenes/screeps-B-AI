
/**
 * Automatically delete memory of missing creeps
 */
export function GarbageCollect()
{
	for (const name in Memory.creeps)
	{
		if (!(name in Game.creeps))
		{
			delete Memory.creeps[name];
		}
	}
}
