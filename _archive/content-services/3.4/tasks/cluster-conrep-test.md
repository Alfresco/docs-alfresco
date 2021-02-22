---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: content replication sharing testing
---

# Testing content replication and sharing

This section describes the steps used to test content replication and sharing.

1.  On M1, add a text file to Guest Home containing `abcdef`.

2.  Refresh the view of Guest Home and verify that the document is visible.

3.  On Mx, perform a simple search for `abcdef` and ensure that the new document is retrieved.

    **Note:** This relies on index tracking, so it may take a few seconds for the document to be visible.

4.  Open the document and ensure that the correct text is visible.


**Parent topic:**[Verifying the cluster](../concepts/cluster-test-intro.md)

