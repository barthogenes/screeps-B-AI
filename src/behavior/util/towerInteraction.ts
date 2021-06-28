export interface ITowerInteractionInfo {
	closestFullTower: StructureTower | null;
	closestEmptyTower: StructureTower | null;
	creep: Creep;
}

export interface ITowerInteractionImplementation {
	'move next to full tower': (info: ITowerInteractionInfo) => boolean;
	'move next to empty tower': (info: ITowerInteractionInfo) => boolean;
}

export const TowerInteractionImplementation: ITowerInteractionImplementation = {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	'move next to full tower': ({ creep, closestFullTower }) => creep.travelTo(closestFullTower!) === OK,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	'move next to empty tower': ({ creep, closestEmptyTower }) => creep.travelTo(closestEmptyTower!) === OK,
}
