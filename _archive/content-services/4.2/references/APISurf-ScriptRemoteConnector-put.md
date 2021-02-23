---
author: [Alfresco Documentation, Alfresco Documentation]
source: Spring Surf API
audience: 
category: API
option: put
---

# `put`

`put()` - these methods invoke a URI on a remote service, passing the supplied body as a PUT request.

**Parent topic:**[ScriptRemoteConnector](../references/APISurf-ScriptRemoteConnector-connectors.md)

## `put`

`put(String uri, String body)` - this method invokes a URI on a remote service, passing the supplied body as a put request.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the put request.


### Returns

Returns a `Response` object.

## `put`

`put(String uri, String body, String contentType)` - this method invokes a URI on a remote service, passing the supplied body as a put request.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the put request.

-   **contentType**

    A string representing the content mimetype of the request body.


### Returns

Returns a `Response` object.

