import { TreeNode } from 'runner/runner';
import { HarvesterInfo, IHarvester } from '../behaviors/impl/harvest';
import { ITree } from './ITree';


export class HarvesterTree implements ITree<HarvesterInfo, IHarvester>
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

	public getTree(): TreeNode<HarvesterInfo, IHarvester> {
		return this.HarvestOrBringBack();
	}

	public HarvestOrBringBack(): TreeNode<HarvesterInfo, IHarvester>
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

	public TryToHarvest(): TreeNode<HarvesterInfo, IHarvester>
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

	public TryToBringBack(): TreeNode<HarvesterInfo, IHarvester>
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
