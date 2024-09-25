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