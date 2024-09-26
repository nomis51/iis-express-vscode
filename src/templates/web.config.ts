import path from "path";
import { v4 as uuid } from 'uuid';
import { LaunchSettings, Project } from "../interfaces";
import { getBuildFolder, getExtensionFolder, replaceTemplateTokens, writeToFile } from "../utils";

interface Options {
	appName: string;
	buildPath: string;
	appId: string;
	windowsAuthentication: boolean;
	anonymousAuthentication: boolean;
	aspNetCoreEnvironment: string;
	configuration: string;
}

export function create(project: Project, launchSettings: LaunchSettings, configuration: string) {
	const options: Options = {
		appName: project.name,
		buildPath: getBuildFolder(project, configuration),
		appId: uuid(),
		windowsAuthentication: launchSettings.iisSettings.windowsAuthentication,
		anonymousAuthentication: launchSettings.iisSettings.anonymousAuthentication,
		aspNetCoreEnvironment: project.env,
		configuration,
	};

	const data = replaceTemplateTokens(TEMPLATE, options as any);
	const filePath = path.join(getExtensionFolder(), options.configuration, "web.config");

	writeToFile(filePath, data);
}

const TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <security>
        <authentication>
          <anonymousAuthentication enabled="#{anonymousAuthentication}" />
          <windowsAuthentication enabled="#{windowsAuthentication}" />
        </authentication>
      </security>
      <handlers>
	    <remove name="aspNetCore" />
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments="#{buildPath}\\#{appName}.dll" stdoutLogEnabled="true" stdoutLogFile="#{buildPath}\\.iis-express\\logs\\" hostingModel="inprocess">
        <environmentVariables>
          <environmentVariable name="ASPNETCORE_ENVIRONMENT" value="#{aspNetCoreEnvironment}" />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
<!--ProjectGuid: #{appId}-->`;