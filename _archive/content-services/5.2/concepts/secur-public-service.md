---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Public services, security]
---

# Public services

Security is enforced around public services. Web services, web scripts, Alfresco Share, CIFS, WebDAV, FTP, CMIS, and more, all use public services, and therefore include security enforcement.

Public services are defined in [public-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/public-services-context.xml).

Access control allows or prevents users or processes acting on behalf of a user, from executing service methods on a particular object by checking if the current user, or any of the authorities granted to the current user, has a particular permission or permission group, or that the user has a particular authority.

For example, on the NodeService bean, the `readProperties` method checks that the current user has Read permission for the node before invoking the method and returning the node’s properties. On the SearchService query method, the results are restricted to return only the nodes for which a user has Read permission.

-   **[Public services configuration](../concepts/secur-config-about.md)**  
Security is enforced in the Spring configuration by defining proxies for each internal service implementation and adding a method interceptor to enforce security for each public service proxy.
-   **[Method-level security definition](../concepts/secur-methodlevel-define.md)**  
Method access is defined in the normal ACEGI manner with some additions.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

