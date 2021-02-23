---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Repository system configuration files

The Alfresco system configuration files are in the application WAR file. When the server starts, the files expand to `<configRoot>`.

The path for `<configRoot>` is different depending on your application server. For example:

-   Tomcat: <TOMCAT\_HOME\>\\webapps\\alfresco\\WEB-INF
-   JBoss: <JBOSS\_HOME\>\\server\\default\\tmp\\deploy\\tmp\*alfresco-exp.war\\WEB-INF

The system configuration files are maintained by Alfresco and contained in <configRoot\> and `<configRoot>\classes\alfresco`.

The preferred method of configuring Alfresco is to extend the default files using the global properties file \(alfresco-global.properties\).

The following files represent the core of the application configuration:

1.  <configRoot\>\\classes\\alfresco\\application-context.xml

    This file is the starting point of the Spring configurations. This file only performs imports, including a wild card import of all classpath\*:alfresco/extension/\*-context.xml files.

2.  <configRoot\>\\classes\\alfresco\\core-services-context.xml

    Core Alfresco beans are defined here, including the importing of properties using the `repository-properties` bean.

3.  <configRoot\>\\classes\\alfresco\\repository.properties

    This file is imported by the `repository-properties` bean. The file defines the core system properties, including:

    -   `dir.root`

        This folder is where the binary content and indexes are stored. The alf\_data folder is where they are stored by default, but you should change this to your own location. The path is relative by default, but it must point to a permanent, **absolute**, backed-up location for data storage.

    -   `dir.indexes`

        This folder contains all Lucene indexes and deltas against those indexes.

        **Note:** Alfresco recommends that you **do not store Lucene indexes on an NFS volume**. The indexes must be on a local disk. For best performance, use a separate hardware chain \(for example, controller, disk, and so on\) to avoid I/O contention with other operations, like storing content and other applications.

        When using the Lucene index subsystem, make sure the disk is local to the web application server. Alfresco recommends the use of an SSD drive to store the indexes. When using Solr, the indexes are local to the Solr server. If a disk full error occurs while the system is running, this can lead to indexes corruption. Avoid disk full errors by leaving sufficient free disk on the indexes partition. Index subsystems merge the indexes, so if you use the current amount of disk space used to store your indexes to evaluate future needs in disk space, be sure you multiply this value by 2. If you want to evaluate the disk space needed to store Solr indexes when you switch from Lucene to Solr, also multiply the Lucene index size by 2. In Solr, most of the content is indexed twice: once using the locale of the document, and once using the standard analyzer.

    -   `db.*`

        These are the default database connection properties.

    -   `db.schema.update`

        This property controls whether the system bootstrap should create or upgrade the database schema automatically.




**Parent topic:**[Day Zero configuration](../concepts/zeroday-config.md)

**Parent topic:**[Modifying system configuration files](../tasks/systemfiles-modify.md)

