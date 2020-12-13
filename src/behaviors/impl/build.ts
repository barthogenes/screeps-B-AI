import { TreeLeaveDictionary, TreeNode } from 'runner/runner';

export type BuildTreeLeaves = ReturnType<typeof GetBuildTreeFunctions>;

export function BuildOrGetEnergy(): TreeNode<Creep, BuildTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			{
				type: 'sequence',
				childNodes: [
					'can I build?',
					Build()
				]
			},
			GrabEnergy()
		]
	};
}

function Build(): TreeNode<Creep, BuildTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			'build',
			'move to construction site'
		]
	};
}

function GrabEnergy(): TreeNode<Creep, BuildTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			'grab energy',
			'move to spawn'
		]
	};
}

export function GetBuildTreeFunctions(): TreeLeaveDictionary<Creep>
{
	return {
		'can I build?': (creep: Creep) => creep.store.energy !== 0,
		'build': (creep: Creep) =>
		{
			const constructionSiteId = creep.room.memory.constructionSiteToBuild;
			if (!constructionSiteId)
				return false;

			const constructionSite = Game.getObjectById(constructionSiteId);
			if (!constructionSite)
				return false;

			return creep.build(constructionSite) === OK;
		},
		'move to construction site': (creep: Creep) =>
		{
			const constructionSiteId = creep.room.memory.constructionSiteToBuild;
			if (!constructionSiteId)
				return false;

			const constructionSite = Game.getObjectById(constructionSiteId);
			if (!constructionSite)
				return false;

			return creep.travelTo(constructionSite) === OK;
		},
		'grab energy': (creep: Creep) =>
		{
			const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
			if (!spawn)
				return false;

			if (!spawn.memory.allowWithdraw)
				return false;

			return creep.withdraw(spawn, RESOURCE_ENERGY) === OK;
		},
		'move to spawn': (creep: Creep) =>
		{
			const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
			if (!spawn)
				return false;

			if (!spawn.memory.allowWithdraw)
				return false;

			return creep.travelTo(spawn) === OK;
		}
	};
}
