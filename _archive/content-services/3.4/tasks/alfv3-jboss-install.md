---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
---

# Installing Alfresco on JBoss

You can install and deploy the Alfresco WAR on the JBoss application server.

1.  Download JBoss EAP.

    For information on the correct version to download for your version of Alfresco, see [Supported stacks](../concepts/alf3-supported-stacks.md).

2.  JBoss EAP has two installation options for Web Service support: WSNative \(selected by default\) and WSCXF.

    Make sure that you install JBoss with the WSNative option.

3.  Remove JBossWS from JBoss EAP 5.x to prevent interference with the Web Service stacks used by Alfresco.

    Use the instructions in [How to remove JBossWS from JBoss EAP 5.x](https://access.redhat.com/knowledge/solutions/60357).

4.  Download the following file from the [Support Portal](http://support.alfresco.com).

    alfresco-enterprise-3.4.14.zip

5.  Create a temporary directory and uncompress the file.

6.  Copy the alfresco-global.properties file from the temporary directory to the <JBOSS\_HOME\>/conf directory.

    Where <JBOSS\_HOME\> is the JBoss directory path, for example, this would be /opt/jboss/server/default/conf.

7.  Edit the parameters in the alfresco-global.properties file to suit your environment.

8.  Copy or move the alfresco.war and share.war file from the uncompressed Alfresco WAR to the <JBOSS\_HOME\>/deploy directory.

    Where <JBOSS\_HOME\> is the JBoss directory path, for example, this would be /opt/jboss/server/default/deploy.

9.  Follow the instructions for configuring JBoss for Alfresco.


-   **[Configuring JBoss for Alfresco](../tasks/alfv3-jboss-config.md)**  
This section describes how to configure an Alfresco installation on JBoss.

**Parent topic:**[Installing Alfresco](../concepts/ch-install.md)

**Related information**  


[Configuring JBoss for Alfresco](alfv3-jboss-config.md)

[Modifying the global properties file](global-props-config.md)

