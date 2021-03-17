---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [access control, security]
---

# Modifying access control

Modifying access control may involve:

-   Changing the definition of existing security interceptors to check for different conditions
-   Adding new public services and related security interceptors
-   Defining new types and aspects and their related permissions
-   Adding new definitions to the security interceptor by implementing an ACEGI AccessDecisionVoter and/or AfterInvocationProvider \(in extreme cases\)

A few constraints and design patterns should be observed when modifying access control. Permissions apply to the node as whole. In particular, the same Read rights apply to all properties and content. You should check that methods can be executed and not that a user has a particular permission. The access control restrictions for a public service method may change. Follow the design pattern to implement RBAC roles.

When modifying access control, do not try to split ReadProperties and ReadContent. This does not make sense for search. A node and all of its properties, including content, are indexed as one entity. Splitting the evaluation of access for content and properties is not possible. Search would have to apply both criteria so as to not leak information. Other services, such as copy, may not behave as expected or may produce nodes in an odd state.

Permissions are assigned at the node level, not at the attribute level. Again, this makes sense with the search capabilities. Search results need to reflect what the user performing the search can see. It makes sense that all properties have the same Read access as the node, as nodes are indexed for searching and not individual properties. Applying Read ACLs at the property level would require a change to the indexing implementation or a complex post analysis to work out how nodes were found by the search. If not, the values of properties could be deduced by how a readable node was found from a search on restricted properties.

Fine grain attribute permissions could be implemented by using children nodes to partition metadata. Queries would have to be done in parts and joined by hand, as there is no native support for SQL-like join.

Check that method execution is allowed and not that the user has a fixed permission. Rather than checking for Read permission in code, check that the appropriate method can be called using the PublicServiceAccessService bean. This avoids hard coding to a specific permission implementation and is essential if you intend to mix records management and the content repository. In any case, the access restrictions for public service methods may change. The PublicServiceAccessService bean allows you to test if any public service method can be invoked successfully with a given set of arguments. It checks all the entry criteria for the method and, assuming these have not changed, the method can be called successfully. The method call may still fail if the conditions for the returned object are not met or some security configuration has changed, such as an ACE is removed, a user is removed from a group, or the method fails for a non-authorization reason.

For those coming from an RBAC background, Alfresco has roles in the RBAC sense only for limited internal use. To implement RBAC in Alfresco, use zoned groups. These groups will not appear in the administration pages of the Alfresco Explorer and Alfresco Share web clients as normal groups \(unless you also add them to the APP.DEFAULT zone\) but can be used to assign users and groups to roles. This approach has been taken in Alfresco to support roles in Alfresco Share and records management. To map RBAC terminology to Alfresco: operations map to method calls on public service beans, objects map to method arguments including nodes \(folders, documents, and so on\). Users and permissions/privileges map directly. Alfresco allows the assignment of permissions to users or groups.

By default, the owner of an object can manage any aspect of its ACL. Users with ChangePermissions rights for a node can also change its ACL. If users have the ability to alter the ACL associated with an object, they can allow other users to do the same. There is no restriction on the permissions they may assign. The Alfresco model supports liberal discretionary access control with multi-level grant. A user who can grant access can pass on this right without any restriction. In addition, anyone who can change permissions can carry out the revocation of rights: it is not restricted to the original granter. Normally, when someone can perform an operation you would not expect it is because they own the node and therefore have all permissions for that node.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

