---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: node browser
---

# Using the Node Browser

The Node Browser is a debugging aid that allows you to browse the raw Alfresco repository structure. This feature is intended for developers responsible for customizing the application.

This is a read-only feature with basic search capability.

1.  Open the Admin Console, and then click **Node Browser**.

    By default, the search criteria `PATH:"/"` is shown in the field. This shows the results for the `workspace://SpacesStore` repository store.

2.  Click the **Select Store** list to select a store in the repository.

    Each store is an area of the repository. The nodes contained within each store are organized hierarchically. The node displayed is the root node of the selected store.

3.  Search the selected store:

    1.  Select the search type:

        -   **noderef**
        -   **xpath**
        -   **jcr-xpath**
        -   **lucene**
        -   **fts-alfresco**
        -   **cmis-strict**
        -   **cmis-alfresco**
        The default is **fts-alfresco**.

    2.  Enter the search criteria in the field.

        Use the search syntax relevant for your chosen search type.

    3.  Click **Search**.

4.  Click the reference link to browse the details.

    The details of the properties, aspects, children, parents, associations, source associations, and permissions are displayed for the node.

5.  Click Back to Search to browse another node.


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

