import { ITree } from 'behavior/ITree';
import { IUpgraderTreeImplementation, UpgraderInfo } from './IUpgraderTreeImplementation';

export class UpgraderTree {
	private creep: Creep;
	public constructor(creep: Creep) {
		this.creep = creep;
	}

	public getObject(): UpgraderInfo {
		return {
			creep: this.creep,
			spawn: this.creep.getSpawn(),
		};
	}

	public BuildOrGetEnergy(): ITree<UpgraderInfo, IUpgraderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				{
					type: 'sequence',
					childNodes: [
						'can I build?',
						this.Build()
					]
				},
				this.GrabEnergy()
			]
		};
	}

	public Build(): ITree<UpgraderInfo, IUpgraderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'build',
				'move to construction site'
			]
		};
	}

	public GrabEnergy(): ITree<UpgraderInfo, IUpgraderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'grab energy',
				'move to spawn'
			]
		};
	}
}

