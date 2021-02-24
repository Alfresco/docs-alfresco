---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get the details of the specified asset within the specified web project and sandbox.

Get the details of the specified asset.

`GET /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}`

`GET /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}/assets/{path}?webApp={webApp?}`

If the asset is a folder, includes the children of that folder.

If the asset is a file, gives the size of the file.

If the optional webApp argument is specified then returns the asset relative to that web app e.g. /index.htm

If webApp is not specified then the path is will be absolute e.g. /www/avm\_webapps/ROOT/index.htm

Return STATUS\_OK, 200

Output - The asset in JSON format

```
 
  data:
         path, the full path of the asset.
         name, the name of the asset
         creator
         createdDate, iso8601,
         modifier
         modifiedDate,  iso8601,
         isLocked, boolean
         isFile, boolean
         isFolder, boolean
         isDeleted, boolean
         children, JSON array, only present for folder
         fileSize, numeric, only present for files  
    
```

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Asset](../references/RESTful-Asset.md)

