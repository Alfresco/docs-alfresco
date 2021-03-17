---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# POST Faceted-Search Config

Post faceted-search config http://

`POST /alfresco/service/api/facet/facet-config`

```

        
      <host>:<port>/alfresco/api/facet/facet-config
   Example body to this web script:
   {
             "filterID" : "filter_content_size",
             "facetQName" : "{http://www.alfresco.org/model/content/1.0}content.size",
             "displayName" : "faceted-search.facet-menu.facet.size",
             "displayControl" : "alfresco/search/FacetFilters",
             "maxFilters" : 5,
             "hitThreshold" : 1,
             "minFilterValueLength" : 5,
             "sortBy" : "ALPHABETICALLY",
             "scope" : "SCOPED_SITES", // if not provided, default value is "ALL"
             "scopedSites" : [
                     "site3",
                     "site2",
                     "site1"
              ],
             "customProperties" : {
                "blockIncludeFacetRequest": {
                    "name" : "{http://www.alfresco.org/model/solrfacetcustomproperty/1.0}blockIncludeFacetRequest",
                    "value" : "true"
                }
             }
             "isEnabled" : true  // if not provided, default value is false
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

