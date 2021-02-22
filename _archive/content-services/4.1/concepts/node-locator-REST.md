---
author: Alfresco Documentation
---

# NodeLocator Service REST API

A REST API is provided for the `NodeLocatorService`. It is used by the form association control to determine the `startLocation` of the control but can be used by any client if required.

The following example shows the web script descriptor:

```


<webscript> 
   <shortname>Node Locator</shortname>
   <description>Locates a Node in the repository using the specified Node Location strategy.</description>
   <url>/api/{store_type}/{store_id}/{node_id}/nodelocator/{node_locator_name}</url>
   <url>/api/nodelocator/{node_locator_name}</url>
   <format default="json"/>
   <authentication>user</authentication>
   <transaction allow="readonly">required</transaction>
</webscript>


```

Two URLs are supported: one that allows a source node to be provided; and one that does not. This is useful for well known nodes, **Company Home**, **Sites Home**, for example. Parameters are passed as query string parameters. A request for the example node locator may look like the following:

```
http://localhost:8080/alfresco/api/workspace/SpacesStore/28740556-129a-4ae8-b6c8-952fff728d63/nodelocator/namedfolder?name=Example
```

The following example shows a typical response:

```
{
   "data":
   {
      "nodeRef": "workspace://SpacesStore/d2a8bc42-4874-4d45-9a23-33cdd02be777"
   }
}
```

**Parent topic:**[NodeLocator service](../concepts/node-locator-intro.md)

