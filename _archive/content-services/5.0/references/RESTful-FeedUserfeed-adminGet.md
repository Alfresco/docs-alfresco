---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Activities admin user feed

Allow admin to get the feed for a specified user.

`GET /alfresco/service/api/activities/feed/user/{userId}`

`GET /alfresco/service/api/activities/feed/user/{userId}?format=atomfeed`

`GET /alfresco/service/api/activities/feed/user/{userId}?format=json`

`GET /alfresco/service/api/activities/feed/user/{userId}?s={siteId}`

`GET /alfresco/service/api/activities/feed/user/{userId}?s={siteId}&format=atomfeed`

`GET /alfresco/service/api/activities/feed/user/{userId}?s={siteId}&format=json`

`GET /alfresco/service/api/activities/feed/user/{userId}?s={siteId?}&exclUser={false?}&exclOthers={false?}`

`GET /alfresco/service/api/activities/feed/user/{userId}?s={siteId?}&exclUser={false?}&exclOthers={false?}&format=atomfeed`

`GET /alfresco/service/api/activities/feed/user/{userId}?s={siteId?}&exclUser={false?}&exclOthers={false?}&format=json`

The web script description document specifies the following options:

|`atomfeed`|The default response format|
|`admin`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Feed](../references/RESTful-Feed.md)

