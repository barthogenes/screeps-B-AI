import { GetAssignedSource, GetSpawn } from 'utils/CreepHelper';

Creep.prototype.getAssignedSource = function () {
	return GetAssignedSource(this.memory.source, (id: Id<Source>) => Game.getObjectById<Id<Source>>(id))
}

Creep.prototype.getSpawn = function () {
	return GetSpawn(this.memory.spawn, (id: Id<StructureSpawn>) => Game.getObjectById<Id<StructureSpawn>>(id))
}
