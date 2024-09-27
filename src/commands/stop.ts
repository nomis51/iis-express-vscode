import { OutputChannel } from "vscode";

export function invoke(channel: OutputChannel) {
	channel.appendLine("Stopping IIS Express for VSCode...");
}