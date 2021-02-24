---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: core services repository cache
---

# Configuring the repository cache

The Alfresco repository uses *Ehcache* in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.

Cache settings depend on the amount of memory available to your Alfresco server. The default ehcache-default.xml file is enough for most systems and is currently set for 512MB of cache heap memory. This is the recommended default for a Java heap size of 1GB.

-   **[Individual cache settings](../concepts/cache-indsettings.md)**  
All cache settings are in the <configRoot\>\\alfresco\\ehcache-default.xml file.
-   **[Tracing the caches](../tasks/caches-trace.md)**  
This task describes how to trace the repository caches.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

