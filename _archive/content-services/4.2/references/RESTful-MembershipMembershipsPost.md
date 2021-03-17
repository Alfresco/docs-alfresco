---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Add user to web project

Adds a new membership to the web project.

`POST /alfresco/service/api/wcm/webprojects/{webprojectref}/memberships`

After calling this method the user will be able to access the specified web project.

Input

-   **role**

    The role that the person should have

-   **person**

    Details of the person.


Returns 200, STATUS\_OK

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Membership](../references/RESTful-Membership.md)

