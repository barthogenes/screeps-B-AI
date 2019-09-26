import { BehaviorTreeBuilder, BehaviorTreeStatus } from 'fluent-behavior-tree';

class HarvesterTreeBuilder {
	public buildTree() {
		const builder = new BehaviorTreeBuilder();
		const tree = builder
			.selector('harvest or bring back?')
			.sequence('harvesting')
			.do('can I carry some more?', (t) => {
				const creep: Creep = t.state;
				console.log('can I carry some more?');
				return creep.carry.energy < creep.carryCapacity ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure;
			})
			.do('find harvest source', (t) => {
				const creep: Creep = t.state;
				console.log('find harvest source');
				const sources = creep.room.find(FIND_SOURCES);
				if (sources.length) {
					creep.memory.source = sources[0].id;
					return BehaviorTreeStatus.Success;
				}
				return BehaviorTreeStatus.Failure;
			})
			.selector('try harvesting')
			.do('harvest', (t) => {
				const creep: Creep = t.state;
				console.log('harvest');
				const source = Game.getObjectById<Source>(creep.memory.source);
				const harvestSuccess = creep.harvest(source!) !== ERR_NOT_IN_RANGE;
				return harvestSuccess ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure;
			})
			.do('move to source', (t) => {
				const creep: Creep = t.state;
				console.log('move to source');
				const source = Game.getObjectById<Source>(creep.memory.source);
				creep.moveTo(source!, { visualizePathStyle: { stroke: '#ffaa00' } });
				return BehaviorTreeStatus.Success;
			})
			.end()
			.end()
			.sequence('bring back')
			.do('find spawn', (t) => {
				const creep: Creep = t.state;
				console.log('find spawn');
				const spawns = creep.room.find(FIND_STRUCTURES, {
					filter: (structure: StructureSpawn) => {
						return structure.structureType === STRUCTURE_SPAWN;
					}
				});
				if (spawns.length) {
					creep.memory.spawn = spawns[0].id;
					return BehaviorTreeStatus.Success;
				}
				return BehaviorTreeStatus.Failure;
			})
			.selector('try bringing back')
			.do('transfer', (t) => {
				const creep: Creep = t.state;
				console.log('transfer');
				const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
				const transferSuccess = creep.transfer(spawn!, RESOURCE_ENERGY) !== ERR_NOT_IN_RANGE;
				return transferSuccess ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure;
			})
			.do('move to spawn', (t) => {
				const creep: Creep = t.state;
				console.log('move to spawn');
				const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
				creep.moveTo(spawn!, { visualizePathStyle: { stroke: '#ffffff' } });
				return BehaviorTreeStatus.Success;
			})
			.end()
			.end()
			.end()
			.build();
		return tree;
	}
}

export const harvester = new HarvesterTreeBuilder().buildTree();
