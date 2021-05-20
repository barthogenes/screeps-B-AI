/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import { HarvesterTree } from '../../../src/behavior/harvest/HarvesterTree';
import { IHarvesterTreeImplementation } from '../../../src/behavior/harvest/IHarvesterTreeImplementation';
import { Run } from '../../../src/runner/runner';
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
			const treeImpl = {
				'can I carry some more?': () => false,
				'can I drop off my stuff at the spawn?': () => false
			}  as unknown as IHarvesterTreeImplementation;
			const gameObject = {};

			// Act
			const result = Run(tree.HarvestOrBringBack(), treeImpl, gameObject);

			// Assert
			assert.isFalse(result.success);
			assert.strictEqual(result.command, 'can I drop off my stuff at the spawn?');
		});

		it('should return true', () => {
			// Arrange
			const tree = new HarvesterTree({} as Creep);
			const treeImpl = {
				'can I carry some more?': () => true,
				'try to harvest': () => false,
				'move to source': () => true,
			} as unknown as IHarvesterTreeImplementation;
			const gameObject = {};

			// Act
			const result = Run(tree.HarvestOrBringBack(), treeImpl, gameObject);

			// Assert
			assert.isTrue(result.success);
			assert.strictEqual(result.command, 'move to source');
		});
	});
});
