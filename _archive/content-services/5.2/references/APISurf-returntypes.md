---
author: Alfresco Documentation
---

# Return types

A number of different objects can be returned from the various APIs provided by the root-scoped objects. They include important concepts such as Model Objects, which generically wrap the XML configuration for any Surf object, and Connectors, which enable RESTful style calls to configured remote endpoints.

-   **[ScriptModelObject](../references/APISurf-ScriptModelObject-modelobjects.md)**  
Model objects are returned from most of the query functions on `sitedata`. They are also bound to rendering contexts. A model object could be a component, a template, or any other object type.
-   **[ScriptRemoteConnector](../references/APISurf-ScriptRemoteConnector-connectors.md)**  
Connectors are retrieved by using the `remote` object and are used to communicate with configured endpoints. This communication generally consists of an HTTP request followed by an appropriate `Response` object \(JSON, XML, or other format\).
-   **[Response](../references/APISurf-Response-response.md)**  
The `Response` object wraps the response data, status code, status message, and any exception information from a remote call.
-   **[ResponseStatus](../references/APISurf-ResponseStatus-responsestatus.md)**  
The `ResponseStatus` object wraps the response status code, status message, and any exception information from a remote call. The `ResponseStatus` object inherits from the `Status` object.

**Parent topic:**[Spring Surf API](../references/APISurfPlatform-intro.md)

