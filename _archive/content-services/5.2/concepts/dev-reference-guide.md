---
author: Alfresco Documentation
---

# API Reference

This information provides reference materials for the various Alfresco Content Services APIs that are available.

**Note:** When searches are completed using Solr, totalItems is only a part of the results via ReST, CMIS, JavaScript, and Java. When TMQ searches are used it will not be returned. The only way to force the use of Solr with ReST and JavaScript is to use something in the search that requires Solr. Additionally, the Java API allows you to set Query Consistency.

This information includes API reference guides. For more descriptive material, including tutorials, see the Developer Guide.

-   **[ReST APIs](../pra/1/topics/pra-welcome.md)**  
The ReST APIs lets you access content in an on-premise repository from your own applications. The APIs are ReSTful, which means each call is an HTTP request, so you don't even need a programming language to try it out. You can just type a URL address in a web browser. There are two types of ReST APIs, the Alfresco ReST API and the standard CMIS ReST API.
-   **[Java API](../concepts/java-public-api-list.md)**  
When you need to create new services in Alfresco Content Services, or develop applications or customizations that cannot be implemented at the web script level, it is necessary to write those extensions in Java. Alfresco Content Services provides Java-level APIs, which are documented through the JavaDoc system.
-   **[JavaScript API](../concepts/API-JS-intro.md)**  
The Repository JavaScript API lets you develop JavaScript \(ECMAScript\) 1.6 compatible files to access, modify, and create repository objects such as nodes, aspects, and properties.
-   **[Search API](../concepts/search-api.md)**  
The Search API provides access to the search features of Alfresco Content Services.
-   **[FreeMarker API](../references/API-FreeMarker-intro.md)**  
FreeMarker templates can be used to generate the view component of the Model-View-Controller \(MVC\) pattern.
-   **[Web Scripts](../concepts/ws-reference.md)**  
This information provides reference material for web script options, objects, and methods.
-   **[Spring Surf API](../references/APISurfPlatform-intro.md)**  
The Surf API lets you build user interfaces for your web applications using server-side scripts and templates. This is the full list of the objects and methods that compose the Surf API that can be access from web script JavaScript controllers and FreeMarker templates.

**Parent topic:**[API guide](../concepts/dev-api-intro.md)

