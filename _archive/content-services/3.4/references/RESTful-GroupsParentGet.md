---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get the list of parent authorities for a group.

Gets a list of the parent authorities of a group.

`GET /alfresco/service/api/groups/{shortName}/parents?level={level?}`



The optional level attribute can be ALL, in which case all parents are returned.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

