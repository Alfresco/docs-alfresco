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

* If using Alfresco Content Services 7.0.1-7.2.x, use the amp file from the `OC_7.0+` folder.
* If using Alfresco Content Services 7.3, use the amp file from the `OC_7.3+` folder.

>**Note:** make sure you are using the correct `tsgrp-opencontent.amp` for your version of Alfresco.

### Node.js
* Node.js (use the latest supported release)
* npm (Node package manager, included with Node.js)

## Install Apache (Optional)

### Web Proxy Background
ACA must be exposed on the same port as OpenContent.  In other words, if the user accesses ACA using  `http://myserver:8080/hpi`, then ACA must make Ajax requests to OpenContent at: `http://myserver:8080/OpenContent`.  

Since ACA executes as a JavaScript application in the browser and communicates with OpenContent on the server, you must account for the [Same-Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy).  There are two ways to handle this:

1. Deploy the ACA war to the same Application Server that's running OpenContent.  This ensures that ACA is sourced from the same server and port as OpenContent.  Note - for this to work, the application server port must be accessible to the end user's browser.
2. Front all communication from ACA to OpenContent through a web server. 
   * Install ACA on `http://myserver1:9090/hpi`
   * Install OpenContent on `http://myserver2:8080/OpenContent`
   * Setup Apache to route:
   * `http://myserver3/hpi` routes to `http://myserver1:9090/hpi` 
   * `http://myserver3/OpenContent` routes to `http://myserver2:8080/OpenContent`

In the above example, ACA would be configured to access OpenContent at `http://myserver3/OpenContent`.  Now, to the browser all communication is on the same protocol, server, and port so the Same Origin Policy is upheld.

If using option 1 (deploying aca/aev to the Alfresco Tomcat), you can skip to the next section.

If using option 2 (preferred for a production deployment), you must complete the following:

Durring install, the following routes must be proxied to their respective ports and applications. SSL is recommended at a minimum at the 
Proxy layer for Production installations.

Policy and Procedure Accelerator solution: 

* `{Application Base URL}/alfresco`
* `{Application Base URL}/share`
* `{Application Base URL}/WizardAdmin`
* `{Application Base URL}/ocms`
* `{Application Base URL}/OpenAnnotate`
* `{Application Base URL}/oat` (if installed)

Claims Management Accelerator solution:

* `{Application Base URL}/alfresco`
* `{Application Base URL}/share`
* `{Application Base URL}/ocms`
* `{Application Base URL}/OpenAnnotate`
* `{Application Base URL}/oat` (if installed)


Use the Instructions below to front OCMS/OpenAnnotate/ActiveWizard installed on a webserver such as Tomcat with Apache. Server values will need to be updated to match your environment. 

This page assumes that you're deploying ACA with the following setup:

- Tomcat port 8080 - alfresco.war, share.war
- Tomcat port 9090 - ocms.war, OpenAnnotate.war, WizardAdmin.war

#### *Nix
Obtain installation files from https://httpd.apache.org/download.cgi

#### Windows
Obtain binaries from https://www.apachelounge.com/download/

Install Apache to `C:\Apache\Apache24` (change to your desired version as appropriate).  This is referred to as `${apache.home}` below.

- Navigate to `${apache.home}\conf` and open up `httpd.conf`
- Find the line that has ServerRoot on it  
   - It should default to something like `ServerRoot "c:/Apache24"`
   - Change the ServerRoot to where you extracted Apache
- If you would like to install as a service, consult the Readme.txt file that comes with the installation.

### Connect Apache Web Server to Alfresco Tomcat
Note, remember to replace `${apache.home}` in all steps below with the Apache installation home folder from your installation.

