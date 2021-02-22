---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Managing Folders and Files

This section is all about managing folders and files.

In this section we will cover how to manage folders and files, also referred to as nodes, with the Alfresco ReST API.

After walking through this section you should have a good understanding of how to list contents of a folder, create a folder, upload a file, set metadata for a folder or file, update a file, delete folders and files, and much more.

-   **[List contents of a folder](../concepts/dev-api-by-language-alf-rest-list-children-root-folder.md)**  
Listing the contents of a folder in the repository is really useful, here we walk through several examples of how to do that.
-   **[Filter contents of a folder](../concepts/dev-api-by-language-alf-rest-list-children-root-folder-filter.md)**  
Listing the contents of a folder in the repository is really useful, here we also cover how to filter the contents we are listing.
-   **[Get folder/file metadata](../concepts/dev-api-by-language-alf-rest-get-node-metadata.md)**  
Getting the metadata for a node returns the properties for the node type and applied aspects.
-   **[Create a folder](../concepts/dev-api-by-language-alf-rest-create-folder.md)**  
Creating a folder means creating a node with metadata.
-   **[Upload a file](../concepts/dev-api-by-language-alf-rest-upload-file.md)**  
Uploading a file to the Repository means creating a node with metadata and content.
-   **[Upload a file with custom type](../concepts/dev-api-by-language-alf-rest-upload-file-custom-type.md)**  
Uploading a file with a custom type to the Repository means creating a node with a type other than `cm:content`.
-   **[Upload a new version of file](../concepts/dev-api-by-language-alf-rest-upload-file-new-version.md)**  
Uploading a new version of a file means replacing the content and creating a new entry in the version history.
-   **[Get file version history](../concepts/dev-api-by-language-alf-rest-get-version-history.md)**  
When a file has versioning turned on you can get its version history.
-   **[Download a file](../concepts/dev-api-by-language-alf-rest-get-file-content.md)**  
Downloading the file means getting the file content from the Repository, which has it stored on disk.
-   **[Download multiple files](../concepts/dev-api-by-language-alf-rest-download-multiple-files.md)**  
It's possible to download multiple files as a ZIP.
-   **[List file renditions](../concepts/dev-api-by-language-alf-rest-list-file-rendition-content.md)**  
A file can have a number of renditions generated for it. This is how you get a list these renditions.
-   **[Get file rendition content](../concepts/dev-api-by-language-alf-rest-get-file-rendition-content.md)**  
Get the rendition file content, if it has been generated.
-   **[Update metadata for a folder or file](../concepts/dev-api-by-language-alf-rest-update-node-metadata.md)**  
Update the properties, also referred to as metadata, for a folder or file.
-   **[Add aspects to a folder or file](../concepts/dev-api-by-language-alf-rest-add-aspects-to-node.md)**  
Addning aspects to a folder or file is a bit more complicated than just updating properties. Here is how to do it.
-   **[Remove aspects from a folder or file](../concepts/dev-api-by-language-alf-rest-remove-aspects-from-node.md)**  
Removing aspects from a folder or file is a bit more complicated than just updating properties. Here is how to do it.
-   **[Get and Set permissions for a folder or file](../concepts/dev-api-by-language-alf-rest-get-set-node-permissions.md)**  
Get and set permissions for a user or group on a folder or file node.
-   **[Working with relationships between folders/files](../concepts/dev-api-by-language-alf-rest-set-up-assoc-folders-files.md)**  
Setting up relationships, referred to as associations, between different types of nodes is useful when modelling a specific domain.
-   **[Manage comments for a folder or file](../concepts/dev-api-by-language-alf-rest-add-remove-comments-on-node.md)**  
Get, add, update, and remove comments for a folder or file node.
-   **[Manage tags for a folder or file](../concepts/dev-api-by-language-alf-rest-add-remove-tags-on-node.md)**  
Get, add, and remove tags for a folder or file node.
-   **[Copy folders and files](../concepts/dev-api-by-language-alf-rest-copy-folders-files.md)**  
Copying folders and files means copying nodes.
-   **[Move folders and files](../concepts/dev-api-by-language-alf-rest-move-folders-files.md)**  
Moving folders and files means moving nodes.
-   **[Lock a file for editing](../concepts/dev-api-by-language-alf-rest-lock-unlock-files.md)**  
Locking a file is sometimes necessary when you want to edit it while no one else should be able to.
-   **[Create a link to a file](../concepts/dev-api-by-language-alf-rest-link-to-file.md)**  
Create a link to a file or folder stored somewhere else.
-   **[Delete a folder or file](../concepts/dev-api-by-language-alf-rest-delete-a-node.md)**  
Deleting a node, such as a folder or file, is easy. Here is how to do it.
-   **[List deleted folders and files \(Trashcan\)](../concepts/dev-api-by-language-alf-rest-list-trashcan.md)**  
Listing the content of the so called trashcan is useful if you want to restore soft deleted nodes.
-   **[Restore deleted folders and files \(Trashcan\)](../concepts/dev-api-by-language-alf-rest-restore-trashcan-items.md)**  
Folders and files are "soft deleted", meaning they are not physically gone from the system when deleted, so they can be restored as described on this page.

**Parent topic:**[ReST API](../concepts/dev-api-by-language-alf-rest.md)

