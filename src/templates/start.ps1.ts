import path from "path";
import { Project } from "../interfaces";
import { getBuildFolder, getExtensionFolder, replaceTemplateTokens, writeToFile } from "../utils";

interface Options {
	applicationhostConfigFilePath: string;
	webConfigFilePath: string;
	buildPath: string;
	appName: string;
}

export function create(project: Project, configuration: string) {
	const extensionFolder = getExtensionFolder();
	const options: Options = {
		webConfigFilePath: path.join(
			extensionFolder,
			configuration,
			"web.config"
		),
		applicationhostConfigFilePath: path.join(
			extensionFolder,
			configuration,
			"applicationhost.config"
		),
		buildPath: getBuildFolder(project, configuration),
		appName: project.name,
	};

	const data = replaceTemplateTokens(TEMPLATE, options as any);
	const filePath = path.join(extensionFolder, configuration, "start.ps1");

	writeToFile(filePath, data);
}

const TEMPLATE = `cp "#{webConfigFilePath}" "#{buildPath}\\web.config"

& "C:\\Program Files\\IIS Express\\iisexpress.exe" /config:"#{applicationhostConfigFilePath}" /site:"#{appName}" /apppool:"#{appName} AppPool" /trace:"warning"`;