---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: JMX bean categories reference editable management
---

# JMX editable management beans

This section contains the list of editable management beans.

## Alfresco:Name=FileServerConfig

Allows management and monitoring of the various file servers.

**Read-only properties:**

-   **CIFSServerAddress**

    Not implemented.


-   **CIFSServerName**

    The CIFS server name, if available.


**Editable Properties:**

**Note:** These are not cluster-aware. If more than one file server is running \(for example, load-balanced FTP\) then changes will need to be applied to each machine. Some consoles \(for example, JManage\) may provide basic facilities for accessing each machine in an application cluster.

-   **CIFSServerEnabled**

    A Boolean that when true indicates that the CIFS server is enabled and functioning.

-   **FTPServerEnabled**

    A Boolean that when true indicates that the FTP server is enabled and functioning.

-   **NFSServerEnabled**

    A Boolean that when true indicates that the NFS server is enabled and functioning.


## Alfresco:Name=Log4jHierarchy

An instance of the HierarchyDynamicMBean class provided with log4j that allows adjustments to be made to the level of detail included in the Alfresco server's logs. Note that it is possible to run Alfresco using JDK logging instead of log4j, in which case this bean will not be available.

**Read-only properties:**

The bean has a property for each logger known to log4j, whose name is the logger name, usually corresponding to a Java class or package name, and whose value is the object name of another MBean that allows management of that logger \(see `#log4j:logger=*`\). Despite how it might seem, these properties are read-only and editing them has no effect.

**Editable properties:**

There is one special editable property and note again that it is not cluster aware.

-   **threshold**

    Controls the server-wide logging threshold. Its value must be the name of one of the log4j logging levels. Any messages logged with a priority lower than this threshold will be filtered from the logs. The default value is ALL, which means no messages are filtered, and the highest level of filtering is OFF which turns off logging altogether \(not recommended\).


**Operations with Impact:**

-   **addLoggerMBean**

    This adds an additional logger to the hierarchy, meaning that the bean will be given an additional read-only property for that logger and a new MBean will be registered in the `#log4j:logger=*` tree, allowing management of that logger. Is is not normally necessary to use this operation, because the Alfresco server pre-registers all loggers initialized during startup. However, there may be a chance that the logger you are interested in was not initialized at this point, in which case you will have to use this operation. The operation requires the fully qualified name of the logger as an argument and if successful returns the object name of the newly registered MBean for managing that logger.

    For example, if in Java class `org.alfresco.repo.admin.patch.PatchExecuter` the logger is initialized as follows:

    ```
    private static Log logger = LogFactory.getLog(PatchExecuter.class); 
    ```

    Then the logger name would be `org.alfresco.repo.admin.patch.PatchExecuter`.


## log4j:logger=\*

An instance of the LoggerDynamicMBean class provided with log4j that allows adjustments to be made to the level of detail included in the logs from an individual logger. Note that it is possible to run Alfresco using JDK logging instead of log4j, in which case this bean will not be available.

**Read-only properties:**

-   **name**

    The logger name


**Editable properties:**

There is one special editable property and note again that it is not cluster aware.

-   **priority**

    The name of the minimum log4j logging level of messages from this logger to include in the logs. For example, a value of ERROR would mean that messages logged at lower levels such as WARN and INFO would not be included.


## Alfresco:Name=VirtServerRegistry,Type=VirtServerRegistry

This is used directly by the Alfresco Virtualization Server.

**Parent topic:**[JMX bean categories reference](../concepts/jmx-reference.md)

