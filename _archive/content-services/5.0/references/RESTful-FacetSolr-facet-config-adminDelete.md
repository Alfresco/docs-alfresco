---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Delete Faceted-Search Config

Delete faceted-search config, if configured http://

`DELETE /alfresco/service/api/facet/facet-config/{filterID}`

```

        
      <host>:<port>/alfresco/api/facet/facet-config
   Example response from this web script:
      {
         "success" : true | false
      }
   Notes:
   - user must be an Admin, member of Alfresco_Search_Administrators group or a Network Admin for given network/tenant
   
      
```

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Facet](../references/RESTful-Facet.md)

