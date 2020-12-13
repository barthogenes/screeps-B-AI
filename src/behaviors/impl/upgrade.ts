import { TreeLeaveDictionary, TreeNode } from 'runner/runner';

export type UpgradeTreeLeaves = ReturnType<typeof GetUpgradeTreeFunctions>;

export function UpgradeOrGetEnergy(): TreeNode<Creep, UpgradeTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			{
				type: 'sequence',
				childNodes: [
					'can I upgrade?',
					UpgradeController()
				]
			},
			GrabEnergy()
		]
	};
}

function UpgradeController(): TreeNode<Creep, UpgradeTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			'upgrade controller',
			'move to controller'
		]
	};
}

function GrabEnergy(): TreeNode<Creep, UpgradeTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			'grab energy',
			'move to spawn'
		]
	};
}

export function GetUpgradeTreeFunctions(): TreeLeaveDictionary<Creep>
{
	return {
		'can I upgrade?': (creep: Creep) => creep.store.energy !== 0,
		'upgrade controller': (creep: Creep) =>
		{
			if (!creep.room.controller)
				return false;

			return creep.upgradeController(creep.room.controller) === OK;
		},
		'move to controller': (creep: Creep) =>
		{
			if (!creep.room.controller)
				return false;

			return creep.travelTo(creep.room.controller) === OK;
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
		},
	};
}
