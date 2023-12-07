---
title: Install on Tomcat
---

For more complex Community Edition installations, or if you wish to use an existing Tomcat application server, you can use the Web Archive (WAR) bundle to install Community Edition on any platform. For manual installation, you must ensure that the required software is installed on the machine.

Use this method of installing Community Edition if you've already have installed a JRE, a supported database, a supported application server, a message broker, and the additional components.

For information about securing Tomcat, see [Tomcat security considerations](https://tomcat.apache.org/tomcat-10.1-doc/security-howto.html){:target="_blank"}.

## Install application server

Install an instance of Tomcat manually and modify it to use the correct directory structure and files for Community Edition.

The installation directory for Tomcat is represented as `<TOMCAT_HOME>`.

1. Download and install Tomcat following the instructions from [http://tomcat.apache.org](https://tomcat.apache.org){:target="_blank"}.

2. Create an additional classpath to Tomcat, which will be shared among all web applications.

    1. Create the directories required for a Community Edition installation under `<TOMCAT_HOME>`:

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

The Community Edition distribution file is a zip containing the required WAR files, in addition to the additional commands, and configuration files for a manual installation.

1. Download the zip file from Alfresco Nexus repository: [alfresco-content-services-community-distribution-23.1.x.zip](https://artifacts.alfresco.com/nexus/#nexus-search;gav~org.alfresco~alfresco-content-services-community*~23.1.0~~){:target="_blank"}

2. Specify a location for the download and extract the file to a system directory; for example `<installLocation>`.

    You'll see the following directory structure - details are described [later](#directory-structure).

    ```bash
    amps
    bin
    licenses
    web-server
    ```

    > **Important:** If you don't apply the Share Services AMP to the repository, Alfresco Share will not work correctly, and when you start up Share, you'll see the message: "*Alfresco Community Edition is running without Share Services. See your System Administrator for more details.*"

3. Move the WAR files from `/web-server/webapps` to the appropriate location for your application server.

    For example, for Tomcat, move the WAR files to the `<TOMCAT_HOME>/webapps` directory.

    If you already have a web application that's running in the server root, see [Installing into an existing web application]({% link microsoft-office/latest/install/index.md %}#installing-into-an-existing-web-application) for instructions on how to merge the files into your application.

4. Move the contents from `/conf`, and `/lib` under `/web-server` to the appropriate location for your application server.

    For example, for Tomcat, move the files to the existing directories under `<TOMCAT_HOME>`.

5. Remove all directories in `<TOMCAT_HOME>/webapps`.

    If you don't remove these directories, then the WAR files aren't deployed when the server starts.

6. Set the global properties as shown:

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

7. Save the file without the `.sample` extension.

8. Install Alfresco Search Services.

    See [Install Alfresco Search Services]({% link search-services/latest/install/index.md %}) for more information.

You're now ready to [install any additional software]({% link content-services/community/install/zip/additions.md %}) that you require, and [install integrations]({% link content-services/community/install/zip/additions.md %}#install-integrations).

> **Note:** If you deployed previous versions of Community Edition, you must remove any temporary files created by your application server. Use the `clean_tomcat.bat` or `clean_tomcat.sh` command.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generate secure keys]({% link search-services/latest/config/keys.md %}).

### Directory structure

After you've extracted the Community Edition distribution zip, several directories and configuration files will be available in the Community Edition home directory. This includes the required WAR files, additional commands, and configuration files for a manual installation. For example, the `web-server` directory has a standard Tomcat structure, and `web-server/shared/classes` contains the configuration files.

| Folder | File/Sub-folder | Description |
| ------ | --------------- | ----------- |
| amps | `alfresco-share-services.amp` | Contains Alfresco Share AMP |
| | | |
| bin | `apply_amps.bat` | Windows batch file for Tomcat application server installs, used to apply all AMP files in the `<installLocation>` directory. |
| | `apply_amps.sh` | Linux script file for Tomcat application server installs, used to apply all AMP files in the `<installLocation>` directory. |
| | `clean_tomcat.bat` | Windows batch file for cleaning out temporary application server files from previous installations |
| | `clean_tomcat.sh` | Linux script for cleaning out temporary application server files from previous installations |
| | `alfresco-mmt.jar` | Alfresco Module Management Tool (MMT) |
| | | |
| licenses | | Third-party license files |
| | | |
| web-server | `/conf` | Contains the Catalina repository and Alfresco Share XML files |
| | `/lib` | Contains the PostgreSQL JDBC JAR file |
| | `/shared/classes/alfresco` | Directory structure for the configuration override files, including the `extension` and `web-extension` directories |
| | `/shared/classes/alfresco-global.properties.sample` | A sample global properties file |
| | `/shared/classes/alfresco-encrypted.properties.sample` | A sample encrypted properties overlay file |
| | `/webapps/alfresco.war` | Alfresco WAR file |
| | `/webapps/share.war` | Alfresco Share WAR file |
| | `/webapps/ROOT.war` | Application for the server root. The `ROOT.war` application is required to enable Alfresco Office Services (AOS). See [Install Alfresco Office Services manually into an existing web application]({% link microsoft-office/latest/install/index.md %}#installing-into-an-existing-web-application) |
| | | |
| root | `README.txt` | Version information for Community Edition and Alfresco Share |

## Adding a reverse proxy in front of Community Edition

It's good security practice to have a reverse proxy in front of your Community Edition infrastructure. This proxy is then configured with a whitelist of allowed URLs, and blocks everything else.

You can find a sample NGINX configuration in our [GitHub project](https://github.com/Alfresco/acs-ingress/tree/acs-community-ingress){:target="_blank"}, and the corresponding image in [Docker Hub](https://hub.docker.com/r/alfresco/acs-community-ngnix){:target="_blank"}.
