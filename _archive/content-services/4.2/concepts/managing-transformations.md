---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration]
---

# Managing transformations

When you are working with transformations, it is important to understand how file types map to one another and the transformation formats that each file type supports.

Transformations can cause `OutOfMemory` errors under certain conditions; for example, if you are using Excel \(.xlsx\) files that contain shapes or drawings \(.xml content\).

If you are experiencing `OutOfMemory` errors, set `content.metadataExtracter.parseShapes=true` in alfresco-global.properties to ignore the xml content.

-   **[Available transform options](../references/valid-transformations.md)**  
There are many file types \(also known as MIME types\) available in Alfresco and it's not always possible to transform one file type to another.
-   **[Additional transform options](../references/additional-transformations.md)**  
If you have installed a transformation tool, such as Alfresco Outlook Integration or Transformation Server, there are additional transform options available to you.
-   **[File types that support preview and thumbnail generation](../references/valid-transformations-preview.md)**  
Some file type extensions \(MIME types\) allow thumbnail or preview generation in Alfresco, instead of standard icons. If the file type can be transformed to application/x-shockwave-flash \(swf\) format, then it supports preview generation. If the file type can be transformed to image/jpeg \(jpg\) format, then it supports thumbnail generation.

**Parent topic:**[Administering](../concepts/ch-administering.md)

