---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [JMX, disable]
---

# Disabling JMX

The JMX functionality is enabled using the RMiRegistryFactoryBean in the core-services-context.xml file.

1.  ![Enterprise only feature](../images/enterprise-feature.png) Open the <configRoot\>\\classes\\alfresco\\core-service-context.xml file.

2.  Comment out the RMIRegistryFactoryBean section.

3.  Save the file.


**Parent topic:**[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)

