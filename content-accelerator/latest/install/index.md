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
Policy and Procedure Accelerator: 

* If using Alfresco Content Services 6.0.x, use the amp file from the `OC_6.0` folder.
* If using Alfresco Content Services 6.1.x-6.2.x, use the amp file from the `OC_6.1+` folder.
* If using Alfresco Content Services 7.x, use the amp file from the `OC_7.0.1+` folder.

Claims Management Accelerator:

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

A guide for proxying can be found [here](https://github.com/tsgrp/HPI/wiki/Front-Tomcat-with-Apache){:target"_blank"}.

>**Note:** A proxy is recommended for Non-Development installations.

## Installation
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

1. Download and install an official FFMPEG Linux package from [here](https://ffmpeg.org/download.html){:target"_blank"}

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Execute the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

   ```bash
   ./{FFMPEG_HOME}/bin/ffmpeg --help
   ```

   The `ffmpeg` help message is displayed.

### ImageMagick Installation (OPTIONAL)
>**Note:** This step is only needed if using Document Combining.

1. Download and install a portable version of ImageMagick  [here](https://ffmpeg.org/download.html){:target"_blank"}

   * [Windows](https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.0.11-2-portable-Q16-HDRI-x64.zip){:target"_blank"}
   * [Linux](https://download.imagemagick.org/ImageMagick/download/binaries/magick){:target"_blank"}
    
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

4. (OPTIONAL) This step is only required installing the Policy and Procedure Content Accelerator:

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
    
    Further information can be found [here](https://github.com/tsgrp/HPI/wiki/Installation-Requirements#encoded-path-and-query-characters){:target"_blank"}
   
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

