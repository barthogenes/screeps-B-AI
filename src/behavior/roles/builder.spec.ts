import { Run } from '../../runner/runner';
import { BuilderTree, BuilderTreeImplementation } from './builder';

describe('Builder', () => {
	it('builds constructionsite', () => {
		// Arrange
		const treeImpl: Partial<typeof BuilderTreeImplementation> = {
			'are there construction sites that can be build?': () => true,
			'can I build?': () => true,
			'build': () => true,
		};
		const gameObject = {};

		// Act
		const result = Run(BuilderTree, treeImpl as unknown as typeof BuilderTreeImplementation, gameObject);

		// Assert
		expect(result.success).toBe(true);
		expect(result.command).toStrictEqual('build');
	});

	it('upgrades controller if there are no construction sites', () => {
		// Arrange
		const treeImpl: Partial<typeof BuilderTreeImplementation> = {
			'are there construction sites that can be build?': () => false,
			'do I have energy with me?': () => true,
			'upgrade controller': () => true,
		};
		const gameObject = {};

		// Act
		const result = Run(BuilderTree, treeImpl as unknown as typeof BuilderTreeImplementation, gameObject);

		// Assert
		expect(result.success).toBe(true);
		expect(result.command).toStrictEqual('upgrade controller');
	});
});
