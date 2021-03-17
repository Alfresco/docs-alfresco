---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Delete Web Project Membership

Delete \(uninvite\) the membership for a user.

`DELETE /alfresco/service/api/wcm/webprojects/{webprojectref}/memberships/{username}`



Please note that the user's sandboxes are deleted even if they have unsubmitted content.

Returns 200, STATUS\_OK on success.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

