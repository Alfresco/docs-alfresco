---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Thumbnails

Get a named thumbnail for a content resource.

`GET /alfresco/service/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}?c={queueforcecreate?}&ph={placeholder?}&lastModified={modified?}`

`GET /alfresco/service/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}?c={queueforcecreate?}&ph={placeholder?}`

`GET /alfresco/service/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}?c={queueforcecreate?}&ph={placeholder?}`

`GET /alfresco/service/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}/{filename}?c={queueforcecreate?}&ph={placeholder?}`

`GET /alfresco/service/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}/{filename}?c={queueforcecreate?}&ph={placeholder?}`

The two URL templates which support a 'filename' template-arg are made available in order to support scenarios \(e.g. with third party libraries\) where the repo URL being called includes an explicit filename suffix. Note that Alfresco does not currently use the filename template-arg and that it will be ignored. Therefore a GET to these URLs will return the same resource as to the equivalent URLs without it.

The web script description document specifies the following options:

|`Determined at run-time`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Thumbnail](../references/RESTful-Thumbnail.md)

