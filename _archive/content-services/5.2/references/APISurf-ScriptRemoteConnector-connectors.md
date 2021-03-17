---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# ScriptRemoteConnector

Connectors are retrieved by using the `remote` object and are used to communicate with configured endpoints. This communication generally consists of an HTTP request followed by an appropriate `Response` object \(JSON, XML, or other format\).

By default, the following properties are available:

|`endpoint`|The ID of the endpoint to which this connector is bound.|
|`descriptor`|The endpoint descriptor.|

-   **[call](../references/APISurf-ScriptRemoteConnector-call.md)**  
`call(String uri)`: this method invokes a URI on the endpoint by using a GET request.
-   **[get](../references/APISurf-ScriptRemoteConnector-get.md)**  
`get(String uri)` - this method invokes a GET request URI on the endpoint.
-   **[post](../references/APISurf-ScriptRemoteConnector-post.md)**  
`post()` - these methods invoke a URI on a remote service, passing the supplied body as a POST request.
-   **[put](../references/APISurf-ScriptRemoteConnector-put.md)**  
`put()` - these methods invoke a URI on a remote service, passing the supplied body as a PUT request.
-   **[del](../references/APISurf-ScriptRemoteConnector-del.md)**  
`del(String uri)`: this method invokes a URI on the endpoint by using a DELETE request.

**Parent topic:**[Return types](../references/APISurf-returntypes.md)

