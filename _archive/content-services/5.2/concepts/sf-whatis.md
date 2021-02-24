---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# What is a Smart Folder?

Use this information to understand the structure of Smart Folders.

This information is primarily aimed at business analysts, and system administrators.

A Smart Folder displays the results of a query in a folder format. It is “smart”, because there is no physical folder to represent it in the repository and the results are created dynamically. For example, a Smart Folder called My video files might be created to contain all files that I created that have a video format. Every time I open the My video files folder, the search query is run, and all my video files are available in that folder, wherever in the repository I have created them.

The diagram shows a physical file system, and how a Smart Folder structure is created to contain files relevant to a particular customer: ![Physical repository shown on the left with folders and files that relate to a customer.  These are brought together into a new Smart Folder structure in Alfresco](../images/sf-mapping.png)

Smart Folders are created when a Smart Folder Template is run. The Smart Folder Template contains:

-   A folder name
-   The query to be executed, when the folder is accessed by a user
-   An optional filing rule, so that a user can add a file to the Smart Folder \(and the file is filed according to the query for that folder\)
-   An optional list of properties that can be inherited by files or used for value propagation

Smart Folders have a limited set of actions:

-   Add/ Create: You can add files to a Smart Folder. The file is put into a physical folder, as specified by the filing rule.
-   Update: You can update files in a Smart Folder. Updating a property might result in a file being removed from the current Smart Folder \(because it no longer meets the query criteria\).
-   Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy actions for files are not supported.

The Smart Folder itself can't be edited in Alfresco Content Services, except through the Smart Folder Template. For more information about Smart Folder Templates, see [Applying a Smart Folder Template](../tasks/sf-using-aspects.md).

Physical folders can be displayed inside Smart Folders as long as the physical folder matches the query criteria.

-   **[Smart Folders terminology](../concepts/sf-terms.md)**  
Special terms used to describe Smart Folders.

**Parent topic:**[Configuring Smart Folders](../concepts/sf-intro.md)

