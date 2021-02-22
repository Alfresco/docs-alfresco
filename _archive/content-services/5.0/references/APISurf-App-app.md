---
author: Alfresco Documentation
---

# app

The `app` object can be used on both the production and preview tiers to gain access to the correct web application mount points and more.

The following methods are available:

## context

Returns the root web application context.

## include\(path\)

Performs a server-side include of a web asset from the default endpoint.

## include\(path, endpoint\)

Performs a server-side include of a web asset from the specified endpoint.

It executes a wrapped server-side include. The result string is returned.

Some example paths include:

```
   /a/b/c.gif
   /images/test.jpg
```

-   **[getContext](../references/APISurf-App-getContext.md)**  
`getContext()` - returns the root web application context.
-   **[include](../references/APISurf-App-include.md)**  
`include(String relativePath)` - performs a server-side include of a web asset.

**Parent topic:**[Surf root objects](../references/APISurf-rootscoped.md)

