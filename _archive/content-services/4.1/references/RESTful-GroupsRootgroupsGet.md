---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List all root groups

List all root groups.

`GET /alfresco/service/api/rootgroups?shortNameFilter={shortNameFilter?}&zone={zone?}&maxItems={maxItems?}&skipCount={skipCount?}&sortBy={sortBy?}`



If the optional zone parameter is set to 'true' then returns root groups from the specified zone. If not specified will return groups from all zones.

If the optional shortNameFilter parameter is set then returns those root groups with a partial match on shortName. The shortname filter can contain the wild card characters \* and ? but these must be url encoded for this script. The optional maxItems parameter sets the maximum number of items to be returned. If no value is set then all items are returned. The optional skipCount parameter determines how many items to skip before returning the first result. If no skipCount value is set then no items are skipped. If the optional sortBy parameter is given, then the results may be sorted. Possible values are "authorityName" \(default\), "shortName" and "displayName"

The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Groups](../references/RESTful-Groups.md)

