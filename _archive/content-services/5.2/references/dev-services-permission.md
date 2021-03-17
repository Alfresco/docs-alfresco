---
author: [Alfresco Documentation, Alfresco Documentation]
---

# PermissionService

Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.

|Information|PermissionService|
|-----------|-----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The permission service is responsible for: -   Providing well known permissions and authorities
-   Providing an API to read, set, and delete permissions for a node
-   Providing an API to query, enable, and disable permission inheritance for a node
-   Determining if the current, authenticated user has a permission for a node

 The PermissionService interface defines constants for well-known permissions and authorities.

 The default implementation coordinates implementations of two service provider interfaces: a ModelDAO and a PermissionsDAO. A permission is simply a name scoped by the fully qualified name of the type or aspect to which it applies. The beans are defined and configured in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml. This file also contains the configuration for security enforcement.

 The ModelDAO interface defines an API to access a permissions model. The default permission model is in XML and defines permission sets, and their related permission groups and permissions. Global permissions are part of the permission model. There may be more than one permission model defined in XML; they are in practice merged into one permission model. A module can extend the permission model.

 The available permissions are defined in the permission model. This is defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\permissionDefinitions.xml. This configuration is loaded in a bean definition in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml. This file also defines global permissions. The definition file is read once at application start-up. If you make changes to this file, you will have to restart the repository in order to apply the changes.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/PermissionService.html)|
|Java example|```

                  
// Set permissions for a user on a node
permissionService.setPermission(nodeRef, "NameOfUser...", PermissionService.COORDINATOR, true);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Permissions platform extension point documentation](dev-extension-points-permissions.md)

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

