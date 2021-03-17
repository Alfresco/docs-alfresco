---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Filtering properties

You may only be interested in a subset of properties in a returned entity. You can use the properties parameter to restrict the returned properties.

The properties parameter is a comma-separated list of property names:-

```
properties=property1,property2...
```

For example if you invoked the following API method using the HTTP GET method:-

```

         sites
```

Alfresco would return a list of site objects each with four properties; `id`, `title`, `visibility`, `description`. Your application may only interested in say two properties, `title` and `description`. You can filter the returned site objects like this :-

```

         sites?properties=title,description
```

The collection returned will look like this:-

```

{
  "list" : {
    "pagination" : {
      "count" : 2,
      "hasMoreItems" : false,
      "totalItems" : 2,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "title" : "Test Site",
        "description" : "A site for testing"
      }
    }, {
      "entry" : {
        "title" : "Fred Bloggs's Home",
        "description" : "Fred Blogs's private home site."
      }
    } ]
  }
}
```

Each entry in the list is a site object filtered to include just the `title` and `description` properties.

**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

