---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Java, Services, API/Script]
keyword: [content repository, File Folders service]
---

# File Folders service

The File Folders service manages nodes for modeling files and folders in the repository. The service provides methods to create and update nodes and define the relationships between them.

The File Folders service supports the following methods:

-   **`Create`**

    Create nodes, set property values, and create associations between nodes.


-   **`Read`**

    Read node properties and content, read and navigate node associations.


-   **`Update`**

    Update properties and content of nodes.


-   **`Delete`**

    Delete nodes. If the archive store is enabled, the node is not deleted but moved from its current node to the archive node store; nodes in the archive store can then be restored or purged.


**Parent topic:**[Content repository services](../concepts/serv-repo-about.md)

