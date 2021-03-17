---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
---

# Setting up ActiveMQ

Set up Apache ActiveMQ to enable message queuing. If you already have an ActiveMQ instance connected to Alfresco Content Services, you don't need to perform these step.

If you do not already have an ActiveMQ instance, install [ActiveMQ](http://activemq.apache.org/installation.html) and follow the steps below.

1.  Stop the server.

2.  Define the location of ActiveMQ in your alfresco-global.properties file:

    ```
    messaging.broker.url=failover:(tcp://server:61616)?timeout=3000
    ```

    where `server` is the host name of the server where ActiveMQ is installed.

    When you set up ActiveMQ, the Alfresco Content Services events and messaging subsystems are set to start up automatically.

    Any changes to alfresco-global.properties require you to restart Alfresco Content Services to apply the changes.


**Parent topic:**[Configuring ActiveMQ](../concepts/activemq-overview.md)

