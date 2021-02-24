---
author: Alfresco Documentation
---

# Getting Started

To get you started with CMIS, this section explains the format of the URL you will use, and what responses to expect.

Note when reading this documentation and any other information on CMIS, that the CMIS term **repository** maps directly to the Alfresco Cloud term **network**. If you are accessing an Alfresco on-premise instance, the CMIS and Alfresco term **repository** are synonymous.

-   **[The domain model](../../../pra/1/concepts/cmis-domain-model.md)**  
CMIS defines a domain model. A client will access a CMIS service endpoint described by a URL. A service endpoint must have at least one repository. A repository, in this case an instance of Alfresco, is a data store which contains content. Each item of content is an object such as a folder, or a document. A repository is identified by its ID, and has a set of capabilities which describe what optional CMIS functionality the repository supports.
-   **[What does a request look like?](../../../pra/1/concepts/cmis-request.md)**  
You call a method on the CMIS AtomPub REST API by issuing an authenticated HTTP request with a URL.
-   **[Getting the service document](../../../pra/1/concepts/cmis-get-service-document.md)**  
The capabilities available to your application from an instance of on-premise Alfresco or the Alfresco Cloud are described in a an AtomPub document returned when calling the base URL. The service document contains information on the repository, the CMIS methods that can be called on it, and the parameters for those methods.
-   **[Getting information on a node](../../../pra/1/concepts/cmis-get-node-details.md)**  
You can get information on a specific node in the repository by using its `id`. The resulting AtomPub XML document describes the node. You can tailor the information returned by providing HTML parameters.
-   **[Getting the children of a node](../../../pra/1/concepts/cmis-get-node-children.md)**  
You can get the children of a specific node in the repository by using its `id`. The resulting AtomPub XML document describes children of the node. You can tailor the information returned by providing HTML parameters. You can use this method to navigate a folder tree in the repository.
-   **[Getting the contents of a document](../../../pra/1/concepts/cmis-get-document-content.md)**  
You can get the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.
-   **[Updating the contents of a document](../../../pra/1/concepts/cmis-put-document-content.md)**  
 You can replace the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.

**Parent topic:**[Alfresco CMIS API](../../../pra/1/topics/cmis-welcome.md)

