---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Web Script
keyword: [web script, caching]
---

# Web script reference

This section provides additional information on web script options, objects, and methods.

-   **[Form Data API](../references/API-form-data.md)**  
The Form Data API provides direct access to form fields submitted through the `multipart/form-data` content type. When requests of this type are posted to a web script, the Web Script Framework supplies the root object named `formdata` to the controller script of the web script.
-   **[JSON Object API](../references/API-json-obj.md)**  
The JSON Object API provides the ability to programmatically traverse JSON documents, where the root of the document is either a JSON array or a JSON object. The Web Script Framework, if instructed, supplies one of two root object type named `json` to the web script, depending on the root of the JSON document.
-   **[FreeMarker methods](../references/api-ws-freemarker.md)**  
The FreeMarker template language supports the notion of a method, which encapsulates an action to perform on a set of input parameters and may return an output value.
-   **[Root objects](../references/api-ws-root.md)**  

-   **[url](../references/API-ws-url.md)**  
`url` is a root object providing access to the URL \(or parts of the URL\) that triggered the web script.
-   **[status](../references/API-ws-status.md)**  
The `status` object represents a response status.
-   **[cache](../references/api-ws-cache.md)**  
The `cache` object allows control over how the web script response is cached.
-   **[format](../references/api-ws-format.md)**  
The `format` object represents the chosen format of the rendered response.
-   **[webscript](../references/api-ws-webscript.md)**  
The `webscript` object provides metadata describing the web script currently being executed.
-   **[server](../references/api-ws-server.md)**  
The `server` object provides metadata describing the host Alfresco server within which the web script is currently being executed.
-   **[Advanced options](../references/api-ws-AdvancedOptions.md)**  
Advanced options for web scripts.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

