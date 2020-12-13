import { TreeLeaveDictionary } from 'runner/runner';

export interface HarvesterInfo
{
	creep: Creep;
	source: Source;
	spawn: StructureSpawn;
	closestNotFullExtension: StructureExtension | null;
}

export interface IHarvester extends TreeLeaveDictionary<HarvesterInfo>
{
	'can I carry some more?': (info: HarvesterInfo) => boolean;
	'am I next to my assigned source?': (info: HarvesterInfo) => boolean;
	'try to harvest': (info: HarvesterInfo) => boolean;
	'move to source': (info: HarvesterInfo) => boolean;
	'can I drop off my stuff at the spawn?': (info: HarvesterInfo) => boolean;
	'transfer': (info: HarvesterInfo) => boolean;
	'move to spawn': (info: HarvesterInfo) => boolean;
}


export const Harvester: IHarvester =
{
	'can I carry some more?': ({ creep }) =>
	{
		return creep.store.energy < creep.store.getCapacity();
	},
	'am I next to my assigned source?': ({ creep, source }) =>
	{
		return creep.pos.isNearTo(source);
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
	}
};

