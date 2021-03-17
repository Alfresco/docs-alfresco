---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Setting permissions for a group

Setting permissions for a group.

|API Call|[Get and set permissions for a node](dev-api-by-language-alf-rest-get-set-node-permissions.md)|
|--------|----------------------------------------------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode)|
|See also|[How to create a group](dev-api-by-language-alf-rest-manage-people-groups-create-group.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

After creating a group and populating it with users and groups it is usually time to set permissions for it. What this means is to configure read and write permissions on different folders and files in the repository. So when users that are part of the group access those folders and files they automatically have the permissions that the group have. Setting permissions on groups instead of individual users makes life easier when managing the repository.

This is all done via the **PUT /nodes/\{id\}** call, for more info see [get and set permissions for a node](dev-api-by-language-alf-rest-get-set-node-permissions.md).

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

