declare module 'screeps-server-mockup'
{
	class ScreepsServer {
		world: any;
		start(): void;
		tick(): void;
		stop(): void;
	}

	const stdHooks: {
		hookWrite(): void
	}

	class User {
		console: (message: string) => void
		memory: any
	}
}
