---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
---

# Alfresco security

Alfresco security comprises a combination of authentication and authorization.

Authentication is about validating that a user or principal is who or what they claim to be. Alfresco normally refers to users. A user’s credentials can take many forms and can be validated in a number ways. For example, a password validated against an LDAP directory, or a Kerberos ticket validated against a Microsoft Active Directory Server.

Alfresco includes:

-   An internal, password-based, authentication implementation
-   Support to integrate with many external authentication environments
-   The option to write your own authentication integration and to use several of these options simultaneously

Alfresco can integrate with LDAP, Microsoft Active Directory Server, the Java Authentication and Authorization Service \(JAAS\), Kerberos, and NTLM. A user ID can also be presented as an HTML attribute over HTTPS to integrate with web-based single-sign-on solutions.

Authorization determines what operations an authenticated user is allowed to perform. There are many authorization models. Popular ones include: Role Based Access Control \(RBAC\), UNIX-style Access Control Lists \(ACLs\) and extended ACLs, Windows-style ACLs, and many more. Authorization requirements for the management of records are more detailed and include additional requirements, for example, enforcing access based on security clearance or record state.

Alfresco authorization is based on UNIX-extended ACLs. Each node in the repository has an ACL that is used to assign permissions to users and groups. Operations, such as creating a new node, describe what permissions are required to carry out the operation. ACLs are then used to determine if a given user may execute the operation based on the permissions that have been assigned directly to the user or indirectly through a group. An operation in Alfresco is invoking a method on a public service bean. For example, creating a user’s home folder requires invoking methods on several public services; to create the folder, set permissions, disable permission inheritance, and so on. Each public service method invocation will check that the user is allowed to execute the method.

By convention, public service beans are the beans whose names start with capital letters, such as the NodeService. You configure the security requirements for public service beans in XML. A given method on a particular service may be available to all users, all users in a specified group, all users with a specified role, or users who have particular permissions on specified arguments to the method or its return value. In addition, for methods that return collections or arrays, their content may be filtered based on user permissions. If the authorization requirements for a method call are not met, the method call will fail and it will throw an AccessDeniedException. Non-public beans, such as nodeService, do not enforce security; use these only when the enforcement of authorization is not required.

Permission assignments are made in Access Control Lists \(ACLs\), which are lists of Access Control Entries \(ACEs\). An ACE associates an authority \(group or user\) with a permission or set of permissions, and defines whether the permission is denied or allowed for the authority. Every node has a related ACL. When you create a node, it automatically inherits an ACL from its parent. You can alter this behavior after node creation by breaking inheritance or modifying the ACL.

The XML configuration for permissions also defines a context-free ACL for ACEs that apply to all nodes. For example, you could use this to assign everyone Read access to all nodes regardless of what individual ACLs any node has set. \(See the Permissions section in this chapter for more details on how to modify the permission model.\)

```
<!-- Extension to alfresco\model\permissionDefinitions.xml -->
<globalPermission permission="Read" authority="GROUP_EVERYONE" />
```

A check that a user has Read permission for a node is done in two stages. First, the context-free ACL is checked to see if it allows access. If not, the ACL assigned or inherited by the node is checked. A user may be allowed to perform an operation because of permissions assigned to the context-free ACL, assigned to the node’s ACL, inherited by the node from its parent, or a combination of all three.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

