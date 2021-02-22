---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: monitoring JMX bean MBeans
---

# Coexistence with other MBeans

If there is an MBean server already running on the Java Virtual Machine \(JVM\) that Alfresco is running on, Alfresco will export its MBeans to that server. Otherwise, Alfresco will start up its own MBean server. This means that, for example, on Tomcat or WebLogic, the Alfresco beans will compliment those provided by the application server and will be navigable in the same context with a suitable JMX client.

**Parent topic:**[JMX monitoring and management extensions](../concepts/jmx-enhance.md)

