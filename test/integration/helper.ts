const { readFileSync } = require('fs');
const _ = require('lodash');
const { ScreepsServer, stdHooks } = require('screeps-server-mockup');
const DIST_MAIN_JS = 'dist/main.js';

interface Server {
	[key: string]: any;
	tick(): Promise<void>;
	world: World;
}

interface World {
	[key: string]: any;
	gameTime: Promise<number>;
	getTerrain(roomName: string): TerrainMatrix;
	setTerrain(roomName: string): void;
	roomObjects(roomName: string): object[];
}

interface TerrainMatrix {
	get(x: number, y: number): Terrain;
	set(x: number, y: number, value: Terrain): TerrainMatrix;
}

interface User {
	[key: string]: any;
	id: Promise<string>;
	username: Promise<string>;
	cpu: Promise<number>;
	cpuAvailable: Promise<number>;
	gcl: Promise<number>;
	rooms: Promise<string[]>;
	lastUsedCpu: Promise<number>;
	memory: Promise<string>;
	notifications: Promise<Notification[]>;
	newNotifications: Promise<Notification[]>;
	activeSegments: Promise<object>;

	/*
	Return the content of user segments based on @list (the list of segments, ie: [0, 1, 2]).
	*/
	getSegments(list: number[]): object[];

	/*
		Set a new console command to run next tick
	*/
	console(cmd: string): Promise<object>;

	/*
	*	Return the current value of the requested user data
	*/
	getData(name: string): object;
}

interface Notification {
	message: string;
	type: string;
	date: Date;
	count: number;
	_id: string;
}

/*
 * Helper class for creating a ScreepsServer and resetting it between tests.
 * See https://github.com/Hiryus/screeps-server-mockup for instructions on
 * manipulating the terrain and game state.
 */
class IntegrationTestHelper {
	private _server?: Server;
	private _player?: User;

	get server() {
		return this._server;
	}

	get player() {
		return this._player;
	}

	public async beforeEach() {
		this._server = new ScreepsServer();

		// reset world but add invaders and source keepers bots
		await this._server!.world.reset();

		// create a stub world composed of 9 rooms with sources and controller
		await this._server!.world.stubWorld();

		// add a player with the built dist/main.js file
		const modules = {
			main: readFileSync(DIST_MAIN_JS).toString()
		};
		this._player = await this._server!.world.addBot({ username: 'player', room: 'W0N1', x: 15, y: 15, modules });

		// Start server
		await this._server!.start();
	}

	public async afterEach() {
		await this._server!.stop();
	}
}

beforeEach(async () => {
	await helper.beforeEach();
});

afterEach(async () => {
	await helper.afterEach();
});

before(() => {
	stdHooks.hookWrite();
});

after(() => {
	process.exit();
});

export const helper = new IntegrationTestHelper();
