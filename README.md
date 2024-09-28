# ![logo](https://github.com/nomis51/iis-express-vscode/blob/master/images/logo-small.png?raw=true) IIS Express for VSCode

Simple extension that let you easily integrate IIS Express into your ASP.NET projects with VSCode. 

Fully-fledge IDEs such as Visual Studio or JetBrains Rider already have the tooling to do that, but it is lacking in VSCode. The very few extensions are available either don't support all the features available with IIS Express or require the use of 3rd-party software to work. 

This extension uses VSCode `tasks`, `launch` configurations, generated scripts and generated IIS Express specific configuration files to work, that's it.

![image](https://github.com/user-attachments/assets/2a22ad1b-fbcd-4dc9-9703-74a56c9faf6e)

## Features
- Integrates with new and existing projects
- Uses your `launchSettings.json` to configure IIS Express
- Does all the IIS Express configuration for you (that you can edit manually if you wish to)
- Start debugging with one key press (`F5`)
- IIS Express output available in the terminal
- IIS Express stdout logs available in the build folder (e.g. `bin/Debug/net8.0/.iis-express/logs`)
- Closes IIS Express when you stop debugging (and the debugger also stops when you close IIS Express)
- Can start in `Debug` or `Release` configuration (using predefined tasks)  
- You can edit every configuration and script as you wish

## Requirements
- IIS Express (usually comes with Visual Studio Web Developpement installation module)

## Installation
The extension is currently *not* on the VSCode extension marketplace, until it hits version 1.0.

As of now, use the VSIX build available in the [`Release`](https://github.com/nomis51/iis-express-vscode/releases/latest) section or build it yourself using the `yarn package` command.

![image](https://github.com/user-attachments/assets/94f2e519-8e67-4a3e-a1d7-ab72a2c16c12)

## Get started
- Install the extension
- Open a new or existing ASP.NET project
- Open the command palette (`Ctrl + Shift + P`)
- Type `IIS Express`
- Select the `IIS Express: Initialize` command
- Select the `Starting project`
- Follow the simple instructions
- Press `F5` to start the application

You can pick a configuration in the Debug tab (default Debug)

![image](https://github.com/user-attachments/assets/d845e522-9c5c-450f-88a6-e1a6bf47105a)

## Commands
- `IIS Express: Initialize` : Setup the current solution to be able to boot a project with IIS Express
- `IIS Express: Stop` : Manually closes any IIS Express instances running (sometimes IIS Express can get stuck. Can also happens in other IDEs like Visual Studio or JetBrains Rider, so here's a quick command to stop it)

## Developping
- Clone the repository
- Install packages using `yarn`
- Hit `F5` to launch the extension in a VSCode sandbox
