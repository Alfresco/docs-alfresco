---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting log levels
---

# Setting log levels

The log4j.properties file lets you configure logging levels to provide debugging information when troubleshooting. To set up logging policies, you must prepend `log4.logger` to the class name you want to log to, and set the logging level. You can set the log level dynamically using the JMX client.

When using log4j, you should:

-   Keep local customizations and licenses outside of the web application. For example, in the extension directory:

    ```
    $TOMCAT_HOME/shared/classes/alfresco/extension/...-log4j.properties
    ```

-   The Alfresco supplied configuration files should be stored or installed within the web application. For example:

    ```
    WEB-INF/classes/alfresco/extension/...-log4j.properties
    ```


**Note:** A dev-log4j.properties file should never be used in an ongoing during production, nor packaged as a part of any product.

Logging uses Log4J's `HierarchyDynamicMBean`.

**Note:** This is not cluster-aware. If needed, the log level change will need to be applied to each machine. Some consoles \(for example, JManage\) may provide basic facilities for accessing each machine in an application cluster.

-   Editable attributes are a dynamic list of loggers with the `logLevel` attribute, which can be changed to OFF, FATAL, ERROR, WARN, INFO, DEBUG or TRACE \(editable\).
-   Operations with impact are `addLoggerMBean` - add logger, if it has been loaded.

    The following steps provide instructions on adding loggers via JConsole


1.  Click **Alfresco** -\> **Log4jHeirarchy** -\> **Operations**-\> **addLoggerMBean** .

2.  Type the full **className** in the **Name** box on the right hand pane.

3.  Click **addLoggerMBean**.

    A pop-up dialog box is displayed with the title **Operation return value**. If the operation is successful, the body of the dialog box contains the **className** you provided, preceded by l**og4j:logger=**. If the operation is unsuccessful, the body of the dialog box has **null**.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

