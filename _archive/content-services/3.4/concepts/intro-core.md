---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
keyword: repository
---

# Configuring the repository

This section describes how to configure the Alfresco repository.

-   **[Tuning the JVM](../concepts/jvm-tuning.md)**  
The hardware requirements for the Alfresco repository, and Explorer and Share, are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation. This section suggests metrics and estimates, but your system may vary.
-   **[Command line configuration](../concepts/cmd-line-config.md)**  
The beans that load the alfresco-global.properties will give preferential treatment to any JVM-set properties.
-   **[Controlling JVM system properties](../concepts/jvm-prop.md)**  
This topic describes how to control JVM system properties.
-   **[Configuring the repository cache](../concepts/cache-memorysettings.md)**  
The Alfresco repository uses *Ehcache* in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.
-   **[Adding a MIME type](../tasks/mimetype-add.md)**  
This section describes how to add a MIME type definition.
-   **[Configuring metadata extraction](../tasks/metadata-config.md)**  
Metadata extraction automatically extracts metadata information from inbound and/or updated content and updates the corresponding nodes properties with the metadata values.
-   **[About aspects](../concepts/aspect-about.md)**  
Aspects are a fundamental concept related to content modeling in Alfresco. They allow addition of functionality to existing content types.
-   **[About versioning](../concepts/versioning.md)**  
Versioning allows you to track content history. By default, content that is created in the repository is not versionable. When creating content, users must specify *versionable* on a case-by-case basis.
-   **[Setting up database replication](../concepts/replication.md)**  
Replication allows you to continuously copy a database to a different server.
-   **[Configuring the connection pool](../tasks/connpool-config.md)**  
This task describes how to override the connection pool.
-   **[Customizing content transformations](../tasks/contenttrans-customize.md)**  
This task describes how to customize content transformations.

**Parent topic:**[Administering](../concepts/ch-administering.md)

