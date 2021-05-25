/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import { Execute } from '../../../src/runner/Runner';

describe('runner', () =>
{
	describe('Execute', () =>
	{
		it('should return result if a leaf is given', () =>
		{
			// Arrange
			const treeImpl = {
				'do something': (obj: { test: boolean }) => {
					obj.test = true;
					return true;
				}
			};
			const testObject = { test: false };

			// Act
			const result = Execute(treeImpl, testObject, 'do something');

			// Assert
			assert.isTrue(testObject.test);
			assert.isTrue(result.success);
			assert.strictEqual(result.command, 'do something');
		});
	});
});
