---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Update Web Project

Update a single WCM web project

`PUT /alfresco/service/api/wcm/webprojects/{webprojectref}`

webprojectref is the unique reference returned by an earlier call to list, get or create web project

The following fields are may be updated in the body of the request:

-   name
-   title
-   description
-   isTemplate

Returns 200 STATUS\_OK, the body of the return will contain the updated web project.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Wcm](../references/RESTful-Wcm.md)

