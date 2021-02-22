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
The hardware requirements for the Alfresco repository, Explorer and Share are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation. This section suggests metrics and estimates, but your system may vary.
-   **[Command line configuration](../concepts/cmd-line-config.md)**  
The beans that load the alfresco-global.properties will give preferential treatment to any JVM-set properties.
-   **[Configuring Alfresco to work with a web proxy](../concepts/config-alf-webproxy.md)**  
This topic describes the standard JVM system properties that you can use to set proxies for various protocol handlers, such as HTTP and HTTPS. These properties are used by Surf and all other parts of the system that make http call-outs.
-   **[Controlling JVM system properties](../concepts/jvm-prop.md)**  
This topic describes how to control JVM system properties.
-   **[Secure Sockets Layer \(SSL\) and the Alfresco repository](../concepts/configure-ssl-intro.md)**  
There are a number of ways to handle SSL communication when connecting to the Alfresco repository, and some information that you should know about automatic configuration in Alfresco.
-   **[Configuring the repository cache](../concepts/cache-memorysettings.md)**  
The Alfresco repository uses *Ehcache* in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.
-   **[Adding a MIME type](../tasks/mimetype-add.md)**  
Use this information to add a MIME type definition.
-   **[Configuring metadata extraction](../tasks/metadata-config.md)**  
Metadata extraction automatically extracts metadata information from inbound and/or updated content, and then updates the corresponding node properties with the metadata values.
-   **[About aspects](../concepts/aspect-about.md)**  
Aspects are a fundamental concept related to content modeling in Alfresco. They allow the addition of functionality to existing content types.
-   **[About versioning](../concepts/versioning.md)**  
Versioning allows you to track content history. By default, content that is created in the repository is not versionable. When creating content, users must specify *versionable* on a case-by-case basis.
-   **[Setting up database replication](../concepts/replication.md)**  
Replication allows you to continuously copy a database to a different server.
-   **[Customizing content transformations](../tasks/contenttrans-customize.md)**  
This task describes how to customize content transformations.
-   **[Controlling indexes](../concepts/admin-indexes.md)**  
This section provides instructions on how to index content using the `cm:indexControl` aspect.

**Parent topic:**[Administering](../concepts/ch-administering.md)

