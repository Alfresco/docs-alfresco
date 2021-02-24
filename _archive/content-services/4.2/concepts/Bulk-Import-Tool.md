---
author: Alfresco Documentation
---

# Using the Bulk Import tool

The Bulk Import tool provides a mechanism for bulk importing existing content into a repository from the Alfresco server's filesystem.  

It \(optionally\) replaces existing content items if they already exist in the repository, but does not perform deletes \(it is not designed to fully synchronize the repository with the local filesystem\). The basic on-disk file/folder structure is preserved verbatim in the repository. It is possible to load metadata for the files and spaces being ingested, as well as a version history for files \(each version may consist of content, metadata, or both\).

You can use Streaming import to stream the files into the repository content store by copying them in during the import.

There are a number of restrictions:

-   No support for AVM.
-   Only one bulk import can be running at a time. This is enforced by the JobLockService.
-   Access to the Bulk Import tool is restricted to Alfresco administrators, by default.

-   **[In-place bulk import](../concepts/bulk-import-in-place.md)**  
In-place import is available in Enterprise Only, and imports files that already exist within the repository content store. As no copying is required, this can result in a significant performance improvement.
-   **[Streaming bulk import](../concepts/bulk-import-streaming.md)**  
The streaming bulk import copies the source content into the repository content store.
-   **[Preparing the filesystem](../concepts/bulk-import-prepare-filesystem.md)**  
There are a number of things you must do to prepare the filesystem before you do the bulk import.
-   **[Importing with the Bulk Import tool](../concepts/bulk-import-importing.md)**  
You can bulk import by using the user interface, or with a program.

**Parent topic:**[Administering](../concepts/ch-administering.md)

