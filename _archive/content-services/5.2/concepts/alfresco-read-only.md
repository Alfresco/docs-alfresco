---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Running Alfresco in read-only mode

You may want to run Alfresco in read-only mode, for example, if you are using Alfresco for Solr to track in order to maintain indexes.

To set Alfresco to read-only mode, use one of the following methods:

-   Using the alfresco-global.properties file
-   Using a JMX client, such as JConsole

## Using the alfresco-global.properties file

The `server.allowWrite` property specifies that the repository will allow write operations. If set to false, the repository is in read-only mode.

1.  Open the alfresco-global.properties file.
2.  Add the following property:

    ```
    server.allowWrite=false
    ```

3.  Save the file.
4.  Restart the Alfresco server.

## Using a JMX client, such as JConsole

1.  Login to JConsole.
2.  Using the MBean tab, go to **JMX MBeans \> Alfresco \> Configuration \> sysAdmin \> Attributes**.
3.  Set the value of the `server.allowWrite=false` attribute to read-only.
4.  Click Refresh.

Follow these steps to check if Alfresco is set to read-only mode or not:

1.  Go to the Alfresco [Admin Console](../tasks/adminconsole-open.md).
2.  Under General, click **System Settings**.
3.  Under Alfresco Content Services Repository Settings, check the value of **Server Allow Writes**.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

