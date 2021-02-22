---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
keyword: [Import, Export, ACP]
---

# Exporting and importing

This section describes how to export and import information from a repository, and then import that information into either the same or another repository.

Export and import is useful for:

-   Bulk extraction and loading of personal or team information from one location to another
-   Integration with third party systems

**Note:**

-   You can only perform an export/import between compatible versions of Alfresco, which generally means the same version
-   You should not perform an upgrade \(Versions 2.x-3.x\) using export/import
-   It is not recommended that you backup and restore personal, team, or complete repository scope

The export procedure produces one or more Alfresco Content Package \(ACP\) files, which hold the exported information. As with all files, you can place them somewhere secure, or transfer them using methods, such as email, FTP, and so on. The scope of information to export is configurable, but typically involves specifying the location within the repository to export. The hierarchical nature of the repository means that every item within that location is exported. For example, exporting the folder **My Documents** will export the folder, its contents, and all sub-folders. Security settings allow the export of only those items that are readable by the user performing the export.

Import of an ACP file is the reverse of an export. The information held in the ACP file is placed into the repository location chosen at import time. By default, the import process creates a copy of the ACP held information.

-   **[Alfresco Content Package files](../concepts/acp-files.md)**  
An Alfresco Content Package \(ACP\) is a single file \(with an extension of .acp\) that bundles together the metadata and content files for the information to be transported.
-   **[Exporting spaces in Explorer](../tasks/spaceswebcl-export.md)**  
You can export any spaces and content in Alfresco Explorer to which you have access. However, you can only import and export from the same version.
-   **[Importing spaces in Explorer](../tasks/folder-import.md)**  
You can import to any spaces and content in Alfresco Explorer to which you have access.
-   **[Using rules to import to a space](../tasks/space-import-rules.md)**  
You can use a rule in a space to import a file to the same space or to another space in which you have permissions.

**Parent topic:**[Administering](../concepts/ch-administering.md)

