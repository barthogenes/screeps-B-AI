/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BuilderTree, BuilderTreeImplementation } from 'behavior/roles/builder';
import { assert } from 'chai';
import { Run } from '../../../src/runner/Runner';
import { Game, Memory } from '../mock';

describe('Builder', () => {
	beforeEach(() => {
		// @ts-ignore
		global.Game = _.clone(Game);
		// @ts-ignore
		global.Memory = _.clone(Memory);
	});

	it('builds constructionsite', () => {
		// Arrange
		const treeImpl: Partial<typeof BuilderTreeImplementation> = {
			'are there construction sites that can be build?': () => true,
			'build': () => true,
		};
		const gameObject = {};

		// Act
		const result = Run(BuilderTree, treeImpl as unknown as typeof BuilderTreeImplementation, gameObject);

		// Assert
		assert.isTrue(result.success);
		assert.strictEqual(result.command, 'build');
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
		assert.isTrue(result.success);
		assert.strictEqual(result.command, 'upgrade controller');
	});
});
