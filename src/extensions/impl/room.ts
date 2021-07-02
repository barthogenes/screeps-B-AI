import { GetCreepMemories } from 'utils/MemoryUtil';

Room.prototype.getAreaAroundPosition = function (pos: RoomPosition, range: number, excludeSelfOptions?: { range: number }): LookForAtAreaResultArray<Terrain, LOOK_TERRAIN>
{
	const area = this.lookForAtArea(
		LOOK_TERRAIN,
		pos.y - range,
		pos.x - range,
		pos.y + range,
		pos.x + range,
		true
	);

	if (excludeSelfOptions) {
		const excludeArea = this.getAreaAroundPosition(pos, excludeSelfOptions.range);
		return area.filter(position => {
			return excludeArea.findIndex(p => p.x === position.x && p.y === position.y) === -1;
		})
	}

	return area
}

Room.prototype.countCreepsWithRole = (role: CreepRole) => {
	return GetCreepMemories().reduce((count, creepMemory) => {
		if (creepMemory.role === role)
			return count + 1;

		return count;
	}, 0)
}

Room.prototype.countCreepsAssignedToSource = (sourceID: Id<Source>) => {
	return GetCreepMemories().reduce((count, creepMemory) => {
		if (creepMemory.source === sourceID)
			return count + 1;

		return count;
	}, 0)
}
