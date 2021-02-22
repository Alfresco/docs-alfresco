---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Default audit filter settings

The following properties are set by default to discard events where the user is *null* or *"System"*, the content or folder path is under *"/sys:archivedItem"* or under *"/ver:"* or the node type is not *"cm:folder"*, *"cm:content"* or *"st:site"*.

These values result in events only being recorded for common actions initiated by users of the system. These values may be overridden if required.

```
audit.filter.alfresco-access.default.enabled=true
audit.filter.alfresco-access.transaction.user=~System;~null;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content;st:site
audit.filter.alfresco-access.transaction.path=~/sys:archivedItem;~/ver:;.*
```

**Parent topic:**[Content auditing technical overview](../concepts/audit-content-techdesc.md)

