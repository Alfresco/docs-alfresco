---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# page

The page object provides the following properties.

|`url`|The URL helper object.|
|`id`|The page object ID.|
|`title`|The page definition title.|
|`titleId`|The page definition title internationalization message ID.|
|`description`|The page definition description.|
|`descriptionId`|The page definition description internationalization message ID.|
|`theme`|The theme ID.|
|`properties`|Custom page definition properties, as defined within the page XML descriptor within the optional properties element; returned as a map, such as:

```
page.properties["mycustomprop"]
```

|

**Note:** The `page` object is available only within the context of a page render.

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

