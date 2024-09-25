import { replaceTemplateTokens } from ".";

interface WebConfigOptions {
  appName: string;
  buildPath: string;
  appId: string;
  windowsAuthentication: boolean;
  anonymousAuthentication: boolean;
  aspNetCoreEnvironment: string;
  configuration: string;
}

export function getTemplate(options: WebConfigOptions): string {
  return replaceTemplateTokens(WEB_CONFIG_TEMPLATE, options as any);
}

const WEB_CONFIG_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
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
<!--ProjectGuid: #{appId}-->`