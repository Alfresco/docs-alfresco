---
title: Install AEV into ADF on Windows
---
This documentation is used for the installation of the Alfresco Enterprise Viewer (AEV) into Alfresco Digital Workspace 
(ADF) on Windows.

## Prerequisites
* Access to the Alfresco Content Services installation.
* If the various software do not run on the same Tomcat/Server, a proxy will be
  required so that it appears all requests come from the same base URL.
  A guide for proxying can be found [here](https://github.com/tsgrp/HPI/wiki/Front-Tomcat-with-Apache){:target="_blank"}.
  The steps related to OCMS and ActiveWizard can be ignored.
* `Node.js` and `npm` are installed.

## FFMPEG Installation
Ensure that FFMPEG is properly installed on the deployment server:

1. Download and install an official FFMPEG Windows package from [here](https://ffmpeg.org/download.html){:target="_blank"}

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Execute the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

   ```bash
   {FFMPEG_HOME}\bin\ffmpeg.exe --help
   ```

   The `ffmpeg` help message is displayed.

## Group-Based License Setup (OPTIONAL)
>**Note:** This only needs to be done if you are using a group-based license. The default license is a non-group based license.

Verify that an existing group exists in the Alfresco Repository named according to your license, `{LICENSE_GROUP_NAME}`.
If not, then create a new group called `{LICENSE_GROUP_NAME}` in the Repository. Now, add any users you want to be able
to use OpenAnnotate to group `{LICENSE_GROUP_NAME}`.

## Creating the default annotation folder
Ensure that the default annotation folder for OpenAnnotate is created in Alfresco Repository:

1. In a web browser, navigate to the following URL: `http://${server}:${port}/share`
   >**Note**: Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port
   >values for the Alfresco environment you are installing to.

2. Login to the Alfresco instance.

3. Navigate to the base document library, by clicking document library.

4. Create a new folder called `OpenAnnotate`.

5. Right-click on the `OpenAnnotate` Folder and select **Manage Permissions**. Turn off inherit permissions. If you have
   a group for annotators give that group contributor access otherwise give the `EVERYONE` group contributor access.

6. Click on the `OpenAnnotate` folder to navigate within it. In this empty folder, create a new folder called `Annotations`.

## OpenContent Installation
Ensure that OpenContent is properly installed:

1. Navigate to the server running your Alfresco instance. If Alfresco is currently running, shut it down.

2. Copy the `tsgrp-opencontent.amp` file into the `ALFRESCO_HOME/amps` directory.

3. Install `tsgrp-opencontent.amp` either using `apply_amps.bat` or the `alfresco-mmt.jar`, for example:

   `java -jar bin/alfresco-mmt.jar install amps/tsgrp-opencontent.amp tomcat/webapps/alfresco.war -force`

4. Create a directory within the tomcat `shared` directory at `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/`.
   Create an `opencontent-override-placeholders.properties` file within this directory.

5. Open the `opencontent-override-placeholders.properties` file and set the `FFMPEG.path` property to
   `FFMPEG.path={FFMPEG_HOME}/bin`.

6. In the `opencontent-override-placeholders.properties` file, set the necessary license warning email properties.

   These properties will allow for a warning email to be sent when the license is about to expire or is nearing the
   max number of allowed users. The warning email will use the configured `{oc.email.smtp.host}` to send an email from
   `{oc.email.smtp.default.from}` to all comma separated recipients contained in the `{license.warning.email.recipients}`
   property:

   ```text
   oc.email.smtp.host=
   oc.email.smtp.default.from=
   license.warning.email.recipients=
   ``` 

7. Create a directory within the tomcat `shared` directory at
   `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/license`.

8. Place your `TextLicense.l4j` file in the license directory. This will apply the OpenContent license on startup.

9. For Alfresco Tomcat set the `relaxedQueryChars/relaxedPathChars` configuration by following this
   [procedure](https://github.com/tsgrp/HPI/wiki/Installation-Requirements#encoded-path-and-query-characters){:target="_blank"}.

10. Start Tomcat.

11. Test: Navigate to `http://${alfresco-servername}/alfresco/OpenContent` within a web browser. The OpenContent home
    page, indicating that OpenContent has been successfully deployed, should be displayed.

## OpenAnnotate Installation
Ensure OpenAnnotate is properly installed:

1. Navigate to the server with Tomcat running OpenAnnotate. If Tomcat is running, shut down Tomcat.

2. Navigate to the `TOMCAT_HOME/webapps` directory and delete any existing `OpenAnnotate.war` files as well as the
   `OpenAnnotate` unzipped directory.

3. Place the `OpenAnnotate.war` into the `TOMCAT_HOME/webapps` directory.

4. Make sure the server running OpenAnnotate is configured to use the shared folder.
   Open `TOMCAT_HOME/conf/catalina.properties`.
   Confirm the `shared.loader` property has the value: `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

5. Create a `classes` directory within the tomcat `shared` directory at `TOMCAT_HOME /tomcat/shared/classes/`, if it
   does not already exist.

6. In the `classes` directory, create an `openannotate-override-placeholders.properties` file.

7. Within the `openannotate-override-placeholders.properties` file, edit the `ocRestEndpointAddress` property to point
   to the root REST endpoint URL for OpenContent within Alfresco:

   `ocRestEndpointAddress=ALFRESCO_SERVER/alfresco/OpenContent`

   Edit the `clientRequestUrl` to point to the root REST endpoint URL for OpenContent within Alfresco:

   `clientRequestUrl=ALFRESCO_SERVER/alfresco/OpenContent`

   If the environment uses a load balancer/proxy, ensure the `clientRequestURL` refers to the load balancer/proxied
   OpenContent URL.

8. Start Tomcat.

9. Test: Try to open an Alfresco PDF document via OpenAnnotate, and attempt to make an annotation on the document.
   Document should be successfully rendered within OpenAnnotate, and the annotation is successfully saved.
   
## Integrating AEV into the ADF App
Ensure the Application Development Framework (ADF) application is configured properly to use Alfresco Enterprise Viewer 
(AEV). Here we assume that the ADF project is available to the tester, and the tester can build and deploy the 
application to their environment. Enterprise Viewer and Enterprise Viewer – Video must be proxied to the same host as 
the ADF application.

1. Unzip the `adf-aev.zip` file and place the `alfresco-enterprise-viewer` component folder within the ADF application at 
   path `{root-adf-app}/src/app/`
   
2. Navigate to the `{root-adf-app}/src/app/app.module.ts` file. Include within the import section 
   `import { AlfrescoEnterpriseViewerComponent } from './alfresco-enterprise-viewer/alfresco-enterprise-viewer.component';`
   Then within the ngModule’s declarations array add the component `AlfrescoEnterpriseViewerComponent`, like the other 
   components listed.

3. Navigate to the `{root-adf-app}/src/app/file-view/file-view.component.td` file. Include within the import section 
   `import { Node } from '@alfresco/js-api'`. Add the `node: Node;` code to the member variables of the component. Set 
   this member variable with `this.node = node;` code within the API service callback after the undefined check.

4. Navigate to the `{root-adf-app}/src/app/file-view/file-view.component.html` file. Within the `adf-viewer` tag, 
   insert the following code:
   ```xml
   <adf-viewer-extension [supportedExtensions]="['pdf','mp4']" #extension>  
    <ng-template>  
        <alfresco-enterprise-viewer [node]="node"></alfresco-enterprise-viewer>  
    </ng-template>  
   </adf-viewer-extension>
   ```

5. Navigate to the `{root-adf-app}/src/app.config.json` file. At the bottom of the json object, add the following code:

   ```json
   "alfresco-enterprise-viewer": {
      "$version": "1.0.0",
      "properties": {
         "endpoints": {
            "aev": "/OpenAnnotate",
            "aevVideo": "/OpenAnnotateVideo"
         },
         "alfrescoDocumentStorePrefix": "workspace://SpacesStore/",
         "supportedMimetypes": {
            "documents": [
               "application/pdf"
            ],
            "videos": [
               "video/mp4"
            ]
         }
      }
   }
   ```
   
6. Build and deploy the ADF application. 
   
7. Test: Login and try to view a pdf document. Try to access an mp4 document.

## OpenAnnotateVideo Installation
Ensure OpenAnnotateVideo is properly installed.

1. Navigate to the server with Tomcat running OpenAnnotateVideo. If Tomcat is running, shut down Tomcat.

2. Navigate to the `TOMCAT_HOME/webapps` directory and delete any existing `OpenAnnotateVideo.war` files as well as
   the `OpenAnnotateVideo` unzipped directory.

3. Place the `OpenAnnotateVideo.war` into the `TOMCAT_HOME/webapps` directory.

4. Start Tomcat.

5. Test: Try to open a MP4 file within Alfresco Share UI. The Alfresco Share viewer is then replaced with the
   OpenAnnotateVideo viewer, showing the MP4 file.

6. Test: Attempt to play the MP4 file. The video is successfully played in OpenAnnotateVideo.

7. Test: Attempt to make and save an annotation on a video. The annotation is successfully saved.

8. Test: Reload the video within OpenAnnotateVideo. Video is successfully rendered within OpenAnnotateVideo, and
   the saved annotation is successfully loaded.

## Install OpenAnnotate Collaboration Features Integration
Ensure that OpenAnnotate’s collaboration features Socket.IO are installed properly.

1. Install `Node.js` if it is not installed in the environment. Download the installer from
   [here](https://nodejs.org/en/download/){:target="_blank"}.
   Run the installer.

2. Navigate to the server with Tomcat running OpenContent and OpenAnnotate. If Tomcat is running, shut down Tomcat.

3. Place the `socket-server.zip` in the directory where the Collaboration server is to be installed, and unzip it. The
   unzipped directory should contain the following files: `server.js`, `windows-service.js`, `package.json`,
   `uninstall-windows-service.js`, and a `config` directory is created.

4. Navigate to the unzipped directory containing `server.js`, open a command prompt in that directory, run the command
   `node server.js`. A Node server starts listening on port `3000` for connections, and the command prompt displays the
   message *listening on *:3000*

5. To configure SSL, optionally, navigate to the `/config` directory and edit the `collaborationConfig.js`. Change the
   following lines:

   ```text
   config.httpsPort = <HTTPS_PORT>;
   config.sslKeyPath = <SSL_KEYFILE_PATH>;
   config.sslCertPath = <SSL_CERTFILE_PATH>;
   ```

   Where:
    * `<HTTPS_PORT>` is the port the HTTPS collaboration connection will run on.
    * `<SSL_KEYFILE_PATH>` is a file path to the SSL Key file on the server.
    * `<SSL_CERTFILE_PATH>` is a file path to the SSL Cert file on the server.

6. In the same console and directory as Step 4, press `Ctrl-C`  then run the command: `node windows-service.js`.
   A Windows Service named *OpenAnnotate Collaboration Server Service* is installed and started. Node server starts
   listening on port `3000` for connections, and the command prompt displays the message
   *OpenAnnotate Collaboration Server Service started!*

7. Make sure the Tomcat is configured to use the shared folder.
   Open `TOMCAT_HOME/conf/catalina.properties`.
   Confirm the `shared.loader` property has the value: `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

8. Create a `classes` directory within the tomcat `shared` directory at `TOMCAT_HOME /tomcat/shared/classes/`, if it
   does not already exist.

9. In the `classes` directory, create an `openannotate-override-placeholders.properties` file, if one does not already exist.

10. Within the `openannotate-override-placeholders.properties` file, add the `collaborationModeEnabled` and
    `collaborationEndpoint` properties, each on a new line, set to true:

    ```text
    collaborationModeEnabled=true
    collaborationEndpoint=http://${server}:${port}
    ```

    Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for
    the environment being installed to. The port is not necessary if a proxy has been set up.

11. Start Tomcat.

12. Test: In a web browser, open a document using OpenAnnotate. Make sure OpenAnnotate opened and loaded.

13. Test: Open right-sidebar if it is not already, and click on the *Participants* tab in the right-sidebar.
    The *Participants* tab shows, and its chat window functions.