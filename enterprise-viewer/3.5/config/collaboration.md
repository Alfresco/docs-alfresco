---
title: AEV collaboration features
---

Alfresco Enterprise Viewer has support for real-time collaboration features including real-time annotations, chat functionality, and presentation mode. To take advantage of these collaboration features, a web socket server must be installed and configured. Currently, the only web socket implementation of Enterprise Viewer is one that uses [Socket.IO](http://socket.io/){:target="_blank"} built on a Node server. See the [Node website](https://nodejs.org/){:target="_blank"} for more information.

You can see a [screen capture of the collaboration features](https://www.youtube.com/watch?v=yUOtGXHnxXo){:target="_blank"} in YouTube.

## Install NodeJS

In order to use the collaboration features, you must first install Node on the server that will act as the collaboration server.

1. Download the appropriate installer from the [NodeJS website](https://nodejs.org/download/){:target="_blank"}.

    On Windows, use [Nodist](https://github.com/marcelklehr/nodist){:target="_blank"} to easily manage NodeJS installations.

    On Linux, follow the [instructions](https://github.com/nodesource/distributions){:target="_blank"} to install from the command-line.

2. Run the installer to completion.

    Make sure that the path to your installed instance of Node is on the system `PATH`.

To verify that Node is installed successfully and has been added to the system `PATH`, open a command prompt from any directory, type each command, and press the ENTER key after each one:

  ```bash
  node -v
  npm -v
  ```

The version of Node and `npm` are output on the command-line. `npm` is a command-line tool for installing Node packages.

## Collaboration server port

The node server port is configured in the `config/collaborationConfig.js` file. By default, the collaboration server listens for HTTP requests on port `3000` and does not listen on an HTTPS port.

The HTTP port can be configured by modifying the following line:

```text
config.httpPort = 3000;
```

The collaboration server can support listening on an HTTPS port as well. Note that you can configure HTTP _and_ HTTPS, as well as one or the other. To listen on a port with SSL, configure the following properties (example values shown):

  ```text
  config.httpsPort = 3000;
  config.sslKeyPath = "../../../Apache/Apache24/conf/certificates/{my-key}.key";
  config.sslCertPath = "../../../Apache/Apache24/conf/certificates/{my-cert}.crt";
  ```

Note that the file path properties are relative to wherever the `server.js` file is located.

## Configure Enterprise Viewer to connect to the Node server

In order to use the Node server, you must configure Enterprise Viewer to use it. The two properties that must be set are the `collaborationEndpoint` and `collaborationModeEnabled` properties. For more information on these properties and how to set these properties, read [AEV configuration files]({% link enterprise-viewer/3.5/config/files.md %}).

## Collaboration modes

With collaboration features enabled, Enterprise Viewer can be run in: normal mode or collaboration mode.

### Normal mode

Normal mode is the default mode for Enterprise Viewer. This mode does not include any collaboration features. It is configured by setting the `collaborationModeEnabled` property to `false`.

### Collaboration mode

Collaboration mode is the mode that enables real-time annotations and well as chat functionality. It is configured by setting the `collaborationModeEnabled` property to `true`.
