---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Troubleshooting clustering

Use these troubleshooting tips when testing cache clustering.

-   On Linux and Unix environments, you can use `netstat -ln` to check that the correct ports have been opened by the Alfresco server on the correct network adapters. You can use telnet <hostname\><port\> to check if each open port can be reached by each cluster member.
-   If your cluster members are using NAT and IPv4 addresses, you might need to force the server to listen on IP V4 addresses rather than IP V6. To do this, add:

    ```
    -Djava.net.preferIPv4Stack=true 
    ```

    to the startup options of Alfresco’s JVM. In a standard Linux/Unix installation, this would require editing of the `JAVA_OPTS` variable in the script, as follow:

    ```
    tomcat/scripts/ctl.sh
    ```

    On a standard Windows installation, this would require adding the parameter just before ;-Dalfresco.home in:

    ```
    tomcat/bin/service.bat
    ```

    and then running the scripts:

    ```
    tomcat/scripts/serviceinstall.bat REMOVE
    tomcat/scripts/serviceinstall.bat INSTALL 
    ```

    to re-register the Alfresco service with the new option.

    For more information on the process of initiating clustering and the options available for configuring Alfresco clustering, see [Setting up clustering](ha-intro.md).


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

