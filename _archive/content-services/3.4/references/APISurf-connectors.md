---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# connectors

Connectors are retrieved via the `remote` object and are used to communicate with configured endpoints. This communication generally consists of an HTTP request followed by an appropriate `Response` object \(JSON, XML, or other format\).

By default, the following properties are available:

|`endpoint`|The ID of the endpoint to which this connector is bound.|

The following methods are also available:

## `call(uri)`

Invokes a URI on the endpoint; this is the same as calling `get(uri)`.

## `get(uri)`

Invokes a GET request URI on the endpoint.

## `post(uri, body)`

Invokes a URI on the endpoint, passing the supplied body as a POST request.

## `post(uri, body, mimetype)`

Invokes a URI on the endpoint, passing the supplied body as a POST request; the given MIME type for the content body is applied.

## `put(uri, body)`

Invokes a URI on the endpoint, passing the supplied body as a PUT request.

## `put(uri, body, mimetype)`

Invokes a URI on the endpoint, passing the supplied body as a PUT request; the given MIME type for the content body is applied.

## `del(uri)`

Invokes a URI on the endpoint as DELETE request.

**Parent topic:**[Return types](../references/APISurf-returntypes.md)

