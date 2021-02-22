---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Validate Login Ticket

Validates the specified ticket is still valid.

`GET /alfresco/service/api/login/ticket/{ticket}`



The ticket may be invalid, or expired, or the user may have been locked out.

For security reasons this script will not validate the ticket of another user.

-   If the ticket is valid retuns, STATUS\_SUCCESS \(200\)
-   If the ticket is not valid return, STATUS\_NOT\_FOUND \(404\)
-   If the ticket does not belong to the current user, STATUS\_NOT\_FOUND \(404\)

The web script description document specifies the following options:

|`xml`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Repository](../references/RESTful-Repository.md)

