---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM Connector module, Extensions/Third Party]
keyword: [XAM, Connector, Centera]
---

# Testing the XAM connection

These steps describe how to test the XAM connection.

The shXAM tool is provided within the XAM tools. Use the shXAM tool to connect to the XAM server using the `xam.xri` property that you specified in the alfresco-global.properties file.

1.  Run the shXAM tool.

2.  Run the following command:

    `connect snia-xam://centera_vim!128.221.200.60?/opt/centera/us2_armTest1.pea`

    An example of the output is as follows:

    ```
    shXAM>connect snia-xam://centera_vim!128.221.200.60?/opt/centera/us2_armTest1.pea
    
    Connected to an XSystem with XRI: snia-xam://centera_vim!128.221.200.60?/opt/centera/us2_armTest1.pea
    ```


**Parent topic:**[Configuring the XAM connection](../tasks/xam-connection-config.md)

