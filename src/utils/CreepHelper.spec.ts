import { GetAssignedSource } from './CreepHelper';

describe('CreepHelper', () => {
	describe('GetAssignedSource', () => {
		it('throws exception if no source was assigned', () => {
			expect(() => GetAssignedSource(undefined, jest.fn())).toThrowError('No Source was assigned to this creep!');
		});

		it('throws exception if the assigned source does not exist', () => {
			// Arrange
			const sourceId = 'Source10' as Id<Source>;
			const getSourceFn = jest.fn().mockReturnValue(null);

			// Act, Assert
			expect(() => GetAssignedSource(sourceId, getSourceFn)).toThrowError('Source not found!');
		});

		it('gets the assigned source', () => {
			// Arrange
			const sourceId = 'Source1' as Id<Source>;
			const getSourceFn = jest.fn().mockReturnValue({ id: 'Source1' });

			// Act
			const source = GetAssignedSource(sourceId, getSourceFn);

			// Assert
			expect(getSourceFn).toBeCalledWith('Source1');
			expect(source.id).toStrictEqual('Source1');
		});
	});
});
