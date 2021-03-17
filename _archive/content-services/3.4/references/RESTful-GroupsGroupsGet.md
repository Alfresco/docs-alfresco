---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List groups

Searches for groups.

`GET /alfresco/service/api/groups?shortNameFilter={shortNameFilter?}&zone={zone?}`



The following optional parameters are available:-

-   shortNameFilter - returns those groups with a partial match on shortName. You can use the pattern matching characters \* to match zero or more characters or ? to match one character.
-   zone - returns only groups that are in the specified zone, otherwise it returns groups from all zones.

Returns an Array of groups in JSON format.

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

