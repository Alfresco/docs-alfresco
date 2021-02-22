---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book Wiki
audience: 
category: [Authentication and Security, Authentication, Developer]
keyword: [authentication subsystems, authentication]
---

# Authentication subsystems

Authentication is one of the categories of the Alfresco subsystem. An authentication subsystem is a coordinated stack of compatible components responsible for providing authentication and identity-related functionality to Alfresco.

Alfresco offers multiple implementations of the authentication subsystem, each engineered to work with one of the different types of back-end authentication server that you may have available in your enterprise.

An authentication subsystem provides the following functions to Alfresco:

-   Password-based authentication for web browsing, Microsoft SharePoint protocol, FTP, and WebDAV
-   CIFS and NFS file system authentication
-   Web browser, Microsoft SharePoint protocol, and WebDAV Single Sign-On \(SSO\)
-   User registry export \(the automatic population of the Alfresco user and authority database\)

The main benefits of the authentication subsystem are:

-   Subsystems for all supported authentication types are pre-wired and there is no need to edit template configuration.
-   There is no danger of compatibility issues between sub-components, as these have all been pre-selected. For example, your CIFS authenticator and authentication filter are guaranteed to be compatible with your authentication component.
-   Common parameters are shared and specified in a single place. There is no need to specify the same parameters to different components in multiple configuration files.
-   There is no need to edit the web.xml file. The web.xml file uses generic filters that call into the authentication subsystem. The alfresco.war file is a portable unit of deployment.
-   You can swap from one type of authentication to another by activating a different authentication subsystem.
-   Your authentication configuration will remain standard and, therefore, more manageable to support.
-   Authentication subsystems are easily chained

**Note:** Functions such as NTLM SSO and CIFS authentication can only be targeted at a single subsystem instance in the authentication chain. This is a restriction imposed by the authentication protocols themselves. For this reason, Alfresco targets these ‘direct’ authentication functions at the first member of the authentication chain that has them enabled. 

-   **[Authentication subsystem types](../concepts/auth-subsystem-types.md)**  
A number of alternative authentication subsystem types exist for the most commonly used authentication protocols. These are each identified by a unique type name.
-   **[Authentication subsystem components](../concepts/auth-subsystem-components.md)**  
This section describes the main components of an authentication subsystem.
-   **[Authentication chains](../concepts/auth-subsystem-chain.md)**  
The authentication subsystem types allow you to integrate Alfresco with the authentication servers in your environment. However, if integrating Alfresco with only one of these systems is not sufficient, you may want to combine multiple authentication protocols against a collection of servers.
-   **[Authentication chain functions](../concepts/auth-chain-functions.md)**  
The functions of the chain are composed in two different ways: chained functions and pass-through functions.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

