---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [book, security, developer]
---

# People and users

When a user logs in, Alfresco validates the user’s identifier and password. Alfresco uses the identifier to look up the appropriate person details for the user, using the `userName` property on the Person type. You can configure this look-up to be case sensitive or case insensitive. The `userName` property on the matching Person node is used as the actual user authority; it may differ in case from the user identifier presented to the authentication system. After the Person node look-up, Alfresco is case sensitive when matching authorities to permissions, group membership, roles, and for all other authorization tests.

Any user, who authenticates by any mechanism, must have an associated person node in Alfresco. Person nodes may be:

-   Explicitly created
-   Created on demand with some default entries
-   Created from LDAP synchronization

Person nodes are explicitly created when using the administration pages of the Alfresco Explorer and Alfresco Share web clients to manage users.

By default, person nodes are auto-created if not present. If an external authentication system is configured, such as NTLM, when any user authenticates, an appropriate person node may not exist. If a person node does not exist and auto-creation is enabled, a person node will then be created using the identifier exactly as presented by the user and validated by the authentication system. The auto-created Person node’s userName will have the same case as typed by the user. LDAP synchronization will create person nodes with the userName, as provided from the LDAP server.

It is possible that LDAP synchronization can change the userName associated with a Person node. For example, this can happen with a system that uses NTLM authentication, LDAP synchronization, or a system that creates person nodes on demand, or uses case-insensitive authentication. For example, Andy could log in as “Andy” and the associated Person node is created with the userName “Andy.” Later, the LDAP synchronization runs and changes the userName to “andy”.

From version 3.2, changes to Person node userNames will cause updates to other related data in Alfresco, such as ACL assignment.

**Parent topic:**[Authorities](../concepts/secur-authorities.md)

