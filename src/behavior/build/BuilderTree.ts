import { ITree } from 'behavior/ITree';
import { IBuilderInfo, IBuilderTreeImplementation } from './IBuilderTreeImplementation';

export class BuilderTree {
	private creep: Creep;
	public constructor(creep: Creep) {
		this.creep = creep;
	}

	public getObject(): IBuilderInfo {
		return {
			creep: this.creep,
			constructionSite: this.creep.getConstructionSite(),
			spawn: this.creep.getSpawn(),
		};
	}

	public BuildOrGetEnergy(): ITree<IBuilderInfo, IBuilderTreeImplementation> {
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

	public Build(): ITree<IBuilderInfo, IBuilderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'build',
				'move to construction site'
			]
		};
	}

	public GrabEnergy(): ITree<IBuilderInfo, IBuilderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'grab energy',
				'move to spawn'
			]
		};
	}
}

