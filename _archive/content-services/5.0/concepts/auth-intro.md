---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Developer]
keyword: [overview, authentication]
---

# Setting up Alfresco authentication and security

The first time you access a vanilla Alfresco installation, you can identify yourself by entering a new user name and password in the Login screen. If you log in with the credentials of a user with administrator privileges, you can create additional users and assign them passwords.

In this out-of-the-box set up, you can manage the user base and their passwords manually from within Alfresco.

From here, there are a number of common customizations you might want to make to scale up to the needs of a larger enterprise. For example, you might want to:

-   Enable automatic sign-on using operating system credentials or a Single Sign-On \(SSO\) server to remove the need for a Login page
-   Delegate authentication responsibility to a central directory server to remove the need to set up users manually

-   **[Alfresco security](../concepts/secur-about.md)**  
Alfresco security comprises a combination of authentication and authorization.
-   **[Authentication subsystems](../concepts/auth-subsystem-intro.md)**  
Authentication is one of the categories of the Alfresco subsystem. An authentication subsystem is a coordinated stack of compatible components responsible for providing authentication and identity-related functionality to Alfresco.
-   **[Alfresco authentication chain](../concepts/auth-subsystem-chain.md)**  
The authentication subsystem types allow you to integrate Alfresco with the authentication servers in your environment. However, if integrating Alfresco with only one of these systems is not sufficient, you might want to combine multiple authentication protocols against a collection of servers.
-   **[Configuring authentication subsystems](../concepts/auth-config-examples.md)**  
A number of examples demonstrate how to express various authentication configuration requirements in subsystem instances in the authentication chain. They also explain how the authentication chain integrates the functions of multiple subsystem instances into a more powerful conglomerate, letting you cater for even the most complex authentication scenarios.
-   **[Authorities](../concepts/secur-authorities.md)**  
Authorities are people \(or persons\) or groups.
-   **[Defining permissions](../concepts/secur-permissions.md)**  
 Permissions and their groupings are defined in an XML configuration file.
-   **[Access Control Lists](../concepts/secur-acl.md)**  
An Access Control List \(ACL\) is an ordered list of one or more Access Control Entries \(ACE\). An ACE associates a single authority to a single permission group or permission, and states whether the permission is to be allowed or denied. All nodes have an associated ACL.
-   **[Modifying access control](../concepts/secur-acl-modifying.md)**  
Modifying access control can involve changing definitions, adding services, defining types and aspects, or adding definitions to new or existing security interceptors.
-   **[Public services](../concepts/secur-public-service.md)**  
Security is enforced around public services. Web services, web scripts, Alfresco Share, CIFS, WebDAV, FTP, CMIS, and more, all use public services, and therefore include security enforcement.
-   **[Implementation and services](../concepts/secur-implserv.md)**  
Alfresco enforces security services for managing authentication information. This section provides detailed information about the security services used in Alfresco and their implementation.
-   **[Admin password in default authentication](../concepts/admin-password.md)**  
This topic explains how the password for the Admin user is used by the default authentication system.
-   **[Security policies and filters](../concepts/share-policies.md)**  
You can configure a number of policies and filters in Alfresco Share to mitigate security attacks.

**Parent topic:**[Administering](../concepts/ch-administering.md)

