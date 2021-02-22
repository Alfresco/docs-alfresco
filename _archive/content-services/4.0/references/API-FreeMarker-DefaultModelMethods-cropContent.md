---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: cropContent
---

# `cropContent`

`cropContent(content, length)` returns the first N characters of a content stream from the specified node.

## Parameters

-   **content**

    A `TemplateContentData` object representing the target content stream.

-   **length**

    An integer representing the number of bytes to read from the content stream.


## Returns

Returns a string representing the content read.

## Example

```


<#assign templateContentData = node.properties.content>

<p>cropped content: ${cropContent(templateContentData, 150)}</p>  
        
      
```

The preceding code snippet will display the first 150 bytes of the content node.

**Parent topic:**[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)

