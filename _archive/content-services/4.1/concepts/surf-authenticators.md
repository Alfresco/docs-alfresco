---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
keyword: [Surf, connectors, credentials, endpoints]
---

# Authenticators

Authenticating connectors are connectors that have authenticators plugged into them. An authenticator is a class that knows how to perform an authentication handshake with a specific kind of service or application.

For example, MediaWiki provides a REST-based means for authenticating. You pass in your user credentials and it hands back an HTTP cookie. This cookie must be applied to every subsequent request, as MediaWiki looks to it to inform the application of who is making the request.

Alfresco has a similar REST-based means for authenticating. It is slightly different in that the RESTful parameters are not the same as those of MediaWiki. Furthermore, Alfresco hands back a ticket in an XML return payload. This ticket must be applied to the HTTP headers of every subsequent call so that Alfresco knows who is making the request. Every application has a slightly different way of handling its authentication. For this reason, Surf makes it easy to write your own authenticators and plug them into your connectors entirely through configuration.

You define authenticators through configuration as well:

```
<authenticator>
    <id>alfresco-ticket</id>
    <name>Alfresco Authenticator</name>
    <description>Alfresco Authenticator</description>
    <class>org.alfresco.connector.AlfrescoAuthenticator</class>
</authenticator>
```

You can then bind them to connectors using configuration, or you can write your own connectors:

```
<connector>
    <id>alfresco</id>
    <name>Alfresco Connector</name>
    <description>Connects to Alfresco using ticket-based authentication</description>
    <class>org.alfresco.connector.AlfrescoConnector</class>
    <authenticator-id>alfresco-ticket</authenticator-id>
</connector>
```

The `alfresco-ticket` authenticator and the `alfresco` connector are both available to Surf developers out of the box to connect to an Alfresco instance. All you need to do is define an endpoint that points to an Alfresco instance and uses the `alfresco` connector. Alfresco connectors use an Alfresco authenticator to perform a handshake ahead of any actual interaction. The handshake establishes who the user is and then sets up the connector session so that subsequent requests contain the appropriate connection information \(cookies, request headers, and so forth\). The endpoint definition may look like this:

```
<endpoint>
    <id>alfresco</id>
    <name>Alfresco REST API</name>
    <description>Alfresco REST API</description>
    <connector-id>alfresco</connector-id>
    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
    <identity>user</identity>
</endpoint>
```

This endpoint is named `alfresco`. It uses an `alfresco` connector and will draw credentials from the user’s credential vault. This is all defined in configuration. You could use the `alfresco` endpoint to talk to an Alfresco instance and access its remote API. For example, you may wish to interact with the CMIS API on the Alfresco repository. Here is an example of retrieving XML from the Alfresco CMIS API:

```
// get a connector to the alfresco endpoint
var connector = remote.connect("alfresco");
// place CMIS text onto the model
model.cmis = connector.get("/api/path/workspace/SpacesStore");
```

By simply coding to the remote object, you do not need to worry about how to connect to the endpoint or pass along user state.

**Parent topic:**[Connectors and credentials](../concepts/surf-connectors-intro.md)

