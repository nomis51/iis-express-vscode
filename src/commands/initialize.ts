import { OutputChannel } from "vscode";
import * as vscode from 'vscode';
import { createExtensionFolder, getAppProjectsNames } from "../utils";
import { createApplicationHostConfig, createWebConfig } from "../iis";
import { addBuildTasks, addIISExpressTasks } from "../iis/templates/tasks.json";
import { addLaunchConfig } from "../iis/templates/launch.json";
import { addStartIISExpressScript, addStopIISExpressScript } from "../iis/templates/scripts";

export async function invoke(channel: OutputChannel) {
	channel.show();

	try {
		const projects = getAppProjectsNames();
		const project = await vscode.window.showQuickPick(projects, {
			placeHolder: 'Select the starting project',
			canPickMany: false,
			ignoreFocusOut: true,
			matchOnDescription: true,
			matchOnDetail: true,
		});
		if (!project) {
			vscode.window.showErrorMessage('No project selected');
			channel.appendLine("Aborting initialization: No project selected");
			return;
		}

		createExtensionFolder();
		channel.appendLine("Extension folder created at .vscode/iis-express");

		createApplicationHostConfig(project!);
		channel.appendLine("IIS Express config file created at .vscode/iis-express/applicationhost.config");
		createWebConfig(project);
		channel.appendLine("IIS Express web.config file created at .vscode/iis-express/web.config");

		addStartIISExpressScript(project);
		channel.appendLine("IIS Express start script created at .vscode/iis-express/start.ps1");
		addStopIISExpressScript();
		channel.appendLine("IIS Express stop script created at .vscode/iis-express/stop.ps1");

		addBuildTasks();
		channel.appendLine("Build task added to tasks.json")
		addIISExpressTasks();
		channel.appendLine("IIS Express tasks added to tasks.json")

		addLaunchConfig();
		channel.appendLine("Launch config added to launch.json")

		vscode.window.showInformationMessage(`IIS Express initialized for '${project}'`);
	}
	catch (e) {
		channel.appendLine("Error: Failed to initialize IIS Express: " + e);
	}
}
