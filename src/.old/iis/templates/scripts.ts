import fs from 'fs';
import path from 'path';
import { getApplicationHostConfigPath, getBuildFolder, getExtensionFolder } from '../../utils';

const STOP_IIS_EXPRESS_SCRIPT = 'Get-Process | Where-Object {$_.Path -Like "*iisexpress.exe*"} | Stop-Process -Force';

const START_IIS_EXPRESS_SCRIPT = `cp "#{extensionFolder}\\web.config" "#{buildPath}\\web.config"

& "C:\\Program Files\\IIS Express\\iisexpress.exe" /config:"#{configFilePath}" /site:"#{appName}" /apppool:"#{appName} AppPool" /trace:"warning"`;

export function addStopIISExpressScript() {
	fs.writeFileSync(
		path.join(getExtensionFolder(), 'stop.ps1'),
		STOP_IIS_EXPRESS_SCRIPT,
		{ encoding: 'utf8' }
	);
}

export function addStartIISExpressScript(project: fs.Dirent, configuration: string) {
	fs.writeFileSync(
		path.join(getExtensionFolder(), configuration, 'start.ps1'),
		START_IIS_EXPRESS_SCRIPT
			.replace("#{extensionFolder}", getExtensionFolder())
			.replace("#{buildPath}", getBuildFolder(project, configuration))
			.replace('#{configFilePath}', getApplicationHostConfigPath())
			.replace('#{appName}', project.name.split('.')[0]),
		{ encoding: 'utf8' }
	);
}