---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Nodes

The core data structure in the repository is called a node. Each piece of content in the repository has a corresponding node data structure to reference the content and metadata. Each node has a corresponding `NodeRef` uniquely identifying it in the repository. Examples of nodes are folders, files, and comments.

|Information|Nodes|
|-----------|-----|
|Public Java API|This API exposes the [NodeService](dev-services-node.md) as a way of managing nodes. To search for nodes use the [SearchService](dev-services-search.md).|
|Repository JavaScript API|You can find nodes using the [Search API](API-JS-Search.md), and then manipulate individual nodes using the [ScriptNode API](API-JS-ScriptNode.md)|
|Alfresco ReST API|The Alfresco ReST API can be used to access different types of nodes, such as folders, files, tags, comments, and ratings. See the [Managing Folders and Files ReST API documentation.](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md).|
|CMIS ReST API|The preferred way to access nodes in Alfresco is via the Alfresco ReST API. However, if your requirements are to use an open standard, then have a look at [OASIS Content Management Interoperability Services \(CMIS\)](https://www.oasis-open.org/committees/cmis/). See the [CMIS Getting Started](../pra/1/concepts/cmis-getting-started.md) section to get going with the CMIS ReST API. This information covers the ATOM binding where you work with XML. If you prefer to work with JSON, then have a look at the [Browser binding](../pra/1/concepts/cmis-1.1-intro.md) available in CMIS 1.1.If you are developing a remote client in Java and want to use CMIS, then have a look at the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java Library.

|
|Mobile SDK \(iOS|The Node is exposed in the SDK Model. You can review the [documentation for AlfrescoNode](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoNode.html).|
|Mobile SDK \(Android\)|The Node is exposed in the SDK Model. You can review the [documentation for AlfrescoNode](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Node.html)|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Custom Content Store platform extension point documentation](dev-extension-points-custom-content-store.md)

|

**Parent topic:**[Using the APIs by Function](../concepts/dev-api-by-function.md)

