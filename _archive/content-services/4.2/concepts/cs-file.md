---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# File content store

This topic describes the File content store, which is Alfresco's default content store.

The File content store saves the files or content items on a file system under the root directory. Within the root directory, the files are stored in numeric directories based upon the creation time of the document. The reason for storing the files in a directory structure is to assist incremental backup. The metadata of your file is stored in the database.

Alfresco does not modify any file that is stored in the content store. The `fileContentStore` is pointed to by the `${dir.contentstore}` property.

**Parent topic:**[Content store types](../concepts/cs-types.md)

