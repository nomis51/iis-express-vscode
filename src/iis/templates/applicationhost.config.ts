import path from "path";
import { replaceTemplateTokens } from ".";
import { getExtensionFolder } from "../../utils";

interface ApplicationHostConfigOptions {
  appName: string;
  appPath: string;
  httpPort: number;
  httpsPort: number;
}

export function getTemplate(options: ApplicationHostConfigOptions): string {
  return replaceTemplateTokens(APPLICATIONHOST_CONFIG_TEMPLATE, options as any);
}

export const APPLICATIONHOST_CONFIG_FILEPATH = path.join(getExtensionFolder(), 'applicationhost.config');

const APPLICATIONHOST_CONFIG_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<!--

    IIS configuration sections.

    For schema documentation, see
    %IIS_BIN%\\config\\schema\\IIS_schema.xml.

    Please make a backup of this file before making any changes to it.

    NOTE: The following environment variables are available to be used
          within this file and are understood by the IIS Express.

          %IIS_USER_HOME% - The IIS Express home directory for the user
          %IIS_SITES_HOME% - The default home directory for sites
          %IIS_BIN% - The location of the IIS Express binaries
          %SYSTEMDRIVE% - The drive letter of %IIS_BIN%

-->
<configuration>
  <!--

        The <configSections> section controls the registration of sections.
        Section is the basic unit of deployment, locking, searching and
        containment for configuration settings.

        Every section belongs to one section group.
        A section group is a container of logically-related sections.

        Sections cannot be nested.
        Section groups may be nested.

        <section
            name=""  [Required, Collection Key] [XML name of the section]
            allowDefinition="Everywhere" [MachineOnly|MachineToApplication|AppHostOnly|Everywhere] [Level where it can be set]
            overrideModeDefault="Allow"  [Allow|Deny] [Default delegation mode]
            allowLocation="true"  [true|false] [Allowed in location tags]
        />

        The recommended way to unlock sections is by using a location tag:
        <location path="Default Web Site" overrideMode="Allow">
            <system.webServer>
                <asp />
            </system.webServer>
        </location>

    -->
  <configSections>
    <sectionGroup name="system.applicationHost">
      <section name="applicationPools" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="configHistory" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="customMetadata" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="listenerAdapters" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="log" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="serviceAutoStartProviders" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="sites" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="webLimits" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
    </sectionGroup>
    <sectionGroup name="system.webServer">
      <section name="asp" overrideModeDefault="Deny" />
      <section name="caching" overrideModeDefault="Allow" />
      <section name="cgi" overrideModeDefault="Deny" />
      <section name="defaultDocument" overrideModeDefault="Allow" />
      <section name="directoryBrowse" overrideModeDefault="Allow" />
      <section name="fastCgi" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="globalModules" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
      <section name="handlers" overrideModeDefault="Deny" />
      <section name="httpCompression" overrideModeDefault="Allow" allowDefinition="Everywhere" />
      <section name="httpErrors" overrideModeDefault="Allow" />
      <section name="httpLogging" overrideModeDefault="Deny" />
      <section name="httpProtocol" overrideModeDefault="Allow" />
      <section name="httpRedirect" overrideModeDefault="Allow" />
      <section name="httpTracing" overrideModeDefault="Deny" />
      <section name="isapiFilters" allowDefinition="MachineToApplication" overrideModeDefault="Deny" />
      <section name="modules" allowDefinition="MachineToApplication" overrideModeDefault="Deny" />
      <section name="applicationInitialization" allowDefinition="MachineToApplication" overrideModeDefault="Allow" />
      <section name="odbcLogging" overrideModeDefault="Deny" />
      <sectionGroup name="security">
        <section name="access" overrideModeDefault="Deny" />
        <section name="applicationDependencies" overrideModeDefault="Deny" />
        <sectionGroup name="authentication">
          <section name="anonymousAuthentication" overrideModeDefault="Allow" />
          <section name="basicAuthentication" overrideModeDefault="Deny" />
          <section name="clientCertificateMappingAuthentication" overrideModeDefault="Deny" />
          <section name="digestAuthentication" overrideModeDefault="Deny" />
          <section name="iisClientCertificateMappingAuthentication" overrideModeDefault="Deny" />
          <section name="windowsAuthentication" overrideModeDefault="Allow" />
        </sectionGroup>
        <section name="authorization" overrideModeDefault="Allow" />
        <section name="ipSecurity" overrideModeDefault="Deny" />
        <section name="dynamicIpSecurity" overrideModeDefault="Deny" />
        <section name="isapiCgiRestriction" allowDefinition="AppHostOnly" overrideModeDefault="Deny" />
        <section name="requestFiltering" overrideModeDefault="Allow" />
      </sectionGroup>
      <section name="serverRuntime" overrideModeDefault="Deny" />
      <section name="serverSideInclude" overrideModeDefault="Deny" />
      <section name="staticContent" overrideModeDefault="Allow" />
      <sectionGroup name="tracing">
        <section name="traceFailedRequests" overrideModeDefault="Allow" />
        <section name="traceProviderDefinitions" overrideModeDefault="Deny" />
      </sectionGroup>
      <section name="urlCompression" overrideModeDefault="Allow" />
      <section name="validation" overrideModeDefault="Allow" />
      <sectionGroup name="webdav">
        <section name="globalSettings" overrideModeDefault="Deny" />
        <section name="authoring" overrideModeDefault="Deny" />
        <section name="authoringRules" overrideModeDefault="Deny" />
      </sectionGroup>
      <sectionGroup name="rewrite">
        <section name="allowedServerVariables" overrideModeDefault="Deny" />
        <section name="rules" overrideModeDefault="Allow" />
        <section name="outboundRules" overrideModeDefault="Allow" />
        <section name="globalRules" overrideModeDefault="Deny" allowDefinition="AppHostOnly" />
        <section name="providers" overrideModeDefault="Allow" />
        <section name="rewriteMaps" overrideModeDefault="Allow" />
      </sectionGroup>
      <section name="webSocket" overrideModeDefault="Deny" />
      <section name="aspNetCore" overrideModeDefault="Allow" />
    </sectionGroup>
  </configSections>
  <configProtectedData>
    <providers>
      <add name="IISWASOnlyRsaProvider" type="" description="Uses RsaCryptoServiceProvider to encrypt and decrypt" keyContainerName="iisWasKey" cspProviderName="" useMachineContainer="true" useOAEP="false" />
    </providers>
  </configProtectedData>
  <system.applicationHost>
    <applicationPools>
      <add name="Clr4IntegratedAppPool" managedRuntimeVersion="v4.0" managedPipelineMode="Integrated" CLRConfigFile="%IIS_USER_HOME%\\config\\aspnet.config" autoStart="true" />
      <add name="Clr4ClassicAppPool" managedRuntimeVersion="v4.0" managedPipelineMode="Classic" CLRConfigFile="%IIS_USER_HOME%\\config\\aspnet.config" autoStart="true" />
      <add name="Clr2IntegratedAppPool" managedRuntimeVersion="v2.0" managedPipelineMode="Integrated" CLRConfigFile="%IIS_USER_HOME%\\config\\aspnet.config" autoStart="true" />
      <add name="Clr2ClassicAppPool" managedRuntimeVersion="v2.0" managedPipelineMode="Classic" CLRConfigFile="%IIS_USER_HOME%\\config\\aspnet.config" autoStart="true" />
      <add name="UnmanagedClassicAppPool" managedRuntimeVersion="" managedPipelineMode="Classic" autoStart="true" />
      <applicationPoolDefaults managedRuntimeVersion="v4.0">
        <processModel loadUserProfile="true" setProfileEnvironment="false" />
      </applicationPoolDefaults>
      <add name="#{appName} AppPool" managedRuntimeVersion="" />
    </applicationPools>
    <!--

          The <listenerAdapters> section defines the protocols with which the
          Windows Process Activation Service (WAS) binds.

        -->
    <listenerAdapters>
      <add name="http" />
    </listenerAdapters>
    <sites>
    <siteDefaults>
        <!-- To enable logging, please change the below attribute "enabled" to "true" -->
        <logFile logFormat="W3C" directory="%AppData%\\Microsoft\\IISExpressLogs" enabled="false" />
        <traceFailedRequestsLogging directory="%AppData%\\Microsoft" enabled="false" maxLogFileSizeKB="1024" />
      </siteDefaults>
      <applicationDefaults applicationPool="Clr4IntegratedAppPool" />
      <virtualDirectoryDefaults allowSubDirConfig="true" />
      <site name="#{appName}" id="1">
        <application path="/" applicationPool="#{appName} AppPool">
          <virtualDirectory path="/" physicalPath="#{appPath}" />
        </application>
        <bindings>
          <binding protocol="http" bindingInformation="*:#{httpPort}:localhost" />
          <binding protocol="https" bindingInformation="*:#{httpsPort}:localhost" />
        </bindings>
      </site>
    </sites>
    <webLimits />
  </system.applicationHost>
  <system.webServer>
    <serverRuntime />
    <asp scriptErrorSentToBrowser="true">
      <cache diskTemplateCacheDirectory="%TEMP%\\iisexpress\\ASP Compiled Templates" />
      <limits />
    </asp>
    <caching enabled="true" enableKernelCache="true"></caching>
    <cgi />
    <defaultDocument enabled="true">
      <files>
        <add value="Default.htm" />
        <add value="Default.asp" />
        <add value="index.htm" />
        <add value="index.html" />
        <add value="iisstart.htm" />
        <add value="default.aspx" />
      </files>
    </defaultDocument>
    <directoryBrowse enabled="false" />
    <fastCgi />
    <!--

          The <globalModules> section defines all native-code modules.
          To enable a module, specify it in the <modules> section.

        -->
    <globalModules>
      <add name="HttpLoggingModule" image="%IIS_BIN%\\loghttp.dll" />
      <add name="UriCacheModule" image="%IIS_BIN%\\cachuri.dll" />
      <add name="TokenCacheModule" image="%IIS_BIN%\\cachtokn.dll" />
      <add name="DynamicCompressionModule" image="%IIS_BIN%\\compdyn.dll" />
      <add name="StaticCompressionModule" image="%IIS_BIN%\\compstat.dll" />
      <add name="DefaultDocumentModule" image="%IIS_BIN%\\defdoc.dll" />
      <add name="DirectoryListingModule" image="%IIS_BIN%\\dirlist.dll" />
      <add name="ProtocolSupportModule" image="%IIS_BIN%\\protsup.dll" />
      <add name="HttpRedirectionModule" image="%IIS_BIN%\\redirect.dll" />
      <add name="ServerSideIncludeModule" image="%IIS_BIN%\\iis_ssi.dll" />
      <add name="StaticFileModule" image="%IIS_BIN%\\static.dll" />
      <add name="AnonymousAuthenticationModule" image="%IIS_BIN%\\authanon.dll" />
      <add name="CertificateMappingAuthenticationModule" image="%IIS_BIN%\\authcert.dll" />
      <add name="UrlAuthorizationModule" image="%IIS_BIN%\\urlauthz.dll" />
      <add name="BasicAuthenticationModule" image="%IIS_BIN%\\authbas.dll" />
      <add name="WindowsAuthenticationModule" image="%IIS_BIN%\\authsspi.dll" />
      <add name="IISCertificateMappingAuthenticationModule" image="%IIS_BIN%\\authmap.dll" />
      <add name="IpRestrictionModule" image="%IIS_BIN%\\iprestr.dll" />
      <add name="DynamicIpRestrictionModule" image="%IIS_BIN%\\diprestr.dll" />
      <add name="RequestFilteringModule" image="%IIS_BIN%\\modrqflt.dll" />
      <add name="CustomLoggingModule" image="%IIS_BIN%\\logcust.dll" />
      <add name="CustomErrorModule" image="%IIS_BIN%\\custerr.dll" />
      <add name="FailedRequestsTracingModule" image="%IIS_BIN%\\iisfreb.dll" />
      <add name="RequestMonitorModule" image="%IIS_BIN%\\iisreqs.dll" />
      <add name="IsapiModule" image="%IIS_BIN%\\isapi.dll" />
      <add name="IsapiFilterModule" image="%IIS_BIN%\\filter.dll" />
      <add name="CgiModule" image="%IIS_BIN%\\cgi.dll" />
      <add name="FastCgiModule" image="%IIS_BIN%\\iisfcgi.dll" />
      <!--            <add name="WebDAVModule" image="%IIS_BIN%\\webdav.dll" /> -->
      <add name="RewriteModule" image="%IIS_BIN%\\rewrite.dll" />
      <add name="ConfigurationValidationModule" image="%IIS_BIN%\\validcfg.dll" />
      <add name="WebSocketModule" image="%IIS_BIN%\\iiswsock.dll" />
      <add name="WebMatrixSupportModule" image="%IIS_BIN%\\webmatrixsup.dll" />
      <add name="ManagedEngine" image="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\webengine.dll" preCondition="integratedMode,runtimeVersionv2.0,bitness32" />
      <add name="ManagedEngine64" image="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\webengine.dll" preCondition="integratedMode,runtimeVersionv2.0,bitness64" />
      <add name="ManagedEngineV4.0_32bit" image="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\webengine4.dll" preCondition="integratedMode,runtimeVersionv4.0,bitness32" />
      <add name="ManagedEngineV4.0_64bit" image="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\webengine4.dll" preCondition="integratedMode,runtimeVersionv4.0,bitness64" />
      <add name="ApplicationInitializationModule" image="%IIS_BIN%\\warmup.dll" />
      <add name="AspNetCoreModule" image="%IIS_BIN%\\aspnetcore.dll" />
      <add name="AspNetCoreModuleV2" image="%IIS_BIN%\\Asp.Net Core Module\\V2\\aspnetcorev2.dll" />
    </globalModules>
    <httpCompression directory="%TEMP%">
      <scheme name="gzip" dll="%IIS_BIN%\\gzip.dll" />
      <dynamicTypes>
        <add mimeType="text/*" enabled="true" />
        <add mimeType="message/*" enabled="true" />
        <add mimeType="application/x-javascript" enabled="true" />
        <add mimeType="application/javascript" enabled="true" />
        <add mimeType="*/*" enabled="false" />
        <add mimeType="text/event-stream" enabled="false" />
      </dynamicTypes>
      <staticTypes>
        <add mimeType="text/*" enabled="true" />
        <add mimeType="message/*" enabled="true" />
        <add mimeType="application/javascript" enabled="true" />
        <add mimeType="application/atom+xml" enabled="true" />
        <add mimeType="application/xaml+xml" enabled="true" />
        <add mimeType="image/svg+xml" enabled="true" />
        <add mimeType="*/*" enabled="false" />
      </staticTypes>
    </httpCompression>
    <httpErrors lockAttributes="allowAbsolutePathsWhenDelegated,defaultPath">
      <error statusCode="401" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="401.htm" />
      <error statusCode="403" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="403.htm" />
      <error statusCode="404" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="404.htm" />
      <error statusCode="405" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="405.htm" />
      <error statusCode="406" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="406.htm" />
      <error statusCode="412" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="412.htm" />
      <error statusCode="500" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="500.htm" />
      <error statusCode="501" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="501.htm" />
      <error statusCode="502" prefixLanguageFilePath="%IIS_BIN%\\custerr" path="502.htm" />
    </httpErrors>
    <httpLogging dontLog="false" />
    <httpProtocol>
      <customHeaders>
        <clear />
        <add name="X-Powered-By" value="ASP.NET" />
      </customHeaders>
      <redirectHeaders>
        <clear />
      </redirectHeaders>
    </httpProtocol>
    <httpRedirect enabled="false" />
    <httpTracing />
    <isapiFilters>
      <filter name="ASP.Net_2.0.50727-64" path="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_filter.dll" enableCache="true" preCondition="bitness64,runtimeVersionv2.0" />
      <filter name="ASP.Net_2.0.50727.0" path="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_filter.dll" enableCache="true" preCondition="bitness32,runtimeVersionv2.0" />
      <filter name="ASP.Net_2.0_for_v1.1" path="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_filter.dll" enableCache="true" preCondition="runtimeVersionv1.1" />
      <filter name="ASP.Net_4.0_32bit" path="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_filter.dll" enableCache="true" preCondition="bitness32,runtimeVersionv4.0" />
      <filter name="ASP.Net_4.0_64bit" path="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_filter.dll" enableCache="true" preCondition="bitness64,runtimeVersionv4.0" />
    </isapiFilters>
    <odbcLogging />
    <security>
      <access sslFlags="None" />
      <applicationDependencies>
        <application name="Active Server Pages" groupId="ASP" />
      </applicationDependencies>
      <authentication>
        <anonymousAuthentication enabled="true" userName="" />
        <basicAuthentication enabled="false" />
        <clientCertificateMappingAuthentication enabled="false" />
        <digestAuthentication enabled="false" />
        <iisClientCertificateMappingAuthentication enabled="false"></iisClientCertificateMappingAuthentication>
        <windowsAuthentication enabled="false">
          <providers>
            <add value="Negotiate" />
            <add value="NTLM" />
          </providers>
        </windowsAuthentication>
      </authentication>
      <authorization>
        <add accessType="Allow" users="*" />
      </authorization>
      <ipSecurity allowUnlisted="true" />
      <isapiCgiRestriction notListedIsapisAllowed="true" notListedCgisAllowed="true">
        <add path="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\webengine4.dll" allowed="true" groupId="ASP.NET_v4.0" description="ASP.NET_v4.0" />
        <add path="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\webengine4.dll" allowed="true" groupId="ASP.NET_v4.0" description="ASP.NET_v4.0" />
        <add path="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" allowed="true" groupId="ASP.NET v2.0.50727" description="ASP.NET v2.0.50727" />
        <add path="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" allowed="true" groupId="ASP.NET v2.0.50727" description="ASP.NET v2.0.50727" />
      </isapiCgiRestriction>
      <requestFiltering>
        <fileExtensions allowUnlisted="true" applyToWebDAV="true">
          <add fileExtension=".asa" allowed="false" />
          <add fileExtension=".asax" allowed="false" />
          <add fileExtension=".ascx" allowed="false" />
          <add fileExtension=".master" allowed="false" />
          <add fileExtension=".skin" allowed="false" />
          <add fileExtension=".browser" allowed="false" />
          <add fileExtension=".sitemap" allowed="false" />
          <add fileExtension=".config" allowed="false" />
          <add fileExtension=".cs" allowed="false" />
          <add fileExtension=".csproj" allowed="false" />
          <add fileExtension=".vb" allowed="false" />
          <add fileExtension=".vbproj" allowed="false" />
          <add fileExtension=".webinfo" allowed="false" />
          <add fileExtension=".licx" allowed="false" />
          <add fileExtension=".resx" allowed="false" />
          <add fileExtension=".resources" allowed="false" />
          <add fileExtension=".mdb" allowed="false" />
          <add fileExtension=".vjsproj" allowed="false" />
          <add fileExtension=".java" allowed="false" />
          <add fileExtension=".jsl" allowed="false" />
          <add fileExtension=".ldb" allowed="false" />
          <add fileExtension=".dsdgm" allowed="false" />
          <add fileExtension=".ssdgm" allowed="false" />
          <add fileExtension=".lsad" allowed="false" />
          <add fileExtension=".ssmap" allowed="false" />
          <add fileExtension=".cd" allowed="false" />
          <add fileExtension=".dsprototype" allowed="false" />
          <add fileExtension=".lsaprototype" allowed="false" />
          <add fileExtension=".sdm" allowed="false" />
          <add fileExtension=".sdmDocument" allowed="false" />
          <add fileExtension=".mdf" allowed="false" />
          <add fileExtension=".ldf" allowed="false" />
          <add fileExtension=".ad" allowed="false" />
          <add fileExtension=".dd" allowed="false" />
          <add fileExtension=".ldd" allowed="false" />
          <add fileExtension=".sd" allowed="false" />
          <add fileExtension=".adprototype" allowed="false" />
          <add fileExtension=".lddprototype" allowed="false" />
          <add fileExtension=".exclude" allowed="false" />
          <add fileExtension=".refresh" allowed="false" />
          <add fileExtension=".compiled" allowed="false" />
          <add fileExtension=".msgx" allowed="false" />
          <add fileExtension=".vsdisco" allowed="false" />
          <add fileExtension=".rules" allowed="false" />
        </fileExtensions>
        <verbs allowUnlisted="true" applyToWebDAV="true" />
        <hiddenSegments applyToWebDAV="true">
          <add segment="web.config" />
          <add segment="bin" />
          <add segment="App_code" />
          <add segment="App_GlobalResources" />
          <add segment="App_LocalResources" />
          <add segment="App_WebReferences" />
          <add segment="App_Data" />
          <add segment="App_Browsers" />
        </hiddenSegments>
      </requestFiltering>
    </security>
    <serverSideInclude ssiExecDisable="false" />
    <staticContent lockAttributes="isDocFooterFileName">
      <mimeMap fileExtension=".323" mimeType="text/h323" />
      <mimeMap fileExtension=".3g2" mimeType="video/3gpp2" />
      <mimeMap fileExtension=".3gp2" mimeType="video/3gpp2" />
      <mimeMap fileExtension=".3gp" mimeType="video/3gpp" />
      <mimeMap fileExtension=".3gpp" mimeType="video/3gpp" />
      <mimeMap fileExtension=".aac" mimeType="audio/aac" />
      <mimeMap fileExtension=".aaf" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".aca" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".accdb" mimeType="application/msaccess" />
      <mimeMap fileExtension=".accde" mimeType="application/msaccess" />
      <mimeMap fileExtension=".accdt" mimeType="application/msaccess" />
      <mimeMap fileExtension=".acx" mimeType="application/internet-property-stream" />
      <mimeMap fileExtension=".adt" mimeType="audio/vnd.dlna.adts" />
      <mimeMap fileExtension=".adts" mimeType="audio/vnd.dlna.adts" />
      <mimeMap fileExtension=".afm" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".ai" mimeType="application/postscript" />
      <mimeMap fileExtension=".aif" mimeType="audio/x-aiff" />
      <mimeMap fileExtension=".aifc" mimeType="audio/aiff" />
      <mimeMap fileExtension=".aiff" mimeType="audio/aiff" />
      <mimeMap fileExtension=".appcache" mimeType="text/cache-manifest" />
      <mimeMap fileExtension=".application" mimeType="application/x-ms-application" />
      <mimeMap fileExtension=".art" mimeType="image/x-jg" />
      <mimeMap fileExtension=".asd" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".asf" mimeType="video/x-ms-asf" />
      <mimeMap fileExtension=".asi" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".asm" mimeType="text/plain" />
      <mimeMap fileExtension=".asr" mimeType="video/x-ms-asf" />
      <mimeMap fileExtension=".asx" mimeType="video/x-ms-asf" />
      <mimeMap fileExtension=".atom" mimeType="application/atom+xml" />
      <mimeMap fileExtension=".au" mimeType="audio/basic" />
      <mimeMap fileExtension=".avi" mimeType="video/avi" />
      <mimeMap fileExtension=".axs" mimeType="application/olescript" />
      <mimeMap fileExtension=".bas" mimeType="text/plain" />
      <mimeMap fileExtension=".bcpio" mimeType="application/x-bcpio" />
      <mimeMap fileExtension=".bin" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".bmp" mimeType="image/bmp" />
      <mimeMap fileExtension=".c" mimeType="text/plain" />
      <mimeMap fileExtension=".cab" mimeType="application/vnd.ms-cab-compressed" />
      <mimeMap fileExtension=".calx" mimeType="application/vnd.ms-office.calx" />
      <mimeMap fileExtension=".cat" mimeType="application/vnd.ms-pki.seccat" />
      <mimeMap fileExtension=".cdf" mimeType="application/x-cdf" />
      <mimeMap fileExtension=".chm" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".class" mimeType="application/x-java-applet" />
      <mimeMap fileExtension=".clp" mimeType="application/x-msclip" />
      <mimeMap fileExtension=".cmx" mimeType="image/x-cmx" />
      <mimeMap fileExtension=".cnf" mimeType="text/plain" />
      <mimeMap fileExtension=".cod" mimeType="image/cis-cod" />
      <mimeMap fileExtension=".cpio" mimeType="application/x-cpio" />
      <mimeMap fileExtension=".cpp" mimeType="text/plain" />
      <mimeMap fileExtension=".crd" mimeType="application/x-mscardfile" />
      <mimeMap fileExtension=".crl" mimeType="application/pkix-crl" />
      <mimeMap fileExtension=".crt" mimeType="application/x-x509-ca-cert" />
      <mimeMap fileExtension=".csh" mimeType="application/x-csh" />
      <mimeMap fileExtension=".css" mimeType="text/css" />
      <mimeMap fileExtension=".csv" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".cur" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".dcr" mimeType="application/x-director" />
      <mimeMap fileExtension=".deploy" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".der" mimeType="application/x-x509-ca-cert" />
      <mimeMap fileExtension=".dib" mimeType="image/bmp" />
      <mimeMap fileExtension=".dir" mimeType="application/x-director" />
      <mimeMap fileExtension=".disco" mimeType="text/xml" />
      <mimeMap fileExtension=".dll" mimeType="application/x-msdownload" />
      <mimeMap fileExtension=".dll.config" mimeType="text/xml" />
      <mimeMap fileExtension=".dlm" mimeType="text/dlm" />
      <mimeMap fileExtension=".doc" mimeType="application/msword" />
      <mimeMap fileExtension=".docm" mimeType="application/vnd.ms-word.document.macroEnabled.12" />
      <mimeMap fileExtension=".docx" mimeType="application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
      <mimeMap fileExtension=".dot" mimeType="application/msword" />
      <mimeMap fileExtension=".dotm" mimeType="application/vnd.ms-word.template.macroEnabled.12" />
      <mimeMap fileExtension=".dotx" mimeType="application/vnd.openxmlformats-officedocument.wordprocessingml.template" />
      <mimeMap fileExtension=".dsp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".dtd" mimeType="text/xml" />
      <mimeMap fileExtension=".dvi" mimeType="application/x-dvi" />
      <mimeMap fileExtension=".dvr-ms" mimeType="video/x-ms-dvr" />
      <mimeMap fileExtension=".dwf" mimeType="drawing/x-dwf" />
      <mimeMap fileExtension=".dwp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".dxr" mimeType="application/x-director" />
      <mimeMap fileExtension=".eml" mimeType="message/rfc822" />
      <mimeMap fileExtension=".emz" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" />
      <mimeMap fileExtension=".eps" mimeType="application/postscript" />
      <mimeMap fileExtension=".esd" mimeType="application/vnd.ms-cab-compressed" />
      <mimeMap fileExtension=".etx" mimeType="text/x-setext" />
      <mimeMap fileExtension=".evy" mimeType="application/envoy" />
      <mimeMap fileExtension=".exe" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".exe.config" mimeType="text/xml" />
      <mimeMap fileExtension=".fdf" mimeType="application/vnd.fdf" />
      <mimeMap fileExtension=".fif" mimeType="application/fractals" />
      <mimeMap fileExtension=".fla" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".flr" mimeType="x-world/x-vrml" />
      <mimeMap fileExtension=".flv" mimeType="video/x-flv" />
      <mimeMap fileExtension=".gif" mimeType="image/gif" />
      <mimeMap fileExtension=".glb" mimeType="model/gltf-binary" />
      <mimeMap fileExtension=".gtar" mimeType="application/x-gtar" />
      <mimeMap fileExtension=".gz" mimeType="application/x-gzip" />
      <mimeMap fileExtension=".h" mimeType="text/plain" />
      <mimeMap fileExtension=".hdf" mimeType="application/x-hdf" />
      <mimeMap fileExtension=".hdml" mimeType="text/x-hdml" />
      <mimeMap fileExtension=".hhc" mimeType="application/x-oleobject" />
      <mimeMap fileExtension=".hhk" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".hhp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".hlp" mimeType="application/winhlp" />
      <mimeMap fileExtension=".hqx" mimeType="application/mac-binhex40" />
      <mimeMap fileExtension=".hta" mimeType="application/hta" />
      <mimeMap fileExtension=".htc" mimeType="text/x-component" />
      <mimeMap fileExtension=".htm" mimeType="text/html" />
      <mimeMap fileExtension=".html" mimeType="text/html" />
      <mimeMap fileExtension=".htt" mimeType="text/webviewhtml" />
      <mimeMap fileExtension=".hxt" mimeType="text/html" />
      <mimeMap fileExtension=".ico" mimeType="image/x-icon" />
      <mimeMap fileExtension=".ics" mimeType="text/calendar" />
      <mimeMap fileExtension=".ief" mimeType="image/ief" />
      <mimeMap fileExtension=".iii" mimeType="application/x-iphone" />
      <mimeMap fileExtension=".inf" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".ins" mimeType="application/x-internet-signup" />
      <mimeMap fileExtension=".isp" mimeType="application/x-internet-signup" />
      <mimeMap fileExtension=".IVF" mimeType="video/x-ivf" />
      <mimeMap fileExtension=".jar" mimeType="application/java-archive" />
      <mimeMap fileExtension=".java" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".jck" mimeType="application/liquidmotion" />
      <mimeMap fileExtension=".jcz" mimeType="application/liquidmotion" />
      <mimeMap fileExtension=".jfif" mimeType="image/pjpeg" />
      <mimeMap fileExtension=".jpb" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".jpe" mimeType="image/jpeg" />
      <mimeMap fileExtension=".jpeg" mimeType="image/jpeg" />
      <mimeMap fileExtension=".jpg" mimeType="image/jpeg" />
      <mimeMap fileExtension=".js" mimeType="application/javascript" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".jsonld" mimeType="application/ld+json" />
      <mimeMap fileExtension=".jsx" mimeType="text/jscript" />
      <mimeMap fileExtension=".latex" mimeType="application/x-latex" />
      <mimeMap fileExtension=".less" mimeType="text/css" />
      <mimeMap fileExtension=".lit" mimeType="application/x-ms-reader" />
      <mimeMap fileExtension=".lpk" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".lsf" mimeType="video/x-la-asf" />
      <mimeMap fileExtension=".lsx" mimeType="video/x-la-asf" />
      <mimeMap fileExtension=".lzh" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".m13" mimeType="application/x-msmediaview" />
      <mimeMap fileExtension=".m14" mimeType="application/x-msmediaview" />
      <mimeMap fileExtension=".m1v" mimeType="video/mpeg" />
      <mimeMap fileExtension=".m2ts" mimeType="video/vnd.dlna.mpeg-tts" />
      <mimeMap fileExtension=".m3u" mimeType="audio/x-mpegurl" />
      <mimeMap fileExtension=".m4a" mimeType="audio/mp4" />
      <mimeMap fileExtension=".m4v" mimeType="video/mp4" />
      <mimeMap fileExtension=".man" mimeType="application/x-troff-man" />
      <mimeMap fileExtension=".manifest" mimeType="application/x-ms-manifest" />
      <mimeMap fileExtension=".map" mimeType="text/plain" />
      <mimeMap fileExtension=".mdb" mimeType="application/x-msaccess" />
      <mimeMap fileExtension=".mdp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".me" mimeType="application/x-troff-me" />
      <mimeMap fileExtension=".mht" mimeType="message/rfc822" />
      <mimeMap fileExtension=".mhtml" mimeType="message/rfc822" />
      <mimeMap fileExtension=".mid" mimeType="audio/mid" />
      <mimeMap fileExtension=".midi" mimeType="audio/mid" />
      <mimeMap fileExtension=".mix" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".mmf" mimeType="application/x-smaf" />
      <mimeMap fileExtension=".mno" mimeType="text/xml" />
      <mimeMap fileExtension=".mny" mimeType="application/x-msmoney" />
      <mimeMap fileExtension=".mov" mimeType="video/quicktime" />
      <mimeMap fileExtension=".movie" mimeType="video/x-sgi-movie" />
      <mimeMap fileExtension=".mp2" mimeType="video/mpeg" />
      <mimeMap fileExtension=".mp3" mimeType="audio/mpeg" />
      <mimeMap fileExtension=".mp4" mimeType="video/mp4" />
      <mimeMap fileExtension=".mp4v" mimeType="video/mp4" />
      <mimeMap fileExtension=".mpa" mimeType="video/mpeg" />
      <mimeMap fileExtension=".mpe" mimeType="video/mpeg" />
      <mimeMap fileExtension=".mpeg" mimeType="video/mpeg" />
      <mimeMap fileExtension=".mpg" mimeType="video/mpeg" />
      <mimeMap fileExtension=".mpp" mimeType="application/vnd.ms-project" />
      <mimeMap fileExtension=".mpv2" mimeType="video/mpeg" />
      <mimeMap fileExtension=".ms" mimeType="application/x-troff-ms" />
      <mimeMap fileExtension=".msi" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".mso" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".mvb" mimeType="application/x-msmediaview" />
      <mimeMap fileExtension=".mvc" mimeType="application/x-miva-compiled" />
      <mimeMap fileExtension=".nc" mimeType="application/x-netcdf" />
      <mimeMap fileExtension=".nsc" mimeType="video/x-ms-asf" />
      <mimeMap fileExtension=".nws" mimeType="message/rfc822" />
      <mimeMap fileExtension=".ocx" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".oda" mimeType="application/oda" />
      <mimeMap fileExtension=".odc" mimeType="text/x-ms-odc" />
      <mimeMap fileExtension=".ods" mimeType="application/oleobject" />
      <mimeMap fileExtension=".oga" mimeType="audio/ogg" />
      <mimeMap fileExtension=".ogg" mimeType="video/ogg" />
      <mimeMap fileExtension=".ogv" mimeType="video/ogg" />
      <mimeMap fileExtension=".one" mimeType="application/onenote" />
      <mimeMap fileExtension=".onea" mimeType="application/onenote" />
      <mimeMap fileExtension=".onetoc" mimeType="application/onenote" />
      <mimeMap fileExtension=".onetoc2" mimeType="application/onenote" />
      <mimeMap fileExtension=".onetmp" mimeType="application/onenote" />
      <mimeMap fileExtension=".onepkg" mimeType="application/onenote" />
      <mimeMap fileExtension=".osdx" mimeType="application/opensearchdescription+xml" />
      <mimeMap fileExtension=".otf" mimeType="font/otf" />
      <mimeMap fileExtension=".p10" mimeType="application/pkcs10" />
      <mimeMap fileExtension=".p12" mimeType="application/x-pkcs12" />
      <mimeMap fileExtension=".p7b" mimeType="application/x-pkcs7-certificates" />
      <mimeMap fileExtension=".p7c" mimeType="application/pkcs7-mime" />
      <mimeMap fileExtension=".p7m" mimeType="application/pkcs7-mime" />
      <mimeMap fileExtension=".p7r" mimeType="application/x-pkcs7-certreqresp" />
      <mimeMap fileExtension=".p7s" mimeType="application/pkcs7-signature" />
      <mimeMap fileExtension=".pbm" mimeType="image/x-portable-bitmap" />
      <mimeMap fileExtension=".pcx" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".pcz" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".pdf" mimeType="application/pdf" />
      <mimeMap fileExtension=".pfb" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".pfm" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".pfx" mimeType="application/x-pkcs12" />
      <mimeMap fileExtension=".pgm" mimeType="image/x-portable-graymap" />
      <mimeMap fileExtension=".pko" mimeType="application/vnd.ms-pki.pko" />
      <mimeMap fileExtension=".pma" mimeType="application/x-perfmon" />
      <mimeMap fileExtension=".pmc" mimeType="application/x-perfmon" />
      <mimeMap fileExtension=".pml" mimeType="application/x-perfmon" />
      <mimeMap fileExtension=".pmr" mimeType="application/x-perfmon" />
      <mimeMap fileExtension=".pmw" mimeType="application/x-perfmon" />
      <mimeMap fileExtension=".png" mimeType="image/png" />
      <mimeMap fileExtension=".pnm" mimeType="image/x-portable-anymap" />
      <mimeMap fileExtension=".pnz" mimeType="image/png" />
      <mimeMap fileExtension=".pot" mimeType="application/vnd.ms-powerpoint" />
      <mimeMap fileExtension=".potm" mimeType="application/vnd.ms-powerpoint.template.macroEnabled.12" />
      <mimeMap fileExtension=".potx" mimeType="application/vnd.openxmlformats-officedocument.presentationml.template" />
      <mimeMap fileExtension=".ppam" mimeType="application/vnd.ms-powerpoint.addin.macroEnabled.12" />
      <mimeMap fileExtension=".ppm" mimeType="image/x-portable-pixmap" />
      <mimeMap fileExtension=".pps" mimeType="application/vnd.ms-powerpoint" />
      <mimeMap fileExtension=".ppsm" mimeType="application/vnd.ms-powerpoint.slideshow.macroEnabled.12" />
      <mimeMap fileExtension=".ppsx" mimeType="application/vnd.openxmlformats-officedocument.presentationml.slideshow" />
      <mimeMap fileExtension=".ppt" mimeType="application/vnd.ms-powerpoint" />
      <mimeMap fileExtension=".pptm" mimeType="application/vnd.ms-powerpoint.presentation.macroEnabled.12" />
      <mimeMap fileExtension=".pptx" mimeType="application/vnd.openxmlformats-officedocument.presentationml.presentation" />
      <mimeMap fileExtension=".prf" mimeType="application/pics-rules" />
      <mimeMap fileExtension=".prm" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".prx" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".ps" mimeType="application/postscript" />
      <mimeMap fileExtension=".psd" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".psm" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".psp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".pub" mimeType="application/x-mspublisher" />
      <mimeMap fileExtension=".qt" mimeType="video/quicktime" />
      <mimeMap fileExtension=".qtl" mimeType="application/x-quicktimeplayer" />
      <mimeMap fileExtension=".qxd" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".ra" mimeType="audio/x-pn-realaudio" />
      <mimeMap fileExtension=".ram" mimeType="audio/x-pn-realaudio" />
      <mimeMap fileExtension=".rar" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".ras" mimeType="image/x-cmu-raster" />
      <mimeMap fileExtension=".rf" mimeType="image/vnd.rn-realflash" />
      <mimeMap fileExtension=".rgb" mimeType="image/x-rgb" />
      <mimeMap fileExtension=".rm" mimeType="application/vnd.rn-realmedia" />
      <mimeMap fileExtension=".rmi" mimeType="audio/mid" />
      <mimeMap fileExtension=".roff" mimeType="application/x-troff" />
      <mimeMap fileExtension=".rpm" mimeType="audio/x-pn-realaudio-plugin" />
      <mimeMap fileExtension=".rtf" mimeType="application/rtf" />
      <mimeMap fileExtension=".rtx" mimeType="text/richtext" />
      <mimeMap fileExtension=".scd" mimeType="application/x-msschedule" />
      <mimeMap fileExtension=".sct" mimeType="text/scriptlet" />
      <mimeMap fileExtension=".sea" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".setpay" mimeType="application/set-payment-initiation" />
      <mimeMap fileExtension=".setreg" mimeType="application/set-registration-initiation" />
      <mimeMap fileExtension=".sgml" mimeType="text/sgml" />
      <mimeMap fileExtension=".sh" mimeType="application/x-sh" />
      <mimeMap fileExtension=".shar" mimeType="application/x-shar" />
      <mimeMap fileExtension=".sit" mimeType="application/x-stuffit" />
      <mimeMap fileExtension=".sldm" mimeType="application/vnd.ms-powerpoint.slide.macroEnabled.12" />
      <mimeMap fileExtension=".sldx" mimeType="application/vnd.openxmlformats-officedocument.presentationml.slide" />
      <mimeMap fileExtension=".smd" mimeType="audio/x-smd" />
      <mimeMap fileExtension=".smi" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".smx" mimeType="audio/x-smd" />
      <mimeMap fileExtension=".smz" mimeType="audio/x-smd" />
      <mimeMap fileExtension=".snd" mimeType="audio/basic" />
      <mimeMap fileExtension=".snp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".spc" mimeType="application/x-pkcs7-certificates" />
      <mimeMap fileExtension=".spl" mimeType="application/futuresplash" />
      <mimeMap fileExtension=".spx" mimeType="audio/ogg" />
      <mimeMap fileExtension=".src" mimeType="application/x-wais-source" />
      <mimeMap fileExtension=".ssm" mimeType="application/streamingmedia" />
      <mimeMap fileExtension=".sst" mimeType="application/vnd.ms-pki.certstore" />
      <mimeMap fileExtension=".stl" mimeType="application/vnd.ms-pki.stl" />
      <mimeMap fileExtension=".sv4cpio" mimeType="application/x-sv4cpio" />
      <mimeMap fileExtension=".sv4crc" mimeType="application/x-sv4crc" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
      <mimeMap fileExtension=".svgz" mimeType="image/svg+xml" />
      <mimeMap fileExtension=".swf" mimeType="application/x-shockwave-flash" />
      <mimeMap fileExtension=".t" mimeType="application/x-troff" />
      <mimeMap fileExtension=".tar" mimeType="application/x-tar" />
      <mimeMap fileExtension=".tcl" mimeType="application/x-tcl" />
      <mimeMap fileExtension=".tex" mimeType="application/x-tex" />
      <mimeMap fileExtension=".texi" mimeType="application/x-texinfo" />
      <mimeMap fileExtension=".texinfo" mimeType="application/x-texinfo" />
      <mimeMap fileExtension=".tgz" mimeType="application/x-compressed" />
      <mimeMap fileExtension=".thmx" mimeType="application/vnd.ms-officetheme" />
      <mimeMap fileExtension=".thn" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".tif" mimeType="image/tiff" />
      <mimeMap fileExtension=".tiff" mimeType="image/tiff" />
      <mimeMap fileExtension=".toc" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".tr" mimeType="application/x-troff" />
      <mimeMap fileExtension=".trm" mimeType="application/x-msterminal" />
      <mimeMap fileExtension=".ts" mimeType="video/vnd.dlna.mpeg-tts" />
      <mimeMap fileExtension=".tsv" mimeType="text/tab-separated-values" />
      <mimeMap fileExtension=".ttf" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".tts" mimeType="video/vnd.dlna.mpeg-tts" />
      <mimeMap fileExtension=".txt" mimeType="text/plain" />
      <mimeMap fileExtension=".u32" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".uls" mimeType="text/iuls" />
      <mimeMap fileExtension=".ustar" mimeType="application/x-ustar" />
      <mimeMap fileExtension=".vbs" mimeType="text/vbscript" />
      <mimeMap fileExtension=".vcf" mimeType="text/x-vcard" />
      <mimeMap fileExtension=".vcs" mimeType="text/plain" />
      <mimeMap fileExtension=".vdx" mimeType="application/vnd.ms-visio.viewer" />
      <mimeMap fileExtension=".vml" mimeType="text/xml" />
      <mimeMap fileExtension=".vsd" mimeType="application/vnd.visio" />
      <mimeMap fileExtension=".vss" mimeType="application/vnd.visio" />
      <mimeMap fileExtension=".vst" mimeType="application/vnd.visio" />
      <mimeMap fileExtension=".vsto" mimeType="application/x-ms-vsto" />
      <mimeMap fileExtension=".vsw" mimeType="application/vnd.visio" />
      <mimeMap fileExtension=".vsx" mimeType="application/vnd.visio" />
      <mimeMap fileExtension=".vtx" mimeType="application/vnd.visio" />
      <mimeMap fileExtension=".wasm" mimeType="application/wasm" />
      <mimeMap fileExtension=".wav" mimeType="audio/wav" />
      <mimeMap fileExtension=".wax" mimeType="audio/x-ms-wax" />
      <mimeMap fileExtension=".wbmp" mimeType="image/vnd.wap.wbmp" />
      <mimeMap fileExtension=".wcm" mimeType="application/vnd.ms-works" />
      <mimeMap fileExtension=".wdb" mimeType="application/vnd.ms-works" />
      <mimeMap fileExtension=".webm" mimeType="video/webm" />
      <mimeMap fileExtension=".wks" mimeType="application/vnd.ms-works" />
      <mimeMap fileExtension=".wm" mimeType="video/x-ms-wm" />
      <mimeMap fileExtension=".wma" mimeType="audio/x-ms-wma" />
      <mimeMap fileExtension=".wmd" mimeType="application/x-ms-wmd" />
      <mimeMap fileExtension=".wmf" mimeType="application/x-msmetafile" />
      <mimeMap fileExtension=".wml" mimeType="text/vnd.wap.wml" />
      <mimeMap fileExtension=".wmlc" mimeType="application/vnd.wap.wmlc" />
      <mimeMap fileExtension=".wmls" mimeType="text/vnd.wap.wmlscript" />
      <mimeMap fileExtension=".wmlsc" mimeType="application/vnd.wap.wmlscriptc" />
      <mimeMap fileExtension=".wmp" mimeType="video/x-ms-wmp" />
      <mimeMap fileExtension=".wmv" mimeType="video/x-ms-wmv" />
      <mimeMap fileExtension=".wmx" mimeType="video/x-ms-wmx" />
      <mimeMap fileExtension=".wmz" mimeType="application/x-ms-wmz" />
      <mimeMap fileExtension=".woff" mimeType="font/x-woff" />
      <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
      <mimeMap fileExtension=".wps" mimeType="application/vnd.ms-works" />
      <mimeMap fileExtension=".wri" mimeType="application/x-mswrite" />
      <mimeMap fileExtension=".wrl" mimeType="x-world/x-vrml" />
      <mimeMap fileExtension=".wrz" mimeType="x-world/x-vrml" />
      <mimeMap fileExtension=".wsdl" mimeType="text/xml" />
      <mimeMap fileExtension=".wtv" mimeType="video/x-ms-wtv" />
      <mimeMap fileExtension=".wvx" mimeType="video/x-ms-wvx" />
      <mimeMap fileExtension=".x" mimeType="application/directx" />
      <mimeMap fileExtension=".xaf" mimeType="x-world/x-vrml" />
      <mimeMap fileExtension=".xaml" mimeType="application/xaml+xml" />
      <mimeMap fileExtension=".xap" mimeType="application/x-silverlight-app" />
      <mimeMap fileExtension=".xbap" mimeType="application/x-ms-xbap" />
      <mimeMap fileExtension=".xbm" mimeType="image/x-xbitmap" />
      <mimeMap fileExtension=".xdr" mimeType="text/plain" />
      <mimeMap fileExtension=".xht" mimeType="application/xhtml+xml" />
      <mimeMap fileExtension=".xhtml" mimeType="application/xhtml+xml" />
      <mimeMap fileExtension=".xla" mimeType="application/vnd.ms-excel" />
      <mimeMap fileExtension=".xlam" mimeType="application/vnd.ms-excel.addin.macroEnabled.12" />
      <mimeMap fileExtension=".xlc" mimeType="application/vnd.ms-excel" />
      <mimeMap fileExtension=".xlm" mimeType="application/vnd.ms-excel" />
      <mimeMap fileExtension=".xls" mimeType="application/vnd.ms-excel" />
      <mimeMap fileExtension=".xlsb" mimeType="application/vnd.ms-excel.sheet.binary.macroEnabled.12" />
      <mimeMap fileExtension=".xlsm" mimeType="application/vnd.ms-excel.sheet.macroEnabled.12" />
      <mimeMap fileExtension=".xlsx" mimeType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
      <mimeMap fileExtension=".xlt" mimeType="application/vnd.ms-excel" />
      <mimeMap fileExtension=".xltm" mimeType="application/vnd.ms-excel.template.macroEnabled.12" />
      <mimeMap fileExtension=".xltx" mimeType="application/vnd.openxmlformats-officedocument.spreadsheetml.template" />
      <mimeMap fileExtension=".xlw" mimeType="application/vnd.ms-excel" />
      <mimeMap fileExtension=".xml" mimeType="text/xml" />
      <mimeMap fileExtension=".xof" mimeType="x-world/x-vrml" />
      <mimeMap fileExtension=".xpm" mimeType="image/x-xpixmap" />
      <mimeMap fileExtension=".xps" mimeType="application/vnd.ms-xpsdocument" />
      <mimeMap fileExtension=".xsd" mimeType="text/xml" />
      <mimeMap fileExtension=".xsf" mimeType="text/xml" />
      <mimeMap fileExtension=".xsl" mimeType="text/xml" />
      <mimeMap fileExtension=".xslt" mimeType="text/xml" />
      <mimeMap fileExtension=".xsn" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".xtp" mimeType="application/octet-stream" />
      <mimeMap fileExtension=".xwd" mimeType="image/x-xwindowdump" />
      <mimeMap fileExtension=".z" mimeType="application/x-compress" />
      <mimeMap fileExtension=".zip" mimeType="application/x-zip-compressed" />
    </staticContent>
    <tracing>
      <traceFailedRequests>
        <add path="*">
          <traceAreas>
            <add provider="ASP" verbosity="Verbose" />
            <add provider="ASPNET" areas="Infrastructure,Module,Page,AppServices" verbosity="Verbose" />
            <add provider="ISAPI Extension" verbosity="Verbose" />
            <add provider="WWW Server" areas="Authentication,Security,Filter,StaticFile,CGI,Compression,Cache,RequestNotifications,Module,Rewrite,WebSocket" verbosity="Verbose" />
          </traceAreas>
          <failureDefinitions statusCodes="200-999" />
        </add>
      </traceFailedRequests>
      <traceProviderDefinitions>
        <add name="WWW Server" guid="{3a2a4e84-4c21-4981-ae10-3fda0d9b0f83}">
          <areas>
            <clear />
            <add name="Authentication" value="2" />
            <add name="Security" value="4" />
            <add name="Filter" value="8" />
            <add name="StaticFile" value="16" />
            <add name="CGI" value="32" />
            <add name="Compression" value="64" />
            <add name="Cache" value="128" />
            <add name="RequestNotifications" value="256" />
            <add name="Module" value="512" />
            <add name="Rewrite" value="1024" />
            <add name="FastCGI" value="4096" />
            <add name="WebSocket" value="16384" />
            <add name="ANCM" value="65536" />
          </areas>
        </add>
        <add name="ASP" guid="{06b94d9a-b15e-456e-a4ef-37c984a2cb4b}">
          <areas>
            <clear />
          </areas>
        </add>
        <add name="ISAPI Extension" guid="{a1c2040e-8840-4c31-ba11-9871031a19ea}">
          <areas>
            <clear />
          </areas>
        </add>
        <add name="ASPNET" guid="{AFF081FE-0247-4275-9C4E-021F3DC1DA35}">
          <areas>
            <add name="Infrastructure" value="1" />
            <add name="Module" value="2" />
            <add name="Page" value="4" />
            <add name="AppServices" value="8" />
          </areas>
        </add>
      </traceProviderDefinitions>
    </tracing>
    <urlCompression />
    <validation />
    <webdav>
      <globalSettings>
        <propertyStores>
          <add name="webdav_simple_prop" image="%IIS_BIN%\\webdav_simple_prop.dll" image32="%IIS_BIN%\\webdav_simple_prop.dll" />
        </propertyStores>
        <lockStores>
          <add name="webdav_simple_lock" image="%IIS_BIN%\\webdav_simple_lock.dll" image32="%IIS_BIN%\\webdav_simple_lock.dll" />
        </lockStores>
      </globalSettings>
      <authoring>
        <locks enabled="true" lockStore="webdav_simple_lock" />
      </authoring>
      <authoringRules />
    </webdav>
    <webSocket />
    <applicationInitialization />
  </system.webServer>
  <location path="" overrideMode="Allow">
    <system.webServer>
      <modules>
        <add name="IsapiFilterModule" lockItem="true" />
        <add name="BasicAuthenticationModule" lockItem="true" />
        <add name="IsapiModule" lockItem="true" />
        <add name="HttpLoggingModule" lockItem="true" />
        <add name="DynamicCompressionModule" lockItem="true" />
        <add name="StaticCompressionModule" lockItem="true" />
        <add name="DefaultDocumentModule" lockItem="true" />
        <add name="DirectoryListingModule" lockItem="true" />
        <add name="ProtocolSupportModule" lockItem="true" />
        <add name="HttpRedirectionModule" lockItem="true" />
        <add name="ServerSideIncludeModule" lockItem="true" />
        <add name="StaticFileModule" lockItem="true" />
        <add name="AnonymousAuthenticationModule" lockItem="false" />
        <add name="CertificateMappingAuthenticationModule" lockItem="true" />
        <add name="UrlAuthorizationModule" lockItem="true" />
        <add name="WindowsAuthenticationModule" lockItem="false" />
        <add name="IISCertificateMappingAuthenticationModule" lockItem="true" />
        <add name="WebMatrixSupportModule" lockItem="true" />
        <add name="IpRestrictionModule" lockItem="true" />
        <add name="DynamicIpRestrictionModule" lockItem="true" />
        <add name="RequestFilteringModule" lockItem="true" />
        <add name="CustomLoggingModule" lockItem="true" />
        <add name="CustomErrorModule" lockItem="true" />
        <add name="FailedRequestsTracingModule" lockItem="true" />
        <add name="CgiModule" lockItem="true" />
        <add name="FastCgiModule" lockItem="true" />
        <!--                <add name="WebDAVModule" /> -->
        <add name="RewriteModule" />
        <add name="OutputCache" type="System.Web.Caching.OutputCacheModule" preCondition="managedHandler" />
        <add name="Session" type="System.Web.SessionState.SessionStateModule" preCondition="managedHandler" />
        <add name="WindowsAuthentication" type="System.Web.Security.WindowsAuthenticationModule" preCondition="managedHandler" />
        <add name="FormsAuthentication" type="System.Web.Security.FormsAuthenticationModule" preCondition="managedHandler" />
        <add name="DefaultAuthentication" type="System.Web.Security.DefaultAuthenticationModule" preCondition="managedHandler" />
        <add name="RoleManager" type="System.Web.Security.RoleManagerModule" preCondition="managedHandler" />
        <add name="UrlAuthorization" type="System.Web.Security.UrlAuthorizationModule" preCondition="managedHandler" />
        <add name="FileAuthorization" type="System.Web.Security.FileAuthorizationModule" preCondition="managedHandler" />
        <add name="AnonymousIdentification" type="System.Web.Security.AnonymousIdentificationModule" preCondition="managedHandler" />
        <add name="Profile" type="System.Web.Profile.ProfileModule" preCondition="managedHandler" />
        <add name="UrlMappingsModule" type="System.Web.UrlMappingsModule" preCondition="managedHandler" />
        <add name="ApplicationInitializationModule" lockItem="true" />
        <add name="WebSocketModule" lockItem="true" />
        <add name="ServiceModel-4.0" type="System.ServiceModel.Activation.ServiceHttpModule,System.ServiceModel.Activation,Version=4.0.0.0,Culture=neutral,PublicKeyToken=31bf3856ad364e35" preCondition="managedHandler,runtimeVersionv4.0" />
        <add name="ConfigurationValidationModule" lockItem="true" />
        <add name="UrlRoutingModule-4.0" type="System.Web.Routing.UrlRoutingModule" preCondition="managedHandler,runtimeVersionv4.0" />
        <add name="ScriptModule-4.0" type="System.Web.Handlers.ScriptModule, System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" preCondition="managedHandler,runtimeVersionv4.0" />
        <add name="ServiceModel" type="System.ServiceModel.Activation.HttpModule, System.ServiceModel, Version=3.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="managedHandler,runtimeVersionv2.0" />
        <add name="AspNetCoreModule" lockItem="true" />
        <add name="AspNetCoreModuleV2" lockItem="true" />
      </modules>
      <handlers accessPolicy="Read, Script">
        <!--                <add name="WebDAV" path="*" verb="PROPFIND,PROPPATCH,MKCOL,PUT,COPY,DELETE,MOVE,LOCK,UNLOCK" modules="WebDAVModule" resourceType="Unspecified" requireAccess="None" /> -->
        <add name="AXD-ISAPI-4.0_64bit" path="*.axd" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="PageHandlerFactory-ISAPI-4.0_64bit" path="*.aspx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="SimpleHandlerFactory-ISAPI-4.0_64bit" path="*.ashx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="WebServiceHandlerFactory-ISAPI-4.0_64bit" path="*.asmx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-rem-ISAPI-4.0_64bit" path="*.rem" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-soap-ISAPI-4.0_64bit" path="*.soap" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="svc-ISAPI-4.0_64bit" path="*.svc" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" />
        <add name="rules-ISAPI-4.0_64bit" path="*.rules" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" />
        <add name="xoml-ISAPI-4.0_64bit" path="*.xoml" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" />
        <add name="xamlx-ISAPI-4.0_64bit" path="*.xamlx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" />
        <add name="aspq-ISAPI-4.0_64bit" path="*.aspq" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="cshtm-ISAPI-4.0_64bit" path="*.cshtm" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="cshtml-ISAPI-4.0_64bit" path="*.cshtml" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="vbhtm-ISAPI-4.0_64bit" path="*.vbhtm" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="vbhtml-ISAPI-4.0_64bit" path="*.vbhtml" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="svc-Integrated" path="*.svc" verb="*" type="System.ServiceModel.Activation.HttpHandler, System.ServiceModel, Version=3.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="svc-ISAPI-2.0" path="*.svc" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" />
        <add name="xoml-Integrated" path="*.xoml" verb="*" type="System.ServiceModel.Activation.HttpHandler, System.ServiceModel, Version=3.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="xoml-ISAPI-2.0" path="*.xoml" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" />
        <add name="rules-Integrated" path="*.rules" verb="*" type="System.ServiceModel.Activation.HttpHandler, System.ServiceModel, Version=3.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="rules-ISAPI-2.0" path="*.rules" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" />
        <add name="AXD-ISAPI-4.0_32bit" path="*.axd" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="PageHandlerFactory-ISAPI-4.0_32bit" path="*.aspx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="SimpleHandlerFactory-ISAPI-4.0_32bit" path="*.ashx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="WebServiceHandlerFactory-ISAPI-4.0_32bit" path="*.asmx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-rem-ISAPI-4.0_32bit" path="*.rem" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-soap-ISAPI-4.0_32bit" path="*.soap" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="svc-ISAPI-4.0_32bit" path="*.svc" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" />
        <add name="rules-ISAPI-4.0_32bit" path="*.rules" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" />
        <add name="xoml-ISAPI-4.0_32bit" path="*.xoml" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" />
        <add name="xamlx-ISAPI-4.0_32bit" path="*.xamlx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" />
        <add name="aspq-ISAPI-4.0_32bit" path="*.aspq" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="cshtm-ISAPI-4.0_32bit" path="*.cshtm" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="cshtml-ISAPI-4.0_32bit" path="*.cshtml" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="vbhtm-ISAPI-4.0_32bit" path="*.vbhtm" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="vbhtml-ISAPI-4.0_32bit" path="*.vbhtml" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="TraceHandler-Integrated-4.0" path="trace.axd" verb="GET,HEAD,POST,DEBUG" type="System.Web.Handlers.TraceHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="WebAdminHandler-Integrated-4.0" path="WebAdmin.axd" verb="GET,DEBUG" type="System.Web.Handlers.WebAdminHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="AssemblyResourceLoader-Integrated-4.0" path="WebResource.axd" verb="GET,DEBUG" type="System.Web.Handlers.AssemblyResourceLoader" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="PageHandlerFactory-Integrated-4.0" path="*.aspx" verb="GET,HEAD,POST,DEBUG" type="System.Web.UI.PageHandlerFactory" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="SimpleHandlerFactory-Integrated-4.0" path="*.ashx" verb="GET,HEAD,POST,DEBUG" type="System.Web.UI.SimpleHandlerFactory" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="WebServiceHandlerFactory-Integrated-4.0" path="*.asmx" verb="GET,HEAD,POST,DEBUG" type="System.Web.Script.Services.ScriptHandlerFactory, System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="HttpRemotingHandlerFactory-rem-Integrated-4.0" path="*.rem" verb="GET,HEAD,POST,DEBUG" type="System.Runtime.Remoting.Channels.Http.HttpRemotingHandlerFactory, System.Runtime.Remoting, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="HttpRemotingHandlerFactory-soap-Integrated-4.0" path="*.soap" verb="GET,HEAD,POST,DEBUG" type="System.Runtime.Remoting.Channels.Http.HttpRemotingHandlerFactory, System.Runtime.Remoting, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="svc-Integrated-4.0" path="*.svc" verb="*" type="System.ServiceModel.Activation.ServiceHttpHandlerFactory, System.ServiceModel.Activation, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="rules-Integrated-4.0" path="*.rules" verb="*" type="System.ServiceModel.Activation.ServiceHttpHandlerFactory, System.ServiceModel.Activation, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="xoml-Integrated-4.0" path="*.xoml" verb="*" type="System.ServiceModel.Activation.ServiceHttpHandlerFactory, System.ServiceModel.Activation, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="xamlx-Integrated-4.0" path="*.xamlx" verb="GET,HEAD,POST,DEBUG" type="System.Xaml.Hosting.XamlHttpHandlerFactory, System.Xaml.Hosting, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="aspq-Integrated-4.0" path="*.aspq" verb="GET,HEAD,POST,DEBUG" type="System.Web.HttpForbiddenHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="cshtm-Integrated-4.0" path="*.cshtm" verb="GET,HEAD,POST,DEBUG" type="System.Web.HttpForbiddenHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="cshtml-Integrated-4.0" path="*.cshtml" verb="GET,HEAD,POST,DEBUG" type="System.Web.HttpForbiddenHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="vbhtm-Integrated-4.0" path="*.vbhtm" verb="GET,HEAD,POST,DEBUG" type="System.Web.HttpForbiddenHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="vbhtml-Integrated-4.0" path="*.vbhtml" verb="GET,HEAD,POST,DEBUG" type="System.Web.HttpForbiddenHandler" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="ScriptHandlerFactoryAppServices-Integrated-4.0" path="*_AppService.axd" verb="*" type="System.Web.Script.Services.ScriptHandlerFactory, System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="ScriptResourceIntegrated-4.0" path="*ScriptResource.axd" verb="GET,HEAD" type="System.Web.Handlers.ScriptResourceHandler, System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" preCondition="integratedMode,runtimeVersionv4.0" />
        <add name="ASPClassic" path="*.asp" verb="GET,HEAD,POST" modules="IsapiModule" scriptProcessor="%IIS_BIN%\\asp.dll" resourceType="File" />
        <add name="SecurityCertificate" path="*.cer" verb="GET,HEAD,POST" modules="IsapiModule" scriptProcessor="%IIS_BIN%\\asp.dll" resourceType="File" />
        <add name="ISAPI-dll" path="*.dll" verb="*" modules="IsapiModule" resourceType="File" requireAccess="Execute" allowPathInfo="true" />
        <add name="TraceHandler-Integrated" path="trace.axd" verb="GET,HEAD,POST,DEBUG" type="System.Web.Handlers.TraceHandler" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="WebAdminHandler-Integrated" path="WebAdmin.axd" verb="GET,DEBUG" type="System.Web.Handlers.WebAdminHandler" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="AssemblyResourceLoader-Integrated" path="WebResource.axd" verb="GET,DEBUG" type="System.Web.Handlers.AssemblyResourceLoader" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="PageHandlerFactory-Integrated" path="*.aspx" verb="GET,HEAD,POST,DEBUG" type="System.Web.UI.PageHandlerFactory" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="SimpleHandlerFactory-Integrated" path="*.ashx" verb="GET,HEAD,POST,DEBUG" type="System.Web.UI.SimpleHandlerFactory" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="WebServiceHandlerFactory-Integrated" path="*.asmx" verb="GET,HEAD,POST,DEBUG" type="System.Web.Services.Protocols.WebServiceHandlerFactory,System.Web.Services,Version=2.0.0.0,Culture=neutral,PublicKeyToken=b03f5f7f11d50a3a" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="HttpRemotingHandlerFactory-rem-Integrated" path="*.rem" verb="GET,HEAD,POST,DEBUG" type="System.Runtime.Remoting.Channels.Http.HttpRemotingHandlerFactory,System.Runtime.Remoting,Version=2.0.0.0,Culture=neutral,PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="HttpRemotingHandlerFactory-soap-Integrated" path="*.soap" verb="GET,HEAD,POST,DEBUG" type="System.Runtime.Remoting.Channels.Http.HttpRemotingHandlerFactory,System.Runtime.Remoting,Version=2.0.0.0,Culture=neutral,PublicKeyToken=b77a5c561934e089" preCondition="integratedMode,runtimeVersionv2.0" />
        <add name="AXD-ISAPI-2.0" path="*.axd" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" responseBufferLimit="0" />
        <add name="PageHandlerFactory-ISAPI-2.0" path="*.aspx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" responseBufferLimit="0" />
        <add name="SimpleHandlerFactory-ISAPI-2.0" path="*.ashx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" responseBufferLimit="0" />
        <add name="WebServiceHandlerFactory-ISAPI-2.0" path="*.asmx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-rem-ISAPI-2.0" path="*.rem" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-soap-ISAPI-2.0" path="*.soap" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness32" responseBufferLimit="0" />
        <add name="svc-ISAPI-2.0-64" path="*.svc" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" />
        <add name="AXD-ISAPI-2.0-64" path="*.axd" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" responseBufferLimit="0" />
        <add name="PageHandlerFactory-ISAPI-2.0-64" path="*.aspx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" responseBufferLimit="0" />
        <add name="SimpleHandlerFactory-ISAPI-2.0-64" path="*.ashx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" responseBufferLimit="0" />
        <add name="WebServiceHandlerFactory-ISAPI-2.0-64" path="*.asmx" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-rem-ISAPI-2.0-64" path="*.rem" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" responseBufferLimit="0" />
        <add name="HttpRemotingHandlerFactory-soap-ISAPI-2.0-64" path="*.soap" verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" responseBufferLimit="0" />
        <add name="rules-64-ISAPI-2.0" path="*.rules" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" />
        <add name="xoml-64-ISAPI-2.0" path="*.xoml" verb="*" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v2.0.50727\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv2.0,bitness64" />
        <add name="CGI-exe" path="*.exe" verb="*" modules="CgiModule" resourceType="File" requireAccess="Execute" allowPathInfo="true" />
        <add name="SSINC-stm" path="*.stm" verb="GET,HEAD,POST" modules="ServerSideIncludeModule" resourceType="File" />
        <add name="SSINC-shtm" path="*.shtm" verb="GET,HEAD,POST" modules="ServerSideIncludeModule" resourceType="File" />
        <add name="SSINC-shtml" path="*.shtml" verb="GET,HEAD,POST" modules="ServerSideIncludeModule" resourceType="File" />
        <add name="TRACEVerbHandler" path="*" verb="TRACE" modules="ProtocolSupportModule" requireAccess="None" />
        <add name="OPTIONSVerbHandler" path="*" verb="OPTIONS" modules="ProtocolSupportModule" requireAccess="None" />
        <add name="ExtensionlessUrlHandler-ISAPI-4.0_32bit" path="*." verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness32" responseBufferLimit="0" />
        <add name="ExtensionlessUrlHandler-ISAPI-4.0_64bit" path="*." verb="GET,HEAD,POST,DEBUG" modules="IsapiModule" scriptProcessor="%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet_isapi.dll" preCondition="classicMode,runtimeVersionv4.0,bitness64" responseBufferLimit="0" />
        <add name="ExtensionlessUrlHandler-Integrated-4.0" path="*." verb="GET,HEAD,POST,DEBUG" type="System.Web.Handlers.TransferRequestHandler" preCondition="integratedMode,runtimeVersionv4.0" responseBufferLimit="0" />
        <add name="StaticFile" path="*" verb="*" modules="StaticFileModule,DefaultDocumentModule,DirectoryListingModule" resourceType="Either" requireAccess="Read" />
      </handlers>
    </system.webServer>
  </location>
  <location path="#{appName}" inheritInChildApplications="false">
    <system.webServer>
      <security>
        <authentication>
          <anonymousAuthentication enabled="false" />
          <windowsAuthentication enabled="true" />
        </authentication>
      </security>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" resourceType="Unspecified" modules="AspNetCoreModuleV2" />
      </handlers>
      <modules>
        <remove name="WebMatrixSupportModule" />
      </modules>
      <aspNetCore stdoutLogEnabled="false" startupTimeLimit="3600" requestTimeout="23:00:00" processPath="%ANCM_LAUNCHER_PATH%" hostingModel="InProcess" arguments="%ANCM_LAUNCHER_ARGS%" />
      <httpCompression>
        <dynamicTypes>
          <add mimeType="text/event-stream" enabled="false" />
        </dynamicTypes>
      </httpCompression>
    </system.webServer>
  </location>
</configuration>
`