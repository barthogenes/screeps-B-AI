/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import { HarvesterTreeLeaves, HarvestOrBringBack } from '../../../src/behaviortrees/harvest';
import { Run } from '../../../src/runner/runner';
import { Game, Memory } from '../mock';

describe('harvest', () =>
{
	beforeEach(() =>
	{
		// @ts-ignore
		global.Game = _.clone(Game);
		// @ts-ignore
		global.Memory = _.clone(Memory);
	});

	describe('HarvestOrBringBack', () =>
	{
		it('should return false', () =>
		{
			// Arrange
			const harvesterTreeFunctions: HarvesterTreeLeaves = {
				'can I carry some more?': (creep: Creep) => false,
				'can I drop off my stuff at the spawn?': (creep: Creep) => false
			} as HarvesterTreeLeaves;

			// Act
			const result = Run({} as Creep, harvesterTreeFunctions, HarvestOrBringBack());


			// Assert
			assert.isFalse(result.success);
			assert.strictEqual(result.command, 'can I drop off my stuff at the spawn?');
		});

		it('should return true', () =>
		{
			// Arrange
			const harvesterTreeFunctions: HarvesterTreeLeaves = {
				'can I carry some more?': (creep: Creep) => true,
				'harvest': (creep: Creep) => false,
				'move to source': (creep: Creep) => true,
			} as HarvesterTreeLeaves;

			// Act
			const result = Run({} as Creep, harvesterTreeFunctions, HarvestOrBringBack());


			// Assert
			assert.isTrue(result.success);
			assert.strictEqual(result.command, 'move to source');
		});
	});
});
