---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Web Projects

Get a list of the WCM Web projects.

`GET /alfresco/service/api/wcm/webprojects?userName={userName?}`

`GET /alfresco/service/api/wcm/webprojects`



userName is an optional argument that if specified then only those web projects for the specified user are returned else all web projects are returned.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Wcm](../references/RESTful-Wcm.md)

