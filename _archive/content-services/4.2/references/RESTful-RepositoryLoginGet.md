---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Log in

Log in and establish a ticket.

`GET /alfresco/service/api/login?u={username}&pw={password?}`



Input

-   **u**

    cleartext user name \(must be URL encoded\)

-   **pw**

    cleartext password \(must be URL encoded\)


Returns the new authentication ticket.

The user name and password are provided as URL arguments which may be

logged by proxies or the Alfresco server. The alternative POST method

of log in is recommended instead of GET.

The web script description document specifies the following options:

|`xml`|The default response format|
|`none`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Repository](../references/RESTful-Repository.md)

