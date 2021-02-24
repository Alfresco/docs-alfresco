---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# PUT Faceted-Search Config

Put \(update\) faceted-search config

`PUT /alfresco/service/api/facet/facet-config`

`PUT /alfresco/service/api/facet/facet-config/{filterID}?relativePos={relativePos?}`

This REST endpoint supports two forms of resource updates:



```

       
   http://<host>:<port>/alfresco/api/facet/facet-config</p><p>
   
     
```

This will perform an update of the Facet properties. Example body to this web script:



```

   {
             "filterID" : "filter_content_size",
             "facetQName" : "{http://www.alfresco.org/model/content/1.0}content.size",
             "displayName" : "faceted-search.facet-menu.facet.size",
             "displayControl" : "alfresco/search/FacetFilters",
             "maxFilters" : 5,
             "hitThreshold" : 1,
             "minFilterValueLength" : 5,
             "sortBy" : "ALPHABETICALLY",
             "scope" : "SCOPED_SITES",  // if not provided, default value is "ALL"
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
```

Notes: - user must be an Admin, member of Alfresco\_Search\_Administrators group or a Network Admin for given network/tenant

Alternatively, you can omit the request body as shown above and include a query parameter, relativePos, which will not update the facet properties but will move the facet in the ordered list by the specified distance.

+2 means 'down two places'. -1 means 'up one place'. An attempt to move a facet beyond the end of the sequence will simply move it to the end.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Facet](../references/RESTful-Facet.md)

