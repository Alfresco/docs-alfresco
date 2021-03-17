---
author: Alfresco Documentation
---

# Appending content

In some applications such as journaling, or when using very large files, you want to upload a file in chunks. You might have large files that time out during an upload, or fail because of a bad connection. You can use the CMIS 1.1 `append` parameter in these situations

You can use the `isLastChunk` parameter to indicate to the server that the chunked data is complete. The following example puts a chunk of data to a specific existing Alfresco object:

```

http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=915b2b00-7bf6-40bf-9a28-c780a75fbd68&append=true

```

**Parent topic:**[CMIS 1.1](../../../pra/1/concepts/cmis-1.1-intro.md)

