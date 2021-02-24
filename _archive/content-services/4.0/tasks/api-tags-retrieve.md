---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [RESTful API, services]
keyword: tags retrieve
---

# Using the RESTful API to retrieve document tags

This is a simple example of using a Remote API to retrieve a list of tags for a document.

-   The following is an example of calling a RESTful API to retrieve the list of tags for a document:

    http://localhost:8080/alfresco/service/api/node/workspace/SpacesStore/ 97526d57-d1ce-4578-931d-0cc48ff23602/tags

    This retrieves all the tags for the node with the node reference workspace: //SpacesStore/97526d57-d1ce-4578-931d-0cc48ff23602 in the body of the HTTP response, formatted in JSON.

    For example:

    ```
    {  "data" : ["tagOne", "tagTwo"] 
    }
    ```


**Parent topic:**[Using Remote APIs](../concepts/serv-api-remote-about.md)

**Related information**  


[Using Remote APIs](../concepts/serv-api-remote-about.md)

