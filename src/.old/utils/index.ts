import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import json5 from "json5";
import path from "path";
import * as vscode from "vscode";
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

export function getAppDotnetVersion(project: fs.Dirent): string {
	const content = fs.readFileSync(path.join(project.parentPath, project.name), { encoding: "utf8" });

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

export function getBuildFolder(project: fs.Dirent, configuration: string): string {
	return path.join(project.parentPath, 'bin', configuration, getAppDotnetVersion(project));
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

export function getLaunchSettings(project: fs.Dirent): LaunchSettings | undefined {
	const filePath = path.join(project.parentPath, 'Properties', 'launchSettings.json');
	if (!fs.existsSync(filePath)) return;

	const content = fs.readFileSync(filePath, { encoding: 'utf8' });
	if (!content) return;

	return json5.parse(content) as LaunchSettings;
}

export function getAppProjects(): fs.Dirent[] {
	const projects: fs.Dirent[] = [];

	const entries = fs.readdirSync(getAppFolder(), { withFileTypes: true, recursive: true });

	for (const entry of entries) {
		if (entry.isDirectory()) continue;
		if (!entry.name.endsWith(".csproj")) continue;

		projects.push(entry);
	}

	return projects;
}

export function getAvailableAspNetCoreEnvironments(project: fs.Dirent): string[] {
	const files = fs.readdirSync(project.parentPath, { withFileTypes: true });
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