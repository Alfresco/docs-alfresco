---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, url]
---

# url

`url` is a root object providing access to the URL \(or parts of the URL\) that triggered the web script.

Access to the URL parts is through the following properties on the `url` object.

|`context`|\(Read-only string\) Alfresco context path|
|`serviceContext`|\(Read-only string\) Alfresco service context path|
|`service`|\(Read-only string\) Web script path|
|`full`|\(Read-only string\) Web script URI with query parameters|
|`match`|\(Read-only string\) The part of the web script URI that matched the web script URI template|
|`args`|\(Read-only map\) Web script URI query parameters|
|`templateArgs`|\(Read-only map\) A map of substituted token values \(within the URI path\) indexed by token name|
|`extension`|\(Read-only string\) The part of the web script URL that extends beyond the match path \(if there is no extension, an empty string is returned\)|

A web script URI template of: `/user/{userid}` requests the URI: `/alfresco/service/user/fred?profile=full&format=html`

The `url` root object returns:

-   `url.context` =\> /alfresco
-   `url.serviceContext` =\> /alfresco/service
-   `url.service` =\> /alfresco/service/user/fred
-   `url.full` =\> /alfresco/service/user/fred?profile=full&format=html
-   `url.args` =\> profile=full&format=html
-   `url.templateArgs.userid` =\> fred
-   `url.match` =\> /user/
-   `url.extension` =\> fred

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

