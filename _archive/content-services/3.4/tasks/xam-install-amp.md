---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM Connector module, Extensions/Third Party]
keyword: [XAM, Connector, Centera]
---

# Installing the XAM Connector module

These steps describe how to install the XAM Connector module to an instance of Alfresco.

The XAM Connector module functionality is packaged as an Alfresco Module Package \(AMP\) file.

1.  Browse to the Alfresco Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download the alfresco-xamconnector-<release\_number\>.amp file.

    For example:

    ```
    alfresco-xamconnector-3.4.14.amp
    ```

3.  Use the Module Management Tool \(MMT\) to install the AMP. If your Alfresco installation is running within the Tomcat application server, you can use the <installLocation\>\\bin\\apply\_amps command to apply all AMP files that are located in the amps directory.

4.  Restart the Alfresco server.

    Note the following message in the logs:

    ```
    Starting module org_alfresco_module_xamconnector version 1.0.
    ```


-   **[Testing the XAM Connector module](../tasks/xam-connector-module-test.md)**  
These steps describe how to test the XAM Connector module with Alfresco.

**Parent topic:**[Installing and configuring Alfresco XAM Connector](../concepts/xam-intro.md)

