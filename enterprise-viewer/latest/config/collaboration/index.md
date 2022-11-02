---
title: Alfresco Enterprise Viewer Collaboration Features
---

Alfresco Enterprise Viewer has support for real-time collaboration features including real-time annotations, chat functionality and presentation mode. In order to take advantage of these collaboration features, a web socket server must be installed and configured. Currently the only web socket implementation of Alfresco Enterprise Viewer is one that uses [Socket.IO](http://socket.io/) built on a Node server (for more information on Node, visit their [website](https://nodejs.org/). A screen capture of the collaboration features can be seen [here](https://www.youtube.com/watch?v=yUOtGXHnxXo).

## Installing Node

In order to use the collaboration features, you must first install Node on the server that will act as the collaboration server. Download the appropriate installer from the [NodeJS website](https://nodejs.org/download/) or use [Nodist](https://github.com/marcelklehr/nodist) to easily manage NodeJS installations on Windows. On Linux, follow the instructions on this [here](https://github.com/nodesource/distributions) to install from the command line.  Run the installer to completion. You must ensure that the path to your installed instance of Node is on the system PATH. To verify that Node was installed successfully and has been added to the system PATH, open a command prompt from any directory and type the following commands (pressing the ENTER key after each command):

    node -v

    npm -v

After each command, the version of Node and npm should be output on the command line. `npm` is a command line tool for installing Node packages.


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

In order to utilize the Node server, you must configure Alfresco Enterprise Viewer to use it. The two properties that must be set are the `collaborationEndpoint` and `collaborationModeEnabled` properties. For more information on these properties and how to set these properties, read [AEV Configuration Files]({% link enterprise-viewer/latest/config/files/index.md %}).

## Collaboration Modes

With collaboration features enabled, Alfresco Enterprise Viewer can be run in: normal mode or collaboration mode.

### Normal Mode

Normal mode is the default mode for Alfresco Enterprise Viewer. This mode does not include any collaboration features. It is configured by setting the `collaborationModeEnabled` property to `false`.

### Collaboration Mode

Collaboration mode is the mode that enables real-time annotations and well as chat functionality. It is configured by setting the `collaborationModeEnabled` property to `true`.


