---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
keyword: [Surf, connectors, credentials, authenticators]
---

# Credentials

Surf provides credential management on behalf of users who access content using connectors. If a connector needs to know which credentials to attach to a given request during an authentication handshake, it can call upon the credential vault.

Surf’s default credential vault is runtime-only; it is populated and used at runtime. If you restart the server, the credentials are lost and the user must provide their credentials again the next time the connector is used. Surf lets you override the credential vault implementation. It provides a number of additional credential vaults out of the box you can use or base your implementations on. These include a filesystem– persistent credential vault and an Alfresco credential vault \(where your credentials are stored in an Alfresco-managed file\).

To use the credential vault, you inform the endpoint that its identity is driven from the current user. You can make this change to your endpoint definition:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>
      <id>springsurf</id>
      <name>Spring Surf</name>
      <connector-id>http</connector-id>
      <endpoint-url>http://www.springsurf.org</endpoint-url>
      <identity>user</identity>
    </endpoint>
  </remote>
</config>
```

Connectors to this endpoint will look for the user’s credentials in the credential vault. If credentials are not found and the endpoint requires authentication, the connection may fail. However, if credentials are available in the vault, they will be applied and the connector will access the endpoint on behalf of the developer without the need for manual login.

**Parent topic:**[Connectors and credentials](../concepts/surf-connectors-intro.md)

