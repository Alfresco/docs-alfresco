---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# fields

The `fields` element specifies a list of field names. Use this parameter to restrict the fields returned within a response, for example, if you want to save on the overall bandwidth. The list applies to a returned individual entity or entries within a collection.

If the `include` element is used along with the `field` element, the fields specified in `include` are returned in addition to those specified in the `fields` element.

## Example

The `field` element works in the same way as in the `/nodes/{nodeId}/children` method in the core API. For example:

```
"fields": ["id", "name", "search"]
```

**Parent topic:**[Search API](../concepts/search-api.md)

