---
author: Alfresco Documentation
---

# page

The page object provides a number of properties describing a page.

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

**Parent topic:**[Surf root objects](../references/APISurf-rootscoped.md)

