/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import { HarvesterTree } from '../../../src/behavior/harvest/HarvesterTree';
import { HarvesterInfo, IHarvesterTreeImplementation } from '../../../src/behavior/harvest/IHarvesterTreeImplementation';
import { TreeExecuter } from '../../../src/runner/runner';
import { Game, Memory } from '../mock';

describe('harvest', () => {
	beforeEach(() => {
		// @ts-ignore
		global.Game = _.clone(Game);
		// @ts-ignore
		global.Memory = _.clone(Memory);
	});

	describe('HarvestOrBringBack', () => {
		it('should return false', () => {
			// Arrange
			const tree = new HarvesterTree({} as Creep);
			const treeExecuter = new TreeExecuter(
				{} as HarvesterInfo,
				{
					'can I carry some more?': (info: HarvesterInfo) => false,
					'can I drop off my stuff at the spawn?': (info: HarvesterInfo) => false
				} as IHarvesterTreeImplementation
			);

			// Act
			const result = treeExecuter.Run(tree.HarvestOrBringBack());

			// Assert
			assert.isFalse(result.success);
			assert.strictEqual(result.command, 'can I drop off my stuff at the spawn?');
		});

		it('should return true', () => {
			// Arrange
			const tree = new HarvesterTree({} as Creep);
			const treeExecuter = new TreeExecuter(
				{} as HarvesterInfo,
				{
					'can I carry some more?': (_info: HarvesterInfo) => true,
					'try to harvest': (_info: HarvesterInfo) => false,
					'move to source': (_info: HarvesterInfo) => true,
				} as IHarvesterTreeImplementation
			);

			// Act
			const result = treeExecuter.Run(tree.HarvestOrBringBack());

			// Assert
			assert.isTrue(result.success);
			assert.strictEqual(result.command, 'move to source');
		});
	});
});