1. (WINDOWS) Modify httpd.conf (${apache.home}\conf\httpd.conf) to load the Virtual Hosts configuration file, and the Proxy, ProxyAJP, and Rewrite modules.  **Uncomment** the following lines:

           Include conf/extra/httpd-vhosts.conf
           LoadModule proxy_module modules/mod_proxy.so
           LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
           LoadModule proxy_http_module modules/mod_proxy_http.so
           LoadModule rewrite_module modules/mod_rewrite.so
           LoadModule access_compat_module modules/mod_access_compat.so
           LoadModule authz_host_module modules/mod_authz_host.so
           LoadModule filter_module modules/mod_filter.so
           LoadModule deflate_module modules/mod_deflate.so   #optional - only needed if you plan on using the gzip flate stuff below


    (UBUNTU) Run `sudo a2enmod proxy`, `sudo a2enmod proxy_ajp`, `sudo a2enmod rewrite`, and `sudo a2enmod proxy_http`.

1. (WINDOWS) Modify the httpd-vhosts.conf file (${apache.home}\conf\extra\httpd-vhosts.conf).  Remove the sample virtual hosts from the file by deleting the `<VirtualHost *:80>` sections.

   (UBUNTU) Create a file in the `conf-available` folder named `httpd-vhosts.conf` (with the text as specified in the next step). Run `sudo a2enconf httpd-vhosts` then `service apache2 reload` to apply changes.

1. Add a new virtual host that points to the Alfresco Tomcat and Tomcat running ACA/AEV/WizardAdmin by adding the following lines, making updates to server names and paths as needed:

```xml
    <VirtualHost *:80>
	    ServerName ${your-server-name}
	    ErrorLog "logs/${your-server-name}-error.log"
	    CustomLog "logs/${your-server-name}-access.log" common
	    ServerAlias ${your-server-name}

	    AllowEncodedSlashes On
	    LimitRequestFieldSize 65536
	    ProxyIOBufferSize 65536

	    #Optional - these two lines redirect the root URL (/) to /ocms.
	    RewriteEngine on
	    RewriteRule ^/$ /ocms [PT]
	
	    <Directory />
	        Options All
	        Order Deny,Allow
	        Allow from all
	    </Directory>

	    ProxyRequests off

	    <Proxy *>
	        Order Deny,Allow
	        Allow from all
	    </Proxy>

	    <Location />
	        Order Deny,Allow
	        Allow from all
	    </Location>

            #Optional - if you want to gzip static files before you send them out to clients, add the below
            <Location /hpi>
                AddOutputFilterByType DEFLATE text/plain
		AddOutputFilterByType DEFLATE text/html
		AddOutputFilterByType DEFLATE text/xml
		AddOutputFilterByType DEFLATE text/css
		AddOutputFilterByType DEFLATE application/xml
		AddOutputFilterByType DEFLATE application/xhtml+xml
		AddOutputFilterByType DEFLATE application/rss+xml
		AddOutputFilterByType DEFLATE application/javascript
		AddOutputFilterByType DEFLATE application/x-javascript
		AddOutputFilterByType DEFLATE application/json
            </Location>

	    #ALFRESCO ONLY: Proxy /alfresco requests to Alfresco's Tomcat
	    ProxyPass /alfresco ajp://${your-TOMCAT-server-name}:8009/alfresco
	    ProxyPass /share ajp://${your-TOMCAT-server-name}:8009/share
	    # OR, use HTTP like this (use AJP in a production environment, as HTTP has more overhead and issues):
	    # ProxyPass /alfresco http://${your-server-name}:8080/alfresco

	    #Proxy all requests at the root to the Tomcat that actually has the application in question ex: 
            #   /ocms
            #   /OpenAnnotate
            #   /WizardAdmin
            #   /OpenContent [Documentum/Hadoop/Solr only]) 
            # This is generally a separate tomcat than the Tomcat running Alfresco for Alfresco environments
	    ProxyPass / ajp://${your-TOMCAT-server-name}:9009/

    </VirtualHost>
```
4. Go to `${apache.home}`/bin, open a command prompt, and run httpd.exe 
5. Test by hitting http://${your-server-name} and http://${your-server-name}/ocms


## Install libraries and AMPs
>**IMPORTANT!** Backup the Alfresco Content Services database, `alfresco.war`, and `share.war`. These resources need to 
>be backed up in case of a rollback being required. (Make a copy of the original wars and store them in a safe location)

### PDFIUM Installation (OPTIONAL) {#pdfium}
>**Note:** This step is only needed if using Alfresco Enterprise Viewer on Linux.

