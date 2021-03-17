---
author: Alfresco Documentation
---

# negotiate

The `negotiate` element associates an Accept header MIME type to a specific web script format of response. The mandatory value specifies the format while the mandatory attribute, `accept`, specifies the MIME type. Content Negotiation is enabled with the definition of at least on `negotiate` element. The `negotiate` element can be specified zero or more times.

The `negotiate` element has the following attributes:

-   **`accept`**

    Specifies the MIME type.


An example usage of the `negotiate` element follows:

```

<webscript kind="org.alfresco.httpsonly"> 
  <shortname>Hello World</shortname>
  <description>Greet a user</description>
  <url>/sample/helloworld?to={name}</url>
  <url>/sample/helloworld.xml?to={name}</url>
  <format default="html">extension</format>
  <lifecycle>sample</lifecycle>
  <authentication runas="fred">user</authentication>
  <transaction>required</transaction>
  <family>Sample</family>
  <cache>
    <never>false</never>
    <public>false</public>
    <mustrevalidate/>
  </cache>
  **<negotiate accept="text/html"\>html</negotiate\>
  <negotiate accept="text/xml"\>xml</negotiate\>**
</webscript>        
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

