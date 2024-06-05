# ![logo](https://github.com/nomis51/iisexpress-vscode/blob/dev/images/logo-small.png?raw=true) IIS Express for VSCode


Simple extension that let you easily integrate IIS Express into your ASP.NET projects with VSCode. 

Fully-fledge IDEs such as Visual Studio or JetBrains Rider already have the tooling to do that, but it is lacking in VSCode. The very few extensions are available either don't support all the features available with IIS Express or require the use of 3rd-party software to work. 

This extension uses VSCode `tasks`, `launch` configurations, generated scripts and generated IIS Express specific configuration files to work, that's it.

## Features
- Integrates with new and existing projects
- Uses your `launchSettings.json` to configure IIS Express
- Does all the IIS Express configuration for you (that you can edit manually if you wish to)
- Start debugging with one key press (`F5`)
- IIS Express output available in the terminal
- IIS Express stdout logs available in the build folder (e.g. `bin/Debug/net8.0/.iis-express/logs`)
- Closes IIS Express when you stop debugging (and the debugger also stops when you close IIS Express)

## Requirements
- IIS Express (usually comes with Visual Studio Web Developpement installation module)

## Get started
- Install the extension
- Open a new or existing ASP.NET project
- Open the command palette (`Ctrl + Shift + P`)
- Type `IIS Express`
- Select the `IIS Express: Initialize` command
- Select the `Starting project`
- Press `F5`

## Commands
- `IIS Express: Initialize` : Setup the current solution to be able to boot a project with IIS Express
- `IIS Express: Stop` : Manually closes any IIS Express instances running (sometimes IIS Express can get stuck. Can also happens in other IDEs like Visual Studio or JetBrains Rider, so here's a quick command to stop it)
