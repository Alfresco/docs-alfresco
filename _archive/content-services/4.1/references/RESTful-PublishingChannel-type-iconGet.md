---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get channel type icon

Create a new publishing channel using the supplied information.

`GET /alfresco/service/api/publishing/channel-types/{channelType}/icon/{iconSize}`



-   **channelType**

    mandatory - the channel type for which the icon is required

-   **iconSize**

    mandatory - the size of the icon required. Must be either "16" or "32"


Streams the requested icon if it can be found, otherwise returns a 404 status code. If either channelType or iconSize are missing then a 400 status code is returned.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Publishing](../references/RESTful-Publishing.md)

