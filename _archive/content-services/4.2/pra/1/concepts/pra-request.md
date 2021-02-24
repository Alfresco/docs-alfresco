---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# What does a request look like?

You call a method on the API by issuing an authenticated HTTP request with a URL.

The four HTTP methods are used in the following ways:-

-   **POST**

    is used to create a new entity in a collection of entities

-   **GET**

    is used to retrieve information on a single entity or to retrieve a list of entities

-   **PUT**

    is used to update a single entity

-   **DELETE**

    is used to delete a single entity


-   **[Request URL format](../../../pra/1/concepts/pra-request-url-format.md)**  
Each request is a URL with a specific format. The format is dependent on the type of target repository.
-   **[API method format](../../../pra/1/concepts/pra-request-api-format.md)**  
The method itself consists of at least one entity type, or an entity type and an entity id, or concatenations of entity type and id pairs, optionally followed by HTTP parameters that filter the results.
-   **[Specifying the current user](../../../pra/1/concepts/pra-request-current-user.md)**  
When making an Alfresco REST API call, your application may not know the userId of the currently authenticated user. You can use the string `-me-` to represent that user in request URLs, and PUT and POST request bodies.
-   **[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)**  
The API provides several HTTP parameters that you can append to any API method URL to filter the returned results. The parameters are optional and can be use in combination with each other. There are also parameters that are used in a specific API method. You will find those documented in the API reference. Parameters listed here are applicable to any API method.

**Parent topic:**[Getting Started](../../../pra/1/concepts/pra-getting-started.md)

