import profiler from 'screeps-profiler';

class ProfilerUtils {
	constructor() {
		if (!!__PROFILER_ENABLED__) {
			profiler.enable();
		}
	}

	public profile() {
		if (!!__PROFILER_ENABLED__ && Game.time === 10) {
			Game.profiler.profile(30);
		}
	}
}

export const profilerUtils = new ProfilerUtils();
