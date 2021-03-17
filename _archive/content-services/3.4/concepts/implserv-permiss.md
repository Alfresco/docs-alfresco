---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Permission service, security]
---

# Permission service

This topic describes the features of permission service and how to configure it.

The permission service is responsible for:

-   Providing well known permissions and authorities
-   Providing an API to read, set, and delete permissions for a node
-   Providing an API to query, enable, and disable permission inheritance for a node
-   Determining if the current, authenticated user has a permission for a node

The `PermissionService` interface defines constants for well-known permissions and authorities.

The default implementation coordinates implementations of two service provider interfaces: a `ModelDAO` and a `PermissionsDAO`. A permission is simply a name scoped by the fully qualified name of the type or aspect to which it applies. The beans are defined and configured in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml. This file also contains the configuration for security enforcement.

The `ModelDAO` interface defines an API to access a permissions model. The default permission model is in XML and defines permission sets, and their related permission groups and permissions. Global permissions are part of the permission model. There may be more than one permission model defined in XML; they are in practice merged into one permission model. A module can extend the permission model.

The available permissions are defined in the permission model. This is defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\permissionDefinitions.xml. This configuration is loaded in a bean definition in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml. This file also defines global permissions. The definition file is read once at application start-up. If you make changes to this file, you will have to restart the repository in order to apply the changes.

**Parent topic:**[Implementation and services](../concepts/secur-implserv.md)

