---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List potential Web site members

Get a colleciton of People and/or Groups who are not yet Site members.

`GET /alfresco/service/api/sites/{shortname}/potentialmembers?filter={filter?}&maxResults={maxResults?}&authorityType={authorityType?}`



'shortname' is the shortname of the web site

Parameters:

-   filter, Optional, filter
-   maxResults, Optional, maximum resultset to return
-   authorityType, Optional, returns either GROUP or USER authorities. If not specified returns all authorities.
-   zone, Optional, specifies group zone if including groups in query.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

