---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Remove an authority from a group

Remove an authority \(USER or GROUP\) from a group.

`DELETE /alfresco/service/api/groups/{shortGroupName}/children/{fullAuthorityName}`

A user will not be deleted by this method.

You must have "administrator" privileges to alter a group.



The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

