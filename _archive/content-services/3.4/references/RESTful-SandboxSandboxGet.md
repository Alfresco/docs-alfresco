---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get Web Project Sandbox

Get details of single sandbox of a web project.

`GET /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes/{sandboxref}`

Return

```
 
    data: sandboxref
          name
          creator
          createdDate.iso8601
          storeNames" : [ ]
          isAuthorSandbox
          isStagingSandbox
          url
  
```

Returns STATUS\_OK, 200

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Sandbox](../references/RESTful-Sandbox.md)

