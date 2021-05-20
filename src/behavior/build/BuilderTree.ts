import { ITree } from 'behavior/ITree';
import { BuilderInfo, IBuilderTreeImplementation } from './IBuilderTreeImplementation';

export class BuilderTree {
	private creep: Creep;
	public constructor(creep: Creep) {
		this.creep = creep;
	}

	public getObject(): BuilderInfo {
		return {
			creep: this.creep,
			constructionSite: this.creep.getConstructionSite(),
			spawn: this.creep.getSpawn(),
		};
	}

	public BuildOrGetEnergy(): ITree<BuilderInfo, IBuilderTreeImplementation> {
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

	public Build(): ITree<BuilderInfo, IBuilderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'build',
				'move to construction site'
			]
		};
	}

	public GrabEnergy(): ITree<BuilderInfo, IBuilderTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'grab energy',
				'move to spawn'
			]
		};
	}
}

