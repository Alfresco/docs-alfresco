---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
keyword: [Surf, connectors, credentials, endpoints]
---

# Remote API

The `remote` root-scoped object lets you connect to remote services and retrieve data feeds.

The basic pattern is to use the remote object to get a connector to a specific endpoint, which is identified by endpoint ID. For example:

`var connector = remote.connect(ENDPOINT_ID);`

By filling in `ENDPOINT_ID` with the correct value, you have a connector to the remote service. The connector variable is an object with additional methods describing all the ways you can work with the endpoint.

The following methods are the basic HTTP method types that support the essential CRUD \(create, read, update, delete\) operations of most RESTful services. You can use these to work with services right within your Web scripts.:

-   `post(uri, body)`—POSTs content to the given URI
-   `post(uri, body, contentType)`—POSTs content of the specified type to the given URI
-   `get(uri)`—GETs content from the given URI
-   `put(uri, body)`—PUTs content to the given URI
-   `put(uri, body, contentType)`— PUTs content of the specified type to the given URI
-   `delete(uri)`—Invokes a URI as a DELETE request

**Parent topic:**[Connectors and credentials](../concepts/surf-connectors-intro.md)

