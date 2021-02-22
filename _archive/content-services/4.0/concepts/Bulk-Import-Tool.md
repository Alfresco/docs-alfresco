---
author: Alfresco Documentation
---

# Using the Bulk Import tool

The Bulk Import Tool provides a mechanism for bulk importing existing content into a repository from the Alfresco server's file system.  

It will \(optionally\) replace existing content items if they already exist in the repository, but does not perform deletes \(it is not designed to fully synchronize the repository with the local file system\). The basic on-disk file/folder structure is preserved verbatim in the repository. It is possible to load metadata for the files and spaces being ingested, as well as a version history for files \(each version may consist of content, metadata, or both\).

There are two types of bulk import:

-   **Streaming import**: This import streams the files into the repository content store by copying them in during the import.
-   **In-place import**: Available in Enterprise Only, these files are assumed to already exist within the repository content store, so no copying is required. This can result in a significant improvement in performance .

There are a number of restrictions:

-   There is no support for AVM.
-   Only one bulk import can be running at a time. This is enforced by the `JobLockService`.
-   Only Alfresco administrators can access to the Bulk Import tool.

-   **[In-Place bulk import](../concepts/bulk-import-in-place.md)**  
In-place import is available in Alfresco Enterprise only. It imports files that already exist within the repository content store. As no copying is required, this can result in a significant performance improvement.
-   **[Streaming Bulk Import](../concepts/bulk-import-streaming.md)**  
The Streaming bulk import copies the source content into the repository content store.
-   **[Preparing the file system](../concepts/bulk-import-prepare-filesystem.md)**  
There are a number of things you must do to prepare the file system before you do the bulk import.
-   **[Importing via the user interface](../concepts/bulk-import-via-the-ui.md)**  
The two types of bulk import \(streaming and in-place\) each have a user interface, which are implemented using Alfresco webscripts.
-   **[Importing programmatically](../concepts/bulk-import-programmatically.md)**  
The following code snippets show you how to complete a bulk import programmatically.
-   **[Bulk Import diagnostics](../concepts/bulk-import-diagnostics.md)**  
To troubleshoot or diagnose any issues with bulk import, you can enable logging.

**Parent topic:**[Administering](../concepts/ch-administering.md)

