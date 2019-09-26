// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
	[key: string]: any
	role: string
}

declare const __PROFILER_ENABLED__: boolean;

// `global` extension samples
declare namespace NodeJS {
	interface Global {
		log: any;
	}
}
