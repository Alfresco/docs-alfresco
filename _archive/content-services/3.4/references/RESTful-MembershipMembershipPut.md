---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Update Web site membership

Update the membership role for a user or group.

`PUT /alfresco/service/api/sites/{shortname}/memberships/{authorityname}`



'shortname' is the shortname of the Web site, 'authorityname' is the full authority name for the membership.

Required parameters,

role, mandatory String, the new role name for this membership.

person object, with userName property

OR group object, with fullName property

OR authority object, with fullName property

Returns: The new authority.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

