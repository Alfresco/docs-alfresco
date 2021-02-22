---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Form Definitions

Returns a form definition for the requested item.

`POST /alfresco/service/api/formdefinitions`

The body of the post should be in the following form:-

```
 
  {
     "itemKind" : item kind,
     "itemId" : item id,
     "fields" : [fields],
     "force" : [force]
  }
  
```

Returns the form model.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Forms](../references/RESTful-Forms.md)

