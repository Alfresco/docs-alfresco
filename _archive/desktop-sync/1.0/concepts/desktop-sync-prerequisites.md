---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: Desktop Sync
---

# Desktop Sync prerequisites

This topic lists the environment/software prerequisites for installing and using the Desktop Sync service for Alfresco.

-   Alfresco One version 5.0.3.7 onwards.
-   ActiveMQ 5.12.0 or greater.

    **Note:** If ActiveMQ is down, the repository transactions will fail and rollback. It is advised that you run an ActiveMQ cluster in a failover mode to avoid this situation. See [ActiveMQ master/slave configurations](http://activemq.apache.org/masterslave.html).

-   PostgreSQL database; see [Configuring PostgreSQL database for Desktop Sync](../tasks/postgres-config.md).
-   Supported platforms:
    -   The Desktop Sync service is platform-independent. However, Alfresco recommends the use of Window Server 2012 R2 and Linux operating systems.
    -   You need to have 64-bit Java 1.7 or higher to run Desktop Sync.
-   Make sure that search indexing is enabled.
-   The system clock on the repository and the synchronization service machines do not necessarily have to be in sync but for the event health check metrics to work, the clocks will need to be in sync. A time synchronization service, such as [NTP](http://www.ntp.org) can be used for this.
-   The synchronization service port \(9090\) needs to be accessible outside your firewall so that the Desktop Sync clients can connect.

**Features not supported by Desktop Sync**

-   Smart Folders
-   Records Management


