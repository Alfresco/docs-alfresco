---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
---

# Using the Node Browser

Use Node Browser in the Admin Console or in Share Admin Tools as an debugging aid to browse the raw Alfresco repository structure. This feature is intended for developers responsible for customizing the application.

This is a read-only feature with basic search capability.

1.  Open the Admin Console.

2.  In the **Support Tools** section, click **Node Browser**. You see the **Node Browser Console** page.

3.  In the **Store** section, select the store of interest:

    -   user://alfrescoUserStore
    -   system://system
    -   workspace://lightWeightVersionStore
    -   workspace://version2Store
    -   archive://SpacesStore
    -   workspace://SpacesStore
    Each store is an area of the repository and within each store, the nodes of that store are organized hierarchically. The node displayed is the root node of the selected store.

4.  Click **Root List**.

    The **Node Browser** page displays details of the properties, aspects, children, parents, associations, source associations, and permissions for the selected node.

5.  Search the selected store, as needed:

    1.  Select the search type: `noderef`, `fts-alfresco`, `lucene`, `xpath`, `selectnodes`, `cmis-strict`, `cmis-alfresco`, `db-afts`, `db-cmis`.

    2.  Enter the search criteria in the field provided.

    3.  Click **Execute**.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

## Using the Node Browser in Share Admin Tools

1.  Click **Admin Tools**, and then click **Node Browser**.

    By default, the search criteria `PATH:"/"` is shown in the Node Browser field for the `workspace://SpacesStore` repository store. Each store is an area of the repository. The nodes contained within each store are organized hierarchically. The node displayed is the root node of the selected store.

    The default search type is set to **fts-alfresco**. For most administrative tasks, you can use the default search type. See [Alfresco Full Text Search reference](../concepts/rm-searchsyntax-intro.md) for more detail.

2.  Enter your search criteria in the Note Browser field.

3.  Click **Search**.

4.  Click the link in the **Reference** column to browse the details.

    The details of the properties, aspects, children, parents, associations, source associations, and permissions are displayed for the node.

5.  Click **Back to Search** to browse another node.


You can use another search syntax by choosing one of the following types from the **Search** list:

-   **storeroot**
-   **noderef**
-   **xpath**
-   **fts-alfresco**
-   **cmis-strict**
-   **cmis-alfresco**
-   **db-afts**
-   **db-cmis**

