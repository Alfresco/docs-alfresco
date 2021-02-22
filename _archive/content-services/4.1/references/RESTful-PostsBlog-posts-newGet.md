---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get blog posts for a number of days

Get all posts for a blog that were created within the specified number of days.

`GET /alfresco/service/api/blog/site/{site}/{container}/{path}/posts/new?numdays={numdays}`

`GET /alfresco/service/api/blog/site/{site}/{container}/posts/new?numdays={numdays}`

`GET /alfresco/service/api/blog/node/{store_type}/{store_id}/{id}/posts/new?numdays={numdays}`

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Posts](../references/RESTful-Posts.md)

