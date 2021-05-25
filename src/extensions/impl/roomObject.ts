
RoomObject.prototype.getFreeAdjacentSpacesCount = function () {
	if (!this.room)
		return 0;

	return this.room.getAreaAroundPosition(this.pos, 1).filter((x) => x.terrain !== 'wall').length;
}
