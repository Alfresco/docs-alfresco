---
title: Install Content Accelerator
---

Use this information to install the Content Accelerator base package and pre-configured accelerators on top of ACA.

## Prerequisites

There are a number of software requirements for installing the Content Accelerator:

### Distribution Zips

The Content Accelerator can be installed using distribution zips. These zips can be downloaded from [Hyland Community](https://community.hyland.com/Products/alfresco/release-notes/release-notes/Alfresco-Content-Accelerators-on-premise-Releases){:target="_blank"}.

You will need to download the following distribution zips in order to install ACA:

* alfresco-content-accelerator-base-package-3.5.x.zip
* (Claims Only) alfresco-content-accelerator-claims-accelerator-3.5.x.zip
* (PnP Only) alfresco-content-accelerator-policy-and-procedure-accelerator-3.5.x.zip
* (HR Only) alfresco-content-accelerator-sehr-accelerator-3.5.x.zip
* (HR Tier-2 Only) alfresco-content-accelerator-sehr-rm-accelerator-3.5.x.zip

> **Note:** If you're installing the HR Employee File Management (HR EFM) solution, you will need to get the HR EFM pre-release artifacts from [Hyland Confluence](https://hyland.atlassian.net/wiki/spaces/SESS/pages/687540729/Alfresco+HR+Employee+File+Management){:target="blank"} rather than using the distribution zips in Hyland Community.

### Java

Content Accelerator requires Java 11 or above. Consult your repository of choice for more detailed requirements. If you are using Java 17, refer to our [Java 17 support guide]({% link content-accelerator/latest/install/java-support.md %}).

### Alfresco repository version

See the [Supported Platforms]({% link content-accelerator/latest/support/index.md %}) for more information.

Please ensure you have the correct version of the Content Accelerator package for your Alfresco Content Services version. If you are unsure, please [contact Hyland Support]({% link support/latest/contact.md %}).

### Operating System requirements

Operating System and libraries for the target server machine:

* **Windows**: Windows Server 2016 or newer
* **Linux**: CentOS, Ubuntu, RHL, Amazon Linux
  * **TrueType Font set** - In order to have OpenOverlay apply the expected fonts to overlays/watermarks, the Truetype Arial font is expected to be installed on the server that runs OpenContent.
    * **Ubuntu** - `sudo apt install ttf-mscorefonts-installer`
    * **CentOS** -
       1. Place fonts into the `/usr/share/fonts` directory
       2. Run `fc-cache -v /usr/share/fonts/ && fc-cache-64 -v /usr/share/fonts/`
    * **Amazon-linux** - this typically comes pre-installed

## Install Proxy (Optional in non-production env)

### Web Proxy Background

ACA must be exposed on the same host and port as OpenContent.  In other words, if the user accesses ACA using  `http://myserver:8080/ocms`, then ACA must make Ajax requests to OpenContent at: `http://{server}:8080/OpenContent`.  

Since ACA executes as a JavaScript application in the browser and communicates with OpenContent on the server, you must account for the Same Origin Policy.  There are two ways to handle this:

1. Deploy the ACA war to the same Application Server that's running OpenContent.  This ensures that ACA is sourced from the same server and port as OpenContent.

   > **Note:** for this to work, the application server port must be accessible to the end user's browser.

2. Front all communication from ACA to OpenContent through a web server.

   * Install ACA on `http://{server1}:9090/ocms`
   * Install OpenContent on `http://{server2}:8080/OpenContent`
   * Setup a proxy to route:
   * `http://{server3}/ocms` routes to `http://{server1}:9090/ocms`
   * `http://{server3}/OpenContent` routes to `http://{server2}:8080/OpenContent`
   * In the above example, ACA would be configured to access OpenContent at `http://{server3}/OpenContent`.  Now, to the browser all communication is on the same protocol, server, and port so the Same Origin Policy is upheld.

If using option 1 (deploying ACA to the Alfresco Tomcat), you can skip to [Install libraries]({% link content-accelerator/latest/install/install-guide.md %}#install-libraries) since no proxy will need to be installed.

If using option 2 (preferred for a production deployment), you must complete the following steps to setup a proxy.

### Proxy Setup

During install, the following routes must be proxied to their respective ports and applications. SSL is recommended at a minimum at the Proxy layer for Production installations.

Policy and Procedure Accelerator solution:

* `{Application Base URL}/alfresco`
* `{Application Base URL}/share`
* `{Application Base URL}/WizardAdmin`
* `{Application Base URL}/ocms`

Claims Management Accelerator solution:

* `{Application Base URL}/alfresco`
* `{Application Base URL}/share`
* `{Application Base URL}/ocms`

When installing a proxy please note that you are not limited to using apache or Nginx. These are just two common options which we cover example installs of below. As long as the above routes are proxied appropriately you can move onto `http://"Install libraries and AMPs"`.

### Example Proxy Install 1 - Apache HTTPD on Windows

1. Install Apache httpd

   Obtain binaries from [https://www.apachelounge.com/download/](https://www.apachelounge.com/download/){:target="_blank"}.

   Install Apache to `C:\Apache\Apache24` (change to your desired version as appropriate).  This is referred to as `${apache.home}` below.

*Navigate to `${apache.home}\conf` and open up `httpd.conf`
*Find the line that has ServerRoot on it  
   *It should default to something like `ServerRoot "c:/Apache24"`
   *Change the ServerRoot to where you extracted Apache
*If you would like to install as a service, consult the Readme.txt file that comes with the installation.

2. Modify `httpd.conf` (`${apache.home}\conf\httpd.conf`) to load the Virtual Hosts configuration file, and the Proxy, ProxyAJP, and Rewrite modules.  **Uncomment** the following lines:

           Include conf/extra/httpd-vhosts.conf
           LoadModule proxy_module modules/mod_proxy.so
           LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
           LoadModule proxy_http_module modules/mod_proxy_http.so
           LoadModule rewrite_module modules/mod_rewrite.so
           LoadModule access_compat_module modules/mod_access_compat.so
           LoadModule authz_host_module modules/mod_authz_host.so
           LoadModule filter_module modules/mod_filter.so

3. Modify the `httpd-vhosts.conf` file (`${apache.home}\conf\extra\httpd-vhosts.conf`).  Remove the sample virtual hosts from the file by deleting the `<VirtualHost *:80>` sections.

4. Add a new virtual host to your vhosts configuration file that points to the Alfresco Tomcat and Tomcat running ACA/WizardAdmin by adding the following lines.

* Make sure to update server names and paths as needed (aka replace anything surrounded by ${}).
* Make sure to also Update the proxyPass sections at the bottom to proxy the appropriate routes.

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

   #Proxy all requests at the root to the Tomcat that actually has the application in question
   ProxyPass / ajp://${your-TOMCAT-server-name}:9090/

</VirtualHost>
```

5. ACA has some routes that are formatted like the following:

   `/ocms/{aca-module}/{object-id}`

   In the above case, the object ID is URL encoded.  This means that forward slashes in the object ID are URL encoded to `%2F`.  By default, apache httpd does not serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue, add the following configuration to the `httpd-vhosts.conf` file for the host(s) ACA is running on:

   `AllowEncodedSlashes On`

6. (Re)start the proxy

   Go to `${apache.home}`/bin, open a command prompt, and run `httpd.exe`

7. Test by hitting `http://{server}/alfresco`

### Example Proxy Install 2 -  Nginx install on Amazon Linux

Here are some sample steps of installing nginx as a proxy (steps are done on amazon-linux and may need to be adjusted for other distributions)

1. Install nginx on the server. For example:

   * `sudo amazon-linux-extras list | grep nginx`
   * `sudo amazon-linux-extras enable nginx1`
   * `sudo yum clean metadata`
   * `sudo yum -y install nginx`
   * `nginx -v`

2. Confirm you can startup nginx

    * `sudo systemctl start nginx.service` (start the service)
    * `sudo systemctl reload nginx.service` (reload the service)
    * `sudo systemctl status nginx.service` (check that the status is active)
    * `sudo systemctl stop nginx.service` (stop the service)

3. Configure the proxy

    * `sudo vi /etc/nginx/nginx.conf`
    * Replace contents of the file with the following (replacing ports and servers and adding additional proxy_pass configs as necessary)

```plaintext 

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

      location /ocms {
            proxy_pass http://{server}:9090/ocms;
      }
   }
}
```

4. Start the nginx proxy and confirm it started up correctly
    * `sudo systemctl start nginx.service`
    * `sudo systemctl status nginx.service`

5. Make sure whatever port your proxy is listening on is open to the end user (example: you will need to open port 80 if you are using the configs in our example above)

6. Test that the proxy is working properly by hitting `http://{server}/share`

## Install libraries {#install-libraries}

>**IMPORTANT!** Backup the Alfresco Content Services database, `alfresco.war`, and `share.war`. These resources need to 
>be backed up in case of a rollback being required. (Make a copy of the original wars and store them in a safe location)

### ImageMagick Installation (OPTIONAL) {#im}

>**Note:** This step is only needed if using Document Combining.

1. Download and install a portable version of ImageMagick:

   * [Windows](https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.1.0-portable-Q16-HDRI-x64.zip){:target="_blank"}
   * [Linux](https://download.imagemagick.org/ImageMagick/download/binaries/magick){:target="_blank"}

2. Note the path where ImageMagick is being installed as `IMAGEMAGICK_HOME`.

3. Navigate into the newly unpacked ImageMagick directory.

4. Execute the following command from the `IMAGEMAGICK_HOME` to ensure `convert` was unpacked successfully:

   `./{IMAGEMAGICK_HOME}/bin/convert -help`

   The `convert` help message is displayed.

## Install Alfresco Module Packages (AMPs)

In this section we ensure that all components of the Content Accelerator are installed correctly into Alfresco Content Services.

1. Stop the Alfresco server

2. Copy the AMPs to the Alfresco Content Services installation:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps to this directory (these are amps that should be applied to the repository a.k.a `alfresco.war`):

    * `tsgrp-opencontent-{version_info}.amp`
    * `tsgrp-autofile.amp`

   These amps can be found in the alfresco-content-accelerator-base-package distribution zip under `Alfresco Artifacts` folder.

   >**Note:** Make sure you are using the correct `tsgrp-opencontent.amp` for your version of Alfresco.

   * If using Alfresco Content Services 7.1.x, use the `tsgrp-opencontent-3.5.x-for-acs7.1.amp`.
   * If using Alfresco Content Services 7.2.x, use the `tsgrp-opencontent-3.5.x-for-acs7.2.amp`.
   * If using Alfresco Content Services 7.3.x, use the `tsgrp-opencontent-3.5.x-for-acs7.3.amp`.
   * If using Alfresco Content Services 7.4.x, use the `tsgrp-opencontent-3.5.x-for-acs7.4.amp`.

3. (PnP ONLY) This step is only required if installing the Policy and Procedure Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:

   * `tsgrp-alfresco-chain-versioning.amp`
   * `pnp-platform-3.5.amp`

   These amps can be found in the alfresco-content-accelerator-policy-and-procedure-accelerator distribution zip under `Alfresco Artifacts` folder.

4. (Claims ONLY) This step is only required if installing the Claims Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:
   `claims-platform-3.5.amp`

   This amp can be found in the `alfresco-content-accelerator-claims-accelerator` distribution zip under `Alfresco Artifacts` folder.

5. (HR ONLY) This step is only required if installing the HR Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:

   * `sehr-platform-1.0-SNAPSHOT.amp`
   * `tsgrp-cascading-value-assistance.amp`
   * `tsgrp-alfresco-chain-versioning.amp`

   Navigate to `ALFRESCO_HOME/amps_share` directory and copy the following amp there:

   * `tsgrp-cascading-value-assistance-share.amp`

   This amp can be found in the `alfresco-content-accelerator-sehr-accelerator` distribution zip under the `Alfresco Artifacts` folder.

6. (HR Tier-2 ONLY) This step is only required if installing the HR Tier-2 Content Accelerator solution:

   Navigate to the `ALFRESCO_HOME/amps` directory and copy the following amps there:

   * `sehr-rm-platform-1.0-SNAPSHOT.amp`
   * `alfresco-governance-services-enterprise-repo-12.21.amp`

   Navigate to `ALFRESCO_HOME/amps_share` directory and copy the following amp there:

   * `alfresco-governance-services-enterprise-share-12.19.amp`

    This amp can be found in the `alfresco-content-accelerator-sehr-rm-accelerator` distribution zip under the `Alfresco Artifacts` folder.

7. Apply the AMPs

   From the directory where your alfresco tomcat lives, run this command for each Repository AMP required (replace `{myAmp}` with the correct AMP name and `{ALFRESCO_HOME}` with the location of your alfresco):

   Linux:

   `java -jar {ALFRESCO_HOME}/bin/alfresco-mmt.jar install {ALFRESCO_HOME}/amps/{myAMP}.amp tomcat/webapps/alfresco.war -force`

   Windows:

   `java\{javaVersion}\bin\java -jar {ALFRESCO_HOME}\bin\alfresco-mmt.jar install {ALFRESCO_HOME}\amps\{myAmp}.amp tomcat\webapps\alfresco.war -force`

8. Delete current Alfresco deployed WAR files

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the following [folders] (if they exist) to ensure old versions of the `alfresco.war` and `share.war` are not run:

   * `alfresco`
   * `share`

9. Install license file for OpenConnect

   Create the `module/com.tsgrp.opencontent/license` folder structure on the /alfresco classpath, for example, at `ALFRESCO_HOME/tomcat/shared/classes/alfresco`

   Place a `TextLicense.l4j` file in the `license` directory.

10. Deploy the OpenConnect configuration:

    Deploy/Copy the following files onto the /alfresco classpath, for example, `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` folder:
  
    * `opencontent-override-placeholders.properties`
    * `opencontent-override-config.xml`
    * `opencontent-override-module-context.xml`

   These files can be found in the `Alfresco Artifacts` folder of the alfresco-content-accelerator-base-package zip.

11. Configure OpenConnect

    In the `opencontent-override-placeholders.properties` file deployed in the last step, update the following environment variables:

    There are many configurations that *can be* overridden in this file later on.

    There are a few you will *need* to set for OpenContent to work correctly listed below:

    * `application.root.url={Application Base URL}` (ex: `http://localhost:9090`)
    * `oc.email.smtp.host={SMTP host}`
    * `imageMagick.path=IMAGEMAGICK_HOME` (if installed, get IMAGEMAGICK_HOME value from [ImageMagick Installation]({% link content-accelerator/latest/install/install-guide.md %}#im))

12. Update Tomcat server configuration:

   By default, Apache Tomcat doesn't support UTF-8 characters for languages other than English. To enable support, the web.xml and server.xml files need to be modified in the deployed Tomcat.

   When running OpenContent on Tomcat 8+, the `relaxedQueryChars` and `relaxedPathChars` parameters are required on the Connector. If you are using Tomcat older than version 8.5 - you may need to add this to catalina.properties in your tomcat/conf folder.: `tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}`

   The following will need to be updated:

   In the `${tomcat.home}/conf/web.xml`

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

   In the `${tomcat.home}/conf/server.xml`

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

13. (OPTIONAL) This step is only required if you are using Alfresco Search Services 2.0 or greater:

    a. Navigate to the `SOLR_HOME/solrhome/conf` folder.

    b. In the file `shared.properties`, uncomment the following properties (if not already uncommented):

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

14. (OPTIONAL) This step is only required if you are using Alfresco Search Enterprise 3.x or greater:

    a. Enable "Exact Term Search" using the "=" operator. Refer to the [Exact Term Search]({% link search-enterprise/latest/config/index.md %}) section for additional information.

    b. In the config file, add the following lines to enable exact term search:
       * `alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`
       * `alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}mltext`
       * `alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}content`

    c. Reindex Search Enterprise. Refer to the [Alfresco Search Enterprise Overview]({% link search-enterprise/latest/install/index.md %}) page.

    Note: During the first system bootstrap for new systems with tsgrp-autofile.amp, Search Enterprise must be reindexed. For additional information, refer to the [Alfresco Search Enterprise Overview]({% link search-enterprise/latest/install/index.md %}) page.

15. Start up Alfresco server.

16. Confirm OpenContent has been installed correctly by accessing `http://{server}/alfresco/OpenContent`.

## Install webapps

This sections walks through how to install the Alfresco Content Accelerator web application (including the WizardAdmin if installing the Policy and Procedure Content Accelerator solution).

>**Note:** If you installed a proxy then follow the [Install Web Applications on Separate Tomcat]({% link content-accelerator/latest/install/install-guide.md %}#install-webapps-separate-tomcat) Instructions.
> If no proxy was installed then follow the [Install Web Applications on Alfresco Tomcat]({% link content-accelerator/latest/install/install-guide.md %}#install-webapps-alfresco-tomcat) instructions.

### Install web applications on separate Tomcat {#install-webapps-separate-tomcat}

This section walks through how to install the web applications on a separate Tomcat instance (Meaning, you must have a proxy setup).

1. Install Apache Tomcat. See [https://archive.apache.org/dist/tomcat](https://archive.apache.org/dist/tomcat){:target="_blank"}.

2. Copy the `ocms.war` file into the `TOMCAT_HOME/webapps` directory.

   This war can be found in the `Web Applications` folder of the alfresco-content-accelerator-base-package zip.

3. (PnP and HR ONLY) This step is only required if using the Policy and Procedure Content Accelerator or HR Content Accelerator solution:

   Copy the `WizardAdmin.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

   You'll find this WAR file in the `Web Applications` folder of the `alfresco-content-accelerator-policy-and-procedure-accelerator` zip or `alfresco-content-accelerator-sehr-accelerator` zip.

4. Configure Tomcat for shared classpath loader as well as encoded slashes:

   Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line:

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like the following:

   `/ocms/{aca-module}/{object-id}`

   In the above case, the object ID is URL encoded.  This means that forward slashes in the object ID are URL encoded to `%2F`.  By default, Tomcat does not serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue, edit the `TOMCAT_HOME/conf/catalina.properties` file and add the following:

   `org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true`

5. Configure Tomcat ports in the `TOMCAT_HOME/conf/server.xml`:

   Configure the connector, server, and redirect ports to not conflict with Alfresco Tomcat’s (example below):

   * Set Connector - `port="9090"` (default will be 8080)
   * Set Connector - `redirectPort="9443"` (default will be 8443)
   * Set Server - `port="9005"` (default will be 8005)

   Note that you will need to ensure that the port chosen (ie 9090) is open to the end user

6. Locate the directory to place files on the tomcat classpath, for example, `tomcat/shared/classes` (create it if it doesn't exist).

7. Locate the `hpi-overrides.properties` file in the `Web Applications` folder of the alfresco-content-accelerator-base-package.

   Copy this `hpi-overrides.properties` file onto the tomcat classpath, for example, into the`TOMCAT_HOME/shared/classes` directory.

8. Verify the `secureBrowserCookies` configuration. If you are planning to setup SSL then `secureBrowserCookies` should be set to `true`, or else it should be `false` (this is the default).

   There are two places where this config will need to be updated:

   * `hpi-overrides.properties` on the tomcat classpath, for example, `TOMCAT_HOME/shared/classes/` directory.
   * `TOMCAT_HOME/webapps/ocms/assets/config/config-overrides.js`

9. Verify the `application.secureBrowserCookies` configuration. If you are planning to setup SSL then `application.secureBrowserCookies` should be set to `true`, or else it should be `false` (the default).

   * Check `opencontent-override-placeholder.properties` on the Tomcat classpath, for example, `TOMCAT_HOME/shared/classes/` directory.

10. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution AND if `TOMCAT_HOME` is NOT `/opt/ocms-policy/apache-tomcat`

    Navigate to `TOMCAT_HOME/webapps` and extract the `WizardAdmin.war`.

    Navigate to `TOMCAT_HOME/webapps/WizardAdmin/WEB-INF/classes` and modify the following files to have the proper path to your `TOMCAT_HOME` on the line numbers listed:

    * `AbtApplication.properties`:
        * Lines 26, 27, 28, 29, 34
    * `ActiveWizard.properties`:
        * Line 148
    * `ImpactAnalysis.properties`:
        * Lines 26, 29, 39, 40, 42, 48, 49

11. Start Tomcat

12. Confirm you can access ACA at `http://{server}/ocms`

### Install web applications on Alfresco Tomcat {#install-webapps-alfresco-tomcat}

This section walks through how to install the web applications on Alfresco Tomcat (recommended for easier non-Production environment installation).

1. Stop Alfresco Tomcat

2. Copy the `ocms.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

   This war can be found in the `Web Applications` folder of the alfresco-content-accelerator-base-package zip.

3. (PnP and HR ONLY) This step is only required if using the Policy and Procedure Content Accelerator or HR Content Accelerator solution:

   Copy the `WizardAdmin.war` file into the `ALFRESCO_HOME/tomcat/webapps` directory.

   You'll find this WAR file in the `Web Applications` folder of the `alfresco-content-accelerator-policy-and-procedure-accelerator` zip or `alfresco-content-accelerator-sehr-accelerator` zip.

4. Configure Tomcat for shared classpath loader as well as encoded slashes:

   Edit the `ALFRESCO_HOME/tomcat/conf/catalina.properties` file and enable the `shared.loader` by adding the following line:

   `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

   ACA has some routes that are formatted like the following:

   `/ocms/{aca-module}/{object-id}`

   In the above case, the object ID is URL encoded.  This means that using Alfresco as a back-end, causes forward slashes in the object ID to be URL encoded to `%2F`.  By default, neither Tomcat nor Apache serve any URLs with a URL encoded forward (or back) slash.  

   To work around the issue on the Alfresco Tomcat itself, add the following configuration to the to your Java Opts / CATALINA_OPTS.  To update the java options, go to {TOMCAT_HOME}/bin and run tomcat7w.exe //ES//{TOMCAT_SERVICE_NAME}

   `-Dorg.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true`

   OR edit the `ALFRESCO_HOME/tomcat/conf/catalina.properties` file and add the following:

   `org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true`

5. Create a `classes` directory:

   Create a `classes` directory within the `ALFRESCO_HOME/tomcat/shared` directory, if it does not already exist.

6. Locate the `hpi-overrides.properties` file in the `Web Applications` folder of the alfresco-content-accelerator-base-package.

   Copy this `hpi-overrides.properties` file onto the tomcat classpath, for example, into the`ALFRESCO_HOME/tomcat/shared/classes` directory.

7. Verify the `secureBrowserCookies` configuration. If you are planning to setup SSL then `secureBrowserCookies` should be set to `true`, else it should be `false` (this is the default).

   There are two places where this config will need to be updated:

   * `hpi-overrides.properties` on the tomcat classpath, for example, `ALFRESCO_HOME/tomcat/shared/classes/` directory.
   * `ALFRESCO_HOME/tomcat/webapps/ocms/assets/config/config-overrides.js`

8. Verify the `application.secureBrowserCookies` configuration. If you are planning to setup SSL then `application.secureBrowserCookies` should be set to `true`, or else it should be `false` (the default).

   * Check `opencontent-override-placeholder.properties` on the Tomcat classpath, for example, `TOMCAT_HOME/shared/classes/` directory.

9. (OPTIONAL) This step is only required if using the Policy and Procedure Content Accelerator solution:

    Navigate to `ALFRESCO_HOME/tomcat/webapps` and extract the `WizardAdmin.war`.

    Navigate to `ALFRESCO_HOME/tomcat/webapps/WizardAdmin/WEB-INF/classes` and modify the following files to have the proper
    path to your `ALFRESCO_HOME` on the line numbers listed:

    * `AbtApplication.properties`:
        * Lines 26, 27, 28, 29, 34
    * `ActiveWizard.properties`:
        * Line 148
    * `ImpactAnalysis.properties`:
        * Lines 26, 29, 39, 40, 42, 48, 49

10. Start Alfresco Tomcat

11. Confirm you can access ACA at `http://{server}/ocms`

## Install Configurations

1. Create groups and folders:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/hpi/setup`

   This will create the base groups and folder for the application.

2. (PnP ONLY) This step is only required if using the Policy and Procedure Content Accelerator solution:

   Create Policy and Procedure specific groups and folders:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/wizard/awSetup`

   This will create the base groups and folder for the Policy and Procedure solution.

3. (HR ONLY) This step is only required if using the HR Content Accelerator solution:

   Create HR specific groups and folders:

   Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/sehr/setup`

   This will create the base groups and folder for the HR solution.

4. Locate the `default-{accelerator}.zip` configurations and rename it.

   * For PnP, the file will be named `default-pnp.zip` and can be found in the `Configuration` folder of the alfresco-content-accelerator-policy-and-procedure-accelerator zip.
   * For Claims, the file will be named `default-claims.zip` and can be found in the `Configuration` folder of the alfresco-content-accelerator-claims-accelerator zip.
   * For HR, the file will be named `default-sehr.zip` and can be found in the `Configuration` folder of the alfresco-content-accelerator-sehr-accelerator zip.
   * For HR Tier-2, the file will be named `default-sehr-rm.zip` and can be found in the `Configuration` folder of the alfresco-content-accelerator-sehr-rm-accelerator zip.

   Obtain the `default-{accelerator}.zip` for your accelerator and rename the zip to `default.zip`.

5. Import default configuration using config import tool.

      1. In a browser, navigate to {Application Base URL}/ocms and login to the application as the Alfresco Administrator. The screen displays a message that no configurations exist for the application yet.

      2. Click the button that is included in the message to navigate to the administration interface.

      3. Navigate to **Tools** > **Config Archiver** from the left menu.

      4. Use the Import Config function to import the default.zip from the previous step.

6. (OPTIONAL) This step is only required if **NOT** using the Alfresco Enterprise Viewer:

   Navigate to the *Stage Config*. For each stage config:
    1. Navigate to the *docviewer*
    2. Turn off *Alfresco Enterprise Viewer* and *Alfresco Enterprise Video Viewer*
    3. Turn on `PDF.js` and `Video.js`
    4. Click **Save Config**

7. (HR Tier-2 ONLY) This step is only required if you are installing the HR Tier-2 solution:

   Follow the installation steps to configure Alfresco Governance Services for the [HR Tier-2 solution]({% link content-accelerator/latest/configure/hr-management.md %}).
