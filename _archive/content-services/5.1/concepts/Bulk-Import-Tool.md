---
author: Alfresco Documentation
---

# Using the Bulk Import tool

The Bulk Import tool provides a mechanism for Systems Administrators to import existing content in bulk into a repository from the Alfresco server's file system.

It \(optionally\) replaces existing content items if they already exist in the repository, but does not delete. It is not designed to fully synchronize the repository with the local file system. 

The basic on-disk file/folder structure is preserved as it is in the repository. It is possible to load metadata for the files and spaces being ingested, as well as a version history for files \(each version consists of content, metadata, or both\).

There are two types of bulk import:

-   Streaming import: this copies the source content into the repository content store.
-   In-place import: Available in Enterprise Only, these files are assumed to already exist within the repository content store, so no copying is required. This can result in a significant improvement in performance.

There are a number of restrictions:

-   Only one bulk import can be running at a time. This is enforced by the `JobLockService`.
-   Access to the Bulk Import tool is restricted to Alfresco administrators.
-   There is a path/file length limitation of 255 characters for imported files. This limitation applies when using either in-place or streaming Bulk Import.

-   **[In-place bulk import](../concepts/bulk-import-in-place.md)**  
The in-place bulk import feature imports files that already exist within the repository content store. As no copying is required, this gives significant performance improvements.
-   **[Preparing the file system](../concepts/bulk-import-prepare-filesystem.md)**  
There are a number of tasks you must do to prepare the file system before you do the bulk import.
-   **[Importing with the Bulk Import tool](../concepts/bulk-import-importing.md)**  
You can bulk import by using the user interface, orwith a program.

**Parent topic:**[Importing and transferring files](../concepts/import-transfer.md)

