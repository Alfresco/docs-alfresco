---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create user sandbox

Create \(POST\) a new author sandbox for a user.

`POST /alfresco/service/api/wcm/webprojects/{webprojectref}/sandboxes`



The following fields are required in the body of the request:

-   userName

Returns STATUS\_CREATED,201 on success.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Sandbox](../references/RESTful-Sandbox.md)

