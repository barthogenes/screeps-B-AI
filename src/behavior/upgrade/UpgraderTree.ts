import { ITree } from 'behavior/ITree';
import { IUpgraderInfo, IUpgraderTreeImplementation } from './IUpgraderTreeImplementation';

export class UpgraderTree {
	private creep: Creep;
	public constructor(creep: Creep) {
		this.creep = creep;
	}

	public getObject(): IUpgraderInfo {
		return {
			creep: this.creep,
			spawn: this.creep.getSpawn(),
		};
	}

	public UpgradeOrGetEnergy(): ITree<IUpgraderInfo, IUpgraderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				{
					type: 'sequence',
					childNodes: [
						'can I upgrade?',
						this.UpgradeController()
					]
				},
				this.GrabEnergy()
			]
		};
	}

	public UpgradeController(): ITree<IUpgraderInfo, IUpgraderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'upgrade controller',
				'move to controller'
			]
		};
	}

	public GrabEnergy(): ITree<IUpgraderInfo, IUpgraderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'grab energy',
				'move to spawn'
			]
		};
	}
}

