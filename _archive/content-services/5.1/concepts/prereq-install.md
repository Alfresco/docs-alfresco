---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Software requirements

Use this information to understand the required software that must be on your system for manually installing Alfresco.

|Component

|Recommendation

|
|-----------|----------------|
|Java Runtime Environment \(JRE\)|Alfresco supports both Java 7 and Java 8. The `JAVA_HOME` environment variable must be set to the location of the JRE.|
|Application server|Alfresco runs in Tomcat, but can be installed on other application servers.|
|Database|Alfresco comes preconfigured with a PostgreSQL 9.4.4 database. If you intend to use Alfresco in a production environment, you can use one of the supported databases. For the latest information on supported databases, refer to the Alfresco website. For information on configuring the database settings, refer to [Configuring databases](intro-db-setup.md).|
|LibreOffice|Alfresco uses LibreOffice 5.2.1 for transforming documents from one format to another, for example, a text file to a PDF file.|
|ImageMagick|Alfresco uses ImageMagick 6.8.6-6 to manipulate images for previewing.|
|GhostScript|Alfresco uses GhostScript \(RHEL v8.70, Windows v9.0.7\) in conjunction with ImageMagick to manipulate images for previewing.|

**Parent topic:**[Prerequisites for installing Alfresco](../concepts/prereq-install-overview.md)

