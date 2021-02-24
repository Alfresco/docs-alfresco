---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: isValidXpathQuery
---

# `isValidXpathQuery`

`isValidXpathQuery(query)` this method checks the validity of an XPath query string.

## Parameters

-   **query**

    The XPath query string to check.


## Returns

Returns true is the query is a valid XPath query string, false otherwise.

## Example

The method can be used to check the validity of a XPath query prior to use:

```

if (search.isValidXpathQuery(query)){
    nodes = search.xpathSearch(query);
}
else {
  // ...
}
      
```

**Parent topic:**[Search API](../references/API-JS-Search.md)

