---
title: Install Enterprise Viewer
---

Use this information to install the Enterprise Viewer. If you're installing both the Content Accelerator and the Enterprise Viewer, its recommended that you start with the Content Accelerator install guide.

## Prerequisites

> **Important:** If the Enterprise Viewer license you have been issued with is a `GROUP` license you must create a group within Alfresco that contains the people you want to have access to the Enterprise Viewer. This new group must be named: `aev_users`. All the people outside of this group will continue to see the default PDF viewer. If this is done after the installation of the Enterprise Viewer, then you must restart Tomcat for the changes to take effect.

### Distribution zips

You can install the Enterprise Viewer using a distribution ZIP. Download the following ZIP file from [Hyland Community](https://community.hyland.com/products/alfresco){:target="_blank"}:

* `alfresco-enterprise-viewer-package-3.5.x.zip`

### Java

Enterprise Viewer requires Java 11 or above. Consult your repository of choice for more detailed requirements. If you are using Java 17, refer to our [Java 17 support guide]({% link enterprise-viewer/3.5/install/java-support.md %}).

### Alfresco repository version

See the [Supported Platforms]({% link enterprise-viewer/3.5/support/index.md %}) for more information.

Make sure you have the correct version of the Enterprise Viewer package for your Content Services version. If you are unsure, please contact Hyland Support.

### Operating system requirements

Operating system and libraries for the target server machine:

* Windows: Windows Server 2016 or newer
* Linux: CentOS, Ubuntu, RHL, Amazon Linux
  
## Install proxy

### Do you need a web proxy?

When installing AEV you have 2 options:

| Option 1 | Deploy AEV to the Alfresco Tomcat. <br><br>Skip to the [OpenContent install]({% link enterprise-viewer/3.5/install/index.md %}#installoc) section since no proxy will need to be installed. |
| Option 2 | *Preferred.* For production deployment. <br><br>Deploy AEV to a separate Tomcat instance. In this case, you must complete the following steps to setup a proxy. |

### Proxy setup

The following routes must be proxied to their respective ports and applications in order for AEV to work correctly. SSL is recommended at a minimum at the Proxy layer for production installations.

* `{Application Base URL}/alfresco`
* `{Application Base URL}/share`
* `{Application Base URL}/OpenAnnotate`
* `{Application Base URL}/oat` (if installed)

When installing a proxy please note that you are not limited to using Apache or NGINX. These are just two common options which we cover example installs of below. As long as the above routes are proxied appropriately you can move onto the [AEV install]({% link enterprise-viewer/3.5/install/index.md %}#install).

> **Important:** If you've already completed the ACA install guide and setup a proxy as part of that installation, you can just add the following routes to that proxy configuration and restart the proxy:
>
> * `{Application Base URL}/OpenAnnotate`
> * `{Application Base URL}/oat` (if installed)
>
> Next, go to the [AEV install]({% link enterprise-viewer/3.5/install/index.md %}#install).

### Example proxy install 1 - Apache HTTPD on Windows

1. Install Apache `httpd`.

   Download the binaries from [https://www.apachelounge.com/download/](https://www.apachelounge.com/download/){:target="_blank"}.

   Install Apache to `C:\Apache\Apache24` (change to your desired version as appropriate). This is referred to as `${apache.home}` below.

   * Navigate to `${apache.home}\conf` and open up `httpd.conf`
   * Find the line that has ServerRoot on it  
      * It should default to something like `ServerRoot "c:/Apache24"`
      * Change the ServerRoot to where you extracted Apache
   * If you would like to install as a service, consult the Readme.txt file that comes with the installation.

2. Modify `httpd.conf` (`${apache.home}\conf\httpd.conf`) to load the Virtual Hosts configuration file, and the Proxy, ProxyAJP, and Rewrite modules. **Uncomment** the following lines:

    ```text
    Include conf/extra/httpd-vhosts.conf
    LoadModule proxy_module modules/mod_proxy.so
    LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
    LoadModule proxy_http_module modules/mod_proxy_http.so
    LoadModule rewrite_module modules/mod_rewrite.so
    LoadModule access_compat_module modules/mod_access_compat.so
    LoadModule authz_host_module modules/mod_authz_host.so
    LoadModule filter_module modules/mod_filter.so
    ```

3. Modify the `httpd-vhosts.conf` file (`${apache.home}\conf\extra\httpd-vhosts.conf`).

    * Remove the sample virtual hosts from the file by deleting the `<VirtualHost *:80>` sections.

4. Add a new virtual host to your `vhosts` configuration file that points to the Alfresco Tomcat and Tomcat running AEV by adding the following lines.

    * Make sure to update server names and paths as needed (for example, replace anything surrounded by `${})`).
    * Make sure you also update the `proxyPass` sections at the bottom to proxy the appropriate routes.

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

5. (Re)start the proxy.

   Go to `${apache.home}/bin`, open a command prompt, and run `httpd.exe`.

6. Test the proxy is working properly by opening `http://{server}/alfresco`.

### Example proxy install 2 -  NGINX install on Amazon Linux

Here are some sample steps of installing NGINX as a proxy (steps are done on amazon-linux and may need to be adjusted for other distributions)

1. Install NGINX on the server, for example:

    * `sudo amazon-linux-extras list | grep nginx`
    * `sudo amazon-linux-extras enable nginx1`
    * `sudo yum clean metadata`
    * `sudo yum -y install nginx`
    * `nginx -v`

2. Confirm you can startup NGINX:

    * `sudo systemctl start nginx.service` (start the service)
    * `sudo systemctl reload nginx.service` (reload the service)
    * `sudo systemctl status nginx.service` (check that the status is active)
    * `sudo systemctl stop nginx.service` (stop the service)

3. Configure the proxy:

    * `sudo vi /etc/nginx/nginx.conf`
    * Replace contents of the file with the following (replacing ports and servers and adding additional `proxy_pass` configurations as required).

        ```text
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
        ```

4. Start the NGINX proxy and confirm it started up correctly:

    ```bash
    sudo systemctl start nginx.service
    ```

    ```bash
    sudo systemctl status nginx.service
    ```

5. Make sure whatever port your proxy is listening on is open to the end user.

   For example: open port `80` if you're using the configuration in our example above.

6. Test the proxy is working properly by opening `http://{server}/share`.

## Install OpenContent {#installoc}

You only need to follow these steps if installing AEV without ACA:

1. Stop the Alfresco server

2. Copy the OpenContent AMP to the Alfresco Content Services installation:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the `tsgrp-opencontent-{version_info}.amp` to this directory.

   You'll find the AMP file in the `alfresco-enterprise-viewer-package` distribution zip under `Alfresco Artifacts` folder.

   > **Note:** Make sure you are using the correct `tsgrp-opencontent.amp` for your version of Alfresco.

   * If using Alfresco Content Services 7.1.x, use the `tsgrp-opencontent-3.5-for-acs7.1.amp`.
   * If using Alfresco Content Services 7.2.x, use the `tsgrp-opencontent-3.5-for-acs7.2.amp`.
   * If using Alfresco Content Services 7.3.x, use the `tsgrp-opencontent-3.5-for-acs7.3.amp`.

3. From the directory where your Alfresco Tomcat server is installed, run the following command to apply the AMP:

    Linux:

    ```java
    java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps/tsgrp-opencontent.amp tomcat/webapps/alfresco.war -force
    ```

    Windows:

    ```java
    java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps\tsgrp-opencontent.amp tomcat\webapps\alfresco.war -force
    ```

4. Delete current Alfresco deployed WAR files:

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `alfresco` folder (if it exists).

5. Install license file for OpenContent:

   Create the `module/com.tsgrp.opencontent/license` folder structure on the `/alfresco` classpath, for example, at `ALFRESCO_HOME/tomcat/shared/classes/alfresco`

   Place a `TextLicense.l4j` file in the `license` directory.

6. Deploy the OpenContent configuration:

    Create a file called `opencontent-override-placeholders.properties` and put it onto the `/alfresco` classpath, for example, in the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` folder.
  
    Update the necessary environment variables in the `opencontent-override-placeholders.properties`.

    There are many configurations that can be overridden. These are described later. To start, set the follow property:

     * `oc.email.smtp.host={SMTP host}`

7. Update Tomcat server configuration:

   By default, Apache Tomcat doesn't support UTF-8 characters for languages other than English. To enable support, the `web.xml` and `server.xml` files need to be modified in the deployed Tomcat.

   * When running OpenContent on Tomcat 8+, the `relaxedQueryChars` and `relaxedPathChars` parameters are required on the Connector.
   * If you are using Tomcat older than version 8.5, you may need to add this to `catalina.properties` in your `tomcat/conf` folder: `tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}`.

   Update the following files:

   1. In `${tomcat.home}/conf/web.xml`:

        Uncomment the `setCharacterEncodingFilter` and its mapping in `web.xml` (if not already uncommented):

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

   2. In `${tomcat.home}/conf/server.xml`:

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

   > **Note:** In a typical Alfresco installation, the `8080` connector can be modified for HTTP communications and the `443` connector can be modified for `HTTPS` connections.

8. (Optional) This step is only required if using Alfresco Search Services 2.0 or greater:

    1. Navigate to the `SOLR_HOME/solrhome/conf` folder.

    2. In the file `shared.properties`, uncomment the following properties (if not already uncommented):

       * `alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`
       * `alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`
       * `alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`

    3. Once the above changes have been made, Solr must be reindexed.

       Stop the Solr process if it is running.

       Clear out the following folder paths:

        * `SOLR_HOME/solrhome/alfresco/index`
        * `SOLR_HOME/solrhome/archive/index`
        * `SOLR_HOME/solrhome/alfrescoModels`

       Start Solr process.

9. Start up Alfresco server.

10. Confirm OpenContent has been installed correctly by accessing `http://{server}/alfresco/OpenContent`.

## Install libraries {#install}

### Install PDFium (optional) {#pdfium}

> **Note:** This step is only needed if using Enterprise Viewer on Linux.

1. Locate the`pdfium.tar.gz` in the `Third Party` folder of the `alfresco-enterprise-viewer-package` ZIP.

2. Unpack the `pdfium.tar.gz` source to a location on your server.

3. Note the path where `pdfium` is installed as `PDFIUM_HOME`.

4. Navigate into the newly unpacked `PDFIUM_HOME` directory.

5. Run the following command from the `PDFIUM_HOME` to ensure `pdfium` was unpacked successfully:

    ```bash
    ./pdfium --help
    ```
  
   The `pdfium` help message is displayed.

### Install FFMPEG (optional)  {#ffmpeg}

> **Note:** This step is only needed if using Enterprise Viewer Video.

1. Download and install an official FFMPEG package from [here](https://ffmpeg.org/download.html){:target="_blank"}.

    Use the latest supported release. Note that the latest Windows release is included in the `Third Party` folder of the `alfresco-enterprise-viewer-package` zip

2. Note the path where FFMPEG is being installed as `FFMPEG_HOME`.

3. Navigate into the newly unpacked FFMPEG directory.

4. Run the following command from the `FFMPEG_HOME` to ensure `ffmpeg` was unpacked successfully:

    ```bash
    ./{FFMPEG_HOME}/ffmpeg --help
    ```

   The `ffmpeg` help message is displayed.

## Configure OpenContent for AEV

> **Note:** You only need to complete this section if you've installed FFMPEG and/or PDFium above.

1. Stop Alfresco.

2. Configure OpenContent.

    Update the environment variables in the provided `opencontent-override-placeholders.properties`. Deploy the updated file to the `/alfresco` classpath, for example, the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` directory:

    If you installed FFMPEG and PDFium above, update the following properties:

    * `FFMPEG.path=FFMPEG_HOME` (if installed, get the `FFMPEG_HOME` value from [Install FFMPEG](#ffmpeg))
    * `pdfium.path=PDFIUM_HOME` (if installed, get the `PDFIUM_HOME` value from [Install PDFium](#pdfium))

3. Delete current Alfresco deployed WAR files.

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `alfresco` folder (if it exists).

4. Start Alfresco.

## Install collaboration (optional)  {#collab}

In this section the Enterprise Viewer collaboration features Socket.IO server is installed.

> **Note:** This installation is only needed if the collaboration features are required.

1. Install `Node.js`.

   Both `NodeJS` and `npm` must be installed. Follow the `Node.js` install instructions at [https://nodejs.org/](https://nodejs.org/){:target="_blank"}.

   * `Node.js` - use the latest version your OS supports
   * `npm` - Node package manager, included with `Node.js`

2. Install Socket Server.

   Locate the `socket-server.zip` in the `Collaboration` folder of the `alfresco-enterprise-viewer-package` zip.

   Place the `socket-servers.zip` in the directory where the collaboration server is to be installed, and unzip it. This location will be known as `SOCKET_HOME`.

   This directory will now contain `server.js`, `Dockerfile`, `windows-service.js`, `package.json`, etc.

3. If no `node_modules` directory is included in the `SOCKET_HOME`, then run `npm i` from the `SOCKET_HOME`directory to generate the `node_modules` directory.

4. Test the Socket Server.

   To start the collaboration server, navigate to `SOCKET_HOME` and run the following command: `node server.js`.

   A Node JavaScript server starts listening on port 3000 for connections, and the command prompt displays the message `"listening on *:3000”`.

5. Stop the Socket Server.

   Press Ctrl+C to end the process.

6. Install the forever tool.

   Install forever by running the following command:

   * Linux: `sudo npm install forever -g`
   * Windows: `npm install forever -g`

7. Start the Socket Server.

   Start the collaboration server using forever by running the following command:

    ```text
    forever start server.js
    ```

## Install webapps

This sections walks through how to install the Enterprise Viewer web application.

> **Note:**
>
> * If you installed a proxy then follow the steps in [Install web applications on separate Tomcat](#separate-tomcat-oa).
>
> * If no proxy was installed then follow the steps to [Install web applications on Alfresco Tomcat](#alfresco-tomcat-oa).

### Install web applications on separate Tomcat {#separate-tomcat-oa}

This section walks through how to install the web applications on a separate Tomcat instance (meaning, you must have a proxy setup).

1. Install Apache Tomcat.

    See [https://archive.apache.org/dist/tomcat](https://archive.apache.org/dist/tomcat){:target="_blank"}. Note that if you installed ACA, you can use the same Tomcat you may have installed for ACA. Shut it down now if it's already running.

2. Copy the `OpenAnnotate.war` file into the `TOMCAT_HOME/webapps` directory.

   You'll find the WAR file in the `Web Applications` folder of the `alfresco-enterprise-viewer-package` zip.

3. Configure Tomcat for shared classpath loader as well as encoded slashes (if not already configured in the Content Accelerator installation):

   Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line (if not already there):

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like:

    ```text
    /hpi/{aca-module}/{object-id}
    ```

   In the above case, the object ID is URL encoded. This means that forward slashes in the object ID are URL encoded to `%2F`. By default, Tomcat does not serve any URLs with a URL encoded forward (or back) slash.

   To work around the issue, edit the `TOMCAT_HOME/conf/catalina.properties` file and add the following line (if not already there):

    ```java
    org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
    ```

4. (If not already configured in the ACA install) - Configure Tomcat ports in the `TOMCAT_HOME/conf/server.xml`:

   Configure the connector, server, and redirect ports to not conflict with Alfresco Tomcat’s (example below):

   * Set Connector - `port="9090"` (defaults to `8080`)
   * Set Connector - `redirectPort="9443"` (defaults to `8443`)
   * Set Server - `port="9005"` (defaults to `8005`)

   Note that you will need to ensure that the port chosen (i.e. `9090`) is open to the end user.

5. (If not already configured in the ACA install) - Create a `classes` directory:

   Create the path `TOMCAT_HOME/shared/classes`, if it does not already exist.

6. Locate the `openannotate-override-placeholders.properties` file in the `Web Applications` folder of the `alfresco-enterprise-viewer-package` zip.

7. Update the provided `openannotate-override-placeholders.properties` file:

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   > **Note:** If the Enterprise Viewer and the Alfresco Repository are located on the same server, then the URL can be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`.

   (OPTIONAL) This step is only required if using the Enterprise Viewer and leveraging the "Collaboration Server" functionality for collaborative annotation functionality:

    Update the following properties:

    * `collaborationModeEnabled=true`
    * `collaborationEndpoint=http://${server}:${port}`

    Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for the environment being installed to (See the section [Install collaboration features]({% link enterprise-viewer/3.5/install/index.md %}#collab))

8. For AEV 3.5.1 or later, verify the `secureBrowserCookies` configuration. If you are planning to setup SSL then `secureBrowserCookies` should be set to `true`, else it should be `false` (the default).

   In the `openannotate-override-placeholders.properties` set the following property accordingly: `secureBrowserCookies=`

9. For AEV 3.5.1 or later, verify the `application.secureBrowserCookies` configuration. If you are planning to setup SSL then `application.secureBrowserCookies` should be set to `true`, or else it should be `false` (the default).

   In the `opencontent-override-placeholder.properties` set the following property accordingly: `application.secureBrowserCookies=`

10. Copy the `opencontent-override-placeholders.properties` and `openannotate-override-placeholders.properties` files to the Tomcat classpath, for example, in the `TOMCAT_HOME/shared/classes` directory.

11. Start Tomcat.

12. Confirm you can access AEV at `http://{server}/OpenAnnotate`.

### Install web applications on Alfresco Tomcat {#alfresco-tomcat-oa}

This section walks through how to install the web applications on Alfresco Tomcat (recommended for easier non-Production environment installation).

1. Stop Alfresco Tomcat.

2. Copy the `OpenAnnotate.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

   You'll find this WAR file in the `Web Applications` folder of the `alfresco-enterprise-viewer-package` zip.

3. Create a `classes` directory:

   Create a `classes` directory within the `ALFRESCO_HOME/tomcat/shared` directory, if it does not already exist.

4. Locate the `openannotate-override-placeholders.properties` file in the `Web Applications` folder of the `alfresco-enterprise-viewer-package` zip.

5. Update the provided `openannotate-override-placeholders.properties` file:

   Set the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent within Alfresco:

   `{Application Base URL}/alfresco/OpenContent`

   > **Note:** The URL can also be: `http://localhost:<alfrescoPort>/alfresco/OpenContent`

6. (Optional) This step is only required if using the Enterprise Viewer and leveraging the "Collaboration Server" functionality for collaborative annotation functionality:

   Update the provided `openannotate-override-placeholders.properties` file:

   * `collaborationModeEnabled=true`
   * `collaborationEndpoint=http://${server}:${port}`

   Replace the `${server}` and `${port}` placeholders in the above URL with the correct server and port values for
   the environment being installed to. See the section [Install collaboration features]({% link enterprise-viewer/3.5/install/index.md %}#collab).

7. For AEV 3.5.1 or later, verify the `secureBrowserCookies` configuration. If you are planning to setup SSL then `secureBrowserCookies` should be set to `true`, else it should be `false` (the default).

   In the `openannotate-override-placeholders.properties` set the following property accordingly: `secureBrowserCookies=`

8. For AEV 3.5.1 or later, verify the `application.secureBrowserCookies` configuration. If you are planning to setup SSL then `application.secureBrowserCookies` should be set to `true`, else it should be `false` (the default).

   In the `opencontent-override-placeholders.properties` set the following property accordingly: `application.secureBrowserCookies=`.

9. Copy the `opencontent-override-placeholder.properties` and `openannotate-override-placeholders.properties` file to the Tomcat classpath, for example, in the `TOMCAT_HOME/shared/classes` directory.

10. Start Alfresco Tomcat.

11. Confirm you can access AEV at `http://{server}/OpenAnnotate`.

## Configure Share extensions for AEV (optional)

> **Note:** These steps are only required if you wish to accomplish one or both of the following:
>
> * Use the Enterprise Viewer as the document viewer in the Share interface.
> * Include an action in the Share interface to launch a document in the Enterprise Viewer in a new tab.

1. Stop Alfresco.

2. Locate the `oa-alfresco.amp` in the `Alfresco Artifacts` folder of the `alfresco-enterprise-viewer-package` zip.

   Copy the AMP to the `ALFRESCO_HOME/amps` directory.

   From the directory where your Alfresco Tomcat lives, run this command (replacing `{ALFRESCO_HOME}` with the location of your `ALFRESCO_HOME`):

    Linux:

    ```java
    java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps/oa-alfresco.amp tomcat/webapps/alfresco.war -force
    ```

    Windows:

    ```java
    java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps\oa-alfresco.amp tomcat\webapps\alfresco.war -force 
    ```

3. (Optional) This step is only required if using the Enterprise Viewer External Launcher action in Share. This adds a Share action to launch a document in the Enterprise Viewer in a new tab.

   Locate the `oa-share-external-launcher.amp` in the `Share Artifacts` folder of the `alfresco-enterprise-viewer-package` zip.

   > **Important:** If AEV and ACS are not running the same Tomcat or if you don't have a proxy setup to make it appear like they are, you will need to edit the following files in the AMP by extracting them or by editing them directly inside the AMP:
   >
   > * `/web/component/(documentlibrary or preview)/annotation-urls.js`
   > * `/web/component/(documentlibrary or preview)/annotation-urls-min.js`
   >
   > Update the `Alfresco.constants.EXTERNAL_LAUNCHER_ANNOTATION_URL` variable within these files.
   >
   >    This variable needs to be updated with the URL of the server that Enterprise Viewer is going to be deployed on (even if Enterprise Viewer is deployed on the same server as the Share web application).
   >
   >    For example:
   >
   >    ```text
   >    Alfresco.constants.EXTERNAL_LAUNCHER_ANNOTATION_URL = "http://localhost:8080/OpenAnnotate/login/external.htm";
   >    ```
   >
   >    These URLs are relative by default, so you only need to update them if AEV and ACS are running on separate Tomcats and you don't have a proxy setup to make it appear like they are running on the same Tomcat.

   Then, copy the AMP to the `ALFRESCO_HOME/amps_share` directory (create the directory if it doesn't exist).

   From the directory where your Alfresco Tomcat is installed, run the following command (replacing `{ALFRESCO_HOME}` with the location of your `ALFRESCO_HOME`):

    Linux:

    ```bash
    java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps_share/oa-share-external-launcher.amp tomcat/webapps/share.war -force
    ```

    Windows:

    ```bash
    java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps_share\oa-share-external-launcher.amp tomcat\webapps\share.war -force 
    ```

4. (Optional) This step is only required if using the Enterprise Viewer Web Preview in Share. It replaces the OOB Share viewer with the Enterprise Viewer.

   Locate the `oa-share-webpreview.amp` in the `Share Artifacts` folder of the alfresco-enterprise-viewer-package zip.

   > **Important:** If AEV and ACS are not running the same Tomcat or if you don't have a proxy setup to make it appear like they are, you will need to edit the following files in the AMP by extracting them or by editing them directly inside the AMP:
   >  
   >    * `/web/component/(documentlibrary or preview)/annotation-urls.js`
   >    * `/web/component/(documentlibrary or preview)/annotation-urls-min.js`
   >
   > In both cases, you need to update the `Alfresco.constants.WEBPREVIEW_ANNOTATION_URL` variable within these files.
   >
   >    This variable needs to be updated with the URL of the server that Enterprise Viewer is going to be deployed on (even if Enterprise Viewer is deployed on the same server as the Share web application).
   >
   >   For example:
   >
   >   ```text
   >   Alfresco.constants.WEBPREVIEW_ANNOTATION_URL = "http://localhost:8080/OpenAnnotate/login/external.htm";
   >   ```
   >
   >   These URLs are relative by default, so you only need to update them if AEV and ACS are running on separate Tomcats and you don't have a proxy setup to make it appear like they are running on the same Tomcat.

   Then, copy the AMP to the `ALFRESCO_HOME/amps_share` directory (create the directory if it doesn't exist).

   From the directory where your Alfresco Tomcat lives, run this command (replacing `{ALFRESCO_HOME}` with the location of your `ALFRESCO_HOME`):

   Linux:

    ```bash
    java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps_share/oa-share-webpreview.amp tomcat/webapps/share.war -force
    ```

   Windows:

    ```bash
    java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps_share\oa-share-webpreview.amp tomcat\webapps\share.war -force 
    ```

5. Delete current Share deployed WAR files.

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `share` folder (if it exists).

6. Start Alfresco.

7. (Optional) You can verify these AMPs were deployed correctly by doing the following:

    * `oa-share-external-launcher.amp` - open an asset in Share and look at the Document Actions panel on the right-hand side of the screen. Ensure that the asset has a PDF rendition or a suitable image rendition available for Enterprise Viewer. If you installed the `oa-share-external-launcher.amp`, the "Enterprise Viewer" action should be available.

    * `oa-share-webpreview.amp` - open an asset in Share. If you installed the `oa-share-webpreview.amp` and the asset has a PDF rendition or a suitable image rendition available for Enterprise Viewer, the asset should appear in "Alfresco Enterprise Viewer" directly in the Share application screen.
