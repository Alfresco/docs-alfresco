---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Add group or user to a group

Adds a group or user to a group.

`POST /alfresco/service/api/groups/{shortName}/children/{fullAuthorityName}`

The webscript will create a sub group if one does not already exist, with the fullAuthorityName.

You must have "administrator" privileges to modify groups.

If the authority is for a group and doe not exist then it is created.

The webscript returns Status\_Created if a new group is created, otherwise it returns Status\_OK. If Status\_Created returns the new sub group, otherwise returns the group.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

