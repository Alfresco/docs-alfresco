---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List Web site memberships

Get a colleciton of a Web site memberships.

`GET /alfresco/service/api/sites/{shortname}/memberships?nf={namefilter?}&rf={rolefilter?}&size={pagesize?}&pos={position?}&authorityType={authorityType?}`



'shortname' is the shortname of the Web site

Parameters:

-   nf, Optional, namefilter
-   rf, Optional, rolefilter
-   size, Optional, page size
-   authorityType, Optional, returns either GROUP or USER authorities. If not specified returns all authorities.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

