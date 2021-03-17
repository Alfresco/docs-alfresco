---
author: Alfresco Documentation
---

# Nodes

The core data structure in the Alfresco Repository is called a node. Each piece of content in the Repository has a corresponding node data structure to reference the content and metadata. Each node has a corresponding `NodeRef` uniquely identifying it in the Repository.

|Information|Nodes|
|-----------|-----|
|Public Java API|This API exposes the [NodeService](dev-services-node.md) as a way of managing nodes. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/model/NodeService.html). To search for nodes use the [SearchService](dev-services-search.md), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/search/SearchService.html).|
|Repository JavaScript API|You can find nodes using the [Search API](API-JS-Search.md), and then manipulate individual nodes using the [ScriptNode API](API-JS-ScriptNode.md)|
|Alfresco REST API|The Alfresco REST API can be used to access entities related to nodes, such as tags, comments, and ratings. These are Alfresco specific entities not part of the CMIS standard. See the [Node REST API documentation.](../pra/1/concepts/pra-nodes.md). Use the CMIS API to access the actual node information.|
|CMIS REST API|The content and metadata for nodes can be accessed and managed via the CMIS REST API. See the [CMIS Getting Started](../pra/1/concepts/cmis-getting-started.md) section to get going with the CMIS REST API. This information covers the ATOM binding where you work with XML. If you prefer to work with JSON, then have a look at the [Browser binding](../pra/1/concepts/cmis-1.1-intro.md) available in CMIS 1.1.If you are developing a remote client in Java and want to use CMIS, then have a look at the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java Library.

|
|Mobile SDK \(iOS|The Node is exposed in the SDK Model. You can review the [documentation for Alfresco Node](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoNode.html).|
|Mobile SDK \(Android\)|The Node is exposed in the SDK Model. You can review the [documentation for Alfresco Node](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Node.html)|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Custom Content Store platform extension point documentation](dev-extension-points-custom-content-store.md)

|

**Parent topic:**[By Function](../concepts/dev-api-by-function.md)

