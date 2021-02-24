---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing the Tomcat application server

Install an instance of Tomcat 7 manually and modify it to use the correct directory structure and files for Alfresco Content Services.

These instructions recommend that you name the required directories as shared/classes and shared/lib because these are the path names used within full Alfresco Content Services installations. You can substitute alternative names for these directories. The installation directory for Tomcat is represented as <TOMCAT\_HOME\>.

1.  Download and install Tomcat version 7 following the instructions from [http://tomcat.apache.org](http://tomcat.apache.org).

2.  Create the directories required for an Alfresco Content Services installation:

    1.  Create the shared/classes directory.

    2.  Create the shared/lib directory.

3.  Open the <TOMCAT\_HOME\>/conf/catalina.properties file.

4.  Change the value of the `shared.loader=` property to the following:

    `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

    **Note:** If you have used alternative names for the directories, you must specify these names in the `shared.loader` property.

5.  Copy the JDBC drivers for the database you are using to the lib/ directory.

6.  Edit the <TOMCAT\_HOME\>/conf/server.xml file.

7.  Set attributes of HTTP connectors.

    Tomcat uses ISO-8859-1 character encoding when decoding URLs that are received from a browser. This can cause problems when creating, uploading, and renaming files with international characters.

    By default, Tomcat uses an 8 KB header buffer size, which might not be large enough for Kerberos and NTLM authentication protocols.

    Use the following example when installing into a production environment with a proxy that uses SSL encryption and communicates via HTTP. Locate the `Connector` sections, and then add the `URIEncoding`, `scheme`, `secure`, and `maxHttpHeaderSize` properties.

    ```
    <Connector port="8080"
    protocol="HTTP/1.1"
    URIEncoding="UTF-8"
    connectionTimeout="20000"
    scheme="https"
    secure="true"
    redirectPort="8443"
    maxHttpHeaderSize="32768"/>
    ```

    Use the following example if installing into a test environment without a proxy.

    ```
    <Connector port="8080"
    protocol="HTTP/1.1"
    connectionTimeout="20000"
    redirectPort="8443" />
    ```

8.  Save the server.xml file.


**Parent topic:**[Installing Alfresco Content Services on Tomcat](../tasks/alf-tomcat-install.md)