1. Unpack the `pdfium.tar.gz` source to a location on your server.
   
2. Note the path where `pdfium` is being installed as `PDFIUM_HOME`.
   
3. Navigate into the newly unpacked PDFIUM directory.

4. Execute the following command from the `PDFIUM_HOME` to ensure `pdfium` was unpacked successfully:
   
   ```bash
   ./{PDFIUM_HOME}/pdfium --help
   ```
  
   The `pdfium` help message is displayed.

### FFMPEG Installation (OPTIONAL)  {#ffmpeg}
>**Note:** This step is only needed if using Alfresco Enterprise Viewer Video.

1. Download and install an official FFMPEG Linux package from [here](https://ffmpeg.org/download.html){:target="_blank"}

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Execute the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

   ```bash
   ./{FFMPEG_HOME}/bin/ffmpeg --help
   ```

   The `ffmpeg` help message is displayed.

### ImageMagick Installation (OPTIONAL) {#im}
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
   should be applied to the repository aka [alfresco.war]):
    * `tsgrp-opencontent.amp`
    * `tsgrp-autofile.amp`
    
3. (OPTIONAL) This step is only required if installing Alfresco Enterprise Viewer:
   
   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:
   * `oa-service-alfresco.amp`

4. (OPTIONAL) This step is only required if installing the Policy and Procedure Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:
   * `tsgrp-alfresco-chain-versioning.amp`
   * `pnp-platform-3.5.amp`

5. (OPTIONAL) This step is only required if installing the Claims Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:
   * `claims-platform-3.5.amp`

6. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer in Share:

   Navigate to the `ALFRESCO_HOME/amps_share` directory and copy the following amps there:
   * `oa-service-share.amp`
   * `oa-share-webpreview.amp`
   
7. Apply the AMPs
   
   From the `ALFRESCO_HOME` direcotry, run this command for each Repository AMP required (replace `{myAmp}` with the correct AMP name):

   Linux:
   
   ```bash
   java -jar bin/alfresco-mmt.jar install amps/{myAMP}.amp tomcat/webapps/alfresco.war -force
   ```
   
   Windows:
   
   ```bash
   java\{javaVersion}\bin\java -jar bin\alfresco-mmt.jar install amps\{myAmp}.amp tomcat\webapps\alfresco.war -force 
   ```

8. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer in Share:

   From the `ALFRESCO_HOME` direcotry, run this command for each Share AMP required (replace `{myAmp}` with the correct AMP name):

   Linux:
   
   ```bash
   java -jar bin/alfresco-mmt.jar install amps_share/{myAMP}.amp tomcat/webapps/share.war -force
   ```
   
   Windows:
   
   ```bash
   java\{javaVersion}\bin\java -jar bin\alfresco-mmt.jar install amps_share\{myAmp}.amp tomcat\webapps\share.war -force 
   ```

9. Delete current Alfresco deployed WAR files

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the following [folders] (if they exist) to ensure 
   old versions of the `alfresco.war` and `share.war` are not run:
   
   * `alfresco`
   * `share`

10. Install license file for OpenConnect

   Navigate to the `ALFRESCO_HOME/tomcat/shared/classes/alfresco` folder and create the following folder structure: 
   `module/com.tsgrp.opencontent/license`.

   Place the `TextLicense.l4j` file in the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/license` 
   directory. 

11. Configure OpenConnect
   
    Update the environment variables in the provided `opencontent-override-placeholders.properties`:

    There are many configurations that [can] [be] overrriden in this file later on. 

    There are a few you will [need] to set for OpenContent to work correctly listed below:
   
    * `application.root.url={Application Base URL}/ocms`
    * `oc.email.smtp.host={SMTP host}`
    * `FFMPEG.path=FFMPEG_HOME` (if installed, get FFMPEG_HOME value from [FFMPEG Installation](#ffmpeg))
    * `imageMagick.path=IMAGEMAGICK_HOME` (if installed, get IMAGEMAGICK_HOME value from [ImageMagic Installation](#im))
    * `pdfium.path=PDFIUM_HOME` (if installed, get PDFIUM_HOME value from [Pdfium Installation](#pdfium))

12. Deploy the OpenConnect configuration: 
    
    Deploy/Copy the following files to the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` 
    folder:
  
    * `opencontent-override-placeholders.properties`
    * `opencontent-override-config.xml`
    * `opencontent-override-module-context.xml`

