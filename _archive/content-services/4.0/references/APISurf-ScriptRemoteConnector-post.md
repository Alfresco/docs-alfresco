---
author: [Alfresco Documentation, Alfresco Documentation]
source: Spring Surf API
audience: 
category: API
option: post
---

# `post`

`post()` - these methods invoke a URI on a remote service, passing the supplied body as a POST request.

**Parent topic:**[ScriptRemoteConnector](../references/APISurf-ScriptRemoteConnector-connectors.md)

## `post`

`post(String uri, String body)` - this method invokes a URI on a remote service, passing the supplied body as a POST request.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the POST request.


### Returns

Returns a `Response` object.

## `post`

`post(String uri, String body, String contentType)` - this method invokes a URI on a remote service, passing the supplied body as a POST request.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the POST request.

-   **contentType**

    A string representing the content mimetype of the request body.


### Returns

Returns a `Response` object.

