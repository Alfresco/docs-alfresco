---
author: Alfresco Documentation
---

# Testing the EMC Centera connection

The JCASScript tool is provided with the EMC Centera® SDK and Community Tools.

Use the JCASScript tool to connect to the XAM server using the `centera.url` property that you specified in the alfresco-global.properties file.

1.  Start the JCASScript tool using the following command:

    ```
    java -jar JCASScript.jar
    ```

2.  Enter the following command to connect to the XAM server:

    ```
    poolOpen 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
    ```

    An example of the output is as follows:

    ```
    CASScript>poolOpen 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
     
    Attempting to connect to: 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
     
    Connected to: 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
     
    CASPool Properties:
       Connection String:                 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
      Cluster Time:                      2014.01.10 06:25:31 GMT
      Buffer Size:                       16384
      Prefetch Buffer Size:              32768
      Connection Timeout:                120000
      Multi-Cluster Failover Enabled:    True
      Collision Avoidance Enabled:       False
    ```


**Parent topic:**[Configuring the EMC Centera connection](../tasks/centera-connection-config.md)

