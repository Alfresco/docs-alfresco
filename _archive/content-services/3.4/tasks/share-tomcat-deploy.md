---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Alfresco Server]
keyword: [Share, Tomcat]
---

# Deploying Share into a separate Tomcat instance

You can run the Share application in a separate Tomcat instance from the instance running the Alfresco WAR. This additional instance can be installed on the same server as the original Tomcat instance, or it can be installed on a separate server.

1.  Install a new Tomcat instance on the same server at the original Tomcat instance.

2.  Modify the /conf/server.xml file for the new Tomcat instance:

    1.  Change the port number \(for example, to 8006\) in this line:

        ```
        <Server port="8005" shutdown="SHUTDOWN">
        ```

    2.  Change the port number \(for example, to 8180\) in this line:

        ```
        <!-- Define a non-SSL HTTP/1.1 Connector on port 8080 --> 
        <Connector port="8080" .... 
        ```

3.  Move the share.war file from the original Tomcat \\webapps directory to the new Tomcat /webapps directory.

4.  \(Optional\) Configure the original Alfresco Tomcat deployment.

5.  Start the original Tomcat.

    You can use Alfresco supplied batch files.

6.  If you are running the Share Tomcat instance on a separate machine, you must modify the override file in the Share Tomcat web-extension directory:

    1.  Open the share-config-custom.xml file.

    2.  Change any instance of the server and port to the correct name or IP address of the Alfresco server.

        http://yourserver:8080

    3.  Save the file without the .sample extension.

7.  Start the new Share Tomcat instance.


**Parent topic:**[Installing Alfresco on Tomcat](../tasks/alfv3-tomcat-install.md)

