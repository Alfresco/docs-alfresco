---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [JMX, disable]
---

# Disabling JMX

The JMX functionality is enabled using the RMiRegistryFactoryBean in the core-services-context.xml file.

1.  Open the <configRoot\>\\classes\\alfresco\\core-services-context.xml file.

2.  Comment out the RMIRegistryFactoryBean section.

3.  Save the file.

    When you restart the server, you will see the error: `No bean named 'registry' is defined' when re-starting`. 


**Parent topic:**[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)

