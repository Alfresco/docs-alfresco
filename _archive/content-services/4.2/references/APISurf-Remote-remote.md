---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# remote

The remote object stores details of endpoints.

The remote object provides the following properties:

|`endpointIds`|A string of available endpoint identifiers.|

-   **[setConfigService](../references/APISurf-Remote-setConfigService.md)**  
The `setConfigService(ConfigService configService)` - sets the configuration service.
-   **[setConnectorProvider](../references/APISurf-Remote-setConnectorProvider.md)**  
The `setConnectorProvider(ConnectorProvider connectorProvider)` - sets the connector provider.
-   **[connect](../references/APISurf-Remote-connect.md)**  
The `connect()` - these methods create and return a `ScriptRemoteConnector` object.
-   **[call](../references/APISurf-Remote-call.md)**  
The `call(String uri)` - invokes a specific URI on the default endpoint.
-   **[getEndpointName](../references/APISurf-Remote-getEndpointName.md)**  
The `getEndpointName(String endpointId)` - return an endpoint name given the specified endpoint ID.
-   **[getEndpointDescription](../references/APISurf-Remote-getEndpointDescription.md)**  
The `getEndpointDescription(String endpointId)` - return an endpoint description given the specified endpoint ID.
-   **[getEndpointURL](../references/APISurf-Remote-getEndpointURL.md)**  
The `getEndpointURL(String endpointId)` - return an endpoint URL given the specified endpoint ID.
-   **[isEndpointPersistent](../references/APISurf-Remote-isEndpointPersistent.md)**  
The `isEndpointPersistent(String id)` - checks if an endpoint is persistent or not. True if the endpoint is persistent.

**Parent topic:**[Surf root-scoped objects](../references/APISurf-rootscoped.md)

