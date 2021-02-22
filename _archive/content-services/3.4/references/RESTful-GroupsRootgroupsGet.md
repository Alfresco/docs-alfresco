---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List all root groups

Lists all root groups.

`GET /alfresco/service/api/rootgroups?shortNameFilter={shortNameFilter?}&zone={zone?}`

The following optional parameters are available :-

-   zone - If set to 'true', returns root groups from the specified zone. If not specified, returns groups from all zones.
-   shortNameFilter - Returns those root groups with a partial match on shortName. The shortname filter can contain the wild card characters \* and ? but these must be url encoded for this script.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

