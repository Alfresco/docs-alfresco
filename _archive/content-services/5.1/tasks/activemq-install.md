---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting up ActiveMQ

Set up Apache ActiveMQ to enable message queuing in Alfresco. If you already have an ActiveMQ instance connected to Alfresco, you do not need to perform these step.

If you do not already have an ActiveMQ instance, install [ActiveMQ](http://activemq.apache.org/installation.html) and follow the steps below.

1.  Stop the Alfresco server.

2.  Define the location of ActiveMQ in your alfresco-global.properties file:

    ```
    messaging.broker.url=failover:(tcp://ba-server:61616)?timeout=3000
    ```

    where `server` is the host name of the server where ActiveMQ is installed.

    When you set up ActiveMQ, the Alfresco events and messaging subsystems are set to start up automatically.

    Any changes to alfresco-global.properties require you to restart Alfresco to apply the changes.


**Parent topic:**[Configuring ActiveMQ](../concepts/activemq-overview.md)

