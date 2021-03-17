---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# ResponseStatus

The `ResponseStatus` object wraps the response status code, status message, and any exception information from a remote call. The `ResponseStatus` object inherits from the `Status` object.

By default, the following properties are available:

Note that the previously used class `WebScriptStatus` is now deprecated.

|`exception`|Response status exception object; this may be null. Read/write.|
|`message`|Response status message. Read/write.|
|`redirect`|Redirect to status code response. Read/write.|
|`code`|Response status code. Read/write.|
|`codeName`|Localized response status code name. Read only.|
|`location`|Location response header. Read/write.|
|`codeDescription`|Localized response status code description.|

-   **[setCode](../references/APISurf-ResponseStatus-setCode.md)**  
`setCode(int code, String message)` - method to set a status code and message.
-   **[setHeader](../references/APISurf-ResponseStatus-setHeader.md)**  
`setHeader(String headerName, String headerValue)` - allows for response headers to be stored onto the status.
-   **[getHeaders](../references/APISurf-ResponseStatus-getHeaders.md)**  
`getHeaders()` - this method returns response headers.

**Parent topic:**[Return types](../references/APISurf-returntypes.md)

