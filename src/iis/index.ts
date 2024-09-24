import fs from "fs";
import path from "path";
import { v4 as uuid } from 'uuid';
import * as vscode from 'vscode';
import { getAvailableAspNetCoreEnvironments, getBuildFolder, getExtensionFolder, getLaunchSettings } from '../utils';
import { getTemplate as getApplicationhostConfigTemplate } from "./templates/applicationhost.config";
import { getTemplate as getWebConfigTemplate } from './templates/web.config';

export function createApplicationHostConfig(project: fs.Dirent) {
	const launchSettings = getLaunchSettings(project);
	const portParts = launchSettings?.iisSettings.iisExpress.applicationUrl.split(':') ?? [];

	const template = getApplicationhostConfigTemplate({
		appName: project.name.split('.')[0],
		appPath: getBuildFolder(project, "Debug"),
		httpPort: launchSettings ? Number.parseInt(portParts[portParts.length - 1]) : 5000,
		httpsPort: launchSettings?.iisSettings.iisExpress.sslPort ?? 44389,
	});

	writeToConfigFolder('applicationhost.config', template);
}

export async function createWebConfig(project: fs.Dirent) {
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
		buildPath: getBuildFolder(project, 'Debug'),
		appId: uuid(),
		windowsAuthentication: launchSettings?.iisSettings.windowsAuthentication ?? false,
		anonymousAuthentication: launchSettings?.iisSettings.anonymousAuthentication ?? false,
		aspNetCoreEnvironment: !env ? 'Development' : env
	});

	writeToConfigFolder("web.config", template);
}

function writeToConfigFolder(filename: string, content: string) {
	const filePath = path.join(getExtensionFolder(), filename);
	fs.writeFileSync(filePath, Buffer.from(content));
}