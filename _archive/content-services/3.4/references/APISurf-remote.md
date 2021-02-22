---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# remote

The remote object provides the following properties:

|`endpointIds`|A string of available endpoint identifiers.|

The remote object provides the following methods:

## `connect()`

Provides a `Connector` to the default endpoint.

## `connect(endpointId)`

Provides a `Connector` to the given endpoint ID; see `Connector` object details.

## `call(uri)`

Invokes a URI on the default endpoint; this is a shortcut for calling `remote.connect().call(uri)`.

## `getEndpointName(endpointId)`

Returns the display name for an endpoint.

## `getEndpointDescription(endpointId)`

Returns the description for an endpoint.

## `getEndpointURL(endpointId)`

Returns the URL for an endpoint.

## `isEndpointPersistent()`

Returns true if the endpoint persists authentication details locally on the Web tier; default for endpoint definitions is false.

For example:

```
// get a connector to the Alfresco repository endpoint
var connector = remote.connect("alfresco");

// retrieve the web script index page
var indexHtml = connector.get("/index");
```

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

