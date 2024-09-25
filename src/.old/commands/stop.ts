import { execFileSync } from "child_process";
import path from "path";
import { OutputChannel } from "vscode";
import { getExtensionFolder } from "../utils";

export function invoke(channel: OutputChannel) {
	try {
		const scriptPath = path.join(getExtensionFolder(), 'stop.ps1')
		execFileSync(
			"pwsh.exe",
			[
				scriptPath
			]
		);
		channel.appendLine("IIS Express stopped manually using VSCode 'IIS Express: Stop' command");
	}
	catch (e) {
		channel.appendLine("Error: Failed to stop IIS Express: " + e);
	}
}