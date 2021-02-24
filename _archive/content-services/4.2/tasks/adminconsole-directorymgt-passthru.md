---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring pass-through \(passthru\) authentication

Use these instructions to configure passthru authentication using the configuration properties in the Admin Console.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  In the Authentication Chain section, under **Actions**, click **Edit** corresponding to the Passthru directory.

    **Note:** You can only edit a directory after it has been added and saved. If you have not yet saved the entry, the only option available is Remove.

    You see the Edit Passthru Directory page.

4.  Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Use Local Server**|No|This enables the local server to be used for passthru authentication by using loopback connections into the server.|
    |**Map Unknown User to Guest**|No|This specifies whether unknown users are automatically logged on as the Alfresco guest user during SSO. Guest access is only supported by the Explorer client.|
    |**Allow Guest Login**|No|This enables the guest logins to Alfresco. Guest access is only supported by the Explorer client.|
    |**Administrator User Names**|-|This specifies a comma separated list of user names to be considered administrators by default.|
    |**Authenticate FTP**|Yes|This enables passthru authentication for FTP access.|
    |**Authenticate Domain**|DOMAIN|This specifies the Windows NetBIOS domain name to use for passthru authentication. This will attempt to find the domain controllers using a network broadcast. If the network broadcast is not successful, use the `passthru.authentication.servers` property to specify the domain controller list by name or address.|
    |**Authentication Servers**|-|This specifies a comma delimited list of server names or addresses that are used for authentication. The pass through authenticator will load balance amongst the available servers, and can monitor server online/offline status.|
    |**Authentication Protocol Order**|TCPIP,NetBIOS|This specifies the type of protocols and order of connection for passthru authentication sessions. The default is to use NetBIOS, and the available protocol types are NetBIOS for NetBIOS over TCP and TCPIP for native SMB.|
    |**Connection Timeout**|5000|This specifies the timeout value in milliseconds when opening a session to an authentication server. The default is 5000.|
    |**Offline Check Interval**|300|This specifies how often \(in seconds\) the passthru servers that are marked as offline are checked to see if they are now online. The default check interval is 5 minutes.|

5.  Click **Save** to apply the changes you have made to the Passthru directory.

    If you do not want to save the changes, click **Close**.


**Parent topic:**[Managing authentication directories](../concepts/adminconsole-directorymgt-cp.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

