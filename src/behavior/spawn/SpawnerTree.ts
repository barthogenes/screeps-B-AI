import { ITree } from 'behavior/ITree';
import { ISpawnerInfo, ISpawnerTreeImplementation } from './ISpawnerTreeImplementation';

export class SpawnerTree {
	private spawn: StructureSpawn;
	public constructor(spawn: StructureSpawn) {
		this.spawn = spawn;
	}

	public getObject(): ISpawnerInfo {
		return {
			spawn: this.spawn
		};
	}

	public ShouldSpawn(): ITree<ISpawnerInfo, ISpawnerTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'am I not already spawning something?',
				'spawn creeps'
			]
		};
	}
}

