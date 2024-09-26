import * as vscode from 'vscode';
import { invokeInitialize, invokeStop } from "./commands";
import { EXTENSION_COMMAND_NAMESPACE, EXTENSION_NAME } from './constants';

let channel!: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext) {
	channel = vscode.window.createOutputChannel(EXTENSION_NAME);

	const disposableInitialize = vscode.commands.registerCommand(`${EXTENSION_COMMAND_NAMESPACE}.initialize`, () => invokeInitialize(channel));
	context.subscriptions.push(disposableInitialize);

	const disposableStop = vscode.commands.registerCommand(`${EXTENSION_COMMAND_NAMESPACE}.stop`, () => invokeStop(channel));
	context.subscriptions.push(disposableStop);
}

export function deactivate() {
	channel.dispose();
}