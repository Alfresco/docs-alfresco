---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, webscript object]
---

# webscript

The `webscript` object provides metadata describing the web script currently being executed.

Web script metadata is accessed through the following properties of the `webscript` object.

|`id`|\(Read-only string\) The web script identifier|
|`shortName`|\(Read-only string\) The web script short name|
|`description`|\(Read-only string\) The web script description|
|`defaultFormat`|\(Read-only string\) The default response format if none is explicitly specified in the web script URI|
|`formatStyle`|\(Read-only string\) The accepted ways of specifying the format in the web script URI|
|`URIs`|\(Read-only string array\) URI templates|
|`method`|\(Read-only string\) HTTP method|
|`requiredAuthentication`|\(Read-only string\) Required level of authentication|
|`requiredTransaction`|\(Read-only string\) Required level of transaction|
|`storePath`|\(Read-only string\) The path of the persistent store where the web script is stored|
|`scriptPath`|\(Read-only string\) The path \(within `storePath`\) of web script implementation files|
|`descPath`|\(Read-only string\) The path \(within `storePath`\) of the web script description document|

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

