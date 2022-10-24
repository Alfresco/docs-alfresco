---
title: Alfresco Enterprise Viewer Collaboration Features
---

Alfresco Enterprise Viewer has support for real-time collaboration features including real-time annotations, chat functionality and presentation mode. In order to take advantage of these collaboration features, a web socket server must be installed and configured. Currently the only web socket implementation of Alfresco Enterprise Viewer is one that uses [Socket.IO](http://socket.io/) built on a Node server (for more information on Node, visit their [website](https://nodejs.org/). A screen capture of the collaboration features can be seen [here](https://www.youtube.com/watch?v=yUOtGXHnxXo).

## Installing Node

In order to use the collaboration features, you must first install Node on the server that will act as the collaboration server. Download the appropriate installer from the [NodeJS website](https://nodejs.org/download/) or use [Nodist](https://github.com/marcelklehr/nodist) to easily manage NodeJS installations on Windows. On Linux, follow the instructions on this [here](https://github.com/nodesource/distributions) to install from the command line.  Run the installer to completion. You must ensure that the path to your installed instance of Node is on the system PATH. To verify that Node was installed successfully and has been added to the system PATH, open a command prompt from any directory and type the following commands (pressing the ENTER key after each command):

    node -v

    npm -v

After each command, the version of Node and npm should be output on the command line. `npm` is a command line tool for installing Node packages.

## Developing on Socket.IO with Node

The only web socket implementation for Alfresco Enterprise Viewer uses Socket.io on a Node server. The source code is located at the following SVN location:

[http://svn.tsgrp.com/repos/annotationtool/trunk/socket-servers/node](http://svn.tsgrp.com/repos/annotationtool/trunk/socket-servers/node)

After pulling down the source code, open a command prompt in the root directory where the source was pulled down and run the following command:

   npm install

This will install all of the dependencies listed in the `package.json` file and is the only step needed to install your node server. After installing the dependencies, there are multiple ways to start the node server:

1. Commandline execution
This will launch the server in a command prompt window, which must remain open. If the server is restarted or the command prompt window is closed, the server is stopped and must manually be restarted. To launch node in commandline mode, execute the command:

    `node server.js`

1. Windows Service
This will install the collaboration server as a windows service that can be maintained exactly like any other windows service from the services admin control panel. This is recommended for server installs since it will automatically start up if the server gets restarted for any reason. To install and start the windows service, execute the command:

    `node windows-service.js`

1. Linux daemon
To install and start running the collaboration server on node in a linux environment, execute the commands:

    `npm install -g forever`

    `forever start server.js`

## Collaboration Server Port

The node server port is configured in the `config/collaborationConfig.js` file.  By default, the collaboration server listens for HTTP requests on port 3000 and does not listen on an HTTPS port.

The HTTP port can be configured by modifying the following line:

    config.httpPort = 3000;

The collaboration server can support listening on an HTTPS port as well.  Note that you can configure HTTP _and_ HTTPS, as well as one or the other.  To listen on a port with SSL, configure the following properties (example values shown):

    config.httpsPort = 3000;
    config.sslKeyPath = "../../../Apache/Apache24/conf/certificates/{my-key}.key";
    config.sslCertPath = "../../../Apache/Apache24/conf/certificates/{my-cert}.crt";

Note that the file path properties are relative to wherever the `server.js` file is located.

## Configuring Alfresco Enterprise Viewer to Connect to the Node Server

In order to utilize the Node server, you must configure Alfresco Enterprise Viewer to use it. The two properties that must be set are the `collaborationEndpoint` and `collaborationModeEnabled` properties. For more information on these properties and how to set these properties, read [AEV Configuration Files]({% link enterprise-viewer/latest/config/files.md %}).

## Collaboration Modes

With collaboration features enabled, there are three different modes that Alfresco Enterprise Viewer can be run in: normal mode, collaboration mode and presenter mode.

### Normal Mode

Normal mode is the default mode for Alfresco Enterprise Viewer. This mode does not include any collaboration features. It is configured by setting the `collaborationModeEnabled` property to `false`.

### Collaboration Mode

Collaboration mode is the mode that enables real-time annotations and well as chat functionality. It is configured by setting the `collaborationModeEnabled` property to `true`.

### Presenter Mode

Presenter mode is a more specific form of collaboration mode; it has all the features of collaboration mode but enables one user to be the presenter and all other users to be participants. The presenter controls what page all participants are viewing as well as where in the page the viewports are set and at what zoom level. This mode is enabled by having the `collaborationModeEnabled` property set to `true` and using Alfresco Enterprise Viewer with the URL GET parameter `presenterMode` set to `true`.

For example, if `collaborationModeEnabled` is set to `true` in my `override-placeholders.properties` file and I visit the following URL:

    http://localhost:${my_port}/OpenAnnotate/viewer.htm?docId=${docId}&presenterMode=true

I will be viewing Alfresco Enterprise Viewer using presenter mode. The first user to view a document or collection will be the presenter. Only the presenter may pass the presenting privileges to other participants viewing the document or collection.
