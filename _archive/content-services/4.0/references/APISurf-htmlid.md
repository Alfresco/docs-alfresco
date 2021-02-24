---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# htmlid

This is a generated value that is a guaranteed safe and unique string that can be used as an HTML element ID for an element within the current component, template, or page. For example, it could be used as the ID for a DIV element surrounding the component markup, passed in to client-side JavaScript to allow easy dynamic manipulation of the component markup via Ajax updates or similar.

For example:

```
<div id="${htmlid}">your component markup here</div>
```

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

