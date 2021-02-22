---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Login \(POST\)

Login and establish a ticket.

`POST /alfresco/service/api/login`



Input

JSON Data Object.

-   **username**

    cleartext username

-   **password**

    cleartext password


Returns the new authentication ticket.

The web script description document specifies the following options:

|`json`|The default response format|
|`none`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Repository](../references/RESTful-Repository.md)

