import fs from 'fs';
import json5 from 'json5';
import { getLaunchJsonPath } from '../utils';

export function create(configuration: string) {
	writeToLaunchJson({
		...ATTACH_PROCESS_LAUNCH_TASK,
		name: ATTACH_PROCESS_LAUNCH_TASK.name + ` ${configuration}`,
		preLaunchTask: ATTACH_PROCESS_LAUNCH_TASK.preLaunchTask + ` ${configuration}`,
		postDebugTask: ATTACH_PROCESS_LAUNCH_TASK.postDebugTask + ` ${configuration}`,
	});
}

function writeToLaunchJson(config: any) {
	const launchJsonPath = getLaunchJsonPath();

	if (!fs.existsSync(launchJsonPath)) {
		fs.writeFileSync(launchJsonPath, json5.stringify(DEFAULT_LAUNCH_JSON_CONTENT, null, 2), { encoding: 'utf8' });
	}

	const content = fs.readFileSync(launchJsonPath, "utf8");
	const json = json5.parse(content);
	const index = json.configurations.findIndex((l: any) => l.name === config.name);

	if (index === -1) {
		json.configurations.push(config);
	} else {
		json.configurations[index] = config;
	}
	fs.writeFileSync(launchJsonPath, JSON.stringify(json, null, 2), { encoding: "utf8" });
}

const ATTACH_PROCESS_LAUNCH_TASK = {
	name: "Start IIS Express",
	type: "coreclr",
	request: "attach",
	processName: "iisexpress.exe",
	preLaunchTask: "Wait for IIS Express",
	postDebugTask: "Stop IIS Express",
};

const DEFAULT_LAUNCH_JSON_CONTENT = {
	version: "0.2.0",
	configurations: []
};