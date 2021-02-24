---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
category: Installation
---

# Software requirements

The following table lists the required software that must be on your system for manually installing Alfresco.

|Component

|Recommendation

|
|-----------|----------------|
|Java Runtime Environment \(JRE\)|Alfresco supports both Java 7 and Java 8. The `JAVA_HOME` environment variable must be set to the location of the JRE.|
|Application server|Alfresco runs within an application server. Alfresco One 5.0 runs within Tomcatbut can be installed on other application servers.|
|Database|Alfresco comes preconfigured with a PostgreSQL 9.3.6 database. If you intend to use Alfresco in a production environment, you can use one of the supported databases. For the latest information on supported databases, refer to the Alfresco website. For information on configuring the database settings, refer to [Configuring databases](intro-db-setup.md).|
|LibreOffice|Alfresco uses LibreOffice 4.2 for transforming documents from one format to another, for example, a text file to a PDF file.|
|ImageMagick|Alfresco uses ImageMagick to manipulate images for previewing.|
|GhostScript|Alfresco uses GhostScript in conjunction with ImageMagick to manipulate images for previewing.|

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

**Parent topic:**[Day Zero architecture validation](../tasks/zeroday-architecture.md)

**Related information**  


[Installing additional software for Alfresco](prereq-opt-install.md)

