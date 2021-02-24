---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Tutorial
option: 
---

# Save a document to the Document Workspace

Now that you have created the Document Workspace, you can save Word documents directly to it.

To save a Word document to the Document Workspace:

1.  In Word, create a new document and enter some text.

2.  Click the Microsoft Office button and select **Save**.

3.  Enter http://<Alfresco server URL:7070\>/alfresco/SPP/documentLibrary/spp-tutorial.docx as the **File name**.

    The URL takes the following form:

    http://<Alfresco server:7070\>/alfresco/<site URL name\>/documentLibrary/<folder structure\>/<filename\>

    -   **<Alfresco server:7070\>**

        Server and port where Alfresco is installed and running

    -   **alfresco**

        Alfresco’s SharePoint Protocol Support name; must be used with all URLs

    -   **<site URL name\>**

        URL name of the Document Workspace \(Share site\) where the document is being saved

    -   **documentLibrary**

        Document Library page component indicator; this is required

    -   **<folder structure\>**

        Path and destination folder when a folder structure has been established within the site’s library; there is no folder structure in the current example

    -   **<filename\>**

        Filename of the current document

4.  Click **Save**.

    Word saves the new document \(titled spp-tutorial.docx\) to the SPP Document Workspace. In Share, this is the document library of the specified Share site \(the site with the URL name SPP\).

5.  \(Optional\) To verify the saved document:

    1.  Click the Microsoft Office button and select **Server**, then **Document Management Information**.

    2.  Beneath the Document Workspace name \(SPP\), click **Open site in browser**.

    3.  Log in as User A \(userA, userA\).

        The SPP Site dashboard appears. The Recently Modified Documents dashlet now displays spp-tutorial.docx in addition to the two documents added in the first scenario.

    4.  Log out of Share and close the browser.


**Parent topic:**[Collaborate with colleagues on a document](../concepts/gs-spp-collaborate.md)

