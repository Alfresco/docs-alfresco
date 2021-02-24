---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: authentication chain
---

# Alfresco authentication chain

Authentication and identity management functionality is provided by a prioritized list, or chain, of configurable subsystems.

An authentication subsystem provides the following functionality to Alfresco:

-   Password-based authentication for web browsing, Sharepoint, FTP, and WebDAV
-   CIFS and NFS file system authentication
-   Web browser and Sharepoint Single Sign on \(SSO\)
-   User register export \(the automatic population of the Alfresco user and authority database\)

Several alternative authentication subsystems exist for the most commonly used authentication protocols. These subsystems enable you to tie Alfresco to some of the most widely used authentication infrastructures. If you include more than one of these subsystems in the chain, you can create complex authentication scenarios.

**Parent topic:**[Authentication chain example with JConsole](../concepts/auth-jconsole-example.md)

