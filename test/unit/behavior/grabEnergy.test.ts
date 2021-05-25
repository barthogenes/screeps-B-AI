/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GrabEnergy, GrabEnergyImplementation } from 'behavior/util/grabEnergy';
import { assert } from 'chai';
import { Run } from '../../../src/runner/Runner';
import { Game, Memory } from '../mock';

describe('GrabEnergy', () => {
	beforeEach(() => {
		// @ts-ignore
		global.Game = _.clone(Game);
		// @ts-ignore
		global.Memory = _.clone(Memory);
	});

	it('is next to spawn', () => {
		// Arrange
		const treeImpl: Partial<typeof GrabEnergyImplementation> = {
			'am I allowed to grab energy?': () => true,
			'grab energy': () => true
		};
		const gameObject = {};

		// Act
		const result = Run(GrabEnergy, treeImpl as unknown as typeof GrabEnergyImplementation, gameObject);

		// Assert
		assert.isTrue(result.success);
		assert.strictEqual(result.command, 'grab energy');
	});

	it('should stay 3 spaces away if it is not allowed to grab energy', () => {
		// Arrange
		const treeImpl: Partial<typeof GrabEnergyImplementation > = {
			'am I allowed to grab energy?': () => false,
			'move to somewhere away from spawn': () => true
		};
		const gameObject = {};

		// Act
		const result = Run(GrabEnergy, treeImpl as unknown as typeof GrabEnergyImplementation, gameObject);

		// Assert
		assert.isTrue(result.success);
		assert.strictEqual(result.command, 'move to somewhere away from spawn');
	});
});
