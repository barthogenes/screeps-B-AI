import { IHarvesterTreeImplementation } from './IHarvesterTreeImplementation';

export const HarvesterTreeImplementation: IHarvesterTreeImplementation =
{
	'can I carry some more?': ({ creep }) =>
	{
		return creep.store.energy < creep.store.getCapacity();
	},
	'try to harvest': ({ creep, source }) =>
	{
		return creep.harvest(source) === OK;
	},
	'move to source': ({ creep, source }) =>
	{
		return creep.travelTo(source) === OK;
	},
	'can I drop off my stuff at the spawn?': ({ spawn }) =>
	{
		return spawn.store.getFreeCapacity<RESOURCE_ENERGY>() === 0;
	},
	transfer: ({ closestNotFullExtension, creep, spawn }) =>
	{
		return creep.transfer(closestNotFullExtension || spawn, RESOURCE_ENERGY) === OK;
	},
	'move to spawn': ({ closestNotFullExtension, creep, spawn }) =>
	{
		return creep.travelTo(closestNotFullExtension || spawn) === OK;
	},
};
