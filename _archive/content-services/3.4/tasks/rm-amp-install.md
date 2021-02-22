---
author: [Alfresco Documentation, Alfresco Documentation]
source: Records Management System Administration Guide \(Certification\)
audience: 
category: [Installation, Records Management]
keyword: [Records Management, installation, AMP]
---

# Applying the Records Management AMP files

To install Records Management, you need to apply the AMP files to an existing Alfresco installation.

The installation procedure uses the following Records Management AMP files:

|alfresco-enterprise-dod5015-share-3.4.14.amp|This AMP file contains the additional Records Management functionality that is applied to an existing Alfresco Share user interface. The functionality should be applied to the tomcat/webapps/share directory.|
|alfresco-enterprise-dod5015-3.4.14.amp|This AMP contains the additional Records Management functionality that is applied to an existing Alfresco installation.|

The following procedure applies the Records Management AMP files to an existing Alfresco Enterprise 3.4.14 running in a Tomcat application server. If you are using an application server other than Tomcat, use the Module Management Tool \(MMT\) to install the AMP files. If you are using the MMT, you must apply the alfresco-enterprise-dod5015-share-3.4.14.amp to the share.war file.

1.  Move the alfresco-enterprise-dod5015-3.4.14.amp file to the amps directory.

2.  Move the alfresco-enterprise-dod5015-share-3.4.14.amp file to the amps\_share directory.

3.  Stop the Alfresco server.

4.  Run the `apply_amps` command, which is in the root Alfresco directory.

    This command applies all the AMP files that are located in the amps and amps\_share directories.

    **Note:** For Linux, edit the `CATALINA_HOME` variable, as needed.

5.  Start the Alfresco server.

6.  Start Alfresco Share by browsing to:

    http://<your-server-name\>:8080/share


**Parent topic:**[Installing Records Management](../tasks/rm-install-proc.md)

