import * as vscode from 'vscode';
import { invoke as invokeInitialize } from './commands/initialize';
import { invoke as invokeStop } from './commands/stop';
import { EXTENSION_NAME } from './utils';

let channel!: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext) {
	channel = vscode.window.createOutputChannel("IIS Express for VSCode");

	const disposableInitialize = vscode.commands.registerCommand(`${EXTENSION_NAME}.initialize`, () => invokeInitialize(channel));
	context.subscriptions.push(disposableInitialize);

	const disposableStop = vscode.commands.registerCommand(`${EXTENSION_NAME}.stop`, () => invokeStop(channel));
	context.subscriptions.push(disposableStop);
}

export function deactivate() {
	channel.dispose();
}