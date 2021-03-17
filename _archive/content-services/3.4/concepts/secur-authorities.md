---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [authorities, security]
---

# Authorities

Authorities are people \(or persons\) or groups.

A group may contain people or other groups as members. The authorities assigned to a user at any time are the userName from their associated Person node, all of the groups in which the user is a direct or indirect member, and any appropriate dynamic authorities. Dynamic authorities are used for internal roles.

-   **[Dynamic authorities and roles](../concepts/secur-DynAuthRoles.md)**  

-   **[People and users](../concepts/secur-peopleusers.md)**  
When a user logs in, Alfresco validates the user’s identifier and password. Alfresco uses the identifier to look up the appropriate person details for the user, using the `userName` property on the Person type. You can configure this look-up to be case sensitive or case insensitive. The `userName` property on the matching Person node is used as the actual user authority; it may differ in case from the user identifier presented to the authentication system. After the Person node look-up, Alfresco is case sensitive when matching authorities to permissions, group membership, roles, and for all other authorization tests.
-   **[Groups](../concepts/secur-groups.md)**  
Groups are collections of authorities with a name and display name.
-   **[Zones](../concepts/secur-zones.md)**  
All person and group nodes are in one or more zones. You can use zones for any partitioning of authorities. For example, Alfresco synchronization uses zones to record from which LDAP server users and groups have been synchronized. Zones are used to hide some groups that provide Role Based Access Control \(RBAC\) role-like functionality from the administration pages of the Alfresco Explorer and Alfresco Share web clients. Examples of hidden groups are the roles used in Alfresco Share and Records Management \(RM\). Only users and groups in the default zone are shown for normal group and user selection on the group administration pages. Zones cannot be managed from the administration pages of Alfresco Explorer and Alfresco Share.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

