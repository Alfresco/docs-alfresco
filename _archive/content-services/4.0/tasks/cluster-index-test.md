---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: index clustering
---

# Index clustering

This section describes the steps used to test index clustering.

1.  On M1, login as user admin.

2.  Browse to the Guest Home space, locate the tutorial PDF document and view the document properties.

3.  On Mx, login as admin.

4.  Browse to the Guest Home space, locate the tutorial PDF document and view the document properties.

5.  On M1, modify the tutorial PDF description field, and add abcdef.

6.  On Mx, refresh the document properties view of the tutorial PDF document.

7.  The description field must have changed to include abcdef.

8.  On M1, perform an advanced search of the description field for `abcdef` and verify that the tutorial document is returned.

9.  On Mx, search the description field for `abcdef`. Allow time for index tracking \(10s or so\), and the document will show up in the search results.


**Parent topic:**[Verifying the cluster](../concepts/cluster-test-intro.md)

