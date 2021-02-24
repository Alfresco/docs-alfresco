---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# head

Each web script component within a page template can have an optional `.head.ftl` template file. Each head template for all the components bound within the page is executed before the final processing stage and the output of each is concatenated. The concatenated output is then made available within the `head` variable. Any client-side CSS and Script, including files required for a component, can be correctly output into the HEAD section of the page.

For example:

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <title>My Page</title>
   ${head}
</head>
… rest of the page, with XHTML markup and component bindings etc.
```

This pattern ensured component writers can maintain a clean XHTML valid output for their page, even with many dynamic component bindings within the BODY tag markup.

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

