---
title: Enterprise Viewer Installation Guide
---

## Prerequisites

### Java

Alfresco Enterprise Viewer requires Java 11 or above. Consult your repository of choice for more detailed requirements. For example, Alfresco 4.0 and 4.1 require Java 1.6.  Alfresco 4.2 requires Java 1.7.

If Installing ACA and AEV we reccomend following the ACA install guide first. 

### OpenContent

OpenContent is a prerequisite before Alfresco Enterprise Viewer can be installed. For OpenContent installation instructions, please see the [OpenContent Installation Guide](https://github.com/tsgrp/OpenContent/wiki/Installation-guide). Note: you MUST install OpenContent before Alfresco Enterprise Viewer will function, so be sure to follow those steps before continuing.

## Install Libraries

### PDFIUM Installation (OPTIONAL) {#pdfium}
>**Note:** This step is only needed if using Alfresco Enterprise Viewer on Linux.

1. Unpack the `pdfium.tar.gz` source to a location on your server.
   
2. Note the path where `pdfium` is being installed as `PDFIUM_HOME`.
   
3. Navigate into the newly unpacked `PDFIUM_HOME` directory.

4. Execute the following command from the `PDFIUM_HOME` to ensure `pdfium` was unpacked successfully:
   
   ```bash
   ./pdfium --help
   ```
  
   The `pdfium` help message is displayed.

### FFMPEG Installation (OPTIONAL)  {#ffmpeg}
>**Note:** This step is only needed if using Alfresco Enterprise Viewer Video.

1. Download and install an official FFMPEG package from [here](https://ffmpeg.org/download.html){:target="_blank"}. Use the latest supported release. 

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Execute the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

   ```bash
   ./{FFMPEG_HOME}/ffmpeg --help
   ```

   The `ffmpeg` help message is displayed.

## Install collaboration (optional)  {#collab}
In this section the Alfresco Enterprise Viewer collaboration features Socket.IO server is installed.

>**Note:** that this installation is only required if the collaboration features are desired.

1. Install Node.js

   Both NodeJS and npm will need to be installed. Follow the Node.js install instructions at https://nodejs.org/

   * Node.js (use the latest version your OS supports)
   * npm (Node package manager, included with Node.js)

1. Install Socket Server

   Use the following installation packages:
   * Windows: Use `socket-servers-win.zip`
   * Linux: Use `socket-server-linux.zip`

   Place the socket-servers zip in the directory where the Collaboration server is to be installed, and unzip it. This 
   will be known as `SOCKET_HOME`.

   This directory will now contain `server.js`, `windows-service.js`, `package.json`, `uninstall-windows-service.js`, 
   `node_modules` and a `config` directory.

1. Test the Socket Server

   To start the collaboration server, navigate to `SOCKET_HOME` and run the following command: `node server.js`

   A Node JavaScript server starts listening on port 3000 for connections, and the command prompt displays the message 
   “listening on *:3000”.

1. Stop Socket Server
   
   Press Ctrl+C to end the process.

1. Install forever tool

   Install forever by running the following command:

   * Linux: `sudo npm install forever -g`
   * Windows: `npm install forever -g`

1. Start the Socket Server

   Start the collaboration server using forever by running the following command:

   `forever start server.js`

## Configure Alfresco and Share for AEV

1. Stop Alfresco

1. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer in Share:

   Navigate to the `ALFRESCO_HOME/amps_share` directory and copy the following amps there:
   * `oa-service-share.amp`
   * `oa-share-webpreview.amp`
   * `oa-service-share.amp`

1. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer in Share:

   From the directory where your alfresco tomcat lives, run this command for each Share AMP required (replace `{myAmp}` with the correct AMP name):

   Linux:
   
   ```bash
   java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps_share/{myAMP}.amp tomcat/webapps/share.war -force
   ```
   
   Windows:
   
   ```bash
   java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps_share\{myAmp}.amp tomcat\webapps\share.war -force 
   ```

1. Configure OpenConnect
   
    Update the environment variables in the provided `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/opencontent-override-placeholders.properties`:

    If you installed ffmpeg and pdfium above, update these properties:
   
    * `FFMPEG.path=FFMPEG_HOME` (if installed, get FFMPEG_HOME value from [FFMPEG Installation](#ffmpeg))
    * `pdfium.path=PDFIUM_HOME` (if installed, get PDFIUM_HOME value from [Pdfium Installation](#pdfium))

1. Start alfresco

## Install webapps
This sections walks through how to install the Alfresco Enterprise Viewer web application. AEV can be installed on the same tomcat as Alfresco or it can be installed on a separate tomcat using a proxy. See the http://ACA Install guide#Install_Proxy section for more information on installing a proxy. 

>**Note:** If you installed a proxy then follow the [Install Web Applications on Separate Tomcat](#install-webapps-separate-tomcat) Instructions. 
> If no proxy was installed then follow the [Install Web Applications on Alfresco Tomcat](#install-webapps-alfresco-tomcat) instructions. 

### Install web applications on separate Tomcat {#install-webapps-separate-tomcat}
This section walks through how to install the web applications on a separate Tomcat instance (meaning, you must have a proxy setup).

1. Install Apache Tomcat. See https://archive.apache.org/dist/tomcat. Note that if you installed aca, you can utilize the same tomcat you may have installed for aca - shut it down now if its already running. 

1. Copy the `OpenAnnotate.war` file into the `TOMCAT_HOME/webapps` directory.

1. (If not already configured in the aca install) - Configure Tomcat for shared classpath loader as well as encoded slashes:
   
   Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line (if not already there):

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like the following:
   ```
   /hpi/{aca-module}/{object-id}
   ```
   In the above case, the object ID is URL encoded.  This means that forward slashes in the object ID are URL encoded to `%2F`.  By default, Tomcat does not serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue, edit the `TOMCAT_HOME/conf/catalina.properties` file and add the following line (if not already there):
   ```
   org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
   ```

1. (If not already configured in the aca install) - Configure Tomcat ports in the `TOMCAT_HOME/conf/server.xml`:

   Configure the connector, server, and redirect ports to not conflict with Alfresco Tomcat’s (example below):
    
   * Set Connector - `port="9090"` (default will be 8080)
   * Set Connector - `redirectPort="9443"` (default will be 8443)
   * Set Server - `port="9005"` (default will be 8005)

   Note that you will need to ensure that the port chosen (ie 9090) is open to the end user

1. (If not already configured in the aca install) - Create a `classes` directory:
   
   Create the path `TOMCAT_HOME/shared/classes`, if it does not already exist.

1. Update the provided `openannotate-override-placeholders.properties` file: 

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   >**Note:** if the Alfresco Enterprise Viewer and the Alfresco Repository are located on the same server, then the 
   >URL can be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`


   (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server”  functionality for collaborative annotation functionality:
    
    Update the following properties:

    * `collaborationModeEnabled=true`
    * `collaborationEndpoint=http://${server}:${port}`

    Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for 
    the environment being installed to (See the section [Install collaboration features](#collab)))

1. Copy the `openannotate-override-placeholders.properties` file to the `TOMCAT_HOME/shared/classes` directory.

1. Start Tomcat

### Install web applications on Alfresco Tomcat {#install-webapps-alfresco-tomcat}
This section walks through how to install the web applications on Alfresco Tomcat (recommended for easier 
non-Production environment installation).

1. Stop Alfresco Tomcat

1. Copy the `OpenAnnotate.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

1. Create a `classes` directory:

   Create a `classes` directory within the `ALFRESCO_HOME/tomcat/shared` directory, if it does not already exist.
   
1. Update the provided `openannotate-override-placeholders.properties` file:

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   >**Note:** the URL can also be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`

1. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server”
   functionality for collaborative annotation functionality:

   Update the provided `openannotate-override-placeholders.properties` file:

   * `collaborationModeEnabled=true`
   * `collaborationEndpoint=http://${server}:${port}`

   Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for
   the environment being installed to. (See the section [Install collaboration features](#collab)))

1. Copy the `openannotate-override-placeholders.properties` file to the `ALFRESCO_HOME/tomcat/shared/classes` directory.

1. Start Alfresco Tomcat
