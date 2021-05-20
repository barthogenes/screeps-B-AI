import { ITree } from 'behavior/ITree';
import { ISpawnerTreeImplementation, SpawnerInfo } from './ISpawnerTreeImplementation';

export class SpawnerTree {
	private spawn: StructureSpawn;
	public constructor(spawn: StructureSpawn) {
		this.spawn = spawn;
	}

	public getObject(): SpawnerInfo {
		return {
			spawn: this.spawn
		};
	}

	public ShouldSpawn(): ITree<SpawnerInfo, ISpawnerTreeImplementation> {
		return {
			type: 'selector',
			childNodes: [
				'am I not already spawning something?',
				'move to construction site'
			]
		};
	}
}

