import path from "path";
import { getTemplate as getApplicationhostConfigTemplate } from "./templates/applicationhost.config";
import { getTemplate as getWebConfigTemplate } from './templates/web.config';
import fs from "fs";
import { getAppFolder, getBuildFolder, getExtensionFolder, getLaunchSettings } from '../utils';
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

export function createWebConfig(projectName: string) {
	const launchSettings = getLaunchSettings(projectName);

	const template = getWebConfigTemplate({
		appName: projectName,
		buildPath: getBuildFolder(projectName, 'Debug'),
		appId: uuid(),
		windowsAuthentication: launchSettings?.iisSettings.windowsAuthentication ?? false,
		anonymousAuthentication: launchSettings?.iisSettings.anonymousAuthentication ?? false
	});

	writeToConfigFolder("web.config", template);
}

function writeToConfigFolder(filename: string, content: string) {
	const filePath = path.join(getExtensionFolder(), filename);
	fs.writeFileSync(filePath, Buffer.from(content));
}