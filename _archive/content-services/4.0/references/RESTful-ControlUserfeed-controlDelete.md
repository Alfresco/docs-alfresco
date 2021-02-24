---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Unset activity user feed control

Delete the activity feed control \(opt-out\) for currently logged in user.

`DELETE /alfresco/service/api/activities/feed/control?s={siteId}&a={appToolId}`

`DELETE /alfresco/service/api/activities/feed/control?s={siteId}&a={appToolId}&format=json`

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Control](../references/RESTful-Control.md)

