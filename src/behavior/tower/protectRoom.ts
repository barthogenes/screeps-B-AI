export const ProtectRoom = (tower: StructureTower): void => {
	if (tower.store.energy === 0)
		return;

	const hostileCreep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if (!hostileCreep)
		return;

	tower.attack(hostileCreep);
}
