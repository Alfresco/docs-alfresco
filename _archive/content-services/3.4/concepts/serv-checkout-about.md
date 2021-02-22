---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Check Out / Check In, Services, Document Management]
keyword: Check Out / Check In
---

# Check Out / Check In service

Check Out and Check In services control updates to document and prevent unwanted overwrites.

Checking out a document locks it, preventing other users writing changes to it. Only one user can have a particular document checked out \(locked\) at any time. Checking in a document or canceling the check out unlocks the document.

Check Out and Check In can be used with or without versioning. If versioning is not enabled on a node \(the `versionable` aspect is not present on the node\), the check in overwrites the existing node and releases the lock unless the`keepCheckedOut` flag is used. With versioning enabled on the node, a new version is always created.

**Parent topic:**[Content repository services](../concepts/serv-repo-about.md)

