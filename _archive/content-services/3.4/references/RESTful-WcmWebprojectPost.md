---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create Web Project

Create \(POST\) a single WCM web project.

`POST /alfresco/service/api/wcm/webprojects`



The following fields are required in the body of the request:

-   **name**

    Human readable name for the web project.

-   **title**

    Human readable title for the web project.

-   **dnsName**

    The name of the web project which will become part of the URL. Should be short and unique.


The following fields are optional:

-   **description**

    description about the web project


Returns 201, STATUS\_CREATED on success. The body of the return will contain the new Web Project.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Wcm](../references/RESTful-Wcm.md)

