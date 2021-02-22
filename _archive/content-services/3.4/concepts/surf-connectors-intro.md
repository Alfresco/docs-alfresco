---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
keyword: [Surf, connectors, credentials, authenticators]
---

# Connectors and credentials

Web script developers often work with remote sources of data. Surf makes it easy to reach out to these information sources and pull together feeds of data.

These data sources might be SOAP or RESTful providers, CMIS repositories, or proprietary in nature. Furthermore, each data source may require a unique set of credentials to work with the data source.

Surf lets you define connectors responsible for communicating with endpoints where a data source lives, such as a server residing at an HTTP address. Connectors connect to an endpoint and communicate with it.

Connectors are wired together with authenticators so that they can effectively handshake and establish credentials with endpoints. This pattern abstracts away any of the manual management of connection state that you would otherwise need to perform. Using authenticators, connectors manage user identity and session state to the endpoint. This is automatically managed for the duration of the user session in the Surf application itself.

-   **[Connectors and endpoints](../concepts/surf-connectors-endpoints.md)**  
Connectors and endpoints are both defined through simple configuration as part of Surf’s remote configuration block.
-   **[Credentials](../concepts/surf-credentials.md)**  
Surf provides credential management on behalf of users who access content using connectors. If a connector needs to know which credentials to attach to a given request during an authentication handshake, it can call upon the credential vault.
-   **[Authenticators](../concepts/surf-authenticators.md)**  
Authenticating connectors are connectors that have authenticators plugged into them. An authenticator is a class that knows how to perform an authentication handshake with a specific kind of service or application.
-   **[Remote API](../concepts/surf-remote-api.md)**  
The `remote` root-scoped object lets you connect to remote services and retrieve data feeds.

**Parent topic:**[Working with the Surf framework](../concepts/surf-fwork-intro.md)

