---
title: Install Content Accelerator
---

The Content Accelerator can be installed using a distribution zip.

## Prerequisites
There are a number of software requirements for installing the Content Accelerator:

### Alfresco repository version
See the [Supported Platforms]({% link content-accelerator/latest/support/index.md %}) for more information.

Please ensure you have the correct version of the Content Accelerator package for your Alfresco Content Services version. 
If you are unsure, please contact Alfresco Support.

### Operating System requirements
Operating System and libraries for the target server machine:

* **Windows**: Windows Server 2016 or newer
* **Linux**: CentOS, Ubuntu, RHL, Amazon Linux
   * **TrueType Font set** - A TrueType Font set including Arial is required to be installed onto the instance that is running the OpenContent AMP. Further information can be found [here](https://github.com/tsgrp/HPI/wiki/Installation-Requirements-Font-Install){:target="_blank"}.
  
  >**Note:** The Linux instructions are written for the CentOS version 7 operating system. Some instructions may 
  >require slightly different commands with different Linux operating systems.
  
### Verify installation artifacts
Policy and Procedure Accelerator solution: 

* If using Alfresco Content Services 6.0.x, use the amp file from the `OC_6.0` folder.
* If using Alfresco Content Services 6.1.x-6.2.x, use the amp file from the `OC_6.1+` folder.
* If using Alfresco Content Services 7.x, use the amp file from the `OC_7.0.1+` folder.

Claims Management Accelerator solution:

* If using Alfresco Content Services 6.x, use the amp file from the `OC_6.x` folder.
* If using Alfresco Content Services 7.x, use the amp file from the `OC_7.0.1+` folder.

>**Note:** make sure you are using the `correct tsgrp-opencontent.amp` for your version of Alfresco.

### Node.js
* Node.js (use the latest supported release)
* npm (Node package manager, included with Node.js)

### Web Proxy
The following routes must be proxied to their respective ports and applications. SSL is recommended at a minimum at the 
Proxy layer for Production installations.

* `{Application Base URL}/alfresco`
* `{Application Base URL}/WizardAdmin`
* `{Application Base URL}/ocms`
* `{Application Base URL}/OpenAnnotate`

Verify that the above routes are proxied and configured as specified *OR* that you are running all on the same Alfresco 
Tomcat.

A guide for proxying can be found [here](https://github.com/tsgrp/HPI/wiki/Front-Tomcat-with-Apache){:target="_blank"}.

>**Note:** A proxy is recommended for Non-Development installations.

## Install libraries and AMPs
>**IMPORTANT!** Backup the Alfresco Content Services database, `alfresco.war`, and `share.war`. These resources need to 
>be backed up in case of a rollback being required.

### PDFIUM Installation (OPTIONAL)
>**Note:** This step is only needed if using Alfresco Enterprise Viewer on Linux.

1. Unpack the `pdfium.tar.gz` source to a location on your server.
   
2. Note the path where `pdfium` is being installed as `PDFIUM_HOME`.
   
3. Navigate into the newly unpacked PDFIUM directory.

4. Execute the following command from the `PDFIUM_HOME` to ensure `pdfium` was unpacked successfully:
   
   ```bash
   ./{PDFIUM_HOME}/pdfium --help
   ```
  
   The `pdfium` help message is displayed.

### FFMPEG Installation (OPTIONAL)
>**Note:** This step is only needed if using Alfresco Enterprise Viewer Video.

1. Download and install an official FFMPEG Linux package from [here](https://ffmpeg.org/download.html){:target="_blank"}

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Execute the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

   ```bash
   ./{FFMPEG_HOME}/bin/ffmpeg --help
   ```

   The `ffmpeg` help message is displayed.

### ImageMagick Installation (OPTIONAL)
>**Note:** This step is only needed if using Document Combining.

1. Download and install a portable version of ImageMagick:      

   * [Windows](https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.1.0-portable-Q16-HDRI-x64.zip){:target="_blank"}
   * [Linux](https://download.imagemagick.org/ImageMagick/download/binaries/magick){:target="_blank"}
    
   If on Windows, unzip the file.

2. Note the path where ImageMagick is being installed as `IMAGEMAGICK_HOME`.

3. Navigate into the newly unpacked ImageMagick directory.

4. Execute the following command from the `IMAGEMAGICK_HOME` to ensure `convert` was unpacked successfully:

   ```bash
   ./{IMAGEMAGICK_HOME}/bin/convert -help
   ```

   The `convert` help message is displayed.

### Alfresco Module Packages (AMP) installation
In this section we ensure that all components of the Content Accelerator are installed correctly into Alfresco Content 
Services.

1. Stop the Alfresco server
   
2. Copy the AMPs to the Alfresco Content Services installation:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps to this directory (these are amps that 
   should be applied to the repository - `alfresco.war`):
    * `tsgrp-opencontent.amp`
    * `tsgrp-autofile.amp`
    
3. (OPTIONAL) This step is only required if installing Alfresco Enterprise Viewer:
   
   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:
   * `oa-service-alfresco.amp`

4. (OPTIONAL) This step is only required if installing the Policy and Procedure Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:
   * `tsgrp-alfresco-chain-versioning.amp`

5. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer in Share:

   Navigate to the `ALFRESCO_HOME/amps_share` directory and copy the following amps there:
   * `oa-service-share.amp`
   * `oa-share-webpreview.amp`
   
6. Apply the AMPs
   
   Run this command for each Repository AMP required (replace `{myAmp}` with the correct AMP name):

   Linux:
   
   ```bash
   java -jar bin/alfresco-mmt.jar install amps/{myAMP}.amp tomcat/webapps/alfresco.war -force
   ```
   
   Windows:
   
   ```bash
   java\{javaVersion}\bin\java -jar bin\alfresco-mmt.jar install amps\{myAmp}.amp tomcat\webapps\alfresco.war -force 
   ```

7. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer in Share:

   Run this command for each Share AMP required (replace `{myAmp}` with the correct AMP name):

   Linux:
   
   ```bash
   java -jar bin/alfresco-mmt.jar install amps_share/{myAMP}.amp tomcat/webapps/share.war -force
   ```
   
   Windows:
   
   ```bash
   java\{javaVersion}\bin\java -jar bin\alfresco-mmt.jar install amps_share\{myAmp}.amp tomcat\webapps\share.war -force 
   ```

8. Delete current Alfresco deployed WAR files

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the following folders (if they exist) to ensure 
   old versions of the `alfresco.war` and `share.war` are not run:
   
   * `alfresco`
   * `share`

9. Install license file for OpenConnect

   Navigate to the `ALFRESCO_HOME/tomcat/shared/classes/alfresco` folder and create the following folder structure: 
   `module/com.tsgrp.opencontent/license`.

   Place the `TextLicense.l4j` file in the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/license` 
   directory. The license is now deployed.

10. Configure OpenConnect
   
    Update the environment variables in the provided `opencontent-override-placeholders.properties`:

    Key attributes to set:
   
    * `application.root.url={Application Base URL}/ocms`
    * `FFMPEG.path=FFMPEG_HOME`
    * `imageMagick.path=IMAGEMAGICK_HOME`
    * (LINUX ONLY) `pdfium.path=PDFIUM_HOME` (Defaults to /opt/pdfium)
    * `oc.email.smtp.host=SMTP host`

11. Deploy the OpenConnect configuration: 
    
    Deploy/Copy the following files to the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` 
    folder:
  
    * `opencontent-override-placeholders.properties`
    * `opencontent-override-config.xml`
    * `opencontent-override-module-context.xml`

12. Update Tomcat server configuration:

    Update the `server.xml` located in the `ALFRESCO_HOME/tomcat/conf` directory. Add the following to the connector if 
    not already present:

    * `URIEncoding="UTF-8"`
    * `connectionTimeout="20000"`
    * `maxHttpHeaderSize="32768"`
    * `relaxedQueryChars="{}[]|"`
    * `relaxedPathChars="{}[]|"`
    
    Further information can be found [here](https://github.com/tsgrp/HPI/wiki/Installation-Requirements#encoded-path-and-query-characters){:target="_blank"}
   
    >**Note:** that in a typical Alfresco installation, the 8080 connector can be modified for HTTP communications and 
    >the 443 connector can be modified for HTTPS connections.

12. (OPTIONAL) This step is only required if using Alfresco Search Services 2.0 or greater:

    a. Navigate to the `SOLR_HOME/solrhome/conf` folder.
    
    b. In the file `shared.properties`, uncomment the following properties:
       * `alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`
       * `alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`
       * `alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`
    
    c. Once the above changes have been made, Solr must be reindexed. 
       
       Stop the Solr process if it is running. 
    
       Clear out the following folder paths:
        * `SOLR_HOME/solrhome/alfresco/index`
        * `SOLR_HOME/solrhome/archive/index`
        * `SOLR_HOME/solrhome/alfrescoModels`
      
       Start Solr process.

13. Start up Alfresco server.

## Install webapps
This sections walks through how to install the Alfresco Enterprise Viewer and Content Accelerator web applications 
(including the WizardAdmin if installing the Policy and Procedure Content Accelerator solution).

>**Note:** Choose to run either [Install Web Applications on Separate Tomcat](#install-webapps-separate-tomcat) or 
>[Install Web Applications on Alfresco Tomcat](#install-webapps-alfresco-tomcat), but not both.

### Install web applications on separate Tomcat {#install-webapps-separate-tomcat}
This section walks through how to install the web applications on a separate Tomcat instance (this is recommended for 
a production environment).

1. Stop Tomcat

2. Copy the `ocms.war` file into the `TOMCAT_HOME/webapps` directory.

3. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:
   
   Copy the `OpenAnnotate.war` file into the `TOMCAT_HOME/webapps` directory.

4. (OPTIONAL) This step is only required if using the Alfresco Enterprise Video Viewer:

   Copy the `OpenAnnotateVideo.war` file into the `TOMCAT_HOME/webapps` directory.

5. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Copy the `WizardAdmin.war` file into the `TOMCAT_HOME/webapps` directory.

6. Configure Tomcat for shared classpath loader as well as encoded slashes:
   
   Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line:

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   Then add the following to the `CATALINA_OPTS`:

   `org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true`

6. Configure Tomcat ports:

   Configure the connector, server, and redirect ports to not conflict with Alfresco Tomcat’s (example below):
    
   * Set Connector - `port="9080"`
   * Set Connector - `redirectPort="9443"`
   * Set Server - `port="9005"`

7. Create a `classes` directory:
   
   Create a `classes` directory within the `TOMCAT_HOME/shared` directory, if it does not already exist.

8. (OPTIONAL) Required if setting up SSO:

   Follow steps [here](https://github.com/tsgrp/HPI/wiki/Single-Sign-On-(SSO)){:target="_blank"} to enable SSO.

9. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

   Update the provided `openannotate-override-placeholders.properties` file: 

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   >**Note:** if the Alfresco Enterprise Viewer and the Alfresco Repository are located on the same server, then the 
   >URL can be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`

10. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server” 
    functionality for collaborative annotation functionality:
    
    Update the provided `openannotate-override-placeholders.properties` file:
    
    * `collaborationModeEnabled=true`
    * `collaborationEndpoint=http://${server}:${port}`

    Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for 
    the environment being installed to. 

11. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

    Copy the `openannotate-override-placeholders.properties` file to the `TOMCAT_HOME/shared/classes` directory.

12. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution AND 
    if `TOMCAT_HOME` is NOT `/opt/ocms-policy/apache-tomcat`

    Navigate to `TOMCAT_HOME/webapps` and extract the `WizardAdmin.war`.
    
    Navigate to `TOMCAT_HOME/webapps/WizardAdmin/WEB-INF/classes` and modify the following files to have the proper 
    path to your `TOMCAT_HOME` on the line numbers listed:
    
    * `AbtApplication.properties`:
        * Lines 26, 27, 28, 29, 34
    * `ActiveWizard.properties`:
        * Line 148
    * `ImpactAnalysis.properties`:
        * Lines 26, 29, 39, 40, 42, 48, 49

13. Start Tomcat

### Install web applications on Alfresco Tomcat {#install-webapps-alfresco-tomcat}
This section walks through how to install the web applications on Alfresco Tomcat (recommended for easier 
non-Production environment installation).

1. Stop Alfresco Tomcat

2. Copy the `ocms.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

3. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

   Copy the `OpenAnnotate.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

4. (OPTIONAL) This step is only required if using the Alfresco Enterprise Video Viewer:

   Copy the `OpenAnnotateVideo.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

5. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Copy the `WizardAdmin.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

6. Configure Tomcat for shared classpath loader as well as encoded slashes:

   Edit the `ALFRESCO_HOME/tomcat/conf/catalina.properties` file and enable the `shared.loader` by adding the following line:

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   Then add the following to the `CATALINA_OPTS`:

   `org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true`

6. Create a `classes` directory:

   Create a `classes` directory within the `ALFRESCO_HOME/tomcat/shared` directory, if it does not already exist.

7. (OPTIONAL) Required if setting up SSO:

   Follow steps [here](https://github.com/tsgrp/HPI/wiki/Single-Sign-On-(SSO)){:target="_blank"} to enable SSO.

8. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

   Update the provided `openannotate-override-placeholders.properties` file:

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   >**Note:** the URL can also be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`

9. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server”
   functionality for collaborative annotation functionality:

   Update the provided `openannotate-override-placeholders.properties` file:

   * `collaborationModeEnabled=true`
   * `collaborationEndpoint=http://${server}:${port}`

   Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for
   the environment being installed to.

10. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

    Copy the `openannotate-override-placeholders.properties` file to the `ALFRESCO_HOME/tomcat/shared/classes` directory.

11. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution: 

    Navigate to `ALFRESCO_HOME/tomcat/webapps` and extract the `WizardAdmin.war`.

    Navigate to `ALFRESCO_HOME/tomcat/webapps/WizardAdmin/WEB-INF/classes` and modify the following files to have the proper
    path to your `ALFRESCO_HOME` on the line numbers listed:

    * `AbtApplication.properties`:
        * Lines 26, 27, 28, 29, 34
    * `ActiveWizard.properties`:
        * Line 148
    * `ImpactAnalysis.properties`:
        * Lines 26, 29, 39, 40, 42, 48, 49

12. Start Alfresco Tomcat

## Configure installation 
The purpose of this test is to ensure that the application is set up correctly.

1. Create groups and folders:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/hpi/setup`

2. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Create groups and folders for Policy and Procedure solution:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/wizard/awSetup`

3. Import default configuration:

   In a browser navigate to `{Application Base URL}/ocms/admin/ConfigArchiver` and login to the application as the 
   Alfresco Administrator.

   Use the *Import Config* function to import the `default.zip`.

4. (OPTIONAL) This step is only required if **NOT** using the Alfresco Enterprise Viewer:

   Navigate to the *Stage Config*. For each stage config:
    1.	Navigate to the *docviewer*
    2.	Turn off *Alfresco Enterprise Viewer* and *Alfresco Enterprise Video Viewer*
    3.	Turn on `PDF.js` and `Video.js`
    4.	Click **Save Config**
    
## Install collaboration features
In this section the Alfresco Enterprise Viewer collaboration features Socket.IO server is installed.

>**Note:** that this installation is only required if the collaboration features are desired.

1. Stop Tomcat

2. Install Socket Server

   Use the following installation packages:
   * Windows: Use `socket-servers-win.zip`
   * Linux: Use `socket-server-linux.zip`

   Place the socket-servers zip in the directory where the Collaboration server is to be installed, and unzip it. This 
   will be known as `SOCKET_HOME`.

   This directory will now contain `server.js`, `windows-service.js`, `package.json`, `uninstall-windows-service.js`, 
   `node_modules` and a `config` directory.

3. Test the Socket Server

   To start the collaboration server, navigate to `SOCKET_HOME/node` and run the following command: `node server.js`

   A Node JavaScript server starts listening on port 3000 for connections, and the command prompt displays the message 
   “listening on *:3000”.

4. Stop Socket Server
   
   Press Ctrl+C to end the process.

5. (OPTIONAL) Configure SSL

   To configure SSL, navigate to the `/config` directory and edit the `collaborationConfig.js`. Change the following lines:

   ```text 
   config.httpsPort = <HTTPS_PORT>;
   config.sslKeyPath = <SSL_KEYFILE_PATH>;
   config.sslCertPath = <SSL_CERTFILE_PATH>;
   ```

   Where:

   * `<HTTPS_PORT>` is the port the HTTPS collaboration connection will run on.
   * `<SSL_KEYFILE_PATH>` is a file path to the SSL Key file on the server.
   * `<SSL_CERTFILE_PATH>` is a file path to the SSL Cert file on the server.

6. Install forever tool

   Install forever by running the following command:

   * Linux: `sudo npm install forever -g`
   * Windows: `npm install forever -g`

7. Start the Socket Server

   Start the collaboration server using forever by running the following command:

   `forever start server.js`

8. Open a document using Alfresco Enterprise Viewer

9. View participants

   Open right-sidebar if it is not already, and click on the “Participants” tab in the right-sidebar.
   
   The “Participants” tab shows, and its chat window functions.
   
10. Start Tomcat


