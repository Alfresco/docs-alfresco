---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Software requirements

The following table lists the required software that must be on your system for manually installing Alfresco.

|Component

|Installer Version

|Recommendation

|
|-----------|-------------------|----------------|
|Java SE Development Kit \(JDK\)|JDK 7 U25 X64|The Oracle Microsystems JDK 7 is required. The `JAVA_HOME` environment variable must be set to the location of the JDK installation.|
|Application server|Tomcat 7.0.42|Alfresco runs within an application server. Alfresco Enterprise runs within Tomcat but can be installed on other application servers.|
|Database|PostgreSQL 9.2.4|Alfresco comes preconfigured with the PostgreSQL 9.2.4 database. If you intend to use Alfresco in a production environment, you can use one of the supported databases. For the latest information on supported databases, refer to the Alfresco website. For information on configuring the database settings, refer to [Configuring databases](intro-db-setup.md).|
|LibreOffice|LibreOffice 4.0|Alfresco uses LibreOffice for transforming documents from one format to another, for example, a text file to a PDF file.|
|ImageMagick|ImageMagick 6.8.6-6|Alfresco uses ImageMagick to manipulate images for previewing.|
|GhostScript|Supported Ghostscripts for different operating systems:

 Ubuntu – Ghostscript 8.71

 Rhel 5.5 - Ghostscript 8.15.2

 SLES 11 - Ghostscript 8.62

 RHEL 6 - Ghostscript 8.70

 RHEL 6.4 X64 - Ghostscript 8.70

 Windows/Solaris - latest stable version or Ghostscript 9.0.7.

|Alfresco uses GhostScript in conjunction with ImageMagick to manipulate images for previewing.|
|Flash Player|Flash Player Version 10.x|Alfresco Share requires Flash Player Version 10.x to upload multiple files and view Flash previews. If you do not install Flash, you see the upload screen for single files. Use the latest \(stable\) version of Flash Player for your platform.|
|SWF Tools|SWFTools 0.9.2|Alfresco Share uses the pdf2swf utility for previewing PDF files. If you do not install SWF Tools, you will not see PDF previews, but image previews will still be available.|

**Parent topic:**[Day Zero architecture validation](../tasks/zeroday-architecture.md)

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

**Related information**  


[Installing software required for Alfresco](prereq-opt-install.md)

