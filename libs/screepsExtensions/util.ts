import { isExtension } from './TypeGuards';

Creep.prototype.getAssignedSource = function ()
{
	if (!this.memory.source)
		throw new Error('No Source was assigned to this creep!');

	const source = Game.getObjectById<Source>(this.memory.source);
	if (!source)
		throw new Error('Source not found!');

	return source;
}

Creep.prototype.getSpawn = function ()
{
	const spawn = Game.getObjectById<StructureSpawn>(this.memory.spawn);
	if (!spawn)
		throw new Error('No spawn was assigned at creep creation!');

	return spawn;
}

Creep.prototype.getClosestNotFullExtension = function ()
{
	const extension = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
		filter: (s) => s.structureType === 'extension' && s.store.getFreeCapacity('energy') > 0
	});

	if (!extension)
		return null;

	if (!isExtension(extension))
		return null;

	return extension;
}
