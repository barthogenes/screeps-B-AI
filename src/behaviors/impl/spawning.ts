import { Run, TreeLeaveDictionary, TreeNode } from 'runner/runner';
import { GetHarvesterBodyParts } from 'utils/BodyPartsInfo';
import { GetCreepData } from 'utils/CreepInfo';
import { GetBuildList, GetExtensionsCountInRoom, GetRandomPositionInAreaAroundObject, GetSourcesInRoom } from 'utils/RoomInfo';

export type SpawnerTreeLeaves = ReturnType<typeof GetSpawnerTreeFunctions>;

function ShouldSpawn(): TreeNode<StructureSpawn, SpawnerTreeLeaves>
{
	return {
		type: 'selector',
		childNodes: [
			'am I not already spawning something?',
			'move to construction site'
		]
	};
}

export function GetSpawnerTreeFunctions(): TreeLeaveDictionary<StructureSpawn>
{
	return {
		'am I not already spawning something?': (spawn: StructureSpawn) => !spawn.spawning,

		'spawn creeps': (spawn: StructureSpawn) =>
		{
			if (spawn.spawning)
			{
				return true;
			}

			spawn.memory.allowWithdraw = spawn.store.energy > 200;

			spawn.room.memory.constructionSiteToBuild = spawn.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES)?.id;

			const sources = GetSourcesInRoom(spawn.room);
			const creepData = GetCreepData(sources);

			const sourceId = creepData.HarvestersPerSource.find((s) => s.creepCount < 3)?.sourceId;
			if (sourceId)
			{
				const bodyParts = GetHarvesterBodyParts(spawn.room);
				spawn.spawnCreep(bodyParts, `creep${Game.time}`, {
					memory: {
						role: 'harvester',
						source: sourceId,
						spawn: spawn.id
					}
				});
				return true;
			}

			if (GetExtensionsCountInRoom(spawn.room) < GetBuildList(spawn.room.controller?.level).Extensions)
			{
				const randomPoint = GetRandomPositionInAreaAroundObject(spawn, 3);
				return spawn.room.createConstructionSite(randomPoint.x, randomPoint.y, 'extension') === OK;
			}

			if (creepData.CreepRoleCounts.builder < 1)
			{
				spawn.spawnCreep([WORK, CARRY, MOVE], `creep${Game.time}`, {
					memory: {
						role: 'builder',
						spawn: spawn.id
					}
				});
				return true;
			}

			if (creepData.CreepRoleCounts.upgrader < 3)
			{
				spawn.spawnCreep([WORK, CARRY, MOVE], `creep${Game.time}`, {
					memory: {
						role: 'upgrader',
						spawn: spawn.id
					}
				});
				return true;
			}

			return true;
		},
	};
}

export function RunSpawnTree(spawn: StructureSpawn): { success: boolean, command: string }
{
	return Run(spawn, GetSpawnerTreeFunctions(), ShouldSpawn());
}
