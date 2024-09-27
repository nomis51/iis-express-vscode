import path from "path";
import { getExtensionFolder, writeToFile } from "../utils";

export function create(configuration: string) {
	const filePath = path.join(getExtensionFolder(), configuration, "stop.ps1");

	writeToFile(filePath, TEMPLATE);
}

const TEMPLATE = `Get-Process | Where-Object {$_.Path -Like "*iisexpress.exe*"} | Stop-Process -Force`;