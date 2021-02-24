---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get Web site membership

Get the membership details for a user or group.

`GET /alfresco/service/api/sites/{shortname}/memberships/{authorityname}`



'shortname' is the shortname of the Web site, 'authorityname' is the full authority name for the membership.

Returns a membership or Status.NOT\_FOUND\(404\)

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

