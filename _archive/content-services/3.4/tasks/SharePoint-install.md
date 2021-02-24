---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, SharePoint Protocol, Extensions/Third Party Tools]
keyword: [SharePoint Protocol, Extensions/Third Party Tools]
---

# Installing the SharePoint Protocol Support AMP

The SharePoint Protocol support functionality is installed from an Alfresco AMP. If you use the Windows or Linux installers to install Alfresco, the SharePoint Protocol Support is installed by default. These instructions describe how to install the SharePoint Protocol Support into the Alfresco WAR.When you install this file, it responds to the SharePoint requests from Office, and therefore allows Alfresco to appear as the SharePoint server.

1.  Browse to the [Support Portal](http://support.alfresco.com).

2.  Download and expand the alfresco-enterprise-spp-3.4.14.zip file.

3.  Shut down the Alfresco server.

4.  Move the alfresco-enterprise-spp-3.4.14.amp file to the amps directory.

    This file holds the functionality for the SharePoint connector.

5.  Apply the SharePoint AMP to the alfresco.war file using the Module Management Tool \(MMT\).

    **Note:** For Tomcat, alternatively, run the `apply_amps` command in the Alfresco \\bin directory, which applies all the AMP files that are located in the amps and amps\_share directories.

6.  Start the Alfresco server.

7.  Verify that you have applied the SharePoint AMP by checking that you have the following directory:

    /webapps/alfresco/WEB-INF/classes/alfresco/module/org.alfresco.module.vti/context


**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

**Related information**  


[Changing the default shell \(Unix/Linux/Solaris\) for shell scripts](fot-change-shell.md)

