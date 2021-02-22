---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [monitoring, JMX, console, JSR-160]
---

# Connecting to Alfresco through JMX client

You can connect to Alfresco through a JMX client that supports JSR-160.

1.  ![Enterprise only feature](../images/enterprise-feature.png) Open a JMX cilent that supports JMX Remoting \(JSR-160\).

2.  Enter the JMX URL:

    service:jmx:rmi:///jndi/rmi://<hostname\>:50500/alfresco/jmxrmi

    Where `<hostname>` is the name of your host or IP address.

3.  Enter the default JMX user name: controlRole

4.  Enter the default JMX password: change\_asap

    **Important:** You must change the default JMX password as soon as possible.

5.  Change the JMX password in the following files:

    -   <configRoot\>/alfresco/alfresco-jmxrmi.access
    -   <configRoot\>/alfresco/alfresco-jmxrmi.password

**Parent topic:**[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)

