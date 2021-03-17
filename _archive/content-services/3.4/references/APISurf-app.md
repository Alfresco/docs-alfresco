---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
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

If this app is running in a preview tier, the include executes a remote call to the AVM store lookup. Otherwise, it executes a wrapped server-side include. The result string is returned.

Some example paths include:

```
   /a/b/c.gif
   /images/test.jpg
```

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

