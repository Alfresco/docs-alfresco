---
title: Install on Tomcat
---

For more complex Content Services installations, or if you wish to use an existing Tomcat application server, you can use the Web Archive (WAR) bundle to install Content Services on any platform. For manual installation, you must ensure that the required software is installed on the machine.

Use this method of installing Content Services if you've already have installed a JRE, a supported database, a supported application server, a message broker, and the additional components.

For information about securing Tomcat, see [Tomcat security considerations](https://tomcat.apache.org/tomcat-9.0-doc/security-howto.html){:target="_blank"}.

## Install application server

Install an instance of Tomcat manually and modify it to use the correct directory structure and files for Content Services.

The installation directory for Tomcat is represented as `<TOMCAT_HOME>`.

1. Download and install Tomcat following the instructions from [http://tomcat.apache.org](https://tomcat.apache.org){:target="_blank"}.

    See the [supported platforms]({% link content-services/7.2/support/index.md %}) page for the supported versions.

2. Create an additional classpath to Tomcat, which will be shared among all web applications.

    1. Create the directories required for a Content Services installation under `<TOMCAT_HOME>`:

        * Create the `shared/classes` directory.
        * Create the `shared/lib` directory.

    2. Open the `<TOMCAT_HOME>/conf/catalina.properties` file.

    3. Change the value of the `shared.loader=` property to the following:

        ```bash
        shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar
        ```

3. Copy the JDBC drivers for the database you are using to the `lib` directory.

4. (Optional) If you plan to use Kerberos authentication.

    By default, Tomcat uses an 8 KB header buffer size, which might not be large enough for the Kerberos authentication protocol. We need to increase this buffer size. To make this change, edit the `<TOMCAT_HOME>/conf/server.xml` file and change the `<Connector>` defined for HTTP traffic as follows:

    ```xml
    <Connector port="8080" protocol="HTTP/1.1"
        URIEncoding="UTF-8"
        connectionTimeout="20000"
        maxHttpHeaderSize="32768"
        redirectPort="8443" />
    ```

5. (Optional) Configure additional connectors.

    You might want to connect from your front end load balancer with a different protocol, like AJP, or you might want to terminate TLS directly in Tomcat.

    In these cases, you need to add additional connectors to Tomcat. Follow the official Tomcat documentation for these use cases, and make sure to increase the `maxHttpHeaderSize` on these additional Connectors as well (in case you plan to use Kerberos).

6. (Optional) Enable Simple JAR modules.

    The repository allows you to provide extensions outside of the web application, known as simple JAR modules. If you want to enable this mechanism, follow these steps:

    1. Create the following directories under `<TOMCAT_HOME>`:

        1. `modules/platform`
        2. `modules/share`

    2. Copy the files `alfresco.xml` and `share.xml` from the distribution zip `/web-server/conf/Catalina/localhost` to `<TOMCAT_HOME>/conf/Catalina/localhost` (or hostname).

7. Configure mutual TLS for Solr communication.

    The communication with Solr is encrypted and authenticated via mutual TLS. For this connection, you need an additional Connector.

    > **Note:** This Connector isn't used by end users. Its sole purpose is to handle the communication with Solr.

    1. Open the `<TOMCAT_HOME>/conf/server.xml` file.

    2. Add the following Connector:

        ```xml
        <Connector port="8443" protocol="HTTP/1.1"
            SSLEnabled="true" maxThreads="150" scheme="https"
            keystoreFile="xxxxx"
            keystorePass="password" keystoreType="JCEKS"
            secure="true" connectionTimeout="240000"
            truststoreFile="xxxxx"
            truststorePass="password" truststoreType="JCEKS"
            clientAuth="want" sslProtocol="TLS" />
        ```

        > **Note:** The keystore and truststore file locations in the above example will be created later, when you install and configure Alfresco Search Services.

        > **Note:** If you're using a different keystore or truststore type other than the default, `JCEKS`, you must change the value in the properties file.

        > **Note:** In Tomcat versions prior to 9 it was possible to use `org.apache.coyote.http11.Http11Protocol` as the protocol value, but now it has been removed. If you are using configuration from an old instance using a Tomcat version before 9, you need to update the connector protocol value.

8. Save the `server.xml` file.

> **Important:** Remember to review and update the Connector details in `server.xml`, including the keystore and truststore file locations, after installing and configuring Alfresco Search Services.

## Install Alfresco WARs

A WAR file is an archive file used to distribute a collection of files (JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static web pages) that together constitute a web application.

Use this method of installing if you've already installed a JRE, a supported database, an application server, a message broker, and the additional components.

The Content Services distribution file is a zip containing the required WAR files, in addition to the additional commands, and configuration files for a manual installation.

1. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2. Download the file: `alfresco-content-services-distribution-7.2.x.zip`

3. Specify a location for the download and extract the file to a system directory; for example `<installLocation>`.

    You'll see the following directory structure - details are described [later](#directory-structure).

    ```bash
    amps
    licenses
    keystore
    web-server
    bin
    ```

    > **Important:** If you don't apply the Share Services AMP to the repository, Alfresco Share will not work correctly, and when you start up Share, you will see the message: "*Alfresco Content Services is running without Share Services. See your System Administrator for more details.*"

4. Move the WAR files from `/web-server/webapps` to the appropriate location for your application server.

    For example, for Tomcat, move the WAR files to the `<TOMCAT_HOME>/webapps` directory. If you already have a web application that's running in the server root, see [Installing into an existing web application]({% link microsoft-office/latest/install/index.md %}#installing-into-an-existing-web-application) for instructions on how to merge the files into your application.

5. Move the contents from `/conf`, and `/lib` under `/web-server` to the appropriate location for your application server.

    For example, for Tomcat, move the files to the existing directories under `<TOMCAT_HOME>`.

6. Remove all directories in `<TOMCAT_HOME>/webapps`.

    If you don't remove these directories, then the WAR files aren't deployed when the server starts.

7. Set the global properties as shown:

    1. Copy `/web-server/shared/classes/alfresco-global.properties.sample` to `<TOMCAT_HOME>/shared/classes`.

    2. Replace the sample configuration with the following:

        ```bash
        #
        # Set this property unless you have explicitly chosen to expose some repository APIs without authentication
        solr.secureComms=https

        #
        # Custom content and index data location
        #
        dir.root=/srv/alfresco/alf_data
        dir.keystore=${dir.root}/keystore

        #
        # Sample database connection properties
        #
        db.username=alfresco
        db.password=alfresco

        #
        # Choose DB connection properties for your database, e.g. for PostgreSQL
        #
        db.driver=org.postgresql.Driver
        db.url=jdbc:postgresql://localhost:5432/alfresco

        #
        # URL Generation Parameters (The ${localname} token is replaced by the local server name)
        #-------------
        alfresco.context=alfresco
        alfresco.host=${localname}
        alfresco.port=8080
        alfresco.protocol=http
        share.context=share
        share.host=${localname}
        share.port=8080
        share.protocol=http
        ```

8. Save the file without the `.sample` extension.

9. Install Alfresco Search Services.

    See [Install Alfresco Search Services]({% link search-services/latest/install/index.md %}) for more information.

You're now ready to [install any additional software]({% link content-services/7.2/install/zip/additions.md %}) that you require, and [install integrations]({% link content-services/7.2/install/zip/additions.md %}#install-integrations).

> **Note:** If you deployed previous versions of Content Services, you must remove any temporary files created by your application server. Use the `clean_tomcat.bat` or `clean_tomcat.sh` command.

> **Note:** If you're including Alfresco Content Connector for AWS S3 as part of your installation, don't start Content Services before applying the S3 AMP file.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generate secure keys]({% link search-services/latest/config/keys.md %}).

### Directory structure

After you've extracted the Content Services distribution zip, several directories and configuration files will be available in the Content Services home directory. This includes the required WAR files, additional commands, and configuration files for a manual installation. For example, the `web-server` directory has a standard Tomcat structure, and `web-server/shared/classes` contains the configuration files.

| Folder | File/Sub-folder | Description |
| ------ | --------------- | ----------- |
| amps | `alfresco-share-services.amp` | Contains Alfresco Share AMP |
| | | |
| bin | `alfresco-spring-encryptor.jar` | Alfresco Encrypted Properties Management Tool |
| | `apply_amps.bat` | Windows batch file for Tomcat application server installs, used to apply all AMP files in the `<installLocation>` directory. |
| | `apply_amps.sh` | Linux script file for Tomcat application server installs, used to apply all AMP files in the `<installLocation>` directory. |
| | `clean_tomcat.bat` | Windows batch file for cleaning out temporary application server files from previous installations |
| | `clean_tomcat.sh` | Linux script for cleaning out temporary application server files from previous installations |
| | `alfresco-mmt.jar` | Alfresco Module Management Tool (MMT) |
| | `Win32Utilsx64.dll, Win32NetBIOSx64.dll, Win32Utils.dll, Win32NetBIOS.dll` | For a Windows installation these goes into the `C:\WINDOWS\system32` directory |
| licenses | | Third-party license files |
| | | |
| web-server | `/conf` | Contains the Catalina Alfresco Repository and Alfresco Share XML files, which maps JAR extension directories |
| | `/lib` | Contains the PostgreSQL JDBC driver JAR file |
| | `/shared/classes` | Contains sample files for `alfresco-global.properties` and `alfresco-encrypted.properties` config files. |
| | `/shared/classes/alfresco` | Directory structure for the configuration override files, including the `extension` (Alfresco Repository overrides) and `web-extension` (Alfresco Share overrides) directories |
| | `/webapps/alfresco.war` | Alfresco Content Repository WAR file |
| | `/webapps/share.war` | Alfresco Share UI WAR file |
| | `/webapps/ROOT.war` | Application for the server root. The `ROOT.war` application is required to enable Alfresco Office Services (AOS). See [Install Alfresco Office Services manually into an existing web application]({% link microsoft-office/latest/install/index.md %}#installing-into-an-existing-web-application) |
| | | |
| root | `README.txt` | Version information for Content Services and Alfresco Share |
| | `VERSIONS.md` | List of recommended components for the latest Content Services release |
| keystore | `readme.txt` | Information for Content Services Search Services SSL connection |
| | `CreateSSLKeystores.txt` | Information about creating SSL keystores for secure comms between Repo <-> Solr |
| | `generate_keystores.sh` | Linux version of keystore generation file |
| | `generate_keystores.bat` | Windows version of keystore generation file |
| | `/metadata-keystore` | Content metadata keystore information |

## Move keystore files to your installation

The new keystore configuration implementation requires it to be configured with
[JAVA parameters]({% link content-services/7.2/admin/security.md %}#alfresco-keystore-configuration).

1. Move the default keystore files to your installation

    1. Extract from the `alfresco-content-services-distribution-7.2.x.zip` file the following two files:

        * `/keystore/metadata-keystore/keystore`
        * `/keystore/metadata-keystore/keystore-passwords.properties`

    2. Copy them to your installation at the following location:

        * `<TOMCAT_HOME>/alf_data/keystore/metadata-keystore/keystore`
        * `<TOMCAT_HOME>/alf_data/keystore/metadata-keystore/keystore-passwords.properties`

2. Configure Tomcat 9 to use the default keystore files

    1. Open `<TOMCAT_HOME>/bin/catalina.bat` in a text editor.

    2. Add the following line to `catalina.bat`:

       ```bash 
       set “JAVA_TOOL_OPTIONS=-Dencryption.keystore.type=JCEKS -Dencryption.cipherAlgorithm=DESede/CBC/PKCS5Padding -Dencryption.keyAlgorithm=DESede -Dencryption.keystore.location=<TOMCAT_HOME>/alf_data/keystore/metadata-keystore/keystore -Dmetadata-keystore.password=mp6yc0UD9e -Dmetadata-keystore.aliases=metadata -Dmetadata-keystore.metadata.password=oKIWzVdEdA -Dmetadata-keystore.metadata.algorithm=DESede”
       ```

       Make sure to replace `<TOMCAT_HOME>` with your Tomcat installation directory.
    
## Tailor your installation

When installing Content Services, an important part of the configuration process is the removal of any unused applications. Use this information to determine any applications that you might want to remove from your installation and how to remove them.

For example, if you want a Share-only tier, remove the Alfresco WAR file and any Solr configurations. Likewise, if you want an Alfresco-only tier, remove the Alfresco Share WAR file and any Solr configurations.

### Removing the Alfresco Repository Webapp
The Alfresco Content Repository Webapp is deployed with the `alfresco.war` file. It contains the implementation of the 
Content Repository and related content services, additional commands, configuration files, and licenses for a manual 
installation. Use this information to remove the `alfresco.war` file from your Tomcat application server:

1. Navigate to the `<TOMCAT_HOME>/webapps` directory.
2. Delete the `alfresco.war` file.
3. Delete the `/alfresco` directory, if it exists (i.e. the exploded and deployed webapp)

You've successfully removed the Alfresco Content Repository Webapp from your application server.

### Removing the Alfresco Share UI Webapp
The Alfresco Share UI Webapp is deployed with the `share.war` file. It contains the implementation of the
Alfresco Share user interface. Use this information to remove the `share.war` file from your Tomcat application server:

1. Navigate to the `<TOMCAT_HOME>/webapps` directory.
2. Delete the `share.war` file.
3. Delete the `/share` directory, if it exists (i.e. the exploded and deployed webapp)

You've successfully removed the Alfresco Share UI Webapp from your application server.

Next, you can [customize applications]({% link content-services/7.2/config/index.md %}#customize-applications) such as the configuration for Content Services, Alfresco Share, and Alfresco Search Services.

### Adding a reverse proxy in front of Content Services

See [adding a reverse proxy]({% link content-services/7.2/admin/securing-install.md %}#addreverseproxy)
for more information.
