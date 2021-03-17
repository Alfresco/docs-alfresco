---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Logout

Logout, Delete Login Ticket.

`DELETE /alfresco/service/api/login/ticket/{ticket}`



After the user has logged out the ticket is no longer valid and subsequent attempts to use it will fail.

The web script description document specifies the following options:

|`xml`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Repository](../references/RESTful-Repository.md)

