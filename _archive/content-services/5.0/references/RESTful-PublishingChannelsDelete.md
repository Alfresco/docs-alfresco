---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Delete specified publishing channel

Request the deletion of the publishing channel specified on the URL.

`DELETE /alfresco/service/api/publishing/channels/{store_protocol}/{store_id}/{node_id}`



Response status indicates result:

-   **200**

    deletion successful

-   **400**

    invalid data received from caller

-   **401**

    user doesn't have permission to delete the specified channel

-   **404**

    the specified channel cannot be found


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`any`|The format style|

**Parent topic:**[Publishing](../references/RESTful-Publishing.md)

