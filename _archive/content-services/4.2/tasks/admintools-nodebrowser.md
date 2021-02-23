---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Using the Node Browser

The Node Browser is a debugging aid that allows you to browse the raw Alfresco repository structure. This feature is intended for developers responsible for customizing the application.

This is a read-only feature with basic search capability.

1.  Click **Admin Tools**, and then click **Node Browser**.

    By default, the search criteria `PATH:"/"` is shown in the Node Browser field for the `workspace://SpacesStore` repository store. Each store is an area of the repository. The nodes contained within each store are organized hierarchically. The node displayed is the root node of the selected store.

    The default search type is set to **fts-alfresco**. For most administrative tasks, you can use the default search type. See [Alfresco Full Text Search reference](../concepts/rm-searchsyntax-intro.md) for more detail.

2.  Enter your search criteria in the Note Browser field.

3.  Click **Search**.

4.  Click the link in the **Reference** column to browse the details.

    The details of the properties, aspects, children, parents, associations, source associations, and permissions are displayed for the node.

5.  Click **Back to Search** to browse another node.


You can use another search syntax by choosing one of the following types from the **Search** drop-down list:

-   **storeroot**
-   **noderef**
-   **xpath**
-   **jcr-xpath**
-   **lucene**
-   **fts-alfresco**
-   **cmis-strict**
-   **cmis-alfresco**
-   **db-afts**
-   **db-cmis**

**Parent topic:**[Using the Alfresco Admin Tools](../concepts/admintools.md)

