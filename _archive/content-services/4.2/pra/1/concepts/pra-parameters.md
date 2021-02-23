---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# HTTP Parameters

The API provides several HTTP parameters that you can append to any API method URL to filter the returned results. The parameters are optional and can be use in combination with each other. There are also parameters that are used in a specific API method. You will find those documented in the API reference. Parameters listed here are applicable to any API method.

-   **[Pagination](../../../pra/1/concepts/pra-pagination.md)**  
As a developer, the REST API gives you control on how much of a returned collection you want to receive.
-   **[Sorting your returned objects](../../../pra/1/concepts/pra-sorting.md)**  
For some collections, you can control the order of the entities returned using the orderBy parameter
-   **[Using SELECT to filter output](../../../pra/1/concepts/pra-property-select-get.md)**  
You might only be interested in a subset of properties in a returned entity or list of entities. You can use the SELECT parameter to restrict the returned properties.
-   **[Using SELECT to set properties](../../../pra/1/concepts/pra-property-select-put.md)**  
You can use the SELECT parameter to request a partial update of an object.
-   **[Using WHERE to restrict output](../../../pra/1/concepts/pra-property-where.md)**  
You can use the WHERE parameter to restrict the returned objects by a predicate. As in SQL, WHERE defines a boolean expression that all results must meet. It is made up of one or more conditions on properties, composed together using the logical connectors; AND, OR, and NOT. You can group expressions using parentheses.
-   **[Filtering properties](../../../pra/1/concepts/pra-property-filter.md)**  
You may only be interested in a subset of properties in a returned entity. You can use the properties parameter to restrict the returned properties.
-   **[Including relations](../../../pra/1/concepts/pra-relations-filter.md)**  
 Use the `relations` parameter to include one or more related entities in a single response.

**Parent topic:**[What does a request look like?](../../../pra/1/concepts/pra-request.md)

