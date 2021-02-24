---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# connect

The `connect()` - these methods create and return a `ScriptRemoteConnector` object.

**Parent topic:**[remote](../references/APISurf-Remote-remote.md)

## connect

The `connect()` - constructs a remote connector to a default endpoint \(if configured\). If a default endpoint is not configured, null will be returned.

### Returns

Returns a `ScriptRemoteConnector` object.

## connect

The `connect(String endpointId)` - constructs a remote connector to a specific endpoint. If the endpoint does not exist, null is returned.

### Parameters

-   **endpointId**

    A string representing the endpoint.


### Returns

Returns a `ScriptRemoteConnector` object.

