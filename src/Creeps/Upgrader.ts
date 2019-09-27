import { BehaviorTreeBuilder, BehaviorTreeStatus } from 'fluent-behavior-tree';

const buildTree = () => {
	const builder = new BehaviorTreeBuilder();
	return builder
		.selector('upgrade or get from spawner?')
			.sequence('get from spawner')
				.condition('do I need energy?', (t) => {
					debugger;
					const creep: Creep = t.state;
					return creep.carry.energy === 0;
				})
				.do('find spawn', (t) => {
					debugger;
					const creep: Creep = t.state;
					const spawns = creep.room.find(FIND_STRUCTURES, {
						filter: (structure: StructureSpawn) => {
							return structure.structureType === STRUCTURE_SPAWN && structure.energy < structure.energyCapacity;
						}
					});
					if (spawns.length) {
						creep.memory.spawn = spawns[0].id;
						return BehaviorTreeStatus.Success;
					}
					return BehaviorTreeStatus.Failure;
				})
				.selector('try filling up my energy')
					.do('withdraw', (t) => {
						debugger;
						const creep: Creep = t.state;
						const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
						const withdrawSuccess = creep.withdraw(spawn!, RESOURCE_ENERGY) !== ERR_NOT_IN_RANGE;
						return withdrawSuccess ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure;
					})
					.do('move to spawn', (t) => {
						debugger;
						const creep: Creep = t.state;
						const spawn = Game.getObjectById<StructureSpawn>(creep.memory.spawn);
						creep.say('🔄 get from spawner');
						creep.moveTo(spawn!, { visualizePathStyle: { stroke: '#ffaa00' } });
						return BehaviorTreeStatus.Success;
					})
				.end()
			.end()
			.selector('try upgrading')
				.do('upgrade', (t) => {
					debugger;
					const creep: Creep = t.state;
					const upgradeSuccess = creep.upgradeController(creep.room.controller!) !== ERR_NOT_IN_RANGE;
					return upgradeSuccess ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure;
				})
				.do('move to controller', (t) => {
					debugger;
					const creep: Creep = t.state;
					creep.say('⚡ upgrade');
					creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#ffffff' } });
					return BehaviorTreeStatus.Success;
				})
			.end()
		.end()
		.build();
};

export const upgrader = buildTree();
