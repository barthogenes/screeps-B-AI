import { Run } from '../../runner/runner';
import { GrabEnergy, GrabEnergyImplementation } from './grabEnergy';

describe('GrabEnergy', () => {
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
		expect(result.success).toBe(true);
		expect(result.command).toStrictEqual('grab energy');
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
		expect(result.success).toBe(true);
		expect(result.command).toStrictEqual('move to somewhere away from spawn');
	});
});
