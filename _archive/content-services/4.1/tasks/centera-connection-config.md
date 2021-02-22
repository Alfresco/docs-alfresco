---
author: Alfresco Documentation
---

# Configuring the Centera connection

You can configure the Centera Connector module to alter the behavior of the connection.

1.  Open the <classpathRoot\>/alfresco-global.properties file.

2.  Add the `centera.url` property.

    For example:

    ```
    centera.url=168.159.214.24?c:/centera/c2armtesting.pea
    ```

    The `centera.url` property specifies the details of the Centera server. For example, in this case, it specifies the IP address `168.159.214.24`.

    The property also includes the location of the Centera c2armtesting.pea file. For example, C:/centera/c2armtesting.pea or /usr/local/Centera\_SDK/c2armtesting.pea.

3.  Set any additional properties to alter the way that the Centera Connector behaves.

    There are various additional properties that can be set to control the Centera Connector module. For example, the retention period for storing content is controlled using the `xam.archive.retentionPeriodDays=1` property.

    **Note:** The sample alfresco-global.properties file supplied in the Centera Connector AMP provides example settings and values.

4.  Save the alfresco-global.properties file.

5.  Ensure that Java can find the Centera libraries.

    On Windows, set the `Path` environment variable.

    1.  Open the **Control Panel\\All Control Panel Items\\System**.

    2.  Select **Advanced System Settings \> Advanced \> Environment Variables**.

    3.  In the **System Variables** section, modify the existing `Path` environment variable by adding the path to the Centera libs.

    For example:

    ```
    Path=c:\centera\lib64
    ```

    On Linux, set the `PATH` and `LD_LIBRARY_PATH` environment variables.

    For example:

    ```
    export PATH=$PATH:/usr/local/Centera_SDK/lib/64
    export LD_LIBRARY_PATH=/usr/local/Centera_SDK/lib/64
    ```


-   **[Centera Connector module properties](../concepts/centera-connector-properties.md)**  
The following properties can be set for the Centera connector module.
-   **[Testing the Centera connection](../tasks/centera-connection-test.md)**  
The JCASScript tool is provided with the EMC Centera® SDK and Community Tools.

**Parent topic:**[Installing and configuring Centera Connector](../concepts/centera-intro.md)

**Related information**  


[Centera Connector module properties](../concepts/centera-connector-properties.md)

