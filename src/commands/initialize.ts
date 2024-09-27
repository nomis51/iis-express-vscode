import * as vscode from "vscode";
import { EXTENSION_FOLDER_NAME, EXTENSION_NAME, VSCODE_FOLDER } from "../constants";
import { create as createApplicationHostConfig } from "../templates/applicationhost.config";
import { create as createLaunchJson } from "../templates/launch.json";
import { create as createStartScript } from "../templates/start.ps1";
import { create as createStopScript } from '../templates/stop.ps1';
import { createBuildTasks, createIISTasks } from "../templates/tasks.json";
import { create as createWebConfig } from "../templates/web.config";
import { askAspNetCoreEnvironment, createExtensionFolder, getDotnetVersion, getLaunchSettings, getProjectsPaths as getProjects } from "../utils";

export async function invoke(channel: vscode.OutputChannel) {
	channel.show();

	try {
		const projects = getProjects();
		const projectName = await vscode.window.showQuickPick(projects.map(e => e.name), {
			title: 'Starting project',
			placeHolder: 'Select the starting project',
			canPickMany: false,
			ignoreFocusOut: true,
			matchOnDescription: true,
			matchOnDetail: true
		});
		if (!projectName) {
			vscode.window.showErrorMessage('No project selected');
			channel.appendLine("Aborting initialization: No project selected");
			return;
		}

		const project = projects.find(p => p.name === projectName)!;
		const launchSettings = getLaunchSettings(project.path);
		if (!launchSettings) {
			vscode.window.showErrorMessage('No launch settings found');
			channel.appendLine("Aborting initialization: No launch settings found");
			return;
		}

		project.framework = getDotnetVersion(project);
		project.env = await askAspNetCoreEnvironment(project);

		const timeoutStr = await vscode.window.showInputBox({
			title: "Delay before attaching to process",
			placeHolder: "Delay before attaching to process",
			value: "1",
		});

		const timeout = parseInt(timeoutStr ?? "1");

		createExtensionFolder();
		channel.appendLine(`Extension folder created at ${VSCODE_FOLDER}/${EXTENSION_FOLDER_NAME}`);

		for (const configuration of ["Debug", "Release"]) {
			channel.appendLine(`Creating config for '${configuration}'...`);

			createWebConfig(project, launchSettings, configuration);
			channel.appendLine(`web.config file created at ${VSCODE_FOLDER}/${EXTENSION_FOLDER_NAME}/${configuration}/web.config`);

			createApplicationHostConfig(project, launchSettings, configuration);
			channel.appendLine(`applicationhost.config file created at .vscode/${EXTENSION_FOLDER_NAME}/${configuration}/applicationhost.config`);

			createStartScript(project, configuration);
			createStopScript(configuration);
			channel.appendLine(`Scripts created at ${VSCODE_FOLDER}/${EXTENSION_FOLDER_NAME}/${configuration}/`);

			createBuildTasks(configuration);
			channel.appendLine("Build task added to tasks.json");

			createIISTasks(isNaN(timeout) || timeout < 1 ? 1 : timeout, configuration);
			channel.appendLine("Tasks added to tasks.json");

			createLaunchJson(configuration);
			channel.appendLine("Configs added to launch.json");
		}

		vscode.window.showInformationMessage(`IIS Express initialized for '${projectName}'`);
	}
	catch (e) {
		channel.appendLine(`Error: Failed to initialize ${EXTENSION_NAME}: ` + e);
	}
}