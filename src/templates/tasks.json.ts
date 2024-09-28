import fs from 'fs';
import json5 from 'json5';
import path from 'path';
import { EXTENSION_FOLDER_NAME, START_SCRIPT_NAME, STOP_SCRIPT_NAME, VSCODE_FOLDER } from "../constants";
import { getTasksJsonPath } from '../utils';

export function createBuildTasks(configuration: string) {
	writeToTasksJson({
		...BUILD_TASK,
		label: BUILD_TASK.label + ` - ${configuration}`,
		args: [
			BUILD_TASK.args[0],
			BUILD_TASK.args[1].replace("#{configuration}", configuration),
		]
	});
}

export function createIISTasks(timeout: number, configuration: string) {
	writeToTasksJson({
		...DELAY_TASK,
		label: DELAY_TASK.label + ` - ${configuration}`,
		command: DELAY_TASK.command.replace("#{timeout}", timeout.toString()),
		dependsOn: [
			DELAY_TASK.dependsOn[0] + ` - ${configuration}`
		]
	});

	writeToTasksJson({
		...START_IIS_EXPRESS_TASK,
		label: START_IIS_EXPRESS_TASK.label + ` - ${configuration}`,
		command: START_IIS_EXPRESS_TASK.command.replace("#{configuration}", configuration),
		dependsOn: [
			START_IIS_EXPRESS_TASK.dependsOn[0] + ` - ${configuration}`
		]
	});
	writeToTasksJson({
		...STOP_IIS_EXPRESS_TASK,
		label: STOP_IIS_EXPRESS_TASK.label + ` - ${configuration}`,
		command: STOP_IIS_EXPRESS_TASK.command.replace("#{configuration}", configuration),
	});
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

const BUILD_TASK = {
	label: "build",
	type: "shell",
	command: "dotnet",
	args: [
		"build",
		"--configuration=#{configuration}",
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
	command: path.join("${workspaceFolder}", VSCODE_FOLDER, EXTENSION_FOLDER_NAME, "#{configuration}", START_SCRIPT_NAME),
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
	command: path.join("${workspaceFolder}", VSCODE_FOLDER, EXTENSION_FOLDER_NAME, "#{configuration}", STOP_SCRIPT_NAME),
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