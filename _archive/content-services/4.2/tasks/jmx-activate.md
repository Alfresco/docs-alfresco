---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: monitoring JMX agent connectivity
---

# Activating the Oracle JMX agent and local JMX connectivity

When using Tomcat and a Oracle JVM for a richest monitoring experience, you can get Alfresco and Tomcat to share the JVM's own platform MBean server, whose pre-registered MXBeans give a detailed view of the JVM's health, usage and throughput, in areas including class loading, hot spot compilation, garbage collection, and thread activity.

Oracle's MBean server also provides a convenient local connection method, allowing the Alfresco process to be automatically 'discovered' by a JMX client such as JConsole without manual configuration of connection details.

The Oracle JMX agent can also be activated in remote mode \(where a connection is made through an RMI lookup\). However, since Alfresco is always preconfigured to allow a secure remote JMX connection on any JVM, it is most likely that you will choose to activate the Oracle JMX agent in local mode. This will mean the platform MBean Server will be shared by Alfresco and still be available for remote connections through the RMI connector.

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

-   To activate the Oracle JMX agent in local mode, ensure that the following system property is set:

    `com.sun.management.jmxremote`

    For example, in your Tomcat startup script, you could use the following line:

    `export JAVA_OPTS="${JAVA_OPTS} -Dcom.sun.management.jmxremote"`

-   Refer to the Oracle documentation for more information on all the possible configuration options.


**Note:** Oracle JMX is not supported when using JBoss EAP. This is a known issue; see JBoss issue [AS7-1859](https://issues.jboss.org/browse/AS7-1859). Alfresco recommends that you use JBoss JMX instead. For information on how to connect to the JBoss AS7 JMX MBeanServer from jconsole, see the [JBoss Developer documentation](https://community.jboss.org/wiki/UsingJconsoleToConnectToJMXOnAS7).

**Parent topic:**[JMX monitoring and management extensions](../concepts/jmx-enhance.md)

