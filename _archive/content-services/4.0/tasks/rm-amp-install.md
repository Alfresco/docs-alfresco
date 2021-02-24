---
author: [Alfresco Documentation, Alfresco Documentation]
source: Records Management System Administration Guide \(Certification\)
audience: 
category: [Installation, Records Management]
keyword: [Records Management, installation, AMP]
---

# Applying the Records Management AMP files

Records Management is installed by applying two AMP files to an existing Alfresco installation.

The installation procedure uses the following Records Management AMP files:

|alfresco-rm-2.0.1-147.amp|This AMP contains the additional Records Management functionality that is applied to an existing Alfresco installation.|
|alfresco-rm-share-2.0.1-147.amp|This AMP file contains the additional Records Management functionality that is applied to an existing Alfresco Share user interface. The functionality should be applied to the tomcat/webapps/share directory.|

The following procedure applies the Records Management AMP files to an existing Alfresco Enterprise 4.0.2 running in a Tomcat application server.

If you are using an application server other than Tomcat, use the Module Management Tool \(MMT\) to install the AMP files. If you are using the MMT, you must apply the alfresco-rm-share-2.0.1-147.amp to the share.war file.

1.  Move the alfresco-rm-2.0.1-147.amp file to the amps directory.

2.  Move the alfresco-rm-share-2.0.1-147.amp file to the amps\_share directory.

3.  Stop the Alfresco server.

4.  Run the `apply_amps -force` command, which is in the /bin directory of the root Alfresco directory.

    This command applies all the AMP files that are located in the amps and amps\_share directories.

    **Attention:** If you are using Records Management 2.0.0 or 2.0.1, the alfresco-mmt.jar program called by the apply\_amps.sh script file needs to use the `-force` option. This is required as Records Management overwrites core Alfresco files.

    **Note:** For Linux, edit the `CATALINA_HOME` variable, as needed.

5.  Start the Alfresco server.

6.  Start Alfresco Share by browsing to:

    http://<your-server-name\>:8080/share

    At this point, the required Records Management module is installed, and your next step is to add the Records Management dashlet.


**Parent topic:**[Installing Records Management](../tasks/rm-install-proc.md)

