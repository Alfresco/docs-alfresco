---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Software requirements

Use this information to understand the required software that must be on your system for manually installing Alfresco Content Services.

|Component

|Recommendation

|
|-----------|----------------|
|Java Runtime Environment \(JRE\)|Alfresco Content Services supports Java 8. The `JAVA_HOME` environment variable must be set to the location of the JRE.|
|Application server|Alfresco Content Services runs in Tomcat, but can be installed on other application servers.|
|Database|Alfresco Content Services comes preconfigured with a PostgreSQL 9.4.4 database. If you intend to use Alfresco Content Services in a production environment, you can use one of the supported databases. For the latest information on supported databases, see the [Supported Platforms](supported-platforms-ACS.md) page. For information on configuring the database settings, refer to [Configuring databases](intro-db-setup.md).|
|LibreOffice|Alfresco Content Services uses LibreOffice 6.1.6 for transforming documents from one format to another, for example, a text file to a PDF file.|
|ImageMagick|Alfresco Content Services uses ImageMagick 7.0.5 to manipulate images for previewing.|
|alfresco-pdf-renderer|Alfresco Content Services uses alfresco-pdf-renderer for creating document thumbnails and previews. See [Installing alfresco-pdf-renderer](../tasks/pdf-renderer-install.md).|

**Parent topic:**[Prerequisites for installing Alfresco Content Services](../concepts/prereq-install-overview.md)

