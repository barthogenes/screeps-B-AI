
Creep.prototype.getAssignedSource = function () {
	if (!this.memory.source)
		throw new Error('No Source was assigned to this creep!');

	const source = Game.getObjectById<Source>(this.memory.source);
	if (!source)
		throw new Error('Source not found!');

	return source;
}

Creep.prototype.getSpawn = function () {
	const spawn = Game.getObjectById<StructureSpawn>(this.memory.spawn);
	if (!spawn)
		throw new Error('No spawn was assigned at creep creation!');

	return spawn;
}

Creep.prototype.travelToAndBuildRoad = function (destination: HasPos | RoomPosition, ops?: TravelToOptions)
{
	this.room.createConstructionSite(this.pos.x, this.pos.y, 'road');
	return this.travelTo(destination, ops);
}
