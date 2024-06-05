import path from "path";
import fs from "fs";
import * as vscode from "vscode";
import json5 from "json5";
import { XMLParser } from "fast-xml-parser";
import { LaunchSettings } from "../interfaces/launchSettings";

const DEFAULT_TARGET_FRAMEWORK = "net8.0";
const VSCODE_FOLDER = ".vscode";
export const EXTENSION_NAME = "iis-express";

export function createExtensionFolder() {
	const folder = getExtensionFolder();

	if (fs.existsSync(folder)) {
		fs.rmSync(folder, { recursive: true });
	}

	fs.mkdirSync(folder, { recursive: true });
}

export function getAppFolder(): string {
	return vscode.workspace.workspaceFolders![0].uri.fsPath;
}

export function getAppName(): string {
	return path.basename(getAppFolder());
}

export function getAppDotnetVersion(projectName: string): string {
	const csprojFilePath = getCsprojPath(projectName);
	if (!csprojFilePath) return DEFAULT_TARGET_FRAMEWORK;

	const content = fs.readFileSync(csprojFilePath, { encoding: "utf8" });

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

export function getBuildFolder(projectName: string, configuration: 'Debug' | 'Release'): string {
	return path.join(getAppFolder(), projectName, 'bin', configuration, getAppDotnetVersion(projectName));
}

export function getExtensionFolder(): string {
	return path.join(getAppFolder(), VSCODE_FOLDER, EXTENSION_NAME);
}

export function getTasksJsonPath(): string {
	return path.join(getAppFolder(), VSCODE_FOLDER, 'tasks.json');
}

export function getLaunchJsonPath(): string {
	return path.join(getAppFolder(), VSCODE_FOLDER, 'launch.json');
}

export function getApplicationHostConfigPath(): string {
	return path.join(getAppFolder(), VSCODE_FOLDER, EXTENSION_NAME, 'applicationhost.config');
}

export function getWebConfigPath(): string {
	return path.join(getAppFolder(), VSCODE_FOLDER, EXTENSION_NAME, 'web.config');
}

export function getLaunchSettings(projectName: string): LaunchSettings | undefined {
	const filePath = path.join(getAppFolder(), projectName, 'Properties', 'launchSettings.json');
	if (!fs.existsSync(filePath)) return;

	const content = fs.readFileSync(filePath, { encoding: 'utf8' });
	if (!content) return;

	return json5.parse(content) as LaunchSettings;
}

export function getCsprojPath(projectName: string): string | undefined {
	const projectPath = path.join(getAppFolder(), projectName);

	for (const file of fs.readdirSync(projectPath, { withFileTypes: true })) {
		if (!file.isFile()) continue;
		if (!file.name.endsWith('.csproj')) continue;

		return path.join(projectPath, file.name);
	}
}

export function getAppProjectsNames(): string[] {
	const folders = fs.readdirSync(getAppFolder(), { withFileTypes: true });

	const names = [];

	for (const folder of folders) {
		if (!folder.isDirectory()) continue;
		if (folder.name.startsWith('.')) continue;

		const files = fs.readdirSync(path.join(getAppFolder(), folder.name), { withFileTypes: true });
		if (!files.find((f: any) => f.isFile() && f.name.endsWith('.csproj'))) continue;

		names.push(folder.name);
	}

	return names;
}