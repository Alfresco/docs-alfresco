---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: authentication subsystem chain
---

# Authentication chains

The authentication subsystem types allow you to integrate Alfresco with the authentication servers in your environment. However, if integrating Alfresco with only one of these systems is not sufficient, you may want to combine multiple authentication protocols against a collection of servers.

Authentication and identity management functionality is provided by a prioritized list, or chain, of configurable subsystems. The built-in authentication chain is a priority-ordered list of authentication subsystem instances. Alfresco composes together the functions of the subsystems in this list into a more powerful conglomerate.

An authentication subsystem provides the following functionality to Alfresco:

-   Password-based authentication for web browsing, SharePoint, FTP, and WebDAV
-   CIFS and NFS file system authentication
-   Web browser and SharePoint Single Sign on \(SSO\)
-   User register export \(the automatic population of the Alfresco user and authority database\)

Several alternative authentication subsystems exist for the most commonly used authentication protocols. These subsystems enable you to tie Alfresco to some of the most widely used authentication infrastructures. If you include more than one of these subsystems in the chain, you can create complex authentication scenarios.

**Parent topic:**[Authentication subsystems](../concepts/auth-subsystem-intro.md)

