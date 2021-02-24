---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create Child Folder

Creates a Child Folder in the specified Site Container or existing Folder.

`POST /alfresco/service/api/node/folder/{store_type}/{store_id}/{id}`

`POST /alfresco/service/api/site/folder/{site}/{container}/{path}`

`POST /alfresco/service/api/site/folder/{site}/{container}`



By default the new folder will be of type cm:folder, but subtypes of cm:folder may be specified instead.

The new NodeRef will be returned if the folder can be created.

The minimum request is of the form:

```

     { "name": "NewNodeName" }
   
```

The full set of parameters accepted in the request is of the form:

```

    {  
       "name": "NewNodeName",
       "title": "New Node Title",
       "description": "A shiny new node",
       "type": "cm:folder"
    }
   
```

-   If the folder is created, STATUS\_SUCCESS \(200\)
-   If the parent for the folder is not found, STATUS\_NOT\_FOUND \(404\)
-   If the user lacks permission to create the folder, STATUS\_FORBIDDEN \(403\)
-   If the request JSON is invalid in some way, STATUS\_BAD\_REQUEST \(400\)

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Node](../references/RESTful-Node.md)

