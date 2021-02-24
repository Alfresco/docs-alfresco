---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Get the list of parent authorities for a group.

Gets a list of the parent authorities of a group.

`GET /alfresco/service/api/groups/{shortName}/parents?level={level?}&maxItems={maxItems?}&skipCount={skipCount?}&sortBy={sortBy?}`



The optional level attribute can be ALL, in which case all parents are returned. The optional maxItems parameter sets the maximum number of items to be returned. If no value is set then all items are returned. The optional skipCount parameter determines how many items to skip before returning the first result. If no skipCount value is set then no items are skipped. If the optional sortBy parameter is given, then the results may be sorted. Possible values are "authorityName" \(default\), "shortName" and "displayName"

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

