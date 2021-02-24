---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Add Web site membership

Adds a new membership to the Web site.

`POST /alfresco/service/api/sites/{shortname}/memberships`



'shortname' is the shortname of the web site, 'authorityname' is the full authority name for the membership. Required parameters,

role, mandatory String, the new role name for this membership.

person object, with userName property

OR group object, with fullName property

OR authority object, with fullName property



The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

