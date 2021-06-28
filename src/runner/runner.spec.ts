import { Execute } from './runner';

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
			expect(testObject.test).toBe(true);
			expect(result.success).toBe(true);
			expect(result.command).toStrictEqual('do something');
		});
	});
});