13. Update Tomcat server configuration:   
    
   By default, Apache Tomcat doesn't support UTF-8 characters for languages other than English. To enable support, the web.xml and server.xml files need to be modified in the deployed Tomcat. 

   When running OpenContent on Tomcat 8+, the `relaxedQueryChars` and `relaxedPathChars` parameters are required on the Connector. 
   If you are using Tomcat older than version 8.5 - you may need to add this to catalina.properties in your tomcat/conf folder.: ```tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}```

   The following will need to be updated: 

   In the __${tomcat.home}/conf/web.xml__ 

   Un-comment the setCharacterEncodingFilter and its mapping in web.xml (If not already uncommented)

   ```xml
   <!-- ================== Built In Filter Definitions ===================== -->


   <!-- A filter that sets character encoding that is used to decode -->
   <!-- parameters in a POST request -->
      <filter>
         <filter-name>setCharacterEncodingFilter</filter-name>
         <filter-class>org.apache.catalina.filters.SetCharacterEncodingFilter</filter-class>
         <init-param>
               <param-name>encoding</param-name>
               <param-value>UTF-8</param-value>
         </init-param>
         <async-supported>true</async-supported>
      </filter>

   <!-- ==================== Built In Filter Mappings ====================== -->

   <!-- The mapping for the Set Character Encoding Filter -->
      <filter-mapping>
         <filter-name>setCharacterEncodingFilter</filter-name>
         <url-pattern>/*</url-pattern>
      </filter-mapping>
   ```

   In the __${tomcat.home}/conf/server.xml__

   Add the following to the connector if 
   not already present:

    * `URIEncoding="UTF-8"`
    * `connectionTimeout="20000"`
    * `maxHttpHeaderSize="32768"`
    * `relaxedQueryChars="{}[]|"`
    * `relaxedPathChars="{}[]|"`

   ```xml
      <Connector port="8080" protocol="HTTP/1.1"
                  connectionTimeout="20000"
                  redirectPort="8443"
                  URIEncoding="UTF-8"
                  relaxedQueryChars="{}[]|"
                  relaxedPathChars="{}[]|" />
   ```

   >**Note:** that in a typical Alfresco installation, the 8080 connector can be modified for HTTP communications and 
   >the 443 connector can be modified for HTTPS connections.

14. (OPTIONAL) This step is only required if using Alfresco Search Services 2.0 or greater:

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

15. Start up Alfresco server.

## Install collaboration (optional)  {#collab}
In this section the Alfresco Enterprise Viewer collaboration features Socket.IO server is installed.

>**Note:** that this installation is only required if the collaboration features are desired.

1. Install Socket Server

   Use the following installation packages:
   * Windows: Use `socket-servers-win.zip`
   * Linux: Use `socket-server-linux.zip`

   Place the socket-servers zip in the directory where the Collaboration server is to be installed, and unzip it. This 
   will be known as `SOCKET_HOME`.

   This directory will now contain `server.js`, `windows-service.js`, `package.json`, `uninstall-windows-service.js`, 
   `node_modules` and a `config` directory.

2. Test the Socket Server

   To start the collaboration server, navigate to `SOCKET_HOME/node` and run the following command: `node server.js`

   A Node JavaScript server starts listening on port 3000 for connections, and the command prompt displays the message 
   “listening on *:3000”.

3. Stop Socket Server
   
   Press Ctrl+C to end the process.

4. (OPTIONAL) Configure SSL

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

5. Install forever tool

   Install forever by running the following command:

   * Linux: `sudo npm install forever -g`
   * Windows: `npm install forever -g`

6. Start the Socket Server

   Start the collaboration server using forever by running the following command:

   `forever start server.js`


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

4. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Copy the `WizardAdmin.war` file into the `TOMCAT_HOME/webapps` directory.

