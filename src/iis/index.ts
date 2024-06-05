import path from "path";
import * as vscode from 'vscode';
import { getTemplate as getApplicationhostConfigTemplate } from "./templates/applicationhost.config";
import { getTemplate as getWebConfigTemplate } from './templates/web.config';
import fs from "fs";
import { getAvailableAspNetCoreEnvironments, getBuildFolder, getExtensionFolder, getLaunchSettings } from '../utils';
import { v4 as uuid } from 'uuid';

export function createApplicationHostConfig(projectName: string) {
	const launchSettings = getLaunchSettings(projectName);
	const portParts = launchSettings?.iisSettings.iisExpress.applicationUrl.split(':') ?? [];

	const template = getApplicationhostConfigTemplate({
		appName: projectName,
		appPath: getBuildFolder(projectName, "Debug"),
		httpPort: launchSettings ? Number.parseInt(portParts[portParts.length - 1]) : 5000,
		httpsPort: launchSettings?.iisSettings.iisExpress.sslPort ?? 44389,
	});

	writeToConfigFolder('applicationhost.config', template);
}

export async function createWebConfig(projectName: string) {
	const launchSettings = getLaunchSettings(projectName);

	const environments = getAvailableAspNetCoreEnvironments(projectName);
	const env = await vscode.window.showQuickPick(environments, {
		placeHolder: 'Select ASP.NET Core Environment',
		canPickMany: false,
		ignoreFocusOut: true,
		matchOnDescription: true,
		matchOnDetail: true,
		title: 'ASP.NET Core Environment'
	});

	const template = getWebConfigTemplate({
		appName: projectName,
		buildPath: getBuildFolder(projectName, 'Debug'),
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