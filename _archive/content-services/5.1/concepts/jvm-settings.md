---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# JVM settings

There are a number of typical JVM settings that you can use in your repository configuration.

The standard JVM settings are as follows:

```
-Xms1G
-Xmx2G
-Dcom.sun.management.jmxremote
```

If you are using JVM which runs Solr 4, you must add the following setting:

```
-XX:+UseConcMarkSweepGC -XX:+UseParNewGC
```

This includes installations where Solr 4 is running on the same server as Alfresco and Share.

Tune the JVM using the following three steps:

1.  Use as much RAM as possible for the JVM \(`-Xmx32GB`\).
2.  Do not add any other configuration settings.

To avoid memory swapping, `-Xmx` should never exceed the available RAM in the system. Remember to leave room for memory used by the operating system and other applications, like LibreOffice using JOD \(JOD often uses 1 GB of RAM per OO instance\).

In general, if you do not give the JVM enough heap, adjusting the other JVM settings will not make any difference. Once the JVM has enough heap, you should not need to change the other JVM settings.

**The remaining information on this page might help in exceptional circumstances only. It is unlikely to apply to your use case, and we advise against JVM tuning beyond what has already been discussed here.**

## Maximum JVM heap size 32/64 bit

An important calculation to keep in mind is:

```
(Managed Heap + native heap + (thread stack size * number of threads)) cannot exceed 2 GB on 32bit x86 Windows or Linux systems
```

This is a limitation of the Oracle Java VM. It means that even if you install 4 GB of RAM into your server, a single instance of the JVM cannot grow beyond 2 GB on a 32 bit server machine.

**Note:** A 64 bit OS/JVM has much bigger values. It is recommended that a 64 bit OS with large memory hardware \(\>2 GB assigned to the JVM\) is used for deployments of \>250 concurrent or \>2500 casual users.

You can also set up your machine to cluster if you prefer to solve multi-user access performance issues with additional machines rather than a single powerful server.

## Setting debug mode for troubleshooting

To debug your JVM server:

-   If you are a Linux user, edit the JVM options used to start the Alfresco Tomcat instance, set by the tomcat/scripts/ctl.sh script. See [Controlling JVM system properties](jvm-prop.md) for detailed information.

    For example, set the following:

    ```
    JAVA_OPTS=%JAVA_OPTS% -server -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8082
    ```

    where `address` is a port for your system.

-   If you are a Windows user, register Tomcat as a Windows service:
    -   In the installation directory, locate the properties.ini file and copy the value of the `tomcat_unique_service_name` parameter \(for example, `alfrescoTomcatnum1`\).
    -   From the /tomcat/bin directory, run the following command at a command prompt:

        ```
        tomcat7w.exe //ES//<alfrescoTomcatnum1>
        ```

        where `<alfrescoTomcatnum1>` is the value from your `tomcat_unique_service_name` parameter.

    -   Open the `alfrescoTomcatnum1` Properties window, select the Java tab, and the Java Options field and add the following lines of code on two separate lines:

        ```
        -Xdebug 
        -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000
        ```

        where `address` is a port for your system.


-   **[Low end machines](../concepts/jvm-lowend.md)**  
Use this information if you have less than 2 GB memory available.
-   **[Effects of NewSize](../concepts/jvm-newsize.md)**  
Use this information to understand the settings for OldGen.

**Parent topic:**[Tuning the JVM](../concepts/jvm-tuning.md)

