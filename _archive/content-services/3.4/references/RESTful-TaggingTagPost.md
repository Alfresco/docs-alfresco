---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create new tag

Create a new tag in the specified store.

`POST /alfresco/service/api/tag/{store_type}/{store_id}`



The following properties need be set in the POST body.

-   **name**

    Name of the tag to create. Note tags are created in lowercase.


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Tagging](../references/RESTful-Tagging.md)

