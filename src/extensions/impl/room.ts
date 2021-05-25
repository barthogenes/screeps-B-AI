import { GetCreepMemories } from 'utils/MemoryUtil';

Room.prototype.getAreaAroundPosition =  function (pos: RoomPosition, range: number, excludeSelfOptions?: { range: number }): LookForAtAreaResultArray<Terrain, LOOK_TERRAIN>
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
	return GetCreepMemories().reduce((prev, curr) => {
		if (curr.role === role)
			return prev + 1;

		return prev;
	}, 0)
}

Room.prototype.countCreepsAssignedToSource = (sourceID: Id<Source>) => {
	return GetCreepMemories().reduce((prev, curr) => {
		if (sourceID === curr.source)
			return prev + 1;

		return prev;
	}, 0)
}
