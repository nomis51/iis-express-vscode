import * as vscode from "vscode";
import { EXTENSION_FOLDER_NAME, EXTENSION_NAME } from "../constants";
import { create as createApplicationHostConfig } from "../templates/applicationhost.config";
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

		createExtensionFolder();
		channel.appendLine(`Extension folder created at .vscode/${EXTENSION_FOLDER_NAME}`);

		for (const configuration of ["Debug", "Release"]) {
			channel.appendLine(`Creating IIS Express config for '${configuration}'...`);

			createWebConfig(project, launchSettings, configuration);
			createApplicationHostConfig(project, launchSettings, configuration);
		}

		vscode.window.showInformationMessage(`IIS Express initialized for '${projectName}'`);
	}
	catch (e) {
		channel.appendLine(`Error: Failed to initialize ${EXTENSION_NAME}: ` + e);
	}
}