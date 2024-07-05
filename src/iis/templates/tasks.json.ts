import fs from 'fs';
import json5 from 'json5';
import { getTasksJsonPath } from "../../utils";

const BUILD_TASK = {
	label: "build",
	type: "shell",
	command: "dotnet",
	args: [
		"build",
		"--configuration=Debug",
	],
	presentation: {
		reveal: "always",
		clear: true,
		showReuseMessage: false
	}
};
const START_IIS_EXPRESS_TASK = {
	label: "Start IIS Express",
	type: "shell",
	command: "${workspaceFolder}/.vscode/iis-express/start.ps1",
	isBackground: true,
	problemMatcher: {
		pattern: {
			regexp: ""
		},
		background: {
			activeOnStart: true,
			beginsPattern: ".",
			endsPattern: "IIS Express is running"
		}
	},
	presentation: {
		reveal: "always",
		clear: true
	},
	dependsOn: [
		"build"
	]
};
const STOP_IIS_EXPRESS_TASK = {
	label: "Stop IIS Express",
	type: "shell",
	command: "${workspaceFolder}/.vscode/iis-express/stop.ps1",
	presentation: {
		reveal: "silent",
		clear: true,
		showReuseMessage: false
	}
};
const DELAY_TASK = {
	label: "Wait for IIS Express",
	type: "shell",
	command: "timeout #{timeout}",
	presentation: {
		reveal: "silent",
		clear: true,
		close: true,
		focus: false,
		echo: false
	},
	dependsOn: [
		"Start IIS Express"
	]
};

const DEFAULT_TASKS_JSON_CONTENT = {
	version: "2.0.0",
	tasks: []
};

export function addBuildTasks() {
	writeToTasksJson(BUILD_TASK);
}

export function addIISExpressTasks(timeout: number = 1) {
	writeToTasksJson({
		...DELAY_TASK,
		command: DELAY_TASK.command.replace("#{timeout}", timeout.toString())
	});
	writeToTasksJson(START_IIS_EXPRESS_TASK);
	writeToTasksJson(STOP_IIS_EXPRESS_TASK);
}

function writeToTasksJson(task: any) {
	const tasksJsonPath = getTasksJsonPath();

	if (!fs.existsSync(tasksJsonPath)) {
		fs.writeFileSync(tasksJsonPath, json5.stringify(DEFAULT_TASKS_JSON_CONTENT, null, 2), { encoding: 'utf8' });
	}

	const content = fs.readFileSync(tasksJsonPath, "utf8");
	const json = json5.parse(content);
	const index = json.tasks.findIndex((t: any) => t.label === task.label);

	if (index === -1) {
		json.tasks.push(task);
	} else {
		json.tasks[index] = task;
	}
	fs.writeFileSync(tasksJsonPath, JSON.stringify(json, null, 2), { encoding: "utf8" });
}