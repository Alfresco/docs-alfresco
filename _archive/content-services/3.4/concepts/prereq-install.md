---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: software
---

# Software requirements

The following table lists the required software that must be on your system for manually installing Alfresco.

|Component

|Recommendation

|
|-----------|----------------|
|Java SE Development Kit \(JDK\)|The Sun Microsystems JDK 6 is required. The `JAVA_HOME` environment variable must be set to the location of the JDK installation.|
|Application server|Alfresco runs within an application server. Alfresco runs within Tomcat but can be installed on other application servers. For information on installing Alfresco with other supported application servers, see [Installing Alfresco on JBoss](../tasks/alfv3-jboss-install.md), [Installing Alfresco on WebLogic](../tasks/war-weblogic10-install.md), or [Installing Alfresco on WebSphere](../tasks/alf-websphere-install.md).|
|Database|Alfresco comes preconfigured with the PostgreSQL database. If you intend to use Alfresco in a production environment, you can use one of the supported databases. For the latest information on supported databases, refer to the Alfresco website. For information on configuring the database settings, refer to [Configuring databases](intro-db-setup.md).|
|OpenOffice.org|Alfresco uses OpenOffice for transforming documents from one format to another, for example, a text file to a PDF file. If you do not install OpenOffice, you will not have access to the transformation functionality. Use the latest \(stable\) version of OpenOffice.org.|
|ImageMagick|Alfresco uses ImageMagick to manipulate images for previewing.|
|Flash Player|Alfresco Share requires Flash Player Version 10.x to upload multiple files and view Flash previews. If you do not install Flash, you see the upload screen for single files. Use the latest \(stable\) version of Flash Player for your platform.|
|SWF Tools|Alfresco Share uses the pdf2swf utility for previewing PDF files. If you do not install SWF Tools, you will not see PDF previews, but image previews will still be available.|

**Parent topic:**[Installing Alfresco](../concepts/ch-install.md)

**Related information**  


[Installing software required for Alfresco](prereq-opt-install.md)

