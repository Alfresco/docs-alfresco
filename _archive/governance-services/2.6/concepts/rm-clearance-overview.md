---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# How security clearance works

Security clearance is the assignment of security marks to users.

Once marks are applied to content then users can only see that content if they have the required security clearance.

**Note:** Standard [Alfresco permissions](http://docs.alfresco.com/5.1/references/permissions_share.html) and [Records Management permissions](../tasks/rm-set-permissions.md) continue to apply as well as any security clearance.

When security groups are created there are three different Group Types available, and each one controls how the user sees content, see [How security controls work](rm-sc-overview.md).

Users with Alfresco Administrator permissions can [set and edit the security clearance of users and user groups](../tasks/rm-assign-sc.md).

When assigning marks to users or user groups, marks that are inherited from another group aren't shown. Only marks that are assigned directly to this user / group are displayed. If a user \(or group\) has inherited security marks from a group, then these are added to their directly assigned marks.

**Hierarchy based security clearance**

For hierarchy based security groups such as the prefined Classification group, a user who is assigned one mark and inherits another has the clearance of the higher of the two. For example, a user who has Confidential clearance directly assigned, and has inherited Top Secret clearance from a group, will have Top Secret Clearance.

**Non-hierarchy based security clearance**

For non-hierarchy based security groups the security marks are added together, so that a user who is directly assigned the UK mark, and inherits the US mark from a group, will have clearance for both UK and US marked files.

**Parent topic:**[Security controls and classification](../concepts/rm-security.md)

