---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# Response

The `Response` object wraps the response data, status code, status message, and any exception information from a remote call.

By default, the following properties are available:

|`encoding`|Read/write property. The encoding of the response.|
|`response`|The data of the response as a string.|
|`text`|The text of the response.|
|`responseStream`|The response `InputStream`.|
|`status`|Returns a `ResponseStatus` object wrapping the return code status, message, and any exception information.|

**Parent topic:**[Return types](../references/APISurf-returntypes.md)

