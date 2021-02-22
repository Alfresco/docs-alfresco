---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Access Control Lists, ACL, ACE, security]
---

# ACL ordering and evaluation

The ACEs within an ACL are ordered and contain positional information reflecting how an ACE was inherited. DEFINING ACLs have entries at even positions; SHARED ACLs have entries at odd positions. For a DEFINING ACL, any ACEs defined for that ACL have position 0, any inherited from the parent ACL have position two, and so on. For a SHARED ACL, ACEs defined on the ACL from which it inherits will have position one.

When Alfresco makes permission checks, ACEs are considered in order with the lowest position first. Deny entries take precedence over allow entries at the same position. Once a deny entry is found for a specific authority and permission combination, any matching ACE, at a higher position from further up the inheritance chain, is denied. A deny for one authority does not deny an assignment for a different authority. If a group is denied Read permission, a person who is a member of that group can still be assigned Read permission using another group or directly with their person `userName`. However, if an authority is granted Read \(made up of `ReadContent` and `ReadProperties`\) and the same authority denied `ReadContent`, they will just be granted `ReadProperties` permission. The administration pages of Alfresco Explorer and Alfresco Share do not expose deny.

The default configuration is `any deny denies`. This is set by adding the following property to the alfresco-global.properties file:

```
security.anyDenyDenies=true  
```

You can alter the configuration to support `any allow allows`. This is set by adding the following property to the alfresco-global.properties file:

```
security.anyDenyDenies=false 
```

**Parent topic:**[Access Control Lists](../concepts/secur-acl.md)

