/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert } from 'chai';
import { BuildList, GetBuildList } from '../../../src/utils/RoomInfo';
import { Game, Memory } from '../mock';

describe('RoomInfo', () =>
{
	beforeEach(() =>
	{
		// @ts-ignore
		global.Game = _.clone(Game);
		// @ts-ignore
		global.Memory = _.clone(Memory);
	});

	describe('GetBuildList', () =>
	{
		const controllerLevels: [number, BuildList][] = [
			[
				0,
				{
					Containers: 5,
					Spawns: 0,
					Extensions: 0,
					Labs: 0,
					Towers: 0,
					Links: 0,
					Walls: false,
					Ramparts: false,
					Storage: false,
					Extractor: false,
					Terminal: false,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				1,
				{
					Containers: 5,
					Spawns: 1,
					Extensions: 0,
					Labs: 0,
					Towers: 0,
					Links: 0,
					Walls: false,
					Ramparts: false,
					Storage: false,
					Extractor: false,
					Terminal: false,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				2,
				{
					Containers: 5,
					Spawns: 1,
					Extensions: 5,
					Labs: 0,
					Towers: 0,
					Links: 0,
					Walls: true,
					Ramparts: true,
					Storage: false,
					Extractor: false,
					Terminal: false,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				3,
				{
					Containers: 5,
					Spawns: 1,
					Extensions: 10,
					Labs: 0,
					Towers: 1,
					Links: 0,
					Walls: true,
					Ramparts: true,
					Storage: false,
					Extractor: false,
					Terminal: false,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				4,
				{
					Containers: 5,
					Spawns: 1,
					Extensions: 20,
					Labs: 0,
					Towers: 1,
					Links: 0,
					Walls: true,
					Ramparts: true,
					Storage: true,
					Extractor: false,
					Terminal: false,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				5,
				{
					Containers: 5,
					Spawns: 1,
					Extensions: 30,
					Labs: 0,
					Towers: 2,
					Links: 2,
					Walls: true,
					Ramparts: true,
					Storage: true,
					Extractor: false,
					Terminal: false,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				6,
				{
					Containers: 5,
					Spawns: 1,
					Extensions: 40,
					Labs: 3,
					Towers: 2,
					Links: 3,
					Walls: true,
					Ramparts: true,
					Storage: true,
					Extractor: true,
					Terminal: true,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				7,
				{
					Containers: 5,
					Spawns: 2,
					Extensions: 50,
					Labs: 6,
					Towers: 3,
					Links: 4,
					Walls: true,
					Ramparts: true,
					Storage: true,
					Extractor: true,
					Terminal: true,
					Observer: false,
					PowerSpawn: false
				}
			],
			[
				8,
				{
					Containers: 5,
					Spawns: 3,
					Extensions: 60,
					Labs: 10,
					Towers: 6,
					Links: 6,
					Walls: true,
					Ramparts: true,
					Storage: true,
					Extractor: true,
					Terminal: true,
					Observer: true,
					PowerSpawn: true
				}
			]];

		controllerLevels.forEach((list) =>
		{
			it(`should return build list for level ${list[0]}`, () =>
			{
				// Arrange
				const controllerLevel = list[0];
				const expectedBuildList = list[1];

				// Act
				const buildListForCurrentLevel = GetBuildList(controllerLevel);

				// Assert
				assert.deepEqual(buildListForCurrentLevel, expectedBuildList);
			});
		});
	});
});
