---
author: Alfresco Documentation
---

# Web script controller script

A web script controller script is a JavaScript file that contains the actual logic of a web script.

The controller script can query the repository to build a set of data items, known as a model, to render in the response. It might also update the repository for URIs that intend to modify the repository \(PUT, POST, and DELETE method bindings\). The JavaScript has access to the URI query string, services, and repository data entry points.

```

        
// check that search term has been provided
if (args.q == undefined || args.q.length == 0)
{
   status.code = 400;
   status.message = "Search term has not been provided.";
   status.redirect = true;
}
else
{
   // perform search
   var nodes = search.luceneSearch("TEXT:" + args.q);
   model.resultset = nodes;
}        
        
      
```

**Parent topic:**[Web script components](../concepts/ws-components.md)

