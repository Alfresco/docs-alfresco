---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [JMX, disable]
---

# Enabling JMX

Remote JMX functionality is disabled by default in Alfresco. You can enable JMX by setting the alfresco.jmx.connector.enabled property in the alfresco-global.properties file.

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

To enable the JMX server:

1.  Open the alfresco-global.properties file.

2.  Set the following property: `alfresco.jmx.connector.enabled=true`

3.  Save the file.


**Parent topic:**[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)

