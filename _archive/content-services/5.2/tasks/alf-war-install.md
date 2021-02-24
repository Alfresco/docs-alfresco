---
author: Alfresco Documentation
---

# Installing the Alfresco WARs

A WAR file is a JAR file used to distribute a collection of files \(JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static web pages\) that together constitute a web application.

Use this method of installing if you've already installed a JRE, a supported database, an application server, and the additional components.

The Alfresco Content Services Distribution file is a zip containing the required WAR files, in addition to the additional commands, and configuration files for a manual installation.

1.  Browse to the Support Portal at [http://support.alfresco.com](http://support.alfresco.com).

2.  Download the following file:

    alfresco-content-services-distribution-5.2.7.zip

3.  Specify a location for the download and extract the file.

    You see the following directory structure:

    ```
    alf_data
    alfresco-pdf-renderer
    amps
    bin
    licenses
    solr4
    web-server
    ```

    The Distribution zip also contains the following file:

    ```
    README.txt
    ```

    The VERSIONS.md file provides a list of recommended components for the latest Alfresco Content Services release.

    The /alf\_data directory contains the following directory:

    ```
    keystore
    ```

    This directory contains the following files:

    |File name|Description|
    |---------|-----------|
    |browser.p12|The pkcs12 keystore generated from ssl.keystore that contains the repository private key and certificate for use in browsers, such as Firefox.|
    |CreateSSLKeystores.txt|Contains instructions to create an RSA public/private key pair for the repository with a certificate that has been signed by the Alfresco Certificate Authority \(CA\).|
    |generate\_keystores.bat|Windows batch file for generating secure keys for Solr communication.|
    |generate\_keystores.sh|Linux script file for generating secure keys for Solr communication.|
    |keystore|Secret key keystore containing the secret key used to encrypt and decrypt node properties.|
    |keystore-passwords.properties|Contains password protecting the keystore entries.|
    |readme.txt|Text file containing information about other files in a directory.|
    |ssl-keystore-passwords.properties|Contains passwords for SSL keystore.|
    |ssl-truststore-passwords.properties|Contains passwords for SSL truststore.|
    |ssl.keystore|Repository keystore containing the repository private/public key pair and certificate.|
    |ssl.truststore|Repository truststore containing certificates that the repository trusts.|

    The /alfresco-pdf-renderer directory contains the following files:

    |File name|Description|
    |---------|-----------|
    |alfresco-pdf-renderer-1.0-linux.tgz|alfresco-pdf-renderer binary for Linux|
    |alfresco-pdf-renderer-1.0-win64.tgz|alfresco-pdf-renderer binary for Windows|
    |alfresco-pdf-renderer-1.0-osx.tgz|alfresco-pdf-renderer binary for Mac|

    The /amps directory contains the following files:

    |File name|Description|
    |---------|-----------|
    |alfresco-share-services.amp|Share Services AMP|

    You can create an /amps\_share directory to add any Share AMP files that you want to install separately.

    **Important:** If you do not apply the Share Services AMP to the repository, Alfresco Share will not work correctly, and when you start up Share, you will see the message: *Alfresco Content Services is running without Share Services. See your System Administrator for more details.*

    See [step 18](simpleinstall-enterprise-lin-share.md#step18) of the wizard install topic for more information.

    The /bin directory contains these files:

    |File name|Description|
    |---------|-----------|
    |Win32NetBIOS.dllWin32NetBIOSx64.dll

 Win32Utils.dll

Win32Utilsx64.dll

|These DLLs handle the connection between the native CIFS server and Alfresco Content Services.|
    |alfresco-mmt.jar|Alfresco Module Management Tool \(MMT\).|
    |alfresco-spring-encryptor.jar|Alfresco Encrypted Properties Management tool|
    |apply\_amps.bat|Windows batch file for Tomcat application server installs, used to apply all AMP files in the <installLocation\> directory.|
    |apply\_amps.sh|Linux script file for Tomcat application server installs, used to apply all AMP files in the <installLocation\> directory.|
    |clean\_tomcat.bat|Windows batch file for cleaning out temporary application server files from previous installations.|
    |clean\_tomcat.sh|Linux script for cleaning out temporary application server files from previous installations.|

    The /licenses directory contains the following structure:

    ```
    3rd-party
    ```

    This directory contains the third-party license files.

    You can create a /modules directory with the following structure:

    ```
    platform
    share
    ```

    Put simple JAR modules in these folders so that they're loaded when Alfresco Content Services starts up. See [Simple Module](../concepts/dev-extensions-packaging-techniques-jar-files.md) for more information.

    The /solr4 directory contains the following files and folders:

    |File or folder name|Description|
    |-------------------|-----------|
    |/alfrescoModels|This directory contains all the content models that come out of the box. Any new custom content model added are synced to this directory so that Solr 4 knows about it.|
    |/archive-SpacesStore|Configuration directory for the archive core.|
    |/conf|Contains configuration files.|
    |context.xml|Configuration file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
    |/lib|This directory contains extra libraries that Solr 4 loads on start up. These libraries are used to communicate by using CMIS, Alfresco data model or Alfresco Surf Web Scripts.|
    |log4j-solr.properties|Configuration file for Solr 4-specific logging.|
    |solr.xml|Configuration file which specifies the cores to be used by Solr 4.|
    |/templates| |
    |/workspace-SpacesStore|Configuration directory for the workspace core.|

    The /web-server directory has a standard Tomcat structure:

    ```
    conf
    lib
    shared
    webapps
    ```

    The /conf directory contains Catalina repository and Share xml files.

    The /lib directory contains the PostgreSQL JDBC jar file.

    The /shared directory includes the Alfresco Content Services configuration files:

    |File name|Description|
    |---------|-----------|
    |/classes/alfresco-global.properties.sample|The sample global properties file, which is used for configuration properties.|
    |/classes/alfresco-encrypted.properties|A sample encrypted properties overlay file.|
    |/classes/alfresco|Contains the directory structure for the configuration override files, including the extension, and web-extension directories.|

    The /webapps directory contains these files:

    |File name|Description|
    |---------|-----------|
    |alfresco.war|The Alfresco WAR file|
    |ROOT.war|Application for the server root|
    |share.war|The Alfresco Share WAR file|
    |solr4.war|The Solr 4 WAR file|

4.  Move the WAR files from /webapps to the appropriate location for your application server.

    For example, for Tomcat, move the WAR files to the <TOMCAT\_HOME\>/webapps directory. If you already have a web application that is running in the server root, see [Installing into an existing web application](install-server-root.md) for instructions on how to merge the files into your application.

    **Note:** If you are using JBoss, you must customize the web.xml for all WAR files to include this code fragment:

    ```
    <context-param> 
       <param-name> 
          org.jboss.jbossfaces.WAR_BUNDLES_JSF_IMPL 
       </param-name> 
       <param-value>true</param-value
    </context-param>
    ```

    This ensures that the JSF deployer in JBoss uses its own bundled JSF version.

5.  Move the contents from /conf, /lib, and /shared to the appropriate location for your application server.

6.  Remove all directories in <TOMCAT\_HOME\>/webapps.

    If you do not remove these directories, then the WAR files are not deployed when the server starts.

7.  Edit the /shared/classes/alfresco-global.properties.sample file with your configuration settings.

    As a minimum, uncomment and edit the following properties in the selected sections:

    ```
    # Sample custom content and index data location
    #dir.root
    #dir.keystore
    
    # Solr indexing
    #index.subsystem.name
    #solr.host
    #solr.port.ssl
    
    # Sample database connection properties 
    #db.username
    #db.password
    
    # PostgreSQL connection
    #db.driver
    #db.url
    
    # URL Generation Parameters
    #alfresco.context
    #alfresco.host
    #alfresco.port
    #alfresco.protocol
    #
    #share.context
    #share.host
    #share.port
    #share.protocol
    
    ```

    **Note:** See [Managing search services](../concepts/search-home.md) and [Solr subsystem](../concepts/solr4-subsystem.md) for more on Solr indexing properties.

8.  Save the file without the .sample extension.

9.  Move the alfresco-global.properties file to <classpathRoot\>.

    For example, <TOMCAT\_HOME\>/shared/classes.


You are now ready to install any additional software that you require. See [Installing additional software for Alfresco Content Services](../concepts/prereq-opt-install.md) and [Installing integrations](../concepts/install-integrations-overview.md) for more information.

**Note:** If you deployed previous versions of Alfresco Content Services, you must remove any temporary files created by your application server. Use the clean\_tomcat.bat or clean\_tomcat.sh command.

**Note:** If you are installing the S3 Connector as part of your installation, do not start Alfresco Content Services before applying the S3 AMP file.

**Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication](generate-keys-solr4.md).

**Parent topic:**[Installing Alfresco Content Services on Tomcat](../tasks/alf-tomcat-install.md)

