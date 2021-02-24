---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing the Alfresco WARs

A WAR file is a JAR file used to distribute a collection of files \(JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static web pages\) that together constitute a web application.

Use this method of installing if you already have installed a JDK, a supported database, an application server, and the additional Alfresco components.

The Alfresco WAR file is a bundle file containing the required WAR files, in addition to the additional commands, configuration files, and licenses for a manual installation.

1.  Browse to the Alfresco Support Portal at [http://support.alfresco.com](http://support.alfresco.com).

2.  Download the following file:

    alfresco-enterprise-4.2.8.zip

3.  Specify a location for the download and extract the file.

    You see the following directory structure:

    ```
    bin
    licenses
    web-server
    ```

    The WAR bundle also contains the following file:

    ```
    README.txt
    ```

    The following files are contained within the suggested subdirectories for within the Tomcat application server.

    /bin

    |File name|Description|
    |---------|-----------|
    |alfresco-mmt.jar|The Alfresco Module Management Tool \(MMT\).|
    |apply\_amps.bat|Windows batch file for Tomcat application server installs, used to apply all AMP files in the <installLocation\> directory.|
    |apply\_amps.sh|Linux script file for Tomcat application server installs, used to apply all AMP files in the <installLocation\> directory.|
    |clean\_tomcat.bat|Windows batch file for cleaning out temporary application server files from previous installations.|
    |clean\_tomcat.sh|Linux script for cleaning out temporary application server files from previous installations.|

    The /licenses directory contains the following structure:

    ```
    3rd-party
    ```

    This directory contains the third-party license files.

    The web-server directory contains the following structure:

    ```
    endorsed
    lib
    shared
    webapps
    ```

    /endorsed

    |File name|Description|
    |---------|-----------|
    |serializer.jar|Serializer classes of Xalan-Java.|
    |xalan.jar|XSLT processor for transforming XML documents into HTML, text, or other XML document types.|

    /lib

    |File name|Description|
    |---------|-----------|
    |postgresql-*version*.jdbc4|PostgreSQL database JDBC connector file.|

    /shared

    |File name|Description|
    |---------|-----------|
    |/classes/alfresco-global.properties.sample|The global properties file, which is used for Alfresco configuration properties.|
    |/classes/alfresco|Contains the Alfresco directory structure for the configuration override files, including the extension and web-extension directories.|

    /webapps

    |File name|Description|
    |---------|-----------|
    |alfresco.war|The Alfresco WAR file.|
    |share.war|The Alfresco Share WAR file.|

4.  Move the alfresco.war file and share.war files to the appropriate location for your application server.

    For example, for Tomcat, move the .war files to the <TOMCAT\_HOME\>/webapps directory.

5.  Edit the /shared/classes/alfresco-global.properties.sample file with your configuration settings.

6.  Save the file without the .sample extension.

7.  Move the alfresco-global.properties file to <classpathRoot\>.

    For example, <TOMCAT\_HOME\>/shared/classes.


**Note:** If you deployed previous versions of Alfresco, you must remove any temporary files created by your application server. Use the clean\_tomcat.bat or clean\_tomcat.sh command.

**Note:** If you are installing the S3 connector as part of your Alfresco installation, do not start Alfresco before applying the S3 AMP file.

**Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr Communication](generate-keys-solr.md).

**Parent topic:**[Installing Alfresco on Tomcat](../tasks/alf-tomcat-install.md)

**Related information**  


[System paths](../reuse/conv-syspaths.md)

[Modifying the global properties file](global-props-config.md)

