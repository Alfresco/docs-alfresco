---
author: Alfresco Documentation
---

# cache

The `cache` element specifies the required caching level. The `cache` element is optional.

The `cache` element has the following child elements:

-   **`never` \(optional\)**

    Specifies whether caching should be applied at all. Valid values, which are optional, are as follows:

    -   `true` \(default\) - specifies the web script response should never be cached.
    -   `false` - specifies the web script response may be cached.
    If `never` is not specified, the default is `true`.

-   **`public` \(optional\)**

    Specifies whether authneticated responses should be cached in the public cache. Valid values, which are optional, are as follows:

    -   `true` \(default\) - specifies the web script authenticated response may be cached in a public cache.
    -   `false` - specifies the web script authenticated response may not be cached in a public cache.
    If `public` is not specified, the default is false.

-   **`mustrevalidate` \(optional\)**

    Specifies whether a cache must revalidate its version of the web script response in order to ensure freshness. Valid values, which are optional, are as follows:

    -   `true` \(default\) - specifies that validation must occur.
    -   `false` - specifies that validation may occur.
    If `mustrevalidate` is not specified, the default is true.


An example usage of the `cache` element follows:

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
  **<cache\>
    <never\>false</never\>
    <public\>false</public\>
    <mustrevalidate/\>
  </cache\>**
  <negotiate accept="text/html">html</negotiate>
  <negotiate accept="text/xml">xml</negotiate>
</webscript>        
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

