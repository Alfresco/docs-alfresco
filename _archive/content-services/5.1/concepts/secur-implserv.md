---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [public services, Access Control services, security]
---

# Implementation and services

Alfresco enforces security services for managing authentication information.

The following key services are involved in access control:

-   `AuthenticationService`: responsible for authenticating user name and password.
-   `PersonService`: responsible for obtaining a reference to the `Person` node for a given user name. It also creates, deletes and updates personal information.
-   `AuthorityService`: responsible for managing authorities.
-   `PermissionService`: responsible for managing ACLs and ACEs, and for checking if a user has been assigned a permission for a particular node.
-   `OwnableService`: manages object ownership and is used in evaluation the dynamic ROLE\_OWNER authority.

Let's consider a possible scenario to understand how the security services work. A user logs in to Alfresco using the *authentication service*, which determines the user's authorities, such as their user name \(which is a USER authority\). The *authority service* adds and manages the relevant groups and roles. The *permission service* maps those users, groups and roles to operations on particular nodes. It also controls the inheritance of permissions and provides a common set of default permissions. The *owner service* is related to the special `OWNER` role and it determines the owner of a node. The *person service* deals with the special case of person nodes, which identify users in Alfresco.

The protection of public services methods is implemented using the Spring method interceptors defined as part of the related ACEGI 0.8.2 security package. The Alfresco implementation adds new implementations of the ACEGI interfaces `AccessDecisionVoter` and `AfterInvocationProvider`, which support the configuration elements that have already been described \(for example, ACL\_NODE.<\#\>.<permission\>\). These extension classes make use of the key services.

-   **[Authentication service](../concepts/implserv-authentication.md)**  
Use this information to understand and configure authentication service.
-   **[Person service](../concepts/implserv-person.md)**  
Use this information to understand and configure of person service.
-   **[Authority service](../concepts/implserv-authority.md)**  
Use this information to understand and configure authority service, using the authority-services-context.xml file.
-   **[Permission service](../concepts/implserv-permiss.md)**  
Use this information to understand and configure permission service.
-   **[Ownable service](../concepts/implserv-ownable.md)**  
Use this information to understand and configure ownable service.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

