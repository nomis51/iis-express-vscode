export interface Project {
	name: string;
	path: string;
	csprojFilePath: string;
	framework: string;
	env: string;
}

export interface LaunchSettings {
	iisSettings: {
		windowsAuthentication: boolean;
		anonymousAuthentication: boolean;
		iisExpress: {
			applicationUrl: string;
			sslPort: number;
		}
	}
}