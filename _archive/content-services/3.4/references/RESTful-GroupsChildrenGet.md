---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get the list of child authorities for a group.

Get a list of the child authorities of a group.

`GET /alfresco/service/api/groups/{shortName}/children?authorityType={authorityType?}`

The list contains both people and groups.

The authorityType parameter is used to specify return authorities of the given type. Valid values are GROUP and USER.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

