---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the repository

Use this information to configure the Alfresco repository.

-   **[Running Alfresco in read-only mode](../concepts/alfresco-read-only.md)**  
You may want to run Alfresco in read-only mode, for example, if you are using Alfresco for Solr to track in order to maintain indexes.
-   **[Deploying Alfresco with a different context path](../tasks/deploy-contextpath.md)**  
There are a number of updates that you need to make if you want to deploy Alfresco to a context path that is not /alfresco.
-   **[Tuning the JVM](../concepts/jvm-tuning.md)**  
The hardware requirements for the Alfresco repository and Share are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation.
-   **[Command line configuration](../concepts/cmd-line-config.md)**  
The beans that load the alfresco-global.properties will give preferential treatment to any JVM-set properties.
-   **[Configuring Alfresco to work with a web proxy](../concepts/config-alf-webproxy.md)**  
There are standard JVM system properties that you can use to set proxies for various protocol handlers, such as HTTP and HTTPS. These properties are used by Surf and all other parts of the system that make http call-outs.
-   **[Configuring server administration properties](../concepts/sysadmin-subsystem-intro.md)**  
The sysAdmin subsystem allows real time control across some of the general repository properties. The sysAdmin subsystem replaces the `RepoServerMgmt` management bean.
-   **[Controlling JVM system properties](../concepts/jvm-prop.md)**  
Use these techniques to control JVM system properties.
-   **[Secure Sockets Layer \(SSL\) and the Alfresco repository](../concepts/configure-ssl-intro.md)**  
There are a number of ways to handle SSL communication when connecting to the Alfresco repository, and some information that you should know about automatic configuration in Alfresco.
-   **[Configuring the repository cache](../tasks/cache-config.md)**  
The Alfresco repository provides in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.
-   **[Adding a MIME type](../tasks/mimetype-add.md)**  
Use this information to add a MIME type definition.
-   **[Configuring metadata extraction](../tasks/metadata-config.md)**  
Metadata extraction automatically extracts metadata information from inbound and/or updated content and updates the corresponding nodes properties with the metadata values.
-   **[About aspects](../concepts/aspect-about.md)**  
Aspects allow you to add functionality to existing content types.
-   **[About versioning](../concepts/versioning.md)**  
Versioning allows you to track content history. By default, content that is created in the repository is not versionable. When creating content, users must specify `versionable` on a case-by-case basis.
-   **[Setting up database replication](../concepts/replication.md)**  
Replication allows you to continuously copy a database to a different server.
-   **[Customizing content transformations](../tasks/contenttrans-customize.md)**  
This task describes how to customize content transformations.
-   **[Controlling indexes](../concepts/admin-indexes.md)**  
You can use the `cm:indexControl` aspect to control the indexing of content in Alfresco Share. Using this aspect you can choose to disable repository-wide indexing. This can prove useful in certain situations, such as bulk loading.
-   **[Deferring the start of cron based jobs](../tasks/cron-defer.md)**  
You can configure `alfresco-global.properties` and `dev-log4j.properties` to implement a global delay to cron based jobs; for example, until after the server has fully started.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

