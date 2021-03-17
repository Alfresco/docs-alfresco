---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Alfresco Server]
keyword: [Windows Service, Tomcat, Registry entry, TCP connections]
---

# Handling a higher rate of outbound TCP connections

If you are using the Alfresco Web Services API on a Windows client and frequently see errors such as `java.net.BindException: Address already in use: connect` in the client application, you may need to tune the client operating system parameters so that it can handle a higher rate of outbound TCP connections.

1.  Open the Registry.

2.  Under the following registry entry:

    ```
    HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\TCPIP\Parameters
    ```

3.  Key in the registry of the Windows client machine.

4.  Add the following registry entries:

    -   **TcpTimedWaitDelay**

        Add this DWORD with a value of 30.

    -   **MaxUserPort**

        Add this DWORD with a value of 32768.

5.  Refer to the Windows documentation for further details on these registry entries.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

