---
title: Enterprise Viewer Installation Guide
---

>**IMPORTANT!** If you are installing both ACA and AEV, we recommend that you start with the ACA install guide.

## Prerequisites

### Distribution Zips

The Enterprise Viewer can be installed using a distribution zip. These zip can be downloaded from Hyland Community.

You will need to download the following distribution zip in order to install AEV

* alfresco-enterprise-viewer-package-3.5.0.zip

### Java

Alfresco Enterprise Viewer requires Java 11 or above. Consult your repository of choice for more detailed requirements. For example, Alfresco 4.0 and 4.1 require Java 1.6.  Alfresco 4.2 requires Java 1.7.

### Alfresco repository version

See the [Supported Platforms]({% link enterprise-viewer/latest/support/index.md %}) for more information.

Please ensure you have the correct version of the Alfresco Enterprise Viewer package for your Alfresco Content Services version.
If you are unsure, please contact Alfresco Support.

### Operating System requirements

Operating System and libraries for the target server machine:

* **Windows**: Windows Server 2016 or newer
* **Linux**: CentOS, Ubuntu, RHL, Amazon Linux
  
## Install Proxy

### Do you need a Web Proxy?

When installing AEV you have 2 options.

Option 1 - Deploy AEV to the Alfresco Tomcat. In this case you can skip to [OpenContent install]({% link enterprise-viewer/latest/install/index.md %}#installoc) since no proxy will need to be installed.

Option 2 (preferred for a production deployment) - Deploy AEV to a separate tomcat. In this case you must complete the following steps to setup a proxy.

### Proxy Setup

The following routes must be proxied to their respective ports and applications in order for AEV to work correctly. SSL is recommended at a minimum at the Proxy layer for Production installations.

* `{Application Base URL}/alfresco`
* `{Application Base URL}/share`
* `{Application Base URL}/OpenAnnotate`
* `{Application Base URL}/oat` (if installed)

When installing a proxy please note that you are not limited to using apache or Nginx. These are just two common options which we cover example installs of below. As long as the above routes are proxied appropriately you can move onto the [AEV install]({% link enterprise-viewer/latest/install/index.md %}#install).

>**IMPORTANT!** If you already completed the ACA install guide and setup a proxy as a part of that install, you can just add the following routes:
>
* `{Application Base URL}/OpenAnnotate`

>
* `{Application Base URL}/oat` (if installed)

>To that proxy configuration and restart the proxy. Then go ahead and proceed to the [AEV install]({% link enterprise-viewer/latest/install/index.md %}#install).

### Example Proxy Install 1 - Apache HTTPD on Windows

1. Install Apache httpd

   Obtain binaries from [https://www.apachelounge.com/download/](https://www.apachelounge.com/download/)

   Install Apache to `C:\Apache\Apache24` (change to your desired version as appropriate).  This is referred to as `${apache.home}` below.

   * Navigate to `${apache.home}\conf` and open up `httpd.conf`
   * Find the line that has ServerRoot on it  
      * It should default to something like `ServerRoot "c:/Apache24"`
      * Change the ServerRoot to where you extracted Apache
   * If you would like to install as a service, consult the Readme.txt file that comes with the installation.

1. Modify httpd.conf (${apache.home}\conf\httpd.conf) to load the Virtual Hosts configuration file, and the Proxy, ProxyAJP, and Rewrite modules.  **Uncomment** the following lines:

           Include conf/extra/httpd-vhosts.conf
           LoadModule proxy_module modules/mod_proxy.so
           LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
           LoadModule proxy_http_module modules/mod_proxy_http.so
           LoadModule rewrite_module modules/mod_rewrite.so
           LoadModule access_compat_module modules/mod_access_compat.so
           LoadModule authz_host_module modules/mod_authz_host.so
           LoadModule filter_module modules/mod_filter.so

1. Modify the httpd-vhosts.conf file (${apache.home}\conf\extra\httpd-vhosts.conf).  Remove the sample virtual hosts from the file by deleting the `<VirtualHost *:80>` sections.

1. Add a new virtual host to your vhosts configuration file that points to the Alfresco Tomcat and Tomcat running AEV by adding the following lines.

      Make sure to update server names and paths as needed (aka replace anything surrounded by ${}).
      Make sure to also Update the proxyPass sections at the bottom to proxy the appropriate routes.

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

    # Proxy /alfresco requests to Alfresco's Tomcat
    ProxyPass /alfresco ajp://${your-TOMCAT-server-name}:8009/alfresco
    ProxyPass /share ajp://${your-TOMCAT-server-name}:8009/share
    # OR, use HTTP like this (use AJP in a production environment, as HTTP has more overhead and issues):
    # ProxyPass /alfresco http://{server}:8080/alfresco

    #Proxy all requests at the root to the Tomcat that actually has the application in question ex: 
    ProxyPass / ajp://${your-TOMCAT-server-name}:9090/

    </VirtualHost>
```

1. (Re)start the proxy

   Go to `${apache.home}`/bin, open a command prompt, and run httpd.exe

1. Test by hitting http://{server}/alfresco

### Example Proxy Install 2 -  Nginx install on Amazon Linux

Here are some sample steps of installing nginx as a proxy (steps are done on amazon-linux and may need to be adjusted for other distributions)

1. Install nginx on the server. For example:

   * `sudo amazon-linux-extras list | grep nginx`
   * `sudo amazon-linux-extras enable nginx1`
   * `sudo yum clean metadata`
   * `sudo yum -y install nginx`
   * `nginx -v`

1. Confirm you can startup nginx

    * `sudo systemctl start nginx.service` (start the service)
    * `sudo systemctl reload nginx.service` (reload the service)
    * `sudo systemctl status nginx.service` (check that the status is active)
    * `sudo systemctl stop nginx.service` (stop the service)

1. Configure the proxy

    * `sudo vi /etc/nginx/nginx.conf`
    * Replace contents of the file with the following (replacing ports and servers and adding additional proxy_pass configs as necessary)

         worker_processes  1;

         events {
            worker_connections  1024;
         }

         http {
            server {
               listen *:80;

               client_max_body_size 0;

               set  $allowOriginSite *;
               proxy_pass_request_headers on;
               proxy_pass_header Set-Cookie;

               # External settings, do not remove
               #ENV_ACCESS_LOG

               proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
               proxy_redirect off;
               proxy_buffering off;
               proxy_set_header Host            $host:$server_port;
               proxy_set_header X-Real-IP       $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_pass_header Set-Cookie;

               # Protect access to SOLR APIs
               location ~ ^(/.*/service/api/solr/.*)$ {return 403;}
               location ~ ^(/.*/s/api/solr/.*)$ {return 403;}
               location ~ ^(/.*/wcservice/api/solr/.*)$ {return 403;}
               location ~ ^(/.*/wcs/api/solr/.*)$ {return 403;}

               location ~ ^(/.*/proxy/alfresco/api/solr/.*)$ {return 403 ;}
               location ~ ^(/.*/-default-/proxy/alfresco/api/.*)$ {return 403;}
               
               # Protect access to Prometheus endpoint
               location ~ ^(/.*/s/prometheus)$ {return 403;}
               
               location /alfresco {
                     proxy_pass http://{server}:8080/alfresco;
               }

               location /share {
                     proxy_pass  http://{server}:8080/share;
               }

               location /OpenAnnotate {
                     proxy_pass http://{server}:9090/OpenAnnotate;
               }

            }
         }

1. Start the nginx proxy and confirm it started up correctly
    * `sudo systemctl start nginx.service`
    * `sudo systemctl status nginx.service`

1. Make sure whatever port your proxy is listening on is open to the end user (example: you will need to open port 80 if you are using the configs in our example above)

1. Test that the proxy is working properly by hitting http://{server}/share

## Install OpenContent (Only need to follow these steps if installing AEV without ACA) {#installoc}

1. Stop the Alfresco server

1. Copy the OpenContent AMP to the Alfresco Content Services installation:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the `tsgrp-opencontent-{version_info}.amp` to this directory. 

   The amp can be found in the alfresco-enterprise-viewer-package distribution zip under `Alfresco Artifacts` folder. 

   >**Note:** make sure you are using the correct `tsgrp-opencontent.amp` for your version of Alfresco.

   * If using Alfresco Content Services 7.1.x, use the `tsgrp-opencontent-3.5-for-acs7.1.amp`.
   * If using Alfresco Content Services 7.2.x, use the `tsgrp-opencontent-3.5-for-acs7.2.amp`.
   * If using Alfresco Content Services 7.3.x, use the `tsgrp-opencontent-3.5-for-acs7.3.amp`.

1. Apply the AMP
   From the directory where your alfresco tomcat lives, run this command
   Linux:
   java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps/tsgrp-opencontent.amp tomcat/webapps/alfresco.war -force

   Windows:
   java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps\tsgrp-opencontent.amp tomcat\webapps\alfresco.war -force

1. Delete current Alfresco deployed WAR files

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `alfresco` folder (if it exists)

1. Install license file for OpenConnect

   Create the `module/com.tsgrp.opencontent/license` folder structure on the /alfresco classpath, for example, at `ALFRESCO_HOME/tomcat/shared/classes/alfresco`

   Place a `TextLicense.l4j` file in the `license` directory. 

1. Deploy the OpenConnect configuration:

    Create a file called `opencontent-override-placeholders.properties` and put it onto the /alfresco classpath, for example, in the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` folder.
  
    Update the necessary environment variables in the `opencontent-override-placeholders.properties`.

    There are many configurations that [can] [be] overridden in this file later on.

    To start, set the follow property:
     * `oc.email.smtp.host={SMTP host}`

1. Update Tomcat server configuration:

   By default, Apache Tomcat doesn't support UTF-8 characters for languages other than English. To enable support, the web.xml and server.xml files need to be modified in the deployed Tomcat.

   When running OpenContent on Tomcat 8+, the `relaxedQueryChars` and `relaxedPathChars` parameters are required on the Connector. 
   If you are using Tomcat older than version 8.5 - you may need to add this to catalina.properties in your tomcat/conf folder.: ```tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}```

   The following will need to be updated:

   In the **${tomcat.home}/conf/web.xml**

   Un-comment the setCharacterEncodingFilter and its mapping in web.xml (If not already uncommented)

```html
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

   In the **${tomcat.home}/conf/server.xml**

   Add the following to the connector if not already present:

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

1. (OPTIONAL) This step is only required if using Alfresco Search Services 2.0 or greater:

    a. Navigate to the `SOLR_HOME/solrhome/conf` folder.

    b. In the file `shared.properties`, uncomment the following properties (if not already uncommented):
       *`alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`
       *`alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`
       *`alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`

    c. Once the above changes have been made, Solr must be reindexed.

       Stop the Solr process if it is running. 
    
       Clear out the following folder paths:
        * `SOLR_HOME/solrhome/alfresco/index`
        * `SOLR_HOME/solrhome/archive/index`
        * `SOLR_HOME/solrhome/alfrescoModels`
      
       Start Solr process.

1. Start up Alfresco server.

1. Confirm OpenContent has been installed correctly by accessing http://{server}/alfresco/OpenContent

## Install Libraries {#install}

### PDFIUM Installation (OPTIONAL) {#pdfium}

>**Note:** This step is only needed if using Alfresco Enterprise Viewer on Linux.

1. Locate the`pdfium.tar.gz` in the `Third Party` folder of the alfresco-enterprise-viewer-package zip

1. Unpack the `pdfium.tar.gz` source to a location on your server.

1. Note the path where `pdfium` is being installed as `PDFIUM_HOME`.

1. Navigate into the newly unpacked `PDFIUM_HOME` directory.

1. Execute the following command from the `PDFIUM_HOME` to ensure `pdfium` was unpacked successfully:

```bash
    ./pdfium --help
```
  
   The `pdfium` help message is displayed.

### FFMPEG Installation (OPTIONAL)  {#ffmpeg}

>**Note:** This step is only needed if using Alfresco Enterprise Viewer Video.

1. Download and install an official FFMPEG package from [here](https://ffmpeg.org/download.html){:target="_blank"}. Use the latest supported release. Note that the latest windows release is included in the `Third Party` folder of the alfresco-enterprise-viewer-package zip

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Execute the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

```bash
./{FFMPEG_HOME}/ffmpeg --help
```

   The `ffmpeg` help message is displayed.

## Configure OpenContent for AEV
>**Note:** Only need to complete this section if ffmpeg and/or pdfium was installed above.

1. Stop Alfresco

1. Configure OpenConnect

    Update the environment variables in the provided `opencontent-override-placeholders.properties`. Deploy the updated file to the /alfresco classpath, for example, the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` directory:

    If you installed ffmpeg and pdfium above, update these properties:

    * `FFMPEG.path=FFMPEG_HOME` (if installed, get FFMPEG_HOME value from [FFMPEG Installation](#ffmpeg))
    * `pdfium.path=PDFIUM_HOME` (if installed, get PDFIUM_HOME value from [Pdfium Installation](#pdfium))

1. Delete current Alfresco deployed WAR files

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `alfresco` folder (if it exists)

1. Start alfresco

## Install collaboration (optional)  {#collab}

In this section the Alfresco Enterprise Viewer collaboration features Socket.IO server is installed.

>**Note:** that this installation is only required if the collaboration features are desired.

1. Install Node.js

   Both NodeJS and npm will need to be installed. Follow the Node.js install instructions at [https://nodejs.org/](https://nodejs.org/)

   * Node.js (use the latest version your OS supports)
   * npm (Node package manager, included with Node.js)

1. Install Socket Server:

   Locate the `socket-server.zip` in the `Collaboration` folder of the alfresco-enterprise-viewer-package zip.

   Place the socket-servers zip in the directory where the Collaboration server is to be installed, and unzip it. This 
   will be known as `SOCKET_HOME`.

   This directory will now contain `server.js`, `Dockerfile`, `windows-service.js`, `package.json`, etc.

1. If no `node_modules` directory is included in the `SOCKET_HOME`, then run `npm i` from the `SOCKET_HOME`directory to generate the `node_modules` directory. 

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

## Configure Share Extensions for AEV (Optional)

>**Note:** These steps are only required if you wish to accomplish one or both of the following:
>
* Use the Alfresco Enterprise Viewer as the document viewer in the Share interface
>
* Include an action in the Share interface to launch a document in the Alfresco Enterprise Viewer in a new tab

1. Stop Alfresco

1. Locate the `oa-alfresco.amp` in the `Alfresco Artifacts` folder of the alfresco-enterprise-viewer-package zip.

   Copy the amp to the `ALFRESCO_HOME/amps` directory.

   From the directory where your alfresco tomcat lives, run this command (replacing {ALFRESCO_HOME} with the location of your `ALFRESCO_HOME`):

   Linux:

```bash
java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps/oa-alfresco.amp tomcat/webapps/alfresco.war -force
```

   Windows:

```bash
java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps\oa-alfresco.amp tomcat\webapps\alfresco.war -force 
```

1. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer External Launcher action in Share (This adds a Share action to launch a document in the Alfresco Enterprise Viewer in a new tab).

   Locate the `oa-share-external-launcher.amp` in the `Share Artifacts` folder of the alfresco-enterprise-viewer-package zip.

   Edit the following files in the amp by extracting them or by editing them directly inside the amp:

    * `/web/component/(documentlibrary or preview)/annotation-urls.js`
    * `/web/component/(documentlibrary or preview)/annotation-urls-min.js`

    You need to update the `Alfresco.constants.EXTERNAL_LAUNCHER_ANNOTATION_URL` variable within these files. This variable needs to be updated with the URL of the server that Alfresco Enterprise Viewer is going to be deployed on (even if Alfresco Enterprise Viewer is deployed on the same server as the Share web application).

    For example:

        Alfresco.constants.EXTERNAL_LAUNCHER_ANNOTATION_URL = "http://localhost:8080/OpenAnnotate/login/external.htm";

   Then, copy the amp to the `ALFRESCO_HOME/amps_share` directory (create the directory if it doesn't exist).

   From the directory where your alfresco tomcat lives, run this command (replacing {ALFRESCO_HOME} with the location of your `ALFRESCO_HOME`):

   Linux:
   
```bash
java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps_share/oa-share-external-launcher.amp tomcat/webapps/share.war -force
```

   Windows:

```bash
java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps_share\oa-share-external-launcher.amp tomcat\webapps\share.war -force 
```

1. (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer Web Preview in Share (This replaces the OOB Share viewer with the Alfresco Enterprise Viewer).

   Locate the `oa-share-webpreview.amp` in the `Share Artifacts` folder of the alfresco-enterprise-viewer-package zip.

   Edit the following files in the amp by extracting them or by editing them directly inside the amp:

    * `/web/component/(documentlibrary or preview)/annotation-urls.js`
    * `/web/component/(documentlibrary or preview)/annotation-urls-min.js`

    In both cases, you need to update the `Alfresco.constants.WEBPREVIEW_ANNOTATION_URL` variable within these files. This variable needs to be updated with the URL of the server that Alfresco Enterprise Viewer is going to be deployed on (even if Alfresco Enterprise Viewer is deployed on the same server as the Share web application).

    For example:

        Alfresco.constants.WEBPREVIEW_ANNOTATION_URL = "http://localhost:8080/OpenAnnotate/login/external.htm";

   Then, copy the amp to the `ALFRESCO_HOME/amps_share` directory (create the directory if it doesn't exist).

   From the directory where your alfresco tomcat lives, run this command (replacing {ALFRESCO_HOME} with the location of your `ALFRESCO_HOME`):

   Linux:

```bash
java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps_share/oa-share-webpreview.amp tomcat/webapps/share.war -force
```

   Windows:

```bash
java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps_share\oa-share-webpreview.amp tomcat\webapps\share.war -force 
```

1. Delete current Share deployed WAR files

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `share` folder (if it exists)

1. Start alfresco

1. (OPTIONAL) You can verify these amps were deployed correctly by doing the following:

* `oa-share-external-launcher.amp` - open an asset in Share and look at the Document Actions panel on the right-hand side of the screen. Ensure that the asset has a PDF rendition or a suitable image rendition available for Alfresco Enterprise Viewer. If you installed the `oa-share-external-launcher.amp`, the "Alfresco Enterprise Viewer" action should be available.  
* `oa-share-webpreview.amp` - open an asset in Share. If you installed the `oa-share-webpreview.amp` and the asset has a PDF rendition or a suitable image rendition available for Alfresco Enterprise Viewer, the asset should appear in "Alfresco Enterprise Viewer" directly in the Share application screen.

## Install webapps

This sections walks through how to install the Alfresco Enterprise Viewer web application.

>**Note:** If you installed a proxy then follow the [Install Web Applications on Separate Tomcat](#install-webapps-separate-tomcat-oa) Instructions. 
> If no proxy was installed then follow the [Install Web Applications on Alfresco Tomcat](#install-webapps-alfresco-tomcat-oa) instructions. 

### Install web applications on separate Tomcat {#install-webapps-separate-tomcat-oa}

This section walks through how to install the web applications on a separate Tomcat instance (meaning, you must have a proxy setup).

1. Install Apache Tomcat. See [https://archive.apache.org/dist/tomcat](https://archive.apache.org/dist/tomcat). Note that if you installed aca, you can utilize the same tomcat you may have installed for aca - shut it down now if its already running.

1. Copy the `OpenAnnotate.war` file into the `TOMCAT_HOME/webapps` directory.

   This war can be found in the `Web Applications` folder of the alfresco-enterprise-viewer-package zip.

1. (If not already configured in the aca install) - Configure Tomcat for shared classpath loader as well as encoded slashes:

   Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line (if not already there):

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like the following:

```text
   /hpi/{aca-module}/{object-id}
```

   In the above case, the object ID is URL encoded.  This means that forward slashes in the object ID are URL encoded to `%2F`.  By default, Tomcat does not serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue, edit the `TOMCAT_HOME/conf/catalina.properties` file and add the following line (if not already there):

```Java
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

1. Locate the `openannotate-override-placeholders.properties` file in the `Web Applications` folder of the alfresco-enterprise-viewer-package zip.

1. Update the provided `openannotate-override-placeholders.properties` file:

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   >**Note:** if the Alfresco Enterprise Viewer and the Alfresco Repository are located on the same server, then the 
   >URL can be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`

   (OPTIONAL) This step is only required if using the Alfresco Enterprise Viewer AND leveraging the “Collaboration Server”  functionality for collaborative annotation functionality:

    Update the following properties:

    * `collaborationModeEnabled=true`
    * `collaborationEndpoint=http://${server}:${port}`

    Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for the environment being installed to (See the section [Install collaboration features]({% link enterprise-viewer/latest/install/index.md %}#collab))

1. Copy the `openannotate-override-placeholders.properties` file to the tomcat classpath, for example, in the `TOMCAT_HOME/shared/classes` directory.

1. Start Tomcat

1. Confirm you can access AEV at http://{server}/OpenAnnotate

### Install web applications on Alfresco Tomcat {#install-webapps-alfresco-tomcat-oa}

This section walks through how to install the web applications on Alfresco Tomcat (recommended for easier non-Production environment installation).

1. Stop Alfresco Tomcat

1. Copy the `OpenAnnotate.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

   This war can be found in the `Web Applications` folder of the alfresco-enterprise-viewer-package zip.

1. Create a `classes` directory:

   Create a `classes` directory within the `ALFRESCO_HOME/tomcat/shared` directory, if it does not already exist.

1. Locate the `openannotate-override-placeholders.properties` file in the `Web Applications` folder of the alfresco-enterprise-viewer-package zip.

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
   the environment being installed to. (See the section [Install collaboration features]({% link enterprise-viewer/latest/install/index.md %}#collab))

1. Copy the `openannotate-override-placeholders.properties` file to the /alfresco classpath, for example, in the `ALFRESCO_HOME/tomcat/shared/classes` directory.

1. Start Alfresco Tomcat

1. Confirm you can access AEV at http://{server}/OpenAnnotate
