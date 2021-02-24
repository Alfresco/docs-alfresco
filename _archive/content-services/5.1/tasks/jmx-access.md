---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Connecting to Alfresco through JMX

Remote JMX functionality is disabled by default in Alfresco. You can connect to the Alfresco MBean server through a JMX client that supports JSR-160 by editing your Alfresco settings.

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

1.  Ensure that you have this setting in your `java_opts` file:

    ```
    -Dcom.sun.management.jmxremote
    ```

    This tells the running JVM to start the JMX service.

2.  Ensure that you have the following properties set in the alfresco-global.properties file:

    ```
    alfresco.jmx.connector.enabled=true
    alfresco.rmi.services.port=50500
    alfresco.rmi.services.host=<hostname>
    ```

    Check that the `<hostname>` can be resolved from where you are running the JMX client.

3.  Open a JMX client that supports JMX Remoting \(JSR-160\).

4.  Connect to the JMX URL:

    service:jmx:rmi:///jndi/rmi://<hostname\>:50500/alfresco/jmxrmi

    Where `<hostname>` is the name of a reachable domain name or an IP address. If you running this on the local server, you can use `localhost`.

5.  Enter the default JMX user name: controlRole

6.  Enter the default JMX password: change\_asap

    **Important:** You must change the default JMX password as soon as possible.

    The user `controlRole` is the default user name used to access and configure Alfresco with a JMX client.

    The user `monitorRole` is the default user name used within monitoring tools, for example, Nagios or Hyperic.

7.  Change the default JMX password as soon as possible. You can set a new password in override configuration files.

    Create two new files called:

    ```
    alfresco-jmxrmi.password
    alfresco-jmxrmi.access
    ```

    Copy the files to a location of your choice and then add the `alfresco.jmx.dir=` property to the alfresco-global.properties file to specify the directory path of the configuration files. For example:

    ```
    alfresco.jmx.dir=/etc/alfresco/config 
    ```

    You can also set this on the Alfresco command line:

    ```
    -Dalfresco.jmx.dir=/etc/alfresco/config 
    ```

8.  Open the alfresco-jmxrmi.password file and add the following properties for the `monitorRole` and `controlRole` users, where `new_pw` is your preferred password.

    ```
    monitorRole  new_pw
    controlRole  new_pw
    ```

9.  Save the file.

10. Open the alfresco-jmxrmi.access file and add the following properties for the read-only or read/write access levels of each user.

    ```
    monitorRole   readonly
    controlRole   readwrite
    ```

11. Save the file.


**Note:** It is possible to set the JVM \(Oracle/Sun JVM-specific\) arguments directly:

```
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.access.file=/etc/alfresco/config/jmxremote.access
-Dcom.sun.management.jmxremote.password.file=/etc/alfresco/config/jmxremote.password
-Dcom.sun.management.jmxremote.authenticate=true 
```

**Parent topic:**[Using a JMX client to change settings dynamically](../concepts/jmx-intro-config.md)

