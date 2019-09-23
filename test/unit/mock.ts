export const Game: Game = {
	cpu: {
		bucket: 10000,
		limit: 20,
		getHeapStatistics() {
			return {
				total_heap_size: 1000,
				total_heap_size_executable: 1000,
				total_physical_size: 1000,
				total_available_size: 1000,
				used_heap_size: 1000,
				heap_size_limit: 1000,
				malloced_memory: 1000,
				peak_malloced_memory: 1000,
				does_zap_garbage: 1,
				externally_allocated_size: 1000
			};
		},
		getUsed() {
			return 0;
		},
		setShardLimits(limits) {
			return 0;
		},
		shardLimits: {},
		tickLimit: 20
	},
	creeps: {},
	flags: {},
	gcl: {} as GlobalControlLevel,
	gpl: {} as GlobalPowerLevel,
	map: {} as GameMap,
	market: {} as Market,
	powerCreeps: {},
	resources: {},
	rooms: {},
	spawns: {},
	structures: {},
	constructionSites: {},
	shard: {} as Shard,
	time: 12345,
	getObjectById<T>(id: string | undefined): T | null {
		return null;
	},
	notify(message, groupInterval?) {
		return undefined;
	}
};

export const Memory: Memory = {
	creeps: {},
	powerCreeps: {},
	flags: {},
	rooms: {},
	spawns: {}
};
