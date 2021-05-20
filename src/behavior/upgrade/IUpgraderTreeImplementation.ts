export interface IUpgraderInfo {
	creep: Creep;
	spawn: StructureSpawn;
}

export interface IUpgraderTreeImplementation {
	'can I upgrade?': (info: IUpgraderInfo) => boolean;
	'upgrade controller': (info: IUpgraderInfo) => boolean;
	'move to controller': (info: IUpgraderInfo) => boolean;
	'grab energy': (info: IUpgraderInfo) => boolean;
	'move to spawn': (info: IUpgraderInfo) => boolean;
}
