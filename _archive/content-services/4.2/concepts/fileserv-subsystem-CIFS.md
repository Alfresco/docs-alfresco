---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring SMB/CIFS server

The server includes Java socket-based implementations of the SMB/CIFS protocol that can be used on any platform.

The server can listen for SMB traffic over the TCP protocol \(native SMB\) supported by Windows 2000 and later versions, and the NetBIOS over TCP \(NBT\) protocol, supported by all Windows versions. There is also a Windows-specific interface that uses Win32 NetBIOS API calls using JNI code. This allows the Alfresco CIFS server to run alongside the native Windows file server.

The default configuration uses the JNI-based code under Windows and the Java socket based code under Linux, Solaris, and Mac OS X.

-   **[CIFS file server properties](../concepts/fileserv-CIFS-props.md)**  
The following properties can be configured for the SMB/CIFS server.
-   **[Java-based SMB properties](../concepts/fileserv-CIFS-javaprops.md)**  
The following properties only take effect on non-Windows servers, where the Java-based SMB implementation is used.
-   **[Running SMB/CIFS from a normal user account](../tasks/fileserv-CIFS-useracc.md)**  
On Unix-like systems such as Linux and Solaris, the default Alfresco setup must be run using the root user account so that the CIFS server can bind to the privileged ports \(TCP 139/445 UDP 137/138\).
-   **[SMB/CIFS advanced Spring overrides](../tasks/fileserv-CIFS-adv.md)**  
The SMB/CIFS server beans are declared in the file-servers-context.xml file in <configRoot\>\\classes\\alfresco\\subsystems\\fileServers\\default\\. Using the subsystem extension classpath mechanism, you can place site specific customization of these default values in a Spring bean file in <extension\>\\subsystems\\fileServers\\default\\default\\custom-file-servers-context.xml \(note that the default\\default part of the path is intentional\).
-   **[Configuring CIFS on Windows Server 2008 R2](../tasks/fileserv-CIFS-WS2008R2.md)**  
The following instructions describe how to configure the Alfresco CIFS server on Windows Server 2008 R2.
-   **[Additional information for CIFS on Windows](../concepts/fileserv-subsystem-info.md)**  
This section provides additional information to assist you when setting up CIFS servers on Windows.

**Parent topic:**[Configuring file servers](../concepts/fileserv-subsystem-intro.md)

