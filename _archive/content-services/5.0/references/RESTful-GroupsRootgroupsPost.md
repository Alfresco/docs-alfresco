---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Add a root group

Adds a root group.

`POST /alfresco/service/api/rootgroups/{shortName}`



You must have "administrator" privileges to add a root group.

Returns STATUS\_CREATED if a new group is created.

If the group already exists returns BAD\_REQUEST. The following properties may be specified for the new root group:-

-   **displayName**

    The display name


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

