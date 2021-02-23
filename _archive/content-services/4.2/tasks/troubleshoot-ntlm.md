---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Troubleshooting NTLM

This section provides help for diagnosing and resolving any issues that might arise when configuring NTLM.

Alfresco supports NTLM v2 protocol, which is more secure than NTLM v1 protocol. However, NTLM v2 cannot be used with pass-through authentication. You will have to switch to NTLM v1 if you want to use pass-through authentication, where Alfresco passes the log on request to an Active Directory or other server to validate the login credentials. For more information, please see the [Configuring pass-through](../concepts/auth-passthru-intro.md) topic.

To authenticate using NTLM v1, set the following registry key on your client machines:

```
[HKLM\SYSTEM\CurrentControlSet\Control\Lsa] "LmCompatibilityLevel"=dword:00000001
```

**Issue:**

Failure of NTLM logon on machines running Windows 7 or Internet Explorer 8.

**Troubleshooting**

This problem is most likely caused by enhanced security in Windows 7, Vista and Windows 2008. Previous versions of Windows \(XP\) would fall back to NTLM v1, if NTLM v2 failed.

1.  On Windows 7 clients, navigate to **Control Panel \> Administrative Tools \> Local Security Policy**.

2.  In the left pane, navigate to **Security Settings \> Local Policies \> Security Options**.

3.  In the right pane, find **Network Security: LAN Manager authentication level**.

    By default, the value of **Network Security: LAN Manager authentication level** is set to **Send NTLMv2 response only. Refuse LM & NTLM**.

4.  Set the value of **Network Security: LAN Manager authentication level** to **Send LM and NTLM - use NTLMv2 session security if negotiated**.


This setting allows Windows 7 to use the more secure NTLM v2, if available, and fall back to NTLM v1 for Alfresco. If the machines are in a domain, it may be possible to change this setting on all of them via the group policy editor on the domain controller.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

