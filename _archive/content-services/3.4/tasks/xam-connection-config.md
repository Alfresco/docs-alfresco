---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM Connector module, Extensions/Third Party]
keyword: [XAM, Connector, Centera]
---

# Configuring the XAM connection

These steps describe how to configure the XAM connection.

1.  Open the <classpathRoot\>/alfresco-global.properties file.

2.  Add the `xam.xri` property.

    For example, `xam.xri=snia xam://centera_vim!128.221.200.60?/opt/centera/us2_armTest1.pea`

    The `xam.xri` property specifies the details of the XAM server, which in this case, is `centera_vim!128.221.200.60?`. The property value also includes the location of the Centera us2\_armTest1.pea file. For example, /opt/centera/us2\_armTest1.pea or C:\\prog\\centera\\us2\_armTest1.pea.

3.  There are various additional properties that can be set to control the behavior of the XAM Connector module.

    For example, the retention period for storing content is `xam.archive.retentionPeriodDays=1`.

    **Note:** The sample alfresco-global.properties file supplied in the XAM connector AMP provides example settings and values.

4.  Save the alfresco-global.properties file.

5.  Ensure Java can find the libraries by setting the `PATH` and `LD_LIBRARY_PATH` environment variables.

    For example:

    ```
    export PATH=$PATH:/opt/centera/lib64
    export LD_LIBRARY_PATH=/opt/centera/lib64
    ```


-   **[Alfresco XAM Connector module properties](../concepts/xam-connector-properties.md)**  
The following properties can be set for the XAM connector module.
-   **[Testing the XAM connection](../tasks/xam-connection-test.md)**  
These steps describe how to test the XAM connection.

**Parent topic:**[Installing and configuring Alfresco XAM Connector](../concepts/xam-intro.md)

**Related information**  


[Alfresco XAM Connector module properties](../concepts/xam-connector-properties.md)

