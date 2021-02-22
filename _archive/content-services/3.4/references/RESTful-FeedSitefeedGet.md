---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Activities site feed

Allows the currently logged in user to get the feed for a specified site.

`GET /alfresco/service/api/activities/feed/site/{siteId}`

`GET /alfresco/service/api/activities/feed/site/{siteId}?format=atomfeed`

`GET /alfresco/service/api/activities/feed/site/{siteId}?format=json`

`GET /alfresco/service/api/activities/feed/site/{siteId}?format=rss`

If the site specified is private, then user must be a member or an admin user.

The web script description document specifies the following options:

|`atomfeed`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Feed](../references/RESTful-Feed.md)

