---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Installing the SharePoint Protocol Support AMP

The SharePoint Protocol support functionality is installed from an Alfresco AMP. If you use the Windows or Linux installers to install Alfresco, the SharePoint Protocol Support is installed by default. These instructions describe how to install the SharePoint Protocol Support into the Alfresco WAR.When you install this file, it responds to the SharePoint requests from Office, and therefore allows Alfresco to appear as the SharePoint server.

1.  Shut down the Alfresco server.

2.  Browse to the [Alfresco Support Portal](http://support.alfresco.com).

3.  Download and extract the alfresco-enterprise-spp-5.0.5.amp file into a relevant directory.

    This file holds the functionality for the SharePoint connector.

4.  Download and extract the alfresco-enterprise-spp-5.0.5.amp file into a relevant directory.

5.  Move or copy the SharePoint AMP to the amps directory in your Alfresco installation.

    -   \(Windows\) c:\\Alfresco\\amps
    -   \(Linux\) /opt/alfresco/amps
6.  From the command line, browse to the Alfresco bin directory.

    -   \(Windows\) c:\\Alfresco\\bin
    -   \(Linux\) /opt/alfresco/bin
7.  If you are using Tomcat, you can apply the SharePoint AMP file to the alfresco.war file by running the apply\_amps.\[bat\|sh\] command. Otherwise, use the Module Management Tool.

    For more information, see [Using the Module Management Tool](../concepts/dev-extensions-modules-management-tool.md).

8.  Start the Alfresco server.

9.  Verify that you have applied the SharePoint AMP to Alfresco by checking that you have the following directory:

    /webapps/alfresco/WEB-INF/classes/alfresco/module/org.alfresco.module.vti/context


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

**Related information**  


[Changing the default shell \(Unix/Linux/Solaris\) for shell scripts](fot-change-shell.md)

