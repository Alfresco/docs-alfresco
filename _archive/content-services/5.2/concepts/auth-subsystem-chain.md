---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: authentication subsystem chain
---

# Authentication chain

The authentication subsystem types allow you to integrate Alfresco Content Services with the authentication servers in your environment. However, if integrating with only one of these systems is not sufficient, you might want to combine multiple authentication protocols against a collection of servers.

Authentication and identity management functionality is provided by a prioritized list, or chain, of configurable subsystems. The built-in authentication chain is a priority-ordered list of authentication subsystem instances. Alfresco Content Services composes together the functions of the subsystems in this list into a more powerful conglomerate.

An authentication subsystem provides the following functionality:

-   Password-based authentication for web browsing, SharePoint, FTP, and WebDAV
-   CIFS file system authentication
-   Web browser and SharePoint Single Sign on \(SSO\)
-   User register export \(the automatic population of the user and authority database\)

Several alternative authentication subsystems exist for the most commonly used authentication protocols. These subsystems enable you to tie Alfresco Content Services to some of the most widely used authentication infrastructures. If you include more than one of these subsystems in the chain, you can create complex authentication scenarios.

-   **[Authentication chain functions](../concepts/auth-chain-functions.md)**  
The functions of the chain are composed in two different ways: chained functions and pass-through functions.
-   **[Default authentication chain](../concepts/auth-subsystem-defaultauth.md)**  
The default product configuration has a simple chain with one member. This is an instance of the `alfrescoNtlm` subsystem type with and ID of `alfrescoNtlm1`.
-   **[Configuring the authentication chain](../tasks/auth-subsystem-chain-config.md)**  
You can add to or completely replace the default authentication chain.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

