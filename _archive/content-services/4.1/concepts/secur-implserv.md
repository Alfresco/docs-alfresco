---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [public services, Access Control services, security]
---

# Implementation and services

The following key services are involved in access control:

-   PersonService
-   AuthorityService
-   PermissionService
-   OwnableService

The PersonService is responsible for obtaining a reference to the `Person` node for a given user name. It also creates, deletes and updates personal information. The AuthorityService are responsible for managing authorities. The PermissionService is responsible for managing ACLs and ACEs and for checking if a user has been assigned a permission for a particular node. The OwnableService manages object ownership and is used in evaluation the dynamic ROLE\_OWNER authority.

The protection of public services methods is implemented using Spring method interceptors defined as part of the related ACEGI 0.8.2 security package. The Alfresco implementation adds new implementations of the ACEGI interfaces AccessDecisionVoter and AfterInvocationProvider, which support the configuration elements that have already been described \(for example, ACL\_NODE.<\#\>.<permission\>\). These extension classes make use of the key services.

-   **[Authentication service](../concepts/implserv-authentication.md)**  
This topic describes the features of authentication service and how to configure it.
-   **[Person service](../concepts/implserv-person.md)**  
This topic describes the features of person service and how to configure it.
-   **[Authority service](../concepts/implserv-authority.md)**  
This topic describes the features of authority service. It also describes how to configure it using the authority-services-context.xml property file.
-   **[Permission service](../concepts/implserv-permiss.md)**  
This topic describes the features of permission service and how to configure it.
-   **[Ownable service](../concepts/implserv-ownable.md)**  
This topic describes the features of ownable service and how to configure it.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

