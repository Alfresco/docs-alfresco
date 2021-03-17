---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
---

# Admin Console: Node Browser

The administrator can use the Node Browser console as an debugging aid to browse the raw Alfresco repository structure. This feature is intended for developers responsible for customizing the application.

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


**Parent topic:**[Admin Console: Support Tools](../concepts/adminconsole-supporttools.md)

**Parent topic:**[Admin Console: Support Tools](../concepts/adminconsole-supporttools.md)

