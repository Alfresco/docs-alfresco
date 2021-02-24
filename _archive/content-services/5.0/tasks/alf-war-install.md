---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing the Alfresco WARs

A WAR file is a JAR file used to distribute a collection of files \(JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static web pages\) that together constitute a web application.

Use this method of installing if you already have installed a JRE, a supported database, an application server, and the additional Alfresco components.

The Alfresco Enterprise Distribution file is a zip containing the required WAR files, in addition to the additional commands, and configuration files for a manual installation.

1.  Browse to the Alfresco Support Portal at [http://support.alfresco.com](http://support.alfresco.com).

2.  Download the following file:

    alfresco-enterprise-5.0.5.zip

3.  Specify a location for the download and extract the file.

    You see the following directory structure:

    ```
    
    alf_data
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

    The /alf\_data directory contains the following structure:

    ```
    keystore
    ```

    This directory contains the following files.

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

    The /amps directory contains the following file:

    /amps

    |File name|Description|
    |---------|-----------|
    |alfresco-spp.amp|The SharePoint Protocol extension file|

    The following files are contained within the suggested subdirectories for within the Tomcat application server:

    /bin

    |File name|Description|
    |---------|-----------|
    |alfresco-mmt.jar|The Alfresco Module Management Tool \(MMT\).|
    |alfresco-spring-encryptor.jar|The Encrypted Properties Management tool.|
    |apply\_amps.bat|Windows batch file for Tomcat application server installs, used to apply all AMP files in the <installLocation\> directory.|
    |apply\_amps.sh|Linux script file for Tomcat application server installs, used to apply all AMP files in the <installLocation\> directory.|
    |clean\_tomcat.bat|Windows batch file for cleaning out temporary application server files from previous installations.|
    |clean\_tomcat.sh|Linux script for cleaning out temporary application server files from previous installations.|

    The /licenses directory contains the following structure:

    ```
    3rd-party
    ```

    This directory contains the third-party license files.

    The solr4 directory contains the following structure:

    /solr4

    |File name|Description|
    |---------|-----------|
    |/alfrescoModels|This directory contains all the content models that come out of the box with Alfresco. Any new custom content model added to Alfresco are synced to this directory so that Solr 4 knows about it.|
    |/archive-SpacesStore|Configuration directory for the archive core.|
    |context.xml|Configuration file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
    |/lib|This directory contains extra libraries that Solr 4 loads on start up. These libraries are used to communicate with Alfresco by using CMIS, Alfresco data model or Alfresco Surf Web Scripts.|
    |log4j-solr.properties|Configuration file for Solr 4-specific logging.|
    |solr.xml|Configuration file which specifies the cores to be used by Solr 4.|
    |/templates| |
    |/workspace-SpacesStore|Configuration directory for the workspace core.|

    The web-server directory contains the following structure:

    ```
    lib
    shared
    webapps
    ```

    /lib

    |File name|Description|
    |---------|-----------|
    |postgresql-*version*jdbc41.jar|PostgreSQL database JDBC connector file.|

    /shared

    |File name|Description|
    |---------|-----------|
    |/classes/alfresco-global.properties.sample|The global properties file, which is used for Alfresco configuration properties.|
    |/classes/encrypted.properties|An encrypted properties overlay file.|
    |
    |/classes/alfresco|Contains the Alfresco directory structure for the configuration override files, including the extension and web-extension directories.|

    /webapps

    |File name|Description|
    |---------|-----------|
    |\_vti\_bin.war|SharePoint site dispatcher|
    |alfresco.war|The Alfresco WAR file|
    |ROOT.war|Application for the server root|
    |share.war|The Alfresco Share WAR file|
    |solr4.war|The Solr 4 WAR file|

4.  Move the WAR files from /webapps to the appropriate location for your application server.

    For example, for Tomcat, move the WAR files to the <TOMCAT\_HOME\>/webapps directory. If you already have a web application that is running in the server root, see [Installing Alfresco into an existing web application](install-server-root.md) for instructions on how to merge the files into your application.

    **Note:** If you are using JBoss, you must customize the web.xml file in the \_vti\_bin.war, ROOT.war and share.war files to include this code fragment:

    ```
    <context-param> 
       <param-name> 
          org.jboss.jbossfaces.WAR_BUNDLES_JSF_IMPL 
       </param-name> 
       <param-value>true</param-value
    </context-param>
    ```

    This ensures that the JSF deployer in JBoss uses its own bundled JSF version, and allows AOS to deploy successfully.

5.  Remove all directories named \_vti\_bin, alfresco, ROOT, share and solr4 in <TOMCAT\_HOME\>/webapps.

    If you do not remove these directories, then the WAR files will not be deployed when the server starts.

6.  Edit the /shared/classes/alfresco-global.properties.sample file with your configuration settings.

7.  Save the file without the .sample extension.

8.  Move the alfresco-global.properties file to <classpathRoot\>.

    For example, <TOMCAT\_HOME\>/shared/classes.


**Note:** If you deployed previous versions of Alfresco, you must remove any temporary files created by your application server. Use the clean\_tomcat.bat or clean\_tomcat.sh command.

**Note:** If you are installing the S3 connector as part of your Alfresco installation, do not start Alfresco before applying the S3 AMP file.

**Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication](generate-keys-solr4.md).

**Parent topic:**[Installing Alfresco on Tomcat](../tasks/alf-tomcat-install.md)

**Related information**  


[System path conventions](../reuse/conv-syspaths.md)

[Modifying the global properties file](global-props-config.md)

