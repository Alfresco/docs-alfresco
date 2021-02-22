---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Activities user feed

Allow the currently logged in user to get their feed.

`GET /alfresco/service/api/activities/feed/user`

`GET /alfresco/service/api/activities/feed/user?format=atomfeed`

`GET /alfresco/service/api/activities/feed/user?format=json`

`GET /alfresco/service/api/activities/feed/user?s={siteId?}`

`GET /alfresco/service/api/activities/feed/user?s={siteId?}&format=atomfeed`

`GET /alfresco/service/api/activities/feed/user?s={siteId?}&format=json`

`GET /alfresco/service/api/activities/feed/user?s={siteId?}&exclUser={false?}&exclOthers={false?}`

`GET /alfresco/service/api/activities/feed/user?s={siteId?}&exclUser={false?}&exclOthers={false?}&format=atomfeed`

`GET /alfresco/service/api/activities/feed/user?s={siteId?}&exclUser={false?}&exclOthers={false?}&format=json`

The web script description document specifies the following options:

|`atomfeed`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Feed](../references/RESTful-Feed.md)

