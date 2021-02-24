---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# File Plan structure

Each user is given a role that may or may not grant them permission to create the File Plan structure. You can file records and create the structure within the File Plan level in which you have permission. Permissions are set in the Records Management Console.

-   Users with the *Create Modify Destroy File Plan Metadata* capability are allowed to create record categories. This capability is typically granted to Records Managers and Administrators of the system.
-   Users with the *Create Modify Destroy Folders* capability are allowed to create record folders. This capability is often given to power users, local records officers, and so on. These users are allowed to create and manage record folders, and also records, within the File Plan.

The structure levels  record categories and record folders  are containers in which you can put a collection of records management artifacts.

When you create a container, the system records the date of creation and the user creating the object. This information is recorded in the object's metadata. Depending on the container being created, the system may mandate certain other metadata. Record categories, for example, carry the most metadata, as they hold the disposition instructions for the whole category.

The following rules are enforced when working with the File Plan structure:

-   The top level of the File Plan can only contain record categories.
-   A category can contain other categories and folders.
-   A folder can contain only records.

-   **[Adding a new record category](../tasks/rm-recordcategory-add.md)**  
You can create a record category at the top level in the File Plan or within another record category.
-   **[Adding a record folder](../tasks/rm-recordfolder-add.md)**  
You can create a record folder only within a record category.
-   **[Adding items to the File Plan](../tasks/rm-fileplan-additems.md)**  
You can only add a record to a record folder.
-   **[Adding record metadata](../tasks/rm-metadata-add.md)**  
Each record has a default set of metadata. You have the option of adding additional metadata fields specific to the record type. You can associate the record with a specific type when you upload it to the File Plan or you can add the metadata after, which this task describes.
-   **[Editing record metadata](../tasks/rm-metadata-edit.md)**  
Before you can declare a record, you must enter details about the record in the metadata. The metadata is extracted and required when the document is filed.
-   **[Declaring a record](../tasks/rm-record-declare.md)**  
A content item isn't automatically considered to be a record. An uploaded item is considered to be part of the Records Management system only after it has been declared as a record.

**Parent topic:**[Using Records Management](../concepts/rm-intro.md)

