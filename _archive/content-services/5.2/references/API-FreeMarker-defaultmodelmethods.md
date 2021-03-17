---
author: Alfresco Documentation
---

# Default model methods

Custom template methods can be added to the FreeMarker language for use on template pages. The default model provides the following methods:

-   **[cropContent](../references/API-FreeMarker-DefaultModelMethods-cropContent.md)**  
`cropContent(content, length)` returns the first N characters of a content stream from the specified node.
-   **[dateCompare](../references/API-FreeMarker-DefaultModelMethods-dateCompare.md)**  
`dateCompare` methods that return a value based on how two dates compare, with an optional milliseconds offset.
-   **[hasAspect](../references/API-FreeMarker-DefaultModelMethods-hasAspect.md)**  
`hasAspect(node, aspect)` returns whether a `TemplateNode` has a particular aspect applied to it. The aspect name can be either the fully qualified QName or the short prefixed name string.
-   **[hasPermission](../references/API-FreeMarker-DefaultModelMethods-hasPermission.md)**  
`hasPermission(node, permission)` returns whether a `TemplateNode` has the specified permission applied to it.
-   **[incrementDate](../references/API-FreeMarker-DefaultModelMethods-incrementDate.md)**  
`incrementDate(date, increment)` returns a date incremented by the specified amount.
-   **[message](../references/API-FreeMarker-DefaultModelMethods-message.md)**  
`message(id)` returns an i18n message resolved for the current locale and specified message ID.
-   **[shortQName](../references/API-FreeMarker-DefaultModelMethods-shortQName.md)**  
`shortQName(longQName)` returns the shortQName equivalent of the specified longQName.
-   **[xmldate](../references/API-FreeMarker-DefaultModelMethods-xmldate.md)**  
`xmldate` these methods return a converted date. The date can be specified either as a Date object or an ISO6801 string.

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

