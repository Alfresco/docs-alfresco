---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# GET facetable properties defined within the repository

Get limited property definition data for properties deemed to be facetable.

`GET /alfresco/service/api/facet/classes/{classname}/facetable-properties?nsp={namespacePrefix?}&skipCount={skipCount?}&maxItems={maxItems?}&locale={locale?}`

`GET /alfresco/service/api/facet/facetable-properties?nsp={namespacePrefix?}&skipCount={skipCount?}&maxItems={maxItems?}&locale={locale?}`

```

        
   http://<host>:<port>/alfresco/api/facet/facetable-properties[?nsp=eg&skipCount=50&maxItems=10]
   http://<host>:<port>/alfresco/api/facet/classes/eg:aspectOrType/facetable-properties[?skipCount=50&maxItems=10]
   Example response from this web script:
   {
      "data" : {
        "properties" : [
          {
            "name" : "eg:propName1",
            "longqname" : "{http://www.alfresco.org/model/example/1.0}propName1",
            "displayName" : "eg:propName1",
            "containerClassType" : "eg:aspectName",
            "dataType" : "d:text",
            "modelQName" : "eg:examplemodel"
          },
          {
            "name" : "eg:propName2",
            "longqname" : "{http://www.alfresco.org/model/example/1.0}propName2",
            "title" : "Useful Metadata",
            "displayName" : "eg:propName2 (Useful Metadata)",
            "containerClassType" : "eg:className",
            "dataType" : "d:text",
            "modelQName" : "eg:examplemodel"
          }
        ]
     }
   }
   
      
```

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Facet](../references/RESTful-Facet.md)

