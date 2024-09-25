import fs from "fs";
import path from "path";
import { v4 as uuid } from 'uuid';
import * as vscode from 'vscode';
import { getAvailableAspNetCoreEnvironments, getBuildFolder, getExtensionFolder, getLaunchSettings } from '../utils';
import { getTemplate as getApplicationhostConfigTemplate } from "./templates/applicationhost.config";
import { getTemplate as getWebConfigTemplate } from './templates/web.config';

export function createApplicationHostConfig(project: fs.Dirent, configuration: string) {
	const launchSettings = getLaunchSettings(project);
	const portParts = launchSettings?.iisSettings.iisExpress.applicationUrl.split(':') ?? [];

	const template = getApplicationhostConfigTemplate({
		appName: project.name.split('.')[0],
		appPath: getBuildFolder(project, configuration),
		httpPort: launchSettings ? Number.parseInt(portParts[portParts.length - 1]) : 5000,
		httpsPort: launchSettings?.iisSettings.iisExpress.sslPort ?? 44389,
		configuration
	});

	writeToConfigFolder(`applicationhost.config`, template, configuration);
}

export async function createWebConfig(project: fs.Dirent, configuration: string) {
	const launchSettings = getLaunchSettings(project);

	const environments = getAvailableAspNetCoreEnvironments(project);
	const env = await vscode.window.showQuickPick(environments, {
		placeHolder: 'Select ASP.NET Core Environment',
		canPickMany: false,
		ignoreFocusOut: true,
		matchOnDescription: true,
		matchOnDetail: true,
		title: 'ASP.NET Core Environment'
	});

	const template = getWebConfigTemplate({
		appName: project.name.split('.')[0],
		buildPath: getBuildFolder(project, configuration),
		appId: uuid(),
		windowsAuthentication: launchSettings?.iisSettings.windowsAuthentication ?? false,
		anonymousAuthentication: launchSettings?.iisSettings.anonymousAuthentication ?? false,
		aspNetCoreEnvironment: !env ? 'Development' : env,
		configuration
	});

	writeToConfigFolder("web.config", template, configuration);
}

function writeToConfigFolder(filename: string, content: string, configuration: string | undefined = undefined) {
	const filePath = path.join(getExtensionFolder(), configuration ?? '', filename);
	fs.writeFileSync(filePath, Buffer.from(content));
}