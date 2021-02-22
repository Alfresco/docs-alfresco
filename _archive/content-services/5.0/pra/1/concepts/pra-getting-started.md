---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Getting started

To get you started with the API, this section explains the format of the URL you will use, and what to expect in responses.

-   **[What is an entity?](../../../pra/1/concepts/pra-entities.md)**  
The generic term used in the API for any object in an Alfresco repository is entity. An entity is of a specific entity type, and has a unique entity id.
-   **[What does a request look like?](../../../pra/1/concepts/pra-request.md)**  
You call a method on the API by issuing an authenticated HTTP request with a URL.
-   **[What does a response look like?](../../../pra/1/concepts/pra-response.md)**  
All responses are JSON objects. The format of the response object depends on the request. The object can contain an entry object, an entry and a relations object, a list object, or an error object. Note that if a property or an entire object has no value, then it is not returned in the parent object.
-   **[Using HTTP OPTIONS to get entity metadata](../../../pra/1/concepts/pra-options.md)**  
The Alfresco REST API supports the use of the HTTP OPTIONS method to retrieve structured information on the methods available on an entity and its relations.
-   **[Items and packages](../../../pra/1/concepts/act-items-and-packages.md)**  
 When a process is created, a list of items can be given as an input parameter. The items are a list of `nodeids`. A `nodeId` is a `nodeRef` with the workspace://SpacesStore prefix removed. During creation of the process, a new package node is created in the repository. All provided items are associated with that package node.

**Parent topic:**[Alfresco REST API](../../../pra/1/topics/pra-welcome-aara.md)

