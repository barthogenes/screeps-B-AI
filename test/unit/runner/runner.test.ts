/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import Sinon from 'sinon';
import { TreeExecuter } from '../../../src/runner/runner';

describe('runner', () =>
{
	describe('Execute', () =>
	{
		it('is leaf should return result', () =>
		{
			// Arrange
			const treeExecuter = new TreeExecuter({}, {
				'do something': () => true
			});

			// Act
			const result = treeExecuter.Execute('do something');

			// Assert
			assert.isTrue(result.success);
			assert.strictEqual(result.command, 'do something');
		});
	});

	describe('Run', () =>
	{
		it('if leaf then should call Execute', () =>
		{
			// Arrange
			const treeExecuter = new TreeExecuter({}, {
				'do something': () => true
			});
			const stub = Sinon.stub(treeExecuter, 'Execute');

			// Act
			treeExecuter.Run('do something');

			// Assert
			assert.isTrue(stub.calledOnce);
		});
	});
});
