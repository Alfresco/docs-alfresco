---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [public services, security]
---

# Public services configuration

Security is enforced in the Spring configuration by defining proxies for each internal service implementation and adding a method interceptor to enforce security for each public service proxy.These interceptors also have other roles. When a method is called on a public service, the security interceptor is called before the method it wraps. At this stage, the interceptor can examine the function arguments to the method and check that the user has the appropriate rights for each argument in order to invoke the method. For example, a method delete\(NodeRef nodeRef\) exists on the node service. The security interceptor can see the nodeRef argument before the underlying delete\(...\) method is called. If configured correctly, the interceptor could check that the current user has "Delete" permission for the node. If they do not have the permission, a security exception is raised. If all the entry criteria are met, the method goes ahead.

In a similar manner, after a method has executed the interceptor can examine the returned object and decide if it should return it to the caller. For example, a search method could return a list of nodes. The security interceptor could filter this list for only those nodes for which the current user has Read permission.

It is also possible to configure a method so that it can be called by all users, only by users with the admin role, or only by specific users or groups. This can also be enforced by the security method interceptor.

Access control interceptor definitions for public services are included in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml along with any other supporting beans. This configuration file also defines the location from which the permission model is loaded. The interceptors are wired up to the public services in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-context.xml. The public services are the only Spring beans to have access control.

**Parent topic:**[Public services](../concepts/secur-public-service.md)

