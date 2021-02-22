---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Public services, security]
---

# Public services

Security is enforced around public services. Web services, web scripts, Alfresco Explorer and Alfresco Share, CIFS, WebDAV, FTP, CMIS, and more, all use public services, and therefore include security enforcement. Public services are defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-context.xml.

Access control allows or prevents users or processes acting on behalf of a user, from executing service methods on a particular object by checking if the current user, or any of the authorities granted to the current user, has a particular permission or permission group, or that the user has a particular authority.

For example, on the NodeService bean, the `readProperties` method checks that the current user has Read permission for the node before invoking the method and returning the node’s properties. On the SearchService query method, the results are restricted to return only the nodes for which a user has Read permission.

-   **[Public services configuration](../concepts/secur-config-about.md)**  
Security is enforced in the Spring configuration by defining proxies for each internal service implementation and adding a method interceptor to enforce security for each public service proxy.
-   **[Method-level security definition](../concepts/secur-methodlevel-define.md)**  
The beans required to support Spring ACEGI-based security around method invocation are defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml. This configures two Alfresco-specific beans: A voter that can authorize method execution based on the permissions granted to the current user for specific arguments to the method, and an after invocation provider to apply security to objects returned by methods.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

