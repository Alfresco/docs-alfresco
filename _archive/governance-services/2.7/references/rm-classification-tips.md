---
author: Alfresco Documentation
audience: [, ]
---

# Classification rules and tips

When you classify content there are a few rules that help you maintain secure classification.

**Security clearance and permissions**

If a user doesn't have the required security clearance, then they won't be able to see record, folders, or categories that have been classified. For example, if a record has been classified as Top Secret, then:

-   User 1 \(Top Secret clearance\) - can see and work with the record, following the usual [Alfresco permission rules](http://docs.alfresco.com/5.2/references/permissions_share.html).
-   User 2 \(Confidential clearance\) - doesn't see the record.

To classify records, folders, or categories:

-   You must have permissions to edit them. This means having a Read and File permission on them.
-   You must have been given a security clearance higher than No Clearance \(unless the item is set as Unclassified\).

You also can't classify items higher than your own security level. So if your classification clearance is Confidential, you can't classify a record as Top Secret.

CAUTION:

Users with Admin permissions can classify repository top level folders such as the Data Dictionary and Sites. It's recommended to *not* do this to avoid potential issues for other users.

**Classifying folders and categories**

When you classify folders and categories, there may be restrictions on the levels you can set if they contain content that has already been classified. As such you might want to consider classifying folders and categories before you classify their content. The rules are:

-   Items can't be classified higher than the folder or category they are in \(not applicable if the folder or category hasn't been classsified\).
-   A folder or category can't be classified lower than any items it contains.
-   Classified items can't be moved, copied, or linked to folder or categories lower than their classification.

**Parent topic:**[Classifying records, record folders, and record categories](../tasks/rm-classify-record.md)

