---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, status]
---

# status

The `status` object represents a response status.

The following properties allow for access to the status or the setting of a new status.

|`code`|\(Read/write int\) Status code; this is primarily an HTTP status code, but can be any number|
|`codeName`|\(Read-only string\) Human-readable status code name|
|`codeDescription`|\(Read-only string\) Human-readable status code description|
|`message`|\(Read/write string\) The status message|
|`redirect`|\(Read/write Boolean\) Indicates whether to redirect to a status-specific response template|
|`exception`|\(Read/write java.lang.Exception\) The exception, if any, that has caused this status|
|`location`|\(Read/write string\) The absolute URI to which the client should resubmit a request; this is often used with 3xx redirect status codes|

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

