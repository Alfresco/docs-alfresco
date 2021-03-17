---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
keyword: [install, JBoss]
---

# Installing Alfresco on JBoss

You can install and deploy the Alfresco WAR on the JBoss application server.

Ensure that JBoss is installed. Review the Supported Platforms page on the [Support Portal](http://support.alfresco.com) for more information.

These steps assume that you know the path of the JBoss directory, which is represented as <JBOSS\_HOME\>

.

1.  Download JBoss EAP.

    For information on the correct version to download for your version of Alfresco see [Supported stacks](../concepts/alf3-supported-stacks.md).

2.  JBoss EAP has two installation options for Web Service support:

    -   WSNative \(selected by default\)
    -   WSCXF
    Make sure that you install JBoss with the WSNative option.

3.  To prevent interference with the Web Service stacks used by Alfresco, follow the instructions in the RedHat Support article:

    [How to remove JBossWS from JBoss EAP 5.x](https://access.redhat.com/site/solutions/60357)

4.  Download the following file from the [Support Portal](http://support.alfresco.com).

    alfresco-enterprise-4.0.2.zip

5.  Create a temporary directory in which to uncompress the file.

    When you uncompress the alfresco-enterprise-4.0.2.zip file, the directory structure contains the files that you need for installing Alfresco.

6.  Copy the alfresco-global.properties.sample file from the temporary directory to the <JBOSS\_HOME\>/server/default/conf directory.

    The alfresco-global.properties.sample file is located in the <TEMP\_DIR\>/web-server/shared/classes directory.

7.  Edit the parameters in the alfresco-global.properties.sample file to suit your environment.

8.  Save the alfresco-global.properties.sample file without the .sample extension.

9.  Navigate to the <TEMP\_DIR\>/web-server/webapps directory.

10. Copy or move the alfresco.war and share.war files to the <JBOSS\_HOME\>/server/default/deploy directory.

11. Follow the instructions for configuring JBoss for Alfresco.


-   **[Configuring JBoss for Alfresco](../tasks/alf-jboss-config.md)**  
This section describes how to configure an Alfresco installation on JBoss.
-   **[Configuring JBoss logging for Alfresco using Simple Logging Facade for Java \(SLF4J\)](../tasks/alf-jboss-config-SLF4J.md)**  
This section describes how to configure JBoss logging for Alfresco using SLF4J.
-   **[Configuring Solr with JBoss running on Alfresco](../tasks/alf-jboss-solr-config.md)**  
This section describes how to configure Solr to communicate with Alfresco deployed on JBoss. The steps describe how to allow Solr to communicate with Alfresco deployed on JBoss 5.1 EAP.

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

**Related information**  


[Configuring JBoss for Alfresco](alf-jboss-config.md)

[Modifying the global properties file](global-props-config.md)

