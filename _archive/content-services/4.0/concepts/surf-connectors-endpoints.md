---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
keyword: [Surf, connectors, credentials, authenticators]
---

# Connectors and endpoints

Connectors and endpoints are both defined through simple configuration as part of Surf’s remote configuration block.

Declaring an endpoint is fairly simple. It may look something like this:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>
      <id>springsurf</id>
      <name>Spring Surf</name>
      <connector-id>http</connector-id>
      <endpoint-url>http://www.springsurf.org</endpoint-url>
    </endpoint>
  </remote>
</config>
```

This defines an endpoint named `springsurf`. When talking to this endpoint, a connector of type `http` should be used. The data source lives at `www.springsurf.org:8080`. Since nothing else is provided, this is assumed to be an unauthenticated endpoint.

Surf provides a number of out-of-the-box connectors. The `http` connector lets you connect to HTTP or HTTPS endpoints. To assert an identity to the endpoint, you can adjust the configuration:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>
      <id>springsurf</id>
      <name>Spring Surf</name>
      <connector-id>http</connector-id>
      <endpoint-url>http://www.springsurf.org</endpoint-url>
      <identity>declared</identity>
      <username>USERNAME</username>
      <password>PASSWORD</password>
    </endpoint>
  </remote>
</config>
```

The credentials for an `http` connector are passed through using Basic authentication. The values USERNAME and PASSWORD are just placeholders for your own values. With an endpoint defined, you can code against the endpoint and use it without worrying about managing connection state and asserting credentials. You could use the following Web script controller code to retrieve something from the `springsurf` endpoint:

```
// get a connector to the springsurf endpoint
var connector = remote.connect("springsurf");
// place text file into the model
var txt = connector.get("/sample/helloworld.txt");
model.txt = txt;
```

The `remote` root-scope variable provides various methods and accessors for working with connectors. When it is used, the connection mechanics are abstracted away and your web script code becomes highly portable from one environment to another, as well as reusable across many users.

**Parent topic:**[Connectors and credentials](../concepts/surf-connectors-intro.md)

