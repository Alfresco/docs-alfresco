---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# include

The `include` element returns additional information about the node.

The following optional fields can be requested:

-   `properties`
-   `aspectNames`
-   `path`
-   `isLink`
-   `allowableOperations`
-   `association`
-   `isLocked`
-   `permissions`

## Example

This example uses the `include` JSON body parameter to return additional information in the standard response. This works in the same way as in the `/nodes/{nodeId}/children` method in the core API. For example:

```
"include": ["aspectNames", "properties", "isLink"]
```

**Parent topic:**[Search API](../concepts/search-api.md)

