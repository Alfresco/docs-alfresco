---
author: Alfresco Documentation
---

# Using the Bulk Import tool

The Bulk Import tool provides a mechanism for bulk importing existing content into a repository from the Alfresco server's file system.

It \(optionally\) replaces existing content items if they already exist in the repository, but does not perform deletes \(it is not designed to fully synchronize the repository with the local file system\). The basic on-disk file/folder structure is preserved verbatim in the repository. It is possible to load metadata for the files and spaces being ingested, as well as a version history for files \(each version consists of content, metadata, or both\).

You can use streaming import to stream the files into the repository content store by copying them in during the import.

There are two types of bulk import:

-   Streaming import: this copies the source content into the repository content store.
-   In-place import: Available in Enterprise Only, these files are assumed to already exist within the repository content store, so no copying is required. This can result in a significant improvement in performance.

There are a number of restrictions:

-   Only one bulk import can be running at a time. This is enforced by the `JobLockService`.
-   Access to the Bulk Import tool is restricted to Alfresco administrators.
-   There is a path/file length limitation of 255 characters for imported files. This limitation applies when using either in-place or streaming Bulk Import.

-   **[In-place bulk import](../concepts/bulk-import-in-place.md)**  
The in-place import is available in Enterprise only, and imports files that already exist within the repository content store. As no copying is required, this can result in a significant performance improvement.
-   **[Preparing the file system](../concepts/bulk-import-prepare-filesystem.md)**  
There are a number of tasks you must do to prepare the file system before you do the bulk import.
-   **[Importing with the Bulk Import tool](../concepts/bulk-import-importing.md)**  
You can bulk import by using the user interface, orwith a program.

**Parent topic:**[Administering](../concepts/ch-administering.md)