5. Configure Tomcat for shared classpath loader as well as encoded slashes:
   
   Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line:

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like the following:
   ```
   /hpi/{aca-module}/{object-id}
   ```
   In the above case, the object ID is URL encoded.  This means that using Alfresco as a back-end, causes forward slashes in the object ID to be URL encoded to `%2F`.  By default, neither Tomcat nor Apache serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue, edit the `TOMCAT_HOME/conf/catalina.properties` file and add the following:
   ```
   org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
   ```

   To work around the issue on Apache, add the following configuration to the `httpd-vhosts.conf` file for the host(s) ACA is running on:

   ```
   AllowEncodedSlashes On
   ```

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

10. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

    Copy the `openannotate-override-placeholders.properties` file to the `TOMCAT_HOME/shared/classes` directory.

11. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server” 
    functionality for collaborative annotation functionality:
    
    Update the `openannotate-override-placeholders.properties` file:
    
    * `collaborationModeEnabled=true`
    * `collaborationEndpoint=http://${server}:${port}`

    Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for 
    the environment being installed to (See the section [Install collaboration features](#collab)))


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

4. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Copy the `WizardAdmin.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

5. Configure Tomcat for shared classpath loader as well as encoded slashes:

   Edit the `ALFRESCO_HOME/tomcat/conf/catalina.properties` file and enable the `shared.loader` by adding the following line:

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like the following:
   ```
   /hpi/{aca-module}/{object-id}
   ```
   In the above case, the object ID is URL encoded.  This means that using Alfresco as a back-end, causes forward slashes in the object ID to be URL encoded to `%2F`.  By default, neither Tomcat nor Apache serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue on the Alfresco Tomcat itself, add the following configuration to the to your Java Opts / CATALINA_OPTS.  To update the java options, go to {TOMCAT_HOME}/bin and run tomcat7w.exe //ES//{TOMCAT_SERVICE_NAME}

   ```
   -Dorg.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
   ```

   OR edit the `ALFRESCO_HOME/tomcat/conf/catalina.properties` file and add the following:
   ```
   org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
   ```

   To work around the issue on Apache, add the following configuration to the `httpd-vhosts.conf` file for the host(s) ACA is running on:

   ```
   AllowEncodedSlashes On
   ```

6. Create a `classes` directory:

   Create a `classes` directory within the `ALFRESCO_HOME/tomcat/shared` directory, if it does not already exist.

7. (OPTIONAL) Required if setting up SSO:

   Follow steps [here](https://github.com/tsgrp/HPI/wiki/Single-Sign-On-(SSO)){:target="_blank"} to enable SSO.

8. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

   Update the provided `openannotate-override-placeholders.properties` file:

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   >**Note:** the URL can also be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`

9. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer:

    Copy the `openannotate-override-placeholders.properties` file to the `ALFRESCO_HOME/tomcat/shared/classes` directory.

10. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server”
   functionality for collaborative annotation functionality:

   Update the provided `openannotate-override-placeholders.properties` file:

   * `collaborationModeEnabled=true`
   * `collaborationEndpoint=http://${server}:${port}`

   Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for
   the environment being installed to. (See the section [Install collaboration features](#collab)))

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

## Install Configurations

1. Create groups and folders:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/hpi/setup`

   This will create the base groups and folder for the application. 

2. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Create Policy and Procedure specific groups and folders:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/wizard/awSetup`

   This will create the base groups and folder for the Policy and Procedure solution. 

3. Import default configuration:

   In a browser navigate to `{Application Base URL}/ocms/admin/ConfigArchiver` and login to the application as the 
   Alfresco Administrator.

   Use the *Import Config* function to import the `default.zip` provided with the installation. 

4. (OPTIONAL) This step is only required if **NOT** using the Alfresco Enterprise Viewer:

   Navigate to the *Stage Config*. For each stage config:
    1.	Navigate to the *docviewer*
    2.	Turn off *Alfresco Enterprise Viewer* and *Alfresco Enterprise Video Viewer*
    3.	Turn on `PDF.js` and `Video.js`
    4.	Click **Save Config**
    