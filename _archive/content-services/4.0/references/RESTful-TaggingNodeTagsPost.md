---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Add tag

Add one or more tags to the node.

`POST /alfresco/service/api/node/{store_type}/{store_id}/{id}/tags`

`POST /alfresco/service/api/path/{store_type}/{store_id}/{id}/tags`



Input:

\(mandatory\) array of String

Returns the array of tags

Return STATUS\_OK \(200\).

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Tagging](../references/RESTful-Tagging.md)

