import * as vscode from 'vscode';
import { OutputChannel } from "vscode";
import { createApplicationHostConfig, createWebConfig } from "../iis";
import { addLaunchConfig } from "../iis/templates/launch.json";
import { addStartIISExpressScript, addStopIISExpressScript } from "../iis/templates/scripts";
import { addBuildTasks, addIISExpressTasks } from "../iis/templates/tasks.json";
import { EXTENSION_NAME, createExtensionFolder, getAppProjects } from "../utils";

export async function invoke(channel: OutputChannel) {
	channel.show();

	try {
		const projects = getAppProjects();
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
		createExtensionFolder();
		channel.appendLine(`Extension folder created at .vscode/${EXTENSION_NAME}`);

		for (const configuration of ["Debug", "Release"]) {
			channel.appendLine(`Creating IIS Express config for '${configuration}'...`);
			createApplicationHostConfig(project, configuration);
			channel.appendLine(`IIS Express config file created at .vscode/${EXTENSION_NAME}/applicationhost.config`);
			await createWebConfig(project, configuration);
			channel.appendLine(`IIS Express web.config file created at .vscode/${EXTENSION_NAME}/web.config`);

			addStartIISExpressScript(project, configuration);
			channel.appendLine(`IIS Express start script created at .vscode/${EXTENSION_NAME}/start.ps1`);
			addStopIISExpressScript();
			channel.appendLine(`IIS Express stop script created at .vscode/${EXTENSION_NAME}/stop.ps1`);

			addBuildTasks(configuration);
			channel.appendLine("Build task added to tasks.json");
		}

		const timeoutStr = await vscode.window.showInputBox({
			title: "Delay before attaching to process",
			placeHolder: "Delay before attaching to process",
			value: "1",
		});

		const timeout = parseInt(timeoutStr ?? "1");

		addIISExpressTasks(isNaN(timeout) ? 1 : timeout);
		channel.appendLine("IIS Express tasks added to tasks.json");

		addLaunchConfig();
		channel.appendLine("Launch config added to launch.json");

		vscode.window.showInformationMessage(`IIS Express initialized for '${projectName}'`);
	}
	catch (e) {
		channel.appendLine("Error: Failed to initialize IIS Express: " + e);
	}
}
