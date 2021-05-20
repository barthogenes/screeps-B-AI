/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import { Execute } from '../../../src/runner/runner';

describe('runner', () =>
{
	describe('Execute', () =>
	{
		it('is leaf should return result', () =>
		{
			// Arrange, Act
			const result = Execute({
				'do something': () => true
			}, {}, 'do something');

			// Assert
			assert.isTrue(result.success);
			assert.strictEqual(result.command, 'do something');
		});
	});
});
