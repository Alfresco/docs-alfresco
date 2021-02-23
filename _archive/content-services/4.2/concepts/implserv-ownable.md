---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Ownable service, security]
---

# Ownable service

This topic describes the features of ownable service and how to configure it.

The idea of file ownership is present in both UNIX and Windows. In Alfresco, the repository has the concept of node ownership. This ownership is optional and is implemented as an aspect.

The owner of a node may have specific ACLs granted to them. Ownership is implemented as the dynamic authority, ROLE\_OWNER, and is evaluated in the context of each node for which an authorization request is made. The Ownable aspect, if present, defines a node’s owner by storing a userName; if the Ownable aspect is not present, the creator is used as the default owner. If the userName of the current user matches, including case, the userName stored as the owner of the node, the current user will be granted all permissions assigned to the authority ROLE\_OWNER.

The `OwnableService` is responsible for all of the following:

-   Determining the owner of a node
-   Setting the owner of a node
-   Determining if a node has an owner
-   Allowing the current user to take ownership of a node

The `OwnableService` is supported by an Ownable aspect defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\contentModel.xml.

There are permissions and permission groups associated with the Ownable aspect in the permission model and related access controls applied to the methods on the public `OwnableService`.

**Parent topic:**[Implementation and services](../concepts/secur-implserv.md)

