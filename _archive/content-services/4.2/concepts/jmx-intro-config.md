---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [monitoring, JMX]
---

# Runtime administration with a JMX client

By default, you can reconfigure Alfresco by shutting down the server, editing the relevant property in the configuration files, and then restarting the server.There are some support operations that can be performed on-demand at runtime without needing to restart the server.

The Java Management Extension \(JMX\) interface allows you to access Alfresco through a standard JMX console that supports JMX Remoting \(JSR-160\). This lets you:

-   Manage Alfresco subsystems
-   Change log levels
-   Enable or disable file servers \(FTP/CIFS/NFS\)
-   Set server read-only mode
-   Set server single-user mode
-   Set server maximum user limit - including ability to prevent further logins
-   Count user sessions/tickets
-   User session/ticket invalidation

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

Example consoles include:

-   JConsole \(supplied with Java SE 5.0 and higher\)
-   MC4J
-   JManage

Some of these consoles also provide basic graphs and/or alerts for monitoring JMX-managed attributes.

-   **[Connecting to Alfresco through JMX client](../tasks/jmx-access.md)**  
You can connect to the Alfresco MBean server through a JMX client that supports JSR-160.
-   **[Enabling JMX](../tasks/jmx-disable.md)**  
Remote JMX functionality is disabled by default in Alfresco. You can enable JMX by setting the alfresco.jmx.connector.enabled property in the alfresco-global.properties file.
-   **[Configuring Alfresco with JConsole](../tasks/jmx-jconsole-example.md)**  
This section describes how to use the JMX client, JConsole for Alfresco runtime administration. JConsole is a JMX client available in the Oracle Java SE Development Kit \(JDK\).

**Parent topic:**[Configuration overview](../concepts/configuration-overview.md)

