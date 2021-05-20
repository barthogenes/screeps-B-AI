import { ITreeImplementation } from '../ITreeImplementation';

export interface UpgraderInfo {
	creep: Creep;
	spawn: StructureSpawn;
}

export interface IUpgraderTreeImplementation extends ITreeImplementation<UpgraderInfo> {
	'can I upgrade?': (info: UpgraderInfo) => boolean;
	'upgrade controller': (info: UpgraderInfo) => boolean;
	'move to controller': (info: UpgraderInfo) => boolean;
	'grab energy': (info: UpgraderInfo) => boolean;
	'move to spawn': (info: UpgraderInfo) => boolean;
}
