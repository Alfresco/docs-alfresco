---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: monitoring JMX agent connectivity
---

# Activating the Sun JMX agent and local JMX connectivity

When using Tomcat and a Sun JVM for a richest monitoring experience, you can get Alfresco and Tomcat to share the JVM's own platform MBean server, whose pre-registered MXBeans give a detailed view of the JVM's health, usage and throughput, in areas including class loading, hot spot compilation, garbage collection, and thread activity.

Sun's MBean server also provides a convenient local connection method, allowing the Alfresco process to be automatically 'discovered' by a JMX client such as JConsole or Hyperic agent without manual configuration of connection details. For more information on using Hyperic with Alfresco, refer to [Installing Alfresco Enterprise plug in for Hyperic](hyperic-install.md)

The Sun JMX agent can also be activated in remote mode \(where a connection is made through an RMI lookup\). However, since Alfresco is always preconfigured to allow a secure remote JMX connection on any JVM, it is most likely that you will choose to activate the Sun JMX agent in local mode. This will mean the platform MBean Server will be shared by Alfresco and still be available for remote connections through the RMI connector.

-   To activate the Sun JMX agent in local mode, ensure that the following system property is set:

    `com.sun.management.jmxremote`

    For example, in your Tomcat startup script, you could use the following line:

    `export JAVA_OPTS="${JAVA_OPTS} -Dcom.sun.management.jmxremote"`

-   Refer to the Sun documentation for more information on all the possible configuration options.


**Parent topic:**[JMX monitoring and management extensions](../concepts/jmx-enhance.md)

