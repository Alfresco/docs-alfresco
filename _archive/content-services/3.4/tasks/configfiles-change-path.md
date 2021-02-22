---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Alfresco Server]
keyword: [WAR, Tomcat, directory, path]
---

# Installing Tomcat application server

This section describes how to install an instance of Tomcat manually and modify it to use the correct directory structure and files for Alfresco.

These steps describe the installation directory for Tomcat as <TOMCAT-HOME\>.

These instructions recommend that you name the required directories as shared/classes and shared/lib because these are the path names used within full Alfresco installations. You can substitute alternative names for these directories.

1.  Download Tomcat from [http://tomcat.apache.org](http://tomcat.apache.org). See the [Alfresco Supported Platforms](http://www.alfresco.com/services/subscription/supported-platforms) page for the correct version to download.

2.  Install Tomcat following the instructions included in the release.

3.  Create the directories required for an Alfresco installation:

    1.  Create the shared/classes directory.

    2.  Create the shared/lib directory.

4.  Open the <TOMCAT-HOME\>/conf/catalina.properties file.

5.  Change the value of the `shared.loader=` property to the following:

    `shared.loader=${catalina.base}/shared/classes`

    **Note:** If you have used alternative names for the directories, you must specify these names in the `shared.loader` property.

6.  Copy the JDBC drivers for the database you are using to:

    lib/

7.  Edit the <TOMCAT\_HOME\>/conf/server.xml file.

8.  Set attributes of HTTP connectors.

    By default, Tomcat uses ISO-8859-1 character encoding when decoding URLs that are received from a browser. This may cause problems when creating, uploading, and renaming files with international characters.

    By default, Tomcat uses an 8K header buffer size, which may not be large enough for Kerberos and NTLM authentication protocols.

    Locate the `Connector` sections, and then add the `URIEncoding="UTF-8"` and `maxHttpHeaderSize="32768"` properties.

    ```
    <Connector port="8080" protocol="HTTP/1.1" URIEncoding="UTF-8" connectionTimeout="20000" redirectPort="8443" maxHttpHeaderSize="32768"/> 
    ```

9.  Save the server.xml file.

10. There is an issue with Alfresco Share document downloads on Tomcat with https \(SSL\) for Internet Explorer versions 7 and 8. On IE7 and IE8, you will see an error message if you try to download a document from Alfresco Share in Tomcat with https \(SSL\) enabled. To resolve this issue:

    1.  Edit the <TOMCAT-HOME\>/conf/context.xml file.

    2.  Add the following line to the `context` element:

        ```
        <Valve className="org.apache.catalina.authenticator.SSLAuthenticator" securePagesWithPragma="false" />
        ```

    3.  Save the <TOMCAT-HOME\>/conf/context.xml file.


**Parent topic:**[Installing Alfresco on Tomcat](../tasks/alfv3-tomcat-install.md)

