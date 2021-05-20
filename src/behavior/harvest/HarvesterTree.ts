import { HarvesterInfo, IHarvesterTreeImplementation } from 'behavior/harvest/IHarvesterTreeImplementation';
import { ITree } from 'behavior/ITree';

export class HarvesterTree
{
	private creep: Creep;
	public constructor(creep: Creep)
	{
		this.creep = creep;
	}

	public getObject(): HarvesterInfo {
		return {
			creep: this.creep,
			source: this.creep.getAssignedSource(),
			spawn: this.creep.getSpawn(),
			closestNotFullExtension: this.creep.getClosestNotFullExtension()
		};
	}

	public HarvestOrBringBack(): ITree<HarvesterInfo, IHarvesterTreeImplementation>
	{
		return {
			type: 'selector',
			childNodes: [
				{
					type: 'sequence',
					childNodes: [
						'can I carry some more?',
						this.TryToHarvest()
					]
				},
				{
					type: 'sequence',
					childNodes: [
						'can I drop off my stuff at the spawn?',
						this.TryToBringBack()
					]
				}
			]
		};
	}

	public TryToHarvest(): ITree<HarvesterInfo, IHarvesterTreeImplementation>
	{
		return {
			type: 'selector',
			childNodes: [
				'am I next to my assigned source?',
				'harvest',
				'move to source'
			]
		};
	}

	public TryToBringBack(): ITree<HarvesterInfo, IHarvesterTreeImplementation>
	{
		return {
			type: 'selector',
			childNodes: [
				'transfer',
				'move to spawn'
			]
		};
	}
}

