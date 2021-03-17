---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: monitoring JMX monitoring management extensions
---

# JMX monitoring and management extensions

This section describes the JMX-based monitoring and management functionality.

The monitoring and management extensions can be subdivided into three categories:

-   **Read-only monitoring beans**

    Expose a variety of real-time metrics for monitoring health and throughput of your Alfresco server.

-   **Configuration beans**

    Provide an easily navigable view of key system configuration for support and diagnostic purposes.

-   **Management beans**

    Allow control over various subsystems.


For more information on these categories of bean, refer to the reference section [JMX bean categories](jmx-reference.md).

-   **[Coexistence with other MBeans](../concepts/jmx-mbeans.md)**  
If there is an MBean server already running on the Java Virtual Machine \(JVM\) that Alfresco is running on, Alfresco will export its MBeans to that server. Otherwise, Alfresco will start up its own MBean server. This means that, for example, on Tomcat or WebLogic, the Alfresco beans will compliment those provided by the application server and will be navigable in the same context with a suitable JMX client.
-   **[Activating the Sun JMX agent and local JMX connectivity](../tasks/jmx-activate.md)**  
When using Tomcat and a Sun JVM for a richest monitoring experience, you can get Alfresco and Tomcat to share the JVM's own platform MBean server, whose pre-registered MXBeans give a detailed view of the JVM's health, usage and throughput, in areas including class loading, hot spot compilation, garbage collection, and thread activity.

**Parent topic:**[Monitoring Alfresco](../concepts/monitoring-intro.md)

