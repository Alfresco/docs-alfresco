---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [JMX, disable]
---

# Enabling and disabling JMX

The JMX functionality is enabled using the RMiRegistryFactoryBean in the core-services-context.xml file.

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

1.  Open the <configRoot\>\\classes\\alfresco\\core-services-context.xml file.

2.  Comment out the RMIRegistryFactoryBean section.

3.  Save the file.

    When you restart the server, you will see the error: `No bean named 'registry' is defined' when re-starting`. 


**Parent topic:**[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)

