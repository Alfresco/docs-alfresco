---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Services, Java]
option: content repository services
---

# Content repository services

Content repository services are the fundamental services for working with content in Alfresco. Content repository services are written in Java.

Content repository services are built on the storage and query engines. As with the engines, the same infrastructure is shared. The concept of users and groups is introduced into these services, such as recording the author of content, who has content locked or access to content. Implementation of the standards-defined services is packaged into the Alfresco content repository.

Out-of-the-box content repository services provide capabilities to:

-   Organize and manage content
-   Control versions
-   Record changes and updates
-   Enforce security
-   Model content types
-   Search for information in the repository

-   **[File Folders service](../concepts/serv-filefolder-about.md)**  
The File Folders service manages nodes for modeling files and folders in the repository. The service provides methods to create and update nodes and define the relationships between them.
-   **[Versioning service](../concepts/serv-version-about.md)**  
The Versioning service manages versions of individual content nodes. To enable versioning behavior, you must apply the `versionable` aspect to the node.
-   **[Check Out / Check In service](../concepts/serv-checkout-about.md)**  
Check Out and Check In services control updates to document and prevent unwanted overwrites.
-   **[Audit service](../concepts/serv-audit-about.md)**  
The Audit service provides a configurable record of actions and events. It collects information and stores it in a simple database form.
-   **[Authority service](../concepts/serv-authority-about.md)**  
The Authority service supports the creation and updating of users and groups.
-   **[Permission service](../concepts/serv-permission-about.md)**  
 The Permission service supports methods relating to various permissions.
-   **[Person service](../concepts/serv-person-about.md)**  
 The Person service supports various methods relating to users.
-   **[Dictionary service](../concepts/serv-dictionary-about.md)**  
The Dictionary service supports methods to access and view content models and their definitions.
-   **[Search service](../concepts/serv-search-about.md)**  
The Search service provides methods for querying the repository and returning a filtered collection of nodes based on a user’s permission.

**Parent topic:**[Alfresco content services](../concepts/serv-about.md)

