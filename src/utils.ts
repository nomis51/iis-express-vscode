/* eslint-disable curly */
import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import json5 from "json5";
import path from "path";
import * as vscode from 'vscode';
import { DEFAULT_TARGET_FRAMEWORK, EXTENSION_FOLDER_NAME, VSCODE_FOLDER } from "./constants";
import { LaunchSettings, Project } from "./interfaces";

const TOKEN_TEMPLATE = "#{$0}";

export function replaceTemplateToken(template: string, token: string, value: string) {
	return template.replaceAll(TOKEN_TEMPLATE.replace("$0", token), value);
}

export function replaceTemplateTokens(template: string, tokens: { [key: string]: string }) {
	return Object.keys(tokens).reduce((acc, key) => replaceTemplateToken(acc, key, tokens[key]), template);
}

export function writeToFile(filePath: string, data: string) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, data, { encoding: 'utf8' });
}

export function getWorkspaceFolder(): string {
	return vscode.workspace.workspaceFolders![0].uri.fsPath;
}

export function getExtensionFolder(): string {
	return path.join(
		getWorkspaceFolder(),
		VSCODE_FOLDER,
		EXTENSION_FOLDER_NAME
	);
}

export function getProjectsPaths(): Project[] {
	const projects: Project[] = [];

	const entries = fs.readdirSync(getWorkspaceFolder(), { withFileTypes: true, recursive: true });
	for (const entry of entries) {
		if (entry.isDirectory()) continue;
		if (!entry.name.endsWith(".csproj")) continue;

		projects.push({
			name: entry.name.split('.')[0],
			path: entry.parentPath,
			csprojFilePath: path.join(entry.parentPath, entry.name),
			framework: "",
			env: "",
		});
	}

	return projects;
}

export function createExtensionFolder() {
	const folder = getExtensionFolder();

	if (fs.existsSync(folder)) {
		fs.rmSync(folder, { recursive: true });
	}

	fs.mkdirSync(folder, { recursive: true });
}

export function getLaunchSettings(projectPath: string): LaunchSettings | undefined {
	const filePath = path.join(projectPath, 'Properties', 'launchSettings.json');
	if (!fs.existsSync(filePath)) return;

	const content = fs.readFileSync(filePath, { encoding: 'utf8' });
	if (!content) return;

	return json5.parse(content) as LaunchSettings;
}

export function getBuildFolder(project: Project, configuration: string): string {
	return path.join(project.path, 'bin', configuration, project.framework!);
}

export function getDotnetVersion(project: Project): string {
	const content = fs.readFileSync(project.csprojFilePath, { encoding: "utf8" });

	const parser = new XMLParser();
	const json = parser.parse(content);
	if (!json) return DEFAULT_TARGET_FRAMEWORK;
	if (!json.Project) return DEFAULT_TARGET_FRAMEWORK;
	if (!json.Project.PropertyGroup) return DEFAULT_TARGET_FRAMEWORK;

	if (json.Project.PropertyGroup.length) {
		for (const p of json.Project.PropertyGroup) {
			if (p.TargetFramework) return p.TargetFramework;
		}

		return DEFAULT_TARGET_FRAMEWORK;
	} else {
		if (!json.Project.PropertyGroup.TargetFramework) return DEFAULT_TARGET_FRAMEWORK;
		return json.Project.PropertyGroup.TargetFramework;
	}
}

export function getAvailableAspNetCoreEnvironments(project: Project): string[] {
	const files = fs.readdirSync(project.path, { withFileTypes: true });
	const environments: string[] = [];

	for (const file of files) {
		if (!file.isFile()) continue;
		if (!file.name.startsWith('appsettings')) continue;
		if (!file.name.endsWith('.json')) continue;

		const parts = file.name.split('.');
		if (parts.length < 2) continue;

		const env = parts.slice(1);
		env.pop();
		if (env.length === 0) continue;

		environments.push(env.join('.'));
	}

	return environments;
}

export async function askAspNetCoreEnvironment(project: Project): Promise<string> {
	const environments = getAvailableAspNetCoreEnvironments(project);
	return (await vscode.window.showQuickPick(environments, {
		placeHolder: 'Select ASP.NET Core Environment',
		canPickMany: false,
		ignoreFocusOut: true,
		matchOnDescription: true,
		matchOnDetail: true,
		title: 'ASP.NET Core Environment'
	})) ?? "Development";
}

export function getTasksJsonPath(): string {
	return path.join(getWorkspaceFolder(), VSCODE_FOLDER, 'tasks.json');
}

export function getLaunchJsonPath(): string {
	return path.join(getWorkspaceFolder(), VSCODE_FOLDER, 'launch.json');
}