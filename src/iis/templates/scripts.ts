import fs from 'fs';
import path from 'path';
import { getApplicationHostConfigPath, getBuildFolder, getExtensionFolder } from '../../utils';

const STOP_IIS_EXPRESS_SCRIPT = 'Get-Process | Where-Object {$_.Path -Like "*iisexpress.exe*"} | Stop-Process -Force';

const START_IIS_EXPRESS_SCRIPT = `cp "#{extensionFolder}\\web.config" "#{buildPath}\\web.config"

& "C:\\Program Files\\IIS Express\\iisexpress.exe" /config:"#{configFilePath}" /site:"#{appName}" /apppool:"#{appName} AppPool" /trace:"warning"`

export function addStopIISExpressScript() {
	fs.writeFileSync(
		path.join(getExtensionFolder(), 'stop.ps1'),
		STOP_IIS_EXPRESS_SCRIPT,
		{ encoding: 'utf8' }
	);
}

export function addStartIISExpressScript(projectName: string) {
	fs.writeFileSync(
		path.join(getExtensionFolder(), 'start.ps1'),
		START_IIS_EXPRESS_SCRIPT
			.replace("#{extensionFolder}", getExtensionFolder())
			.replace("#{buildPath}", getBuildFolder(projectName, 'Debug'))
			.replace('#{configFilePath}', getApplicationHostConfigPath())
			.replaceAll('#{appName}', projectName),
		{ encoding: 'utf8' }
	);
}