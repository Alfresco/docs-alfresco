---
author: Alfresco Documentation
---

# Using Remote APIs

Remote APIs allow clients connecting from a separate tier to communicate with the Alfresco content application server. Remote APIs are based on web services and RESTful and CMIS protocols, and are language agnostic, allowing you to develop against these APIs using a range of languages including Java, PHP, Ruby, and .NET.

There are several Remote APIs available, including:

-   **Alfresco One API** - The Alfresco One API lets you access content managed by Alfresco in the Cloud and Alfresco on premise deployments from your own applications. The API is RESTful, which means each call is an HTTP request, so you don't even need a programming language to try it out \(you can use Curl or any other HTTP client\). Further information can be found in the [Alfresco One API documentation](../pra/1/topics/pra-welcome.md).
-   **Repository REST API** - HTTP-based resource-oriented interfaces used by the Surf framework and Alfresco Share. More information can be found in the [Repository REST API Reference](../references/RESTful-intro.md).
-   **CMIS** - a standard that defines web services and REST-based bindings for working with CMIS compliant repositories. Further information can be found in the [CMIS guide](../pra/1/topics/cmis-welcome.md). Also see the [CMIS website](http://chemistry.apache.org/project/cmis.html).

-   **[Using the Repository REST API to retrieve document tags](../tasks/api-tags-retrieve.md)**  
 This is a simple example of using a Remote API to retrieve a list of tags for a document.

**Parent topic:**[Overview of Alfresco APIs](../concepts/API-intro.md)

