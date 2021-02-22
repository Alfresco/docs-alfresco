---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: CIFS
---

# Troubleshooting CIFS

This section provides help for diagnosing and resolving any issues that might arise when configuring CIFS.

## Password Error

Sometimes, when connecting to an instance of Alfresco Share, the login dialog appears several times until finally taking effect. This problem can be caused by the Share connecting to the Windows file server that is running on native SMB/port 445 rather than trying to connect via NetBIOS.

## Native SMB collisions

Native SMB can be disabled by adding the following registry key:

```
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NetBT\Parameters] "SMBDeviceEnabled"=dword:00000000 
```

Reboot the system after creating this key. Setting the value to one or deleting the registry key will restore native SMB support.

The SMBDeviceEnabled registry key does not seem to be recognized on Vista and Windows 2008. In order to stop native SMB being used when the Alfresco CIFS server is being run under Vista or Windows 2008, the firewall rules can be updated to block inbound connections on port 445.

To set up the Windows firewall on the system running the Alfresco CIFS server:

1.  Run the Windows Firewall with Advanced Security application:
    -   \(Vista\) go to **Control Panels \> Administrative Tools**
    -   \(Windows 2008\) go to **Start \> Administrative Tools**
2.  Click on the **Inbound Rules** item in the left hand column.
3.  Scroll down to the **File and Printer Sharing** rules and enable the following:
    -   File And Printer Sharing \(`NB-Datagram-In`\), File And Printer Sharing \(`NB-Name-In`\) and File And Printer Sharing \(`NB-Session-In`\)
    -   The File And Printer Sharing \(`SMB-In`\) rule should be disabled, this blocks the native SMB/port 445 traffic
    -   Other File And Printer Sharing \(...\) rules are not required and can be left as is

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

