---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Connecting to Alfresco through JMX client

You can connect to the Alfresco MBean server through a JMX client that supports JSR-160.

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

1.  Open a JMX client that supports JMX Remoting \(JSR-160\).

2.  Enter the JMX URL:

    service:jmx:rmi:///jndi/rmi://<hostname\>:50500/alfresco/jmxrmi

    Where `<hostname>` is the name of your host or IP address.

3.  Enter the default JMX user name: controlRole

4.  Enter the default JMX password: change\_asap

    **Important:** You must change the default JMX password as soon as possible.

    The JMX access and password settings are stored in the following default files:

    -   <configRoot\>/alfresco/alfresco-jmxrmi.access
    -   <configRoot\>/alfresco/alfresco-jmxrmi.password
    The user `controlRole` is the default user name used to access and configure Alfresco with a JMX client.

    The user `monitorRole` is the default user name used within monitoring tools, for example, Nagios or Hyperic.

5.  Create override configuration files by copying both files to a different location.

    Add the `alfresco.jmx.dir=` property to the alfresco-global.properties file to specify the directory path of the configuration files. For example:

    ```
    alfresco.jmx.dir=/etc/alfresco/config 
    ```

    You can also set this on the Alfresco command line:

    ```
    -Dalfresco.jmx.dir=/etc/alfresco/config 
    ```

    **Note:** In addition, it is possible to set the JVM \(Oracle/Sun JVM-specific\) arguments directly:

    ```
    -Dcom.sun.management.jmxremote
    -Dcom.sun.management.jmxremote.ssl=false
    -Dcom.sun.management.jmxremote.access.file=/etc/alfresco/config/jmxremote.access
    -Dcom.sun.management.jmxremote.password.file=/etc/alfresco/config/jmxremote.password
    -Dcom.sun.management.jmxremote.authenticate=true
    ```

    When using the copied configuration files, rather than the default files, ensure that your configuration is not overwritten when upgrading.

6.  Open the alfresco-jmxrmi.password file and change the password for the `monitorRole` and `controlRole` users from `change_asap` to your own password.

    ```
    monitorRole  new_pw
    controlRole  new_pw
    ```

7.  Save the file.

8.  Open the alfresco-jmxrmi.access file and make any required changes to the read-only or read/write access levels.

    ```
    monitorRole   readonly
    controlRole   readwrite
    ```

9.  Save the file.


**Parent topic:**[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)

