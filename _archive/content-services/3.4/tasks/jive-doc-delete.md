---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: [Jive, Toolkit]
---

# Deleting a document in Jive and Alfresco

This sections describes the procedure for deleting documents that have been socialized between Alfresco and Jive.

When a document is socialized to Jive, the Jive Toolkit prevents it from being deleted in Alfresco unless it has already been permanently deleted in Jive. This also applies if you try to delete a file using CIFS or WebDAV. 

Follow this procedure to ensure that a document is deleted completely in both Alfresco and Jive:

1.  Delete the document in Jive.

    The document may be deleted by any user in Jive.

2.  Permanently delete the document in Jive.

    This step can be completed only as the Jive administrator. For more information on permanently deleting a document, see the Jive documentation.

3.  Locate the corresponding document in Alfresco.

4.  Delete the document in Alfresco.


The Jive Toolkit does not automatically synchronize deletes between Jive and Alfresco because there may be situations where the document may be removed from Jive, but must be retained in Alfresco \(such as for compliance reasons\).

**Parent topic:**[Using the Alfresco Jive Toolkit](../concepts/jive-using.md)

