---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Developer]
keyword: [overview, authentication]
---

# Setting up Alfresco authentication and security

The first time you access a vanilla Alfresco installation through Alfresco Explorer, Alfresco identifies you as a ‘guest’ user. You can identify yourself as another user by clicking the Login link and entering a new user name and password in the Login window. If you log in with the credentials of a user with administrator privileges \(Alfresco uses admin as the default user name and password\), you can use the Administration Console to create additional users and assign them passwords.

In this out-of-the-box set up, you can manage the user base and their passwords manually from within Alfresco, and unauthenticated users still have limited access as the ‘guest’ user.

From here, there are a number of common customizations you might want to make to scale up to the needs of a larger enterprise. For example, you might want to:

-   Disable unauthenticated guest access
-   Enable automatic sign-on using operating system credentials or a Single Sign-On \(SSO\) server to remove the need for a Login page
-   Delegate authentication responsibility to a central directory server to remove the need to set up users manually in the Administration Console

-   **[Alfresco security](../concepts/secur-about.md)**  
Alfresco security comprises a combination of authentication and authorization.
-   **[Authentication subsystems](../concepts/auth-subsystem-intro.md)**  
Authentication is one of the categories of the Alfresco subsystem. An authentication subsystem is a coordinated stack of compatible components responsible for providing authentication and identity-related functionality to Alfresco.
-   **[Configuring authentication](../concepts/auth-config-examples.md)**  
A number of examples demonstrate how to express various authentication configuration requirements in subsystem instances in the authentication chain. They also explain how the authentication chain integrates the functions of multiple subsystem instances into a more powerful conglomerate, letting you cater for even the most complex authentication scenarios.
-   **[Authorities](../concepts/secur-authorities.md)**  
Authorities are people \(or persons\) or groups.
-   **[Defining permissions](../concepts/secur-permissions.md)**  
 Permissions and their groupings are defined in an XML configuration file. The default file is found in the distribution configuration directory as <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\permissionDefinitions.xml. This configuration can be replaced or extended and has a structure as described in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\permissionSchema.dtd.
-   **[Access Control Lists](../concepts/secur-acl.md)**  
An Access Control List \(ACL\) is an ordered list of Access Control Entries \(ACEs\). An ACE associates a single authority to a single permission group or permission, and states whether the permission is to be allowed or denied. All nodes have an associated ACL. There is one special, context-free, ACL defined in the XML configuration to support global permissions. An ACL specifies if it should inherit ACEs from a parent ACL. The parent ACL is associated with the primary parent node. When a new node is created it automatically inherits all ACEs defined on the parent within which it is created. Linking a node to a secondary parent has no effect on ACE inheritance; the node will continue to inherit permission changes from its primary parent \(defined when it was first created\).
-   **[Modifying access control](../concepts/secur-acl-modifying.md)**  
Modifying access control may involve:
-   **[Access Control Extension](../concepts/secur-acl-extension.md)**  
The Access Control model is used for all nodes in the content repository except those related to the Records Management extension. Records Management is used as an example here to outline how to extend access control.
-   **[Public services](../concepts/secur-public-service.md)**  
Security is enforced around public services. Web services, web scripts, Alfresco Explorer and Alfresco Share, CIFS, WebDAV, FTP, CMIS, and more, all use public services, and therefore include security enforcement. Public services are defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-context.xml.
-   **[Implementation and services](../concepts/secur-implserv.md)**  
The following key services are involved in access control:

**Parent topic:**[Administering](../concepts/ch-administering.md)

