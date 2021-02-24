---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: Jive
---

# Alfresco Jive Toolkit access control and identity

The Alfresco and Jive Access Control \(ACL\) models differ in their level of granularity, so access control to the documents can be complicated. Jive’s access control is primarily Community-centric \(that is, it is defined and enforced at the level of the Community\), whereas Alfresco has a fine-grained, per-node \(file or folder\) ACL mechanism.

The Jive Toolkit will initially create the document in both systems in such a way that the ACLs are in sync, but modification of those ACLs in either system will not be replicated to the other system. Direct manipulation of the document ACLs in Alfresco may cause errors in Jive \(that is, users who can see the document in the Jive UI, but are unable to download it\).

For Alfresco and Jive to agree on the principal set, the initial version of the Jive Toolkit requires that both Alfresco and Jive are configured to use the same LDAP repository for user identity and authentication.

**Parent topic:**[Alfresco Jive integration overview](../concepts/jive-overview.md)

