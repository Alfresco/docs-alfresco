---
title: Configure repository
---

Use this information to configure the Content Services repository.

## Run in read-only mode

You may want to run Content Services in read-only mode, for example, if you're using Alfresco for Solr to track in order to maintain indexes.

To set Alfresco to read-only mode, use one of the following methods:

* Using the `alfresco-global.properties` file
* Using a JMX client such as JConsole

{% capture global %}

The `server.allowWrite` property specifies that the repository will allow write operations. If set to false, the repository is in read-only mode.

1. Open the `alfresco-global.properties` file.
2. Add the following property:

    ```bash
    server.allowWrite=false
    ```

3. Save the file.
4. Restart the Alfresco server.

{% endcapture %}
{% capture jmx %}

1. Login to JConsole.
2. Using the MBean tab, go to **JMX MBeans > Alfresco > Configuration > sysAdmin > Attributes**.
3. Set the value of the `server.allowWrite=false` attribute to read-only.
4. Click **Refresh**.

Follow these steps to check if Content Services is set to read-only mode or not:

1. Launch the [Admin Console]({% link content-services/7.3/admin/admin-console.md %}#launchadminconsole).
2. Under **General**, click **System Settings**.
3. Under **Repository Settings**, check the value of **Server Allow Writes**.

{% endcapture %}

{% include tabs.html opt1="Global properties" content1=global opt2="JMX" content2=jmx %}

## Deploy with a different context path {#deploy-contextpath}

There are a number of updates that you need to make if you want to deploy to a context path that isn't `/alfresco`.

The context path is the path that's used by applications (for example, Alfresco Share, SOLR, SharePoint, and others) to access the repository. If you change this value, you must reflect the change in your application server configuration.

> **Note:** You can't install at the server root (i.e. `/`). In other words, the context path can't be the server root.

Follow these steps if you want to deploy to a context path that's not `/alfresco`. The string `new-context-path` is used to represent the name of the context path that you're using:

1. Deploy the `alfresco.war` file to a different context path; for example, if you're using Tomcat, rename the `alfresco.war` file to `new-context-path.war` and then deploy it. For other application servers, set the context path in the Admin Console during deployment.

2. Update `alfresco-global.properties` with the name of the context path: `alfresco.context=new-context-path`.

3. Update `share-config-custom.xml` as described in [Configuring the Share default port]({% link content-services/7.3/develop/share-ext-points/share-config.md %}#setting-default-port).

4. Update the context path setting in the `_vti_bin` application:

    1. Unpack the `_vti_bin.war` file.

    2. Locate the `WEB-INF/web.xml` file in the `_vti_bin` application.

    3. Replace the `<param-value>` value with `/new-context-path/aos` to update the context parameter with the new context path. The example shows the default values in the `WEB-INF/web.xml` file:

        ```bash
        <context-param>
           <param-name>org.alfresco.enterprise.repo.officeservices.dispatch.SERVICES</param-name>
           <param-value>/alfresco/aos</param-value>
           <description>A space separated list of url-encoded context paths of SharePoint protocol enabled applications (e.g. Alfresco Content Services)</description>
        </context-param>
        ```

    4. Repack the contents of the `_vti_bin` application into a `_vti_bin.war` file and deploy it.

5. Unpack `ROOT.war` and edit the `index.jsp` file to set the context path:

    Change `/alfresco` to `/new-context-path`:

    ```bash
    if(request.getMethod().equals("PROPFIND") || request.getMethod().equals("OPTIONS"))
    { ServletContext alfrescoContext = application.getContext("/alfresco"); ... }
    ```

6. Repack the contents of `ROOT.war` and deploy it.

7. Update the Solr configuration to specify the new context path:

    If you're using Solr, modify the following files:

    ```bash
    solr/workspace-SpacesStore/conf/solrcore.properties
    solr/archive-SpacesStore/conf/solrcore.properties
    ```

    to specify the properties relevant to your configuration:

    ```bash
    alfresco.host=localhost
    alfresco.port=8080
    alfresco.port.ssl=8443
    alfresco.baseUrl=/alfresco
    ```

### Deploy with a reverse proxy

Follow this guidance if you want to run Content Service with a reverse proxy.

1. If the reverse proxy maps the target server to a different context path, or if you deployed specifically to a different context path, you need to follow the steps in [Deploy with a different context path](#deploy-contextpath), with the following changes:

    1. In step [2](#deploy-contextpath), update the values in the `alfresco-global.properties` file:

        ```bash
        alfresco.context=xxx
        alfresco.host=xxx
        alfresco.port=xxx
        alfresco.protocol=xxx
        ```

        where `xxx` are the externally visible context, host name, port number and protocol values.

    2. You must specify the context path that's externally visible in all steps, and not the context path that the repository is actually running on.

        Exceptions are in:

        * Step [1](#deploy-contextpath) and step [3](#deploy-contextpath) - if Share is connecting to the repository directly and not through the reverse proxy.
        * Step [7](#deploy-contextpath) - if Solr is contacted directly and not through the reverse proxy.

## Tune the JVM

The hardware requirements for the repository and Alfresco Share are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation.

> **Important:** This information suggests metrics and estimates, but your system may vary.

> **Note:** In the following sections, the terms concurrent users and casual users are used. Concurrent users are users who are constantly accessing the system with only a small pause between requests (3-10 seconds maximum) with continuous access 24/7. Casual users are users occasionally accessing the system through the Content Service or WebDAV interfaces with a large gap between requests (for example, occasional document access during the working day).

### Hardware

Content Service degrades gracefully on low-powered hardware, and small installations can run well on any modern server. However, for optimum performance, we recommend the following:

* Use 64 bit systems only.
* Use a system with a clock speed above 2.0 GHz.
* Reserve enough RAM for your operating system beyond the memory required for your JVM.
* Keep search indexes on your local disk instead of on network storage.

### Disk space usage

The size of your repository defines how much disk space you'll need; it's a very simple calculation. Content is stored directly on the disk by default. Therefore, to hold 1000 documents of 1 MB will require 1000 MB of disk space. You should also make sure there is sufficient space overhead for temporary files and versions. Each version of a file (whether in DM or WCM) is stored on disk as a separate copy of that file, so make allowances for that in your disk size calculations (for DM, use versioning judiciously).

> **Note:** The disk space usage calculation above is only for content storing. It doesn't take into account any indexes (Lucene or Solr).

Use a server class machine with SCSI Raid disk array. The performance of reading/writing content is almost solely dependent on the speed of your network and the speed of your disk array. The overhead of the server itself for reading content is very low as content is streamed directly from the disks to the output stream. The overhead of writing content is also low but if Solr is installed on the same machine, additional overhead should be allowed for the indexing process.

### Virtualization

Content Service runs well when virtualized, but you should expect a reduction in performance. When using the rough sizing requirements given, it might be necessary to allocate twice as many resources for a given number of users when those resources are virtual. Para-virtualization, or virtualized accesses to native host volumes do not require as many resources. Benchmarking your environment is necessary to get a precise understanding of what resources are required.

### JVM memory and CPU hardware for multiple users

The repository L2 Cache, plus initial VM overhead, plus basic Content Service system memory, is setup with a default installation to require a maximum of approximately 1024 MB.

This means that you can run the repository and web client with many users accessing the system with a basic single CPU server and only 1024 MB of memory assigned to the JVM. However, you must add additional memory as your user base grows, and add CPUs depending on the complexity of the tasks you expect your users to perform, and how many concurrent users are accessing the client.

> **Note:** Note that for these metrics, **N** concurrent users is considered equivalent to **10xN** casual users that the server could support.

| Number of users | Recommended memory / CPU settings per server |
| --------------- | -------------------------------------------- |
| For 50 concurrent or up to 500 casual users | 2.0 GB JVM RAM 2x server CPU (or 1xDual-core) |
| For 100 concurrent users or up to 1000 casual users | 4.0 GB JVM RAM 4x server CPU (or 2xDual-core) |
| For 200 concurrent users or up to 2000 casual users | 8.0 GB JVM RAM 8x server CPU (or 4xDual-core) |

> **Note:** For full performance tuning, contact Alfresco Support or Alfresco Consulting.

### JVM settings

There are a number of typical JVM settings that you can use in your repository configuration. The standard JVM settings are as follows:

```bash
-Xms1G
-Xmx2G
-Dcom.sun.management.jmxremote
```

Tune the JVM using the following steps:

1. Use as much RAM as possible for the JVM (`-Xmx32GB`).
2. Do not add any other configuration settings.

To avoid memory swapping, `-Xmx` should never exceed the available RAM in the system. Remember to leave room for memory used by the operating system and other applications, like LibreOffice using JOD (JOD often uses 1 GB of RAM per OO instance).

In general, if you don't give the JVM enough heap, adjusting the other JVM settings won't make any difference. Once the JVM has enough heap, you shouldn't need to change the other JVM settings.

> **Important:** The remaining information on this page might help in exceptional circumstances only. It's unlikely to apply to your use case, and we advise against JVM tuning beyond what's already been discussed here.**

#### Maximum JVM heap size 32/64 bit

An important calculation to keep in mind is:

```text
(Managed Heap + native heap + (thread stack size * number of threads)) cannot exceed 2 GB on 32bit x86 Windows or Linux systems
```

This is a limitation of the Oracle Java VM. It means that even if you install 4 GB of RAM into your server, a single instance of the JVM cannot grow beyond 2 GB on a 32 bit server machine.

> **Note:** A 64 bit OS/JVM has much bigger values. It's recommended that a 64 bit OS with large memory hardware (\>2 GB assigned to the JVM) is used for deployments of \>250 concurrent or \>2500 casual users.

You can also set up your machine to cluster if you prefer to solve multi-user access performance issues with additional machines rather than a single powerful server.

#### Set debug mode for troubleshooting

Follow the steps below to debug your JVM server on Linux or Windows.

{% capture linux %}

If you're a Linux user, edit the JVM options used to start the Tomcat instance, set by the `tomcat/scripts/ctl.sh` script. See [Control JVM system properties](#control-jvm-system-properties) for detailed information.

For example, set the following:

```bash
JAVA_OPTS=%JAVA_OPTS% -server -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8082
```

where `address` is a port for your system.

{% endcapture %}
{% capture windows %}

If you're a Windows user, register Tomcat as a Windows service:

* In the installation directory, locate the `properties.ini` file and copy the value of the `tomcat_unique_service_name` parameter (for example, `alfrescoTomcatnum1`).
* From the `/tomcat/bin` directory, run the following command at a command prompt:

    ```bash
    tomcat7w.exe //ES//<alfrescoTomcatnum1>
    ```

    where `<alfrescoTomcatnum1>` is the value from your `tomcat_unique_service_name` parameter.

* Open the `alfrescoTomcatnum1` properties window, select the **Java** tab and the **Java Options** field, and add the following lines of code on two separate lines:

    ```bash
    -Xdebug
    -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000
    ```

    where `address` is a port for your system.

{% endcapture %}

{% include tabs.html opt1="Linux" content1=linux opt2="Windows" content2=windows %}

##### Low end machines

Use this information if you have less than 2 GB memory available.

The stack size of 1024 KB (-Xss1024K) is generous. Some installations might require a little over 512 KB. Many use only 256 KB. If the per-thread memory consumption is too high for your installation, reduce the stack size to 512 KB and then to 256 KB and note any memory-related errors in the logs.

The `NewSize` should be kept as large as possible. It can be reduced, but the memory consumption should be watched on a monitoring tool, for example, JConsole, to ensure that the rate of spillover of temporary objects is kept down. If the machine is supporting 500 simultaneous operations, for instance, then the spillover of temporary objects (from `NewSize` being too small) will cause hold-ups on memory assignment as the garbage collector does sweeps.

##### Effects of NewSize

Use this information to understand the settings for OldGen.

Given that the OldGen is composed primarily of cache data of up to about 520 MB, at least 1 GB should be reserved for OldGen. Once `-Xmx` increases, the OldGen can be increased to 2 GB. 512 MB should be left as a buffer to account for miscellaneous (PermGen, and so on). So the following variations might be applied:

```bash
-Xmx2G -Xms1G -XX:NewSIze=512M (OldGen at least 1 GB)
-Xmx3G -Xms1G -XX:NewSize=512M (OldGen at least 2 GB)
-Xmx4G -Xms2G -XX:NewSize=1G (OldGen at least 2.5 GB)
-Xmx6G -Xms3G -XX:NewSize=2G (OldGen at least 3.5 GB)
-Xmx8G -Xms4G -XX:NewSize=3G (OldGen at least 4.5 GB)
```

If you need these levels, you'll need to run JConsole (and Java 6) to observe the rate of spillover from Eden space to Survivor to OldGen. If, after the system has been running for a while, the OldGen size stabilizes, then the NewSize can be increased appropriately. The following diagram (using VisualGC) shows how varying the NewSize value affects overall garbage collection activity:

![JVM settings]({% link content-services/images/jvm-settings.png %})

## Command line configuration

The beans that load the `alfresco-global.properties` will give preferential treatment to any JVM-set properties.

### Set properties on the JVM

Use this information to set the JVM properties.

* (Windows) At a command prompt, enter the following:

    `set JAVA_OPTS=-Ddir.root=e:/alfresco/data`

* (Linux) At a command prompt, enter the following:

    `export JAVA\_OPTS=-Ddir.root=/srv/alfresco/data`

### Mix global properties and system property settings

You can use a combination of global properties and system properties for certain customizations. For example, if you wish to distribute a system that has a core set of properties overridden, but need to customize the last few for each installation.

1. Activate the properties in the `<classpathRoot>/alfresco-global.properties` file.

2. Set all common defaults for your system.

3. On each installation, add the final configuration values. For example:

    ```bash
    -Ddb.username=alfresco
    -Ddb.password=alfresco
    -Dindex.tracking.cronExpression='0/5 * * * * ?'
    -Dindex.recovery.mode=AUTO
    -Dalfresco.cluster.name=ALFRESCO\_DEV
    ```

## Configure Content Services to work with a web proxy

There are standard JVM system properties that you can use to set proxies for various protocol handlers, such as HTTP and HTTPS. These properties are used by Surf and all other parts of the system that make http call-outs.

All proxies are defined by a host name and a port number. The port number is optional and if not specified, a standard default port will be used.

The following properties can be set to specify the proxy that'll be used by the HTTP protocol handler:

| System property | Description |
| --------------- | ----------- |
| http.proxyHost | Specifies the host name or IP address for the proxy server. |
| http.proxyPort | Specifies the port number for the proxy server. The default port number is `80`. |
| http.nonProxyHosts | Specifies the hosts that should be accessed without going through the proxy. |

> **Note:** These properties can be added as a part of `JAVA_OPTS` environment variable so that content transfer uses a proxy rather than a direct connection.

The following properties can be set to specify the proxy that'll be used by the HTTPS protocol handler:

| System property | Description |
| --------------- | ----------- |
| https.proxyHost | Specifies the host name or IP address for the proxy server when using HTTPS (HTTP over SSL). |
| https.proxyPort | Specifies the port number for the proxy server when using HTTPS (HTTP over SSL). The default port number is `443`. |

For example, the following command directs all HTTP connections to go through the proxy server with the IP address `172.21.1.130`, and the port number `8080`:

```bash
java -Dhttp.proxyHost=172.21.1.130 -Dhttp.proxyPort=8080
```

In addition, you can also set the following non-standard properties for authenticated proxies:

| Non-standard property | Description |
| --------------------- | ----------- |
| http.proxyUser | Specifies the user name to use with an authenticated proxy used by the HTTP protocol handler. It should be left unset if the proxy doesn't require authentication. |
| http.proxyPassword | Specifies the password to use with an authenticated proxy used by the HTTP protocol handler. It should be left unset if the proxy doesn't require authentication. |
| https.proxyUser | Specifies the user name to use with an authenticated proxy used by the HTTPS protocol handler. It should be left unset if the proxy doesn't require authentication. |
| https.proxyPassword | Specifies the password to use with an authenticated proxy used by the HTTPS protocol handler. It should be left unset if the proxy doesn't require authentication. |

## Configure server administration properties {#sysadmin}

The **sysAdmin** subsystem allows real-time control across some of the general repository properties. The sysAdmin subsystem replaces the `RepoServerMgmt` management bean.

### Configure server administration settings

The System Settings page shows your server settings, the Content Service web application repository settings, and the Alfresco Share application settings.

1. Open the Admin Console.

2. In the **General** section, click **System Settings** to see the details of your installation.

3. Set the **Repository Settings** properties:

    These properties are read-only and are set in the `alfresco-global.properties` file only. See the properties starting with `alfresco` in [sysAdmin subsystem properties](#sysadmin-props).

    | Property | Description |
    | -------- | ----------- |
    | Repository Context | This property specifies the context path of the web application URL. The default value is `alfresco`. The context path is the path that's used by applications (for example, IMAP, SharePoint, and email) to access Content Service. If you change this value, it must be defined with the same name as the directory name specified by your application server. For example, if you're using Tomcat, this is the `/webapps/alfresco` directory in Tomcat, where `alfresco` is the name of the proxy server or specific server that you're using. |
    | Repository Hostname | This property is the host name of the web application that's used by external applications. Content Service attempts to auto-detect the host name in place of `${localname}`. If auto-detection fails, `${localname}` is replaced with the IP address. |
    | Server Allow Writes | Write access is permitted to the repository, as long as the license is valid. When this property is set to `false`, the repository is in read-only mode. |
    | Protocol | This property is the protocol component of the web application. The default is `http`. If you require HTTPS support, you'll need to configure this in the host application server. |
    | Port | This property is the port number of the web application URL that's resolved by external applications. The default is `8080`. |

4. Set the **Server Settings** properties:

    | Property | Description |
    | -------- | ----------- |
    | Allowed Users | This property allows you to specify which users can log in. By default, all users can log in. Enter a comma-separated list of users to allow only those users to log in. If you don't include the administrator user setting up this list (i.e. the current user), then this'll be added automatically. |
    | Maximum Users | The maximum number of simultaneous users allowed to log in. The default value of `-1` allows an unlimited number of users. |

5. Set the **Share Application Settings** properties:

    | Property | Description |
    | -------- | ----------- |
    | Share Context | This property sets the context path of the Share web application URL. The default is `share`. You can set this context to a name that's appropriate. |
    | Protocol | This property sets the protocol for the Share web application. The default is `http`. HTTPS support requires additional configuration within the host application server. |
    | Share Hostname | This property sets the externally resolvable host name of the Share web application URL. The default value is `${localname}`, for example `127.0.0.1`. |
    | Port | This property sets the externally resolvable port number of the web application URL. The default is `8080`. |
    | Site Public Group | This property is the name of the group that controls user access to Public sites. The default is `GROUP_EVERYONE`, which contains all users. |

6. Click **Save** to apply the changes you have made to the properties.

### sysAdmin subsystem properties {#sysadmin-props}

The following properties can be configured for the sysAdmin subsystem.

| Property | Description |
| -------- | ----------- |
| server.maxusers | The maximum number of users who are allowed to log in or `-1` if there's no limit. |
| server.allowedusers | A comma-separated list of users who are allowed to log in. Leave empty if all users are allowed to log in. |
| server.allowWrite | Boolean property. When set to `true` it indicates that the repository will allow write operations (provided that the license is valid). Set this property to `false` to put the repository into read-only mode. |

The following properties specify the parameters that control how Content Service generates URLs to the repository and Alfresco Share. These parameters might need to be edited from their default values to allow the URLs to be resolved by an external computer.

| Property | Description |
| -------- | ----------- |
| alfresco.context | Specifies the context path of the repository web application. The default is `alfresco`. |
| alfresco.host | Specifies the externally resolvable host name of the web application. The default value is `${localname}`. If the default is used, then the token `${localname}` is automatically replaced by the domain name of the repository server. |
| alfresco.port | Specifies the externally resolvable port number of the web application URL. The default is `8080`. |
| alfresco.protocol | Specifies the protocol component of the web application. The default is `http`. |
| share.context | Specifies context path component of the Alfresco Share web application URL The default is `share`. |
| share.host | Specifies the externally resolvable host name of the Alfresco Share web application URL. The default value is `${localname}`. |
| share.port | Specifies the externally resolvable port number of the Alfresco Share web application URL. The default is `8080`. |
| share.protocol | Specifies the protocol to use. The default is `http`. |

## Control JVM system properties {#jvm-sysprops}

Use these techniques to control JVM system properties.

In a standard Linux/Unix installation, system properties can be specified in `-Dname=value` format (separated by spaces) in the JAVA_OPTS variable set by the script:

```bash
tomcat/scripts/ctl.sh
```

In a standard Windows installation, system properties can be listed in `-Dname=value` format (separated by semicolons) before `;-Dalfresco.home` in:

```bash
tomcat/bin/service.bat
```

Once edited, the following commands must be run to re-register the service with the new options:

```bash
tomcat/scripts/serviceinstall.bat REMOVE
tomcat/scripts/serviceinstall.bat INSTALL
```

## Secure Sockets Layer (SSL) and the repository {#ssl-repo}

There are a number of ways to handle SSL communication when connecting to the repository, and some information that you should know about automatic configuration.

When you install Content Service, port `8443` is automatically configured for SSL communication between Solr and the repository. This means that the default setting is set to use client certificates for any authentication (the connector on port 8443 is configured with `certificateVerification="required"`).

This causes complications when there's communication between a browser protocol and the repository, because Tomcat requests a client certificate for that communication too; for example, when you're using [Alfresco Office Services]({% link microsoft-office/latest/index.md %}) to connect between a Microsoft application and the repository.

You can still connect to the repository without a client certificate, however if a certificate is present (for example, if you've installed certificates in your Windows certificate store), then the certificate must be signed by the same Certificate Authority that's used for authentication between the repository and Solr. If you select one of the Windows installed certificates, you won't be able to progress, because the certificate isn't one that's expected for the Solr to repository communication. In this situation, you need to cancel the certificate window and then you can proceed. If you have no client certificates, you can use port 8443 without issues.

These topics discuss how to set up SSL for non-Solr communication with the repository, and the method that you use to configure SSL varies depending on whether you're configuring your production or test environments. For example:

* If you're setting up a production environment, use a proxy server to handle SSL communication.
* If you're configuring a test environment, you might want to edit your configuration files directly (and listen for SSL on a port that's not port 8443; for example, port 443).

If you're interested in setting up SSL and security for Solr, this is discussed in detail in [Solr security]({% link search-services/latest/config/security.md %}).

### Configure SSL for a production environment {#ssl-prod}

This scenario provides a set of forwarding rules that your proxy needs to meet and the corresponding configuration, with sample configuration files for Apache HTTP Server.

Several proxy application servers are available to configure for SSL communications; for example, Apache HTTP Server, HAProxy or Nginx. Using a proxy server means that you do not have to edit your configuration files directly.

A client machine connects to the proxy server instead of the application server directly.  As a result, Content Service and Alfresco Share must be configured to use an externally available URL, rather than an internal machine name. This external URL can then be passed to other parts of the Share application; for example, when Share creates a link to Alfresco Office Services for online editing.

For security reasons, configure your proxy to forward only requests to the resources that you want to expose to the outside world. In this scenario, the applications need to use the internal machine name when talking to each other, but use the external name when creating links for the user.

1. Set your proxy to forward the following URL extensions:

    ```bash
    /share
    /share/*
    /alfresco/api/*/public/cmis/versions/*
    /alfresco/api/*/public/alfresco/versions/*
    /alfresco/api/cmis/versions/*
    /alfresco/service/api/server
    /alfresco/cmisatom/*
    /alfresco/service/cmis/*
    ```

2. If you're using WebDAV, add these URL extensions to your proxy:

    ```bash
    /alfresco/webdav
    /alfresco/webdav/*
    ```

3. For Alfresco Office Services, add these URL extensions to your proxy:

    ```bash
    /_vti_inf.html
    /_vti_bin/*
    /alfresco/aos
    /alfresco/aos/*
    ```

    and for `OPTIONS` and `PROPFIND` requests:

    ```bash
    /
    /alfresco
    /alfresco/
    ```

4. Block requests with these URL patterns:

    ```bash
    /share/*/proxy/alfresco/api/solr/*
    /share/-default-/proxy/alfresco/api/*
    ```

    The communication between Solr and Content Service is, by default, protected by SSL. These patterns need to be explicitly blocked to protect the API endpoints.

5. Edit the `alfresco-global.properties` file with these values:

    ```bash
    alfresco.context=alfresco
    alfresco.host=<external-proxy-host-name>
    alfresco.port=443
    alfresco.protocol=https
    share.context=share
    share.host=<external-proxy-host-name>
    share.port=443
    share.protocol=https
    opencmis.context.override=false
    opencmis.context.value=
    opencmis.servletpath.override=false
    opencmis.servletpath.value=
    opencmis.server.override=true
    opencmis.server.value=https://<external-proxy-host-name>
    ```

    > **Note:** Port 443 and the HTTPS protocol settings must be enabled in `alfresco-global.properties` in Content Services and Share. This is because if a proxy is serving `https`, and then proxying back to Tomcat using `http`, Tomcat determines that HTTP traffic is being served. This in turn informs the applications running in Tomcat that they're serving traffic over HTTP, and when Share or Content Service internally generate URLs for page assets, they are generated with an `http` link (when the client browser expects `https`). Setting the following properties ensures that the applications generate URLs as HTTPS links:

    ```bash
    alfresco.port=443
    alfresco.protocol=https
    share.port=443
    share.protocol=https
    ```

6. If you're using a proxy server other than Apache with AJP, follow these steps:

    1. Add this line to your `alfresco-global.properties` file:

        ```bash
        aos.baseUrlOverwrite=https://<external-proxy-host-name>/alfresco/aos
        ```

    2. Configure proxy redirect responses sent by the application server.

        The server behind the proxy uses the `http` schema because it's not aware of SSL. Here's an example of an Nginx configuration:

        ```bash
        proxy_redirect http://example.com/alfresco/ https://example.com/alfresco/;
        ```

        > **Note:** The `proxy_redirect` configuration shows the change from `http` to `https`.

7. Use the following sample `httpd.conf` configuration file for Apache HTTP Server:

    ```bash
    # -------
    # General
    # -------

    ServerName  **yourserver.example.com**
    PidFile     **/path/to/your/http.pid**
    ErrorLog    **/path/to/your/apache/log/error\_log**
    LogLevel    info

    LoadModule  unixd_module       **/path/to/your/apache/modules/mod\_unixd.so**
    LoadModule  authn_core_module  **/path/to/your/apache/modules/mod\_authn\_core.so**
    LoadModule  authz_host_module  **/path/to/your/apache/modules/mod\_authz\_host.so**
    LoadModule  authz_core_module  **/path/to/your/apache/modules/mod\_authz\_core.so**
    LoadModule  rewrite_module     **/path/to/your/apache/modules/mod\_rewrite.so | <IfModule unixd_module>
        User _www
        Group _www
    </IfModule>

    # ------------------
    # Block API requests
    # ------------------

    LoadModule     rewrite_module      **/path/to/your/apache/modules/mod\_rewrite.so**
    RewriteEngine  on
    RewriteBase    /
    RewriteRule    ^/share/(.*)/proxy/alfresco/api/solr/(.*)$   * [F]
    RewriteRule    ^/share/-default-/proxy/alfresco/api/(.*)$   * [F]

    # -------
    # Proxy
    # --------

    LoadModule     jk_module **/path/to/your/apache/modules/mod\_jk.so**
    JkWorkersFile  **/path/to/your/workers.properties**
    JkLogFile      **/path/to/your/apache/log/mod\_jk.log**
    JkLogLevel     info
    JkShmFile      **/path/to/your/apache/log/jk-runtime-status**

    # -------
    # SSL
    # --------

    LoadModule ssl_module **/path/to/your/apache/modules/mod\_ssl.so**
    Listen 443
    <VirtualHost *:443>
        SSLEngine           on
        SSLProtocol         all -SSLv2
        SSLCipherSuite      HIGH:!aNULL:!MD5
        SSLVerifyClient     none
        SSLCertificateFile  **/path/to/your/certificate.pem**
        ErrorLog            **/path/to/your/apache/log/ssl\_error\_log**
        LogLevel            warn
        JkMount /share alfresco-worker
        JkMount /share/* alfresco-worker
        JkMount /alfresco/webdav alfresco-worker
        JkMount /alfresco/webdav/* alfresco-worker
        JkMount / alfresco-worker
        JkMount /_vti_inf.html alfresco-worker
        JkMount /_vti_bin/* alfresco-worker
        JkMount /alfresco alfresco-worker
        JkMount /alfresco/ alfresco-worker
        JkMount /alfresco/aos alfresco-worker
        JkMount /alfresco/aos/* alfresco-worker
        JkMount /alfresco/images/* alfresco-worker
        JkMount /alfresco/css/* alfresco-worker
        # Un-comment these lines for public API access
        # JkMount /alfresco/api/*/cmis/versions/*
        # JkMount /alfresco/api/*/public/cmis/versions/* alfresco-worker
        # JkMount /alfresco/api/*/public/alfresco/versions/* alfresco-worker
        # JkMount /alfresco/service/api/server alfresco-worker
        # JkMount /alfresco/cmisatom/* alfresco-worker
        # JkMount  /alfresco/service/cmis/* alfresco-worker
        # JkMount /alfresco/api/cmis/versions/* alfresco-worker
        # Un-comment these lines for Desktop Sync
        # JkMount /alfresco/api/*/private/alfresco/versions/* alfresco-worker
    </VirtualHost>
    ```

    This configuration file has been tested with Apache httpd 2.4. Replace the values in **bold** font with the file names and directories that are relevant to your system.

8. Use the following sample `worker.properties` configuration file for Apache HTTP Server:

    ```bash
    worker.list=alfresco-worker
    worker.alfresco-worker.port=8009
    worker.alfresco-worker.host=**your-internal-alfresco-host-name**
    worker.alfresco-worker.type=ajp13
    worker.alfresco-worker.lbfactor=1
    ```

    In this example, Apache is configured to accept strong encryption only. Adapt SSLCipherSuite if this causes you problems.

9. (Optional) Only required if configuring Alfresco Share.

    Add and set the following properties in the `JAVA_OPTS` environmental variable referenced by the Share application, as they're required at Share start up:

    ```bash
    -Dhttp.secured.session=true
    -Dcookies.sameSite=none
    ```

    When using Share with Chromium-based browsers (such as Google Chrome or the latest releases of Microsoft Edge) with Alfresco Content Connector for Salesforce, the share web must be secured using an HTTPS (SSL/TLS) certificate.

10. (Optional) Only required if configuring Alfresco Share.

    Add and set the property in the `JAVA_OPTS` environmental variable corresponding to the JVM of the Tomcat instance when deploying Share:

    ```bash
    -Dhttp.secured.session=true
    ```

    This property secures the `JESSIONID` cookie. It's not enabled by default because it would break HTTP-only (non-secure) environments. See [Control JVM system properties](#jvm-sysprops) for more information on how to set `JAVA_OPTS` for Tomcat deployments.

### Configure SSL for a test environment

If you're configuring SSL in a development or test environment, you can edit some configuration files to enable SSL.

> **Note:** These instructions should only be used for configuring a test environment. If you're configuring a production environment, you should use a proxy server to handle all SSL communication. See [Configuring SSL for a production environment](#ssl-repo) for more information.

Here's an example of how to configure Tomcat 9 to work with HTTPS for your development or test system. At this point, we assume that:

* You've already set up Content Service with Tomcat 9, running HTTP on port 8080.
  * Follow the steps in [Install using distribution zip]({% link content-services/7.3/install/zip/index.md %}) if you haven't already done so.
* You may have already setup HTTPS on port 8443 for Content Service to communicate with [Alfresco Search Services]({% link search-services/latest/index.md %}).
* In our documentation, such as [Secure Sockets Layer (SSL) and the repository](#ssl-repo), port 8443 is generally provided as an example when setting up secure HTTPS connections. This is recommended only for use with Alfresco Search Services as it should use real client certificates, where `certificateVerification="required"`. For this development or test setup, we won't necessarily use client certificates, so we'll setup a separate HTTPS connector on a different port. You can have multiple connectors in Tomcat that use HTTPS and different ports.

1. Copy the `alf_data/keystore` folder from the distribution zip to `<CATALINA_BASE>/alf_data/keystore`.

    See [Install Alfresco WARs]({% link content-services/7.3/install/zip/tomcat.md %}) to review the structure of the distribution zip.

    In the `alf_data/keystore` folder, you'll find sample self-signed generated certificates that you can use to configure an HTTPS connection for development or test purpose.

2. Open your Tomcat settings file `<CATALINA_BASE>/conf/settings.xml` and add an entry for a new connector:

    ```bash
    <Connector port="7070"
            protocol="org.apache.coyote.http11.Http11Nio2Protocol"
            sslImplementationName="org.apache.tomcat.util.net.jsse.JSSEImplementation"
            maxThreads="150"
            SSLEnabled="true">
        <SSLHostConfig certificateVerification="none"
            truststoreFile="<CATALINA_BASE>/alf_data/keystore/ssl.truststore"
            truststorePassword="kT9X6oe68t"
            truststoreType="JCEKS" >
        <Certificate certificateKeystoreFile="<CATALINA_BASE>/alf_data/keystore/ssl.keystore"
            certificateKeystorePassword="kT9X6oe68t"
            certificateKeystoreType="JCEKS" />
        </SSLHostConfig>
    </Connector>
    ```

3. Replace `<CATALINA_BASE>/alf_data/keystore/` with the actual path to those certificates.

4. Change the password, if required.

    You can find the password in the `.properties` files from the sample `alf_data/keystore` folder.

5. Replace the port 7070 with the one that you want to use.

    Avoid using port 8443 as that's generally configured for Search Services.

    1. On Linux systems, if you want to use the default HTTPS port 443, you can edit the server iptables configuration to specify the redirection:

        ```bash
        # Redirect external packets
        -A PREROUTING -j NAT-Port-Redirect

        # redirect http traffic
        -A NAT-Port-Redirect -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
        # redirect https traffic
        -A NAT-Port-Redirect -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 7070
        ```

        However, you also need to add `proxyPort="443"` to the Connector xml tag (from above) as shown:

        ```bash
        <Connector port="7070"
                proxyPort="443"
        ...
        ```

        **Note:** If you use the 443 redirect, you'll need to override the value for Alfresco Office Services in `alfresco-global.properties`:

        ```bash
        aos.baseUrlOverwrite=https://localhost/alfresco/aos
        ```

    2. On Windows, you can just use port 443 without any proxy.

    Note that we use the `certificateVerification="none"` setting. See the [official Tomcat 9.0 page](https://tomcat.apache.org/tomcat-9.0-doc/config/http.html#SSL_Support_-_SSLHostConfig){:target="_blank"} to learn more about the HTTPS security settings for the connector.

6. Edit `alfresco-global.properties` and replace the relevant values for your case:

    ```bash
    dir.keystore=${dir.root}/keystore

    alfresco.context=alfresco
    alfresco.protocol=https
    alfresco.host=localhost
    alfresco.port=7070

    share.host=localhost
    share.port=7070
    share.context=share
    share.protocol=https

    aos.baseUrlOverwrite=https://localhost:7070/alfresco/aos
    ```

7. (Optional) Only required if configuring Alfresco Share to use HTTPS.

    Add and set the following properties in the `JAVA_OPTS` environmental variable referenced by the Share application, as they're required at Share start up:

    ```bash
    -Dhttp.secured.session=true
    -Dcookies.sameSite=none
    ```

    When using Share with Chromium-based browsers (such as Google Chrome or the latest releases of Microsoft Edge), the Share communication must be secured using an HTTPS (SSL/TLS) certificate.

8. (Optional) Only required if configuring Alfresco Share to use HTTPS.

    Add and set the property in the `JAVA_OPTS` environmental variable corresponding to the JVM of the Tomcat instance when deploying Share:

    ```bash
    -Dhttp.secured.session=true
    ```

    This property secures the `JESSIONID` cookie. It's not enabled by default because it would break HTTP-only (non-secure) environments. See [Control JVM system properties](#jvm-sysprops) for more information on how to set `JAVA_OPTS` for Tomcat deployments.

9. Restart your Tomcat server.

    Access Content Service and Alfresco Share using HTTPS:

    * `https://localhost:7070/alfresco`
    * `https://localhost:7070/share`

    If you installed the Alfresco Office Services AMP, you'll also be able to edit files from your Microsoft Office applications.

    See [Considerations when using Alfresco Office Services]({% link microsoft-office/latest/index.md %}) for more details.

## Configure the repository cache

The repository provides in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.

Tuning the caches in a wrong way may lead to out of memory issues. The optimal settings to use on the caches depend on your usage and the amount of memory available to your server.

An important indicator that you need to tune or increase your caches is when you see a warning message in your alfresco.log file indicating that some specific caches are full, for example:

```bash
2016-04-26 17:51:37,127 WARN [org.alfresco.repo.cache.TransactionalCache.org.alfresco.cache.node.nodesTransactionalCache]
[http-apr-22211-exec-42] Transactional update cache 'org.alfresco.cache.node.nodesTransactionalCache' is full (125000).
```

From Alfresco One version 5.0 and later, the caches can be configured by setting the cache properties in the `alfresco-global.properties` file. In both clustered and non-clustered cases, caching is configured and used in the same unified way.

> **Note:** It's advisable not to change the cache values unless you have performance issues.

1. Download the files [tx-cache-context.xml](https://github.com/Alfresco/alfresco-community-repo/blob/release/7.0.0/repository/src/main/resources/alfresco/tx-cache-context.xml){:target="_blank"} and [caches.properties](https://github.com/Alfresco/alfresco-community-repo/blob/release/7.0.0/repository/src/main/resources/alfresco/caches.properties){:target="_blank"}.

    The `caches.properties` file lists a series of properties for configuring a cache. The cache properties are used for both clustered and non-clustered configurations.

2. Check your `alfresco.log` file to locate the caches shown in the warning message.

    For example, if you see the following warning message in `alfresco.log`:

    ```bash
    2016-04-26 17:51:37,127 WARN [**org.alfresco.repo.cache.TransactionalCache**.org.alfresco.cache.node.nodesTransactionalCache]
    [http-apr-22211-exec-42] Transactional update cache 'org.alfresco.cache.node.nodesTransactionalCache' is full (125000).
    ```

    search for the bean that matches the class `org.alfresco.repo.cache.TransactionalCache` in the `tx-cache-context.xml` file.

    Here's an example of the cache:

    ```bash
    <!-- The transactional cache for Nodes -->

       <bean name="node.nodesCache" class="**org.alfresco.repo.cache.TransactionalCache**">
          <property name="sharedCache">
             <ref bean="node.nodesSharedCache" />
          </property>
          <property name="name">
             <value>org.alfresco.cache.node.nodesTransactionalCache</value>
          </property>
          <property name="maxCacheSize" value="${**cache.node.nodesSharedCache**.tx.maxItems}" />
          <property name="mutable" value="true" />
          <property name="allowEqualsChecks" value="true" />
          <property name="disableSharedCache" value="${system.cache.disableMutableSharedCaches}" />
          <property name="cacheStats" ref="cacheStatistics"/>
          <property name="cacheStatsEnabled" value="${**cache.node.nodesSharedCache**.tx.statsEnabled}"/>
       </bean>
    ```

    > **Note:** As shown above, the `nodesCache` cache uses variables with the `cache.node.nodesSharedCache.*` syntax, for example, `cache.node.nodesSharedCache.tx.maxItems`.

    The `caches.properties` file uses properties that align with the `cache.node.nodesSharedCache` syntax.

    ```bash
    cache.node.nodesSharedCache.tx.maxItems=125000
    cache.node.nodesSharedCache.tx.statsEnabled=${caches.tx.statsEnabled}
    cache.node.nodesSharedCache.maxItems=250000
    cache.node.nodesSharedCache.timeToLiveSeconds=300
    cache.node.nodesSharedCache.maxIdleSeconds=0
    cache.node.nodesSharedCache.cluster.type=invalidating
    cache.node.nodesSharedCache.backup-count=1
    cache.node.nodesSharedCache.eviction-policy=LRU
    cache.node.nodesSharedCache.merge-policy=
    cache.node.nodesSharedCache.readBackupData=false
    ```

3. Add the `*.tx.maxItems` and `*.maxItems` properties to the `alfresco-global.properties` file.

4. Increase the value of the `*.tx.maxItems` and `*.maxItems` properties for the cache you want to tune.

    For example, in the `alfresco-global.properties` file change the default setting from:

    ```bash
    #cache.node.nodesSharedCache.tx.maxItems=125000
    #cache.node.nodesSharedCache.maxItems=250000
    ```

    to

    ```bash
    cache.node.nodesSharedCache.tx.maxItems=250000
    cache.node.nodesSharedCache.maxItems=2500000
    ```

    > **Note:** Make sure that:
    >
    > `cache.node.nodesSharedCache.tx.maxItems` is not be greater than `cache.node.nodesSharedCache.maxItems`, and
    > `cache.node.nodesSharedCache.maxItems` is greater than or equal to `cache.node.nodesSharedCache.tx.maxItems`.

5. Restart Content Service to apply the configuration changes.

### Individual cache settings

Content Service uses cache properties for both clustered and non-clustered configurations.

To configure a cache, specify a series of properties where the property names begin with the cache name as specified in the Spring cache definition. For example, if the cache name is `cache.myCache`, then the properties should all start with `cache.myCache`.

For example:

```bash
cache.myCache.maxItems=20000
cache.myCache.timeToLiveSeconds=0
```

The following properties are supported by both clustered and non-clustered (for example, `cluster.type=local`) caches:

| Property | Description |
| -------- | ----------- |
| maxItems | The `maxItems` attribute is the maximum size a cache can reach. Use zero (`0`) to set to `Integer.MAX_VALUE`. |
| eviction-policy | When the `eviction-policy` attribute is set to `NONE`, the cache won't have a bounded capacity, and the `maxItems` attribute won't apply. Any other value will cause the `maxItems` attribute to be enabled.<br><br>Also, use `LRU` (Least Recently Used) or `LFU` (Least Frequently Used) algorithm with clustered caches so that the value is compatible in both modes (required during startup). Note that the actual value (for example, `LRU`) is of no consequence for the non-clustered caches and eviction is performed as for any Google Guava `CacheBuilder` created cache. |
| timeToLiveSeconds | The `timeToLiveSeconds` attribute specifies that the cache items will expire once this time has passed after creation. |
| maxIdleSeconds | The `maxIdleSeconds` attribute specifies that the cache items will expire when not accessed for this period. |
| tx.maxItems | The `overflowToDisk` attribute isn't a fully supported property as `TransactionalCache` is a separate entity, but where a `TransactionalCache` bean has been defined, use `{cacheName}.tx.maxItems` to specify its capacity. |

The following properties are available for fully-distributed caches and aren't supported by the other cache types:

| Property | Description |
| -------- | ----------- |
| cluster.type | The `cluster.type` attribute determines what type of cache is created when clustering is available. The acceptable values are: {::nomarkdown}<ul><li>fully-distributed: Uses a Hazelcast IMap backed distributed cache. The cache values can be stored on any member of the cluster, hence the term fully-distributed.</li><li>local: Always use a non-clustered cache. The cache values won't reflect updates made to the equivalent cache on another cluster member.</li><li>invalidating: Uses a local cache, but when an update or a removal is issued to the cache, an invalidation message is broadcast to all members of the cluster, and those members will remove the value from their cache. This value is useful where frequent reads cause performance problems (due to remote reads) or where values are non-serializable.</li></ul>{:/}|
| backup-count | The `backup-count` attribute controls how many cluster members should hold a backup of the key/value pair. |
| merge-policy | The `merge-policy` attribute determines how Hazelcast recovers from split brain syndrome, for example: {::nomarkdown}<ul><li>com.hazelcast.map.merge.PassThroughMergePolicy</li><li>com.hazelcast.map.merge.PutIfAbsentMapMergePolicy (the default)</li><li>com.hazelcast.map.merge.HigherHitsMapMergePolicy</li><li>com.hazelcast.map.merge.LatestUpdateMapMergePolicy</li></ul>{:/}<br><br>See [Network Partitioning (Split-Brain Syndrome)](https://docs.hazelcast.com/imdg/latest/#network-partitioning){:target="_blank"} for more information. |

## Add a MIME type

Use this information to add a MIME type definition.

The MIME type default definitions are in the [mimetype-map.xml](https://github.com/Alfresco/alfresco-community-repo/blob/master/data-model/src/main/resources/alfresco/mimetype/mimetype-map.xml){:target="_blank"} file.

1. Copy the default definition file and place it in a file called `<extension>/mimetype/mimetypes-extension-map.xml`.

2. Modify the inserted MIME type to match your requirements. For example:

    ```bash
    <alfresco-config area="mimetype-map">

       <config evaluator="string-compare" condition="Mimetype Map">
          <mimetypes>

             <mimetype mimetype="application/xxx" display="My Example Mimetype">
                <extension>ex</extension>
             </mimetype>

          </mimetypes>
       </config>

    </alfresco-config>
    ```

    An example file is provided in `<extension>/mimetype/mimetypes-extension-map.xml.sample`. You can include multiple files and each one is loaded automatically.

3. Save the file.

4. Restart Content Service.

The MIME type is available in the repository.

## Configure view in browser MIME types {#conf-view-in-browser-mime-types}

The `content.nonAttach.mimetypes` property specifies the MIME types (by default: `application/pdf`, `image/jpeg`,
`image/gif`, `image/png`, `image/tiff` ,`image/bmp`) that can be viewed in a browser by clicking the Alfresco Share
button **View in Browser**, all other file types are forced to be downloaded.

This property can be overridden, but it's discouraged since it might cause a security breach.

## Configure metadata extraction

Metadata extraction automatically extracts metadata information from inbound and/or updated content and updates the
corresponding nodes properties with the metadata values.

For more information see [metadata extraction extension point]({% link content-services/7.3/develop/repo-ext-points/metadata-extractors.md %}).

## About aspects

Aspects allow you to add functionality to existing content types.

Aspects can have properties that, when added, can enhance the content types. You can also attach behaviors and workflows to aspects. The following table lists the aspects available.

| Aspects | Description | Changes in behavior/Share interface |
| ------- | ----------- | ----------------------------------- |
| Classifiable | Enables categories to be assigned to a content item. For example, content items can be categorized under Languages, Region, Software Document Classification, and so on. | Adding the Classifiable aspect displays an additional **Categories** property in the document properties. |
| Complianceable | This aspect is no longer valid. For compliance-related behavior, use [Alfresco Governance Services]({% link governance-services/latest/index.md %}). |
| Dublin Core | Enables metadata (such as publisher, contributor, identifier) to be added to a content item. | Adding the Dublin Core aspect displays the following additional metadata properties in the document properties: {::nomarkdown}<ul><li>Publisher</li><li>Contributor</li><li>Type</li><li>Identifier</li><li>Source</li><li>Coverage</li><li>Rights</li><li>Subject</li></ul>{:/} |
| Effectivity | This aspect is no longer valid. For compliance-related behavior, use [Alfresco Governance Services]({% link governance-services/latest/index.md %}). |
| Summarizable | Enables addition of a brief description about the content item. | Adding the Summarizable aspect displays an additional **Summary** property in the document properties. |
| Versionable | Enables versioning of a content item each time it's edited (checked out and checked back in or updated). In Alfresco Share, content items are versionable by default. | Adding the Versionable aspect displays the version history of a content item in the **Version History**. |
| Emailed | Captures email-related information of the content item, if it's received as an email attachment. | Adding the Emailed aspect displays additional properties (such as Originator, Addressee, Addresses, Sent Date and Subject) in the document properties. |
| Inline Editable | Enables content items to be edited directly in Alfresco Share. | Adding the Inline Editable aspect displays the **Edit in Alfresco Share** link in the document properties. |
| Taggable | Enables tagging of content items using keywords. In Alfresco Share, content items are taggable by default. | Adding Taggable aspect displays the tagged keywords in the **Tags** section. You can also search for content items in the Document Library using the keywords displayed. |
| Geographic | Enables a content item to be geographically tagged using latitude and longitude information. The location of content item is displayed as a marker on Google Maps. Click on the marker to display the Document Details page for that content item. | Adding the Geographic aspect displays additional **Latitude** and **Longitude** properties on the **Edit Properties** page. Also, the **View on Google Maps** link is displayed in the **Document Actions**. |
| EXIF | Enables capturing and viewing of additional image-related metadata of a content item. <br>**Note:** This aspect is automatically applied to an image content item. | Adding the EXIF aspect displays additional information (such as Camera Model, Camera Software, Resolution Unit) about the image in the document properties. |
| Audio | Enables capturing and viewing of additional audio-related metadata of a content item. <br>**Note:** This aspect is automatically applied to an audio content item. | Adding the Audio aspect displays additional information (such as Album, Artist, Composer, Track Number) about the audio file in the document properties. |
| Index Control | Enables control over how a content item is indexed. | Adding the Index Control aspect displays additional information (Is Indexed and Is Content Indexed) in the document properties. |

## About versioning

Versioning allows you to track content history. By default, when content is created in the repository, versioning is not applied. When creating content, users must specify `versionable` on a case-by-case basis.

When content is versionable, the version history is started. The first version of the content is the content that exists at the time of versioning. If you want all content to be versionable at the time of creation, you can modify the definition of that content type in the data dictionary. The definition must include the mandatory aspect `versionable`.

By default, all versionable content has auto-version set to on. As a result, when content is updated, the version number is updated.

The auto-version capability can be disabled on a content-by-content basis in the user interface. If you want auto-versioning to be off for all content, modify the definition of that content type in the data dictionary.

> **Note:** Any properties that you set on a file are saved with the current version of a file, and written to the Version History after a major update; for example, when a new file is uploaded. This means that if you save properties in version 1.0, they're saved in the Version History of version 1.1.

To change this behavior, you can set `cm:autoVersionOnUpdateProps` to `true`.

### Making all content versionable

Edit the `contentModel.xml` file to enable versioning for all content in the repository.

1. Download the [contentModel.xml](https://github.com/Alfresco/alfresco-community-repo/blob/release/7.0.0/repository/src/main/resources/alfresco/model/contentModel.xml){:target="_blank"} file.

2. Create a `$TOMCAT\_HOME/shared/classes/alfresco/extension/models` directory.

3. In the `contentModel.xml` file, search for `<type name="cm:content">`, and immediately after the closing `</properties>` tag, insert the following lines to make the content versionable:

    ```bash
    <mandatory-aspects>
        <aspect>cm:versionable</aspect>
    </mandatory-aspects>
    ```

4. Copy the edited `contentModel.xml` file to the `$TOMCAT\_HOME/shared/classes/alfresco/extension/models` directory.

5. Add a Spring context file to `$TOMCAT_HOME/shared/classes/alfresco/extension` with the following lines:

    ```bash
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

    <beans>
        <bean parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
            <property name="models">
                <list>
                    <value>alfresco/extension/models/contentModel.xml</value>
                </list>
            </property>
        </bean>
    </beans>
    ```

6. Save the file.

7. Restart the Content Service server.

The uploaded content now has the `cm:versionable` aspect.

### Disabling the auto-versioning feature

Use this information to disable auto-versioning for all versionable content in the repository.

The auto-versioning feature is controlled with the `version.store.enableAutoVersioning` property, which is set to `true` by default.

1. Open the `alfresco-global.properties` file.

2. Add the following property:

    ```bash
    version.store.enableAutoVersioning=false
    ```

    When this property is set to false, the `VersionableAspect` will not respond to any events; even if the aspect is present, it will not create versions.

    > **Note:** The behavior of versioning may also be affected by the `version.store.enableAutoVersionOnUpdateProps` property, which is set to `false` by default. This means that the version history isn't incremented when changing properties from **Edit Properties** in Alfresco Share. Setting `version.store.enableAutoVersionOnUpdateProps=true` enables versioning when properties are changed.

3. Save the global properties file.

4. Restart the Content Service server.

## Set up database replication

Replication allows you to continuously copy a database to a different server.

To enable replication, you set one server (the slave) to take all its updates from the other server (the master). During replication, no *data* is actually copied. It's the SQL *statements* that manipulate the data that's copied.

All statements that change the master database are stored in the master's binary logs. The slave reads these logs and repeats the statements on its own database. The databases will not necessarily be exactly synchronized. Even with identical hardware, if the database is actually in use, the slave will always be behind the master. The amount by which the slave is behind the master depends on factors such as network bandwidth and geographic location. The other server can be on the same computer or on a different computer. The effect of replication is to allow you to have a nearly current standby server.

Using more than one server allows you to share the read load. You can use two slaves. If one of the three servers fails, you can use one server for service while another server can copy to the failed server. The slaves need not be running continuously. When they are restarted, they catch up. With one or more slaves you can stop the slave server to use a traditional backup method on its data files.

Each slave uses as much space as the master (unless you choose not to replicate some tables) and must do as much write work as the master does to keep up with the write rate. Do not be without at least one slave or comparable solution if high reliability matters to you.

> **Note:** Replication is not another form of back up. You must do normal backups as well as replication. If a user mistypes a DELETE statement on the master, the deletion is faithfully reproduced on the slave.

### Set up MySQL replication

Follow these replication steps for the MySQL database.

1. Open a MySQL command prompt on the master server.

2. Grant the slave permission to replicate:

    ```bash
    GRANT REPLICATION SLAVE ON *.* TO <slave_user> IDENTIFIED BY '<slave_password>'
    ```

3. If the master is not using the binary update log, add the following lines to `my.cnf` (Linux) or `my.ini` (Windows) configuration file on the master, and restart the server:

    ```bash
    [mysqld]
    log-bin
    server-id=1
    ```

    > **Note:** By convention, server-id for the master is usually `server-id 1`, and any slaves from 2 onwards, although you can change this. If the master is already using the binary update log, either note the offset at the moment of the backup (the next step), or use the `RESET MASTER` statement to clear all binary logs and immediately begin the backup. You might want to make a copy of the binary logs before doing this, if you need to use the binary logs to restore from backup.

4. Make a backup of the database.

    This'll be used to start the slave server. You can skip this step if you use the `LOAD DATA FROM MASTER` statement, but first review the following comments about locking the master.

5. Add the following to the configuration file on the slave:

    ```bash
    master-host=master-hostname
    master-user=slave-user
    master-password=slave-password
    server-id=2
    ```

    The slave user and slave password are those to which you set when you granted `REPLICATION SLAVE` permission on the master. The `server-id` must be a unique number, different to the master or any other slaves in the system. There are also two other options: `master-port`, used if the master is running on a non-standard port (3306 is default), and `master-connect-retry`, a time in seconds for the slave to attempt to reconnect if the master goes down. The default is 60 seconds.

    Restore the data from the master, either as you would normally restore a backup or with the statement `LOAD DATA FROM MASTER`. The latter will lock the master for the duration of the operation, which could be quite lengthy, so you might not be able to spare the downtime.

## Control indexes

You can use the `cm:indexControl` aspect to control the indexing of content in Alfresco Share. Using this aspect you can choose to disable repository-wide indexing. This can prove useful in certain situations, such as bulk loading.

The `cm:indexControl` aspect enables you to control indexing for the nodes to which it's applied. The aspect exposes the following two properties:

* `cm:isIndexed ((content + metadata))`: This property controls whether or not the node is indexed.
* `cm:isContentIndexed`: This property controls whether or not the node content (binary) is indexed. Setting this to `false` inhibits full text indexing of the document binary.

The following table shows the possible combinations of settings along with the behavior for each case:

| cm:isIndexed | cm:isContentIndexed | Result |
| ------------ | ------------------- | ------ |
| True | True | Metadata is indexed. Content is indexed. |
| True | False | Metadata is indexed. Content is not indexed. |
| False | True | No indexing at all. |
| False | False | No indexing at all. |

See [Managing aspects]({% link content-services/7.3/using/content/files-folders.md %}#applyaspects) for more information.

## Defer the start of CRON based jobs

You can configure `alfresco-global.properties` and `dev-log4j.properties` to implement a global delay to CRON based jobs; for example, until after the server has fully started.

You can set a delay for all cron based jobs; in other words, jobs that use the `org.alfresco.util.CronTriggerBean` class. The default value is 10 minutes.

1. Shut down the Content Service server.

2. Locate and edit the `alfresco-global.properties` file in the `<classpathRoot>` directory.

    See [Modifying the global properties file]({% link content-services/7.3/config/index.md %}#modify-global-props) for more information.

3. Add two configurations to the `alfresco-global.properties` file, where the number in `startDelayMins=` is the number of minutes you want to delay your job. In this example, the delay length is 2 minutes:

    ```bash
    activities.feed.cleaner.cronExpression=0/1 * * * * ?
    activities.feed.cleaner.startDelayMins=2
    ```

4. Extend the `dev-log4j.properties` with a new configuration in the `<classpathRoot>/alfresco/extension` directory:

    ```bash
    log4j.logger.org.alfresco.repo.activities.feed.cleanup.FeedCleaner=trace
    ```

    This file will override subsystem settings that aren't applicable in `alfresco-global.properties`.

5. Start the server.

    After the specified interval, the `FeedCleaner` trace logs will be generated. In the example, the logs will start after two minutes.

## CORS configuration

Cross Origin Resource Sharing (CORS) can be enabled and configured in the `alfresco-global.properties` file.

CORS is disabled by default. To enable it, set the following property to `true`:

```bash
cors.enabled=
```

> **Important:** This feature is only available when using Tomcat.

If CORS is enabled then CORS requests can be made to all endpoints under `/alfresco`.

Use the following properties to configure CORS:

| Property | Description |
| -------- | ----------- |
| cors.allowed.origins | Set the hosts allowed in cross origin requests. By default, the value is empty, which forbids clients hosted on any server to access the resources. You can specify a host, for example, `http://www.example.org:8080`, which will only allow requests from this host. A `*` value permits all clients hosted on any server to access the resources. It's recommended to restrict this setting to origins within your organization. |
| cors.allowed.methods | Set which HTTP requests are permitted. Possible values should be comma separated and include: {::nomarkdown}<ul><li>DELETE</li><li>GET</li><li>HEAD</li><li>OPTIONS</li><li>POST</li><li>PUT</li></ul>{:/} |
| cors.allowed.headers | Set which headers are permitted in request headers, manually or programmatically in addition to the ones set by the user agent. Values should be comma separated and include: {::nomarkdown}<ul><li>Accept</li><li>Access-Control-Request-Headers</li><li>Access-Control-Request-Method</li><li>Authorization</li><li>Cache-Control</li><li>Content-Type</li><li>Origin</li><li>X-CSRF-Token</li><li>X-Requested-With</li></ul>{:/} |
| cors.exposed.headers | Set which headers are whitelisted for the client to access from the server. |
| cors.support.credentials | Set whether HTTP cookie and HTTP authentication-based credentials are allowed. This is a boolean value. |
| cors.preflight.maxage | Set the maximum time (in minutes) for caching a preflight request. Preflighted requests use the `OPTIONS` method to verify resource availability and then request it. |

The following is an example configuration for the `alfresco-global.properties` file:

```bash
cors.enabled=true
cors.allowed.origins=http://alfresco.com:8080
cors.allowed.methods=GET,POST,PUT
cors.allowed.headers=Authorization,Content-Type,Cache-Control,X-Requested-With,X-CSRF-Token
cors.exposed.headers=Access-Control-Allow-Origin,Access-Control-Allow-Credentials
cors.support.credentials=true
cors.preflight.maxage=10
```

## JavaScript execution

The repository can execute server-side JavaScript from different places as webscripts, workflows, or folder rules. This section shows how to limit these scripts execution regarding duration, memory usage, and call stack depth. This is useful to prevent long running scripts or high memory consumption.

In Content Services 7.3.0, the **memory** and **time** limits, if enabled, will only apply to scripts that have been uploaded to the repository by users, all the other scripts deployed at application server level (classpath) won’t be affected by these limits. The **call stack depth** limit, if enabled, will be applied to every scripts (not only custom ones).

Starting from Content Services 7.3.1, the **memory**, **time** and **call stack depth** limits, if enabled, will only apply to scripts that have been uploaded to the repository by users, all the other scripts deployed at application server level (classpath) won’t be affected by these limits.

| Property | Description |
| -------- | ----------- |
| scripts.execution.optimizationLevel | This property allows you to configure the Rhino optimization level: {::nomarkdown}<ul><li>When set to <code>-1</code>, the interpretive mode is used.</li><li>When set to <code>0</code>, no optimizations are performed.</li><li>When set to <code>1-9</code>, optimizations are performed.</li></ul>{:/} The default value is  `0`. <br><br>For more details, see [Mozilla Projects - Rhino Optimization](https://udn.realityripple.com/docs/Mozilla/Projects/Rhino/Optimization){:target="_blank"}. |
| scripts.execution.maxScriptExecutionSeconds | The number of seconds a script is allowed to run. If script execution exceeds the configured seconds, it will be stopped. <br><br>To enable this limit, set the property with a value bigger than zero. The default value is  `-1` (disabled). |
| scripts.execution.maxStackDepth | The maximum stack depth (call frames) allowed in a single invocation of the interpreter. <br><br>This configuration only works for scripts compiled with interpretive mode, which means the optimization level will always be `-1`, overriding the value from the `scripts.execution.optimizationLevel` property. <br><br>As the interpreter doesn't use the Java stack but rather manages its own stack in the heap memory, a **runaway recursion** in interpreted code would eventually consume all available memory and cause an error. This setting helps prevent such situations. <br><br>To enable this limit, set the property with a value bigger than zero. The default value is  `-1` (disabled). |
| scripts.execution.maxMemoryUsedInBytes | The maximum memory (in bytes) a script is allowed to use. If script execution exceeds the configured memory, it will be stopped. <br><br>To enable this limit, set the property with a value bigger than zero. The default value is  `-1` (disabled). <br><br>If you would like to use this setting, 10000000 bytes (10 MB) is a reasonable value for custom scripts. This configuration only works with the supported JVM. |
| scripts.execution.observerInstructionCount | The number of instructions that will trigger the observer that applies the memory and time limits. <br><br>The value may vary depending on the optimization level. <br><br>In Content Services 7.3.0, this configuration allows you to monitor the script execution and needs to be set to a value bigger than zero so that the described limits work. The default value is  `-1` (disabled). <br><br>Starting from Content Services 7.3.1, this configuration allows you to monitor the script execution and must be set to a value bigger than zero so that the time and memory limits work. The default value is `5000` so there is no need to initially change the property when enabling time or memory limits. <br><br>This property is not linear, for example the instruction count here is not the number of Javascript instructions. A Javascript line can correspond to hundreds (or thousands) of lines for the observer. A value between 5000-10000 is suitable for this setting. |
