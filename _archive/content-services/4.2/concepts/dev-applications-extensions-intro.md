---
author: Alfresco Documentation
---

# Developing Applications and Extensions

This section of the documentation looks at building applications and extensions for Alfresco. There are various APIs and approaches that can be used in developing for Alfresco, from constructing small web scripts, to sophisticated extensions.

There are a variety of APIs, including JavaScript and REST APIs, that can be used to develop your Alfresco applications and extensions. There are also several approaches with regards packaging and deployment of extensions too. Larger extensions tend to be distributed most conveniently as Alfresco Module Packages \(AMPs\), although this is not the only option. In addition there are two SDK approaches that can be used, the older Ant-based SDK and the much more recently updated Maven Alfresco SDK.

-   **[Designing your application](../concepts/alfresco-considerations.md)**  
While Alfresco can scale from small solutions to an enterprise-wide infrastructure, you must consider how to configure Alfresco and which tools and interfaces to use to develop your content application.
-   **[Alfresco Repository](../reuse/gge-hdg-alfrescodevelopment.md)**  
This section provides some guidelines and examples for developing against Alfresco repositories.
-   **[Alfresco Services](../concepts/serv-using-about.md)**  
 Services are core to the Alfresco content application server and are used by all applications working against the server. These applications include the Alfresco Explorer and Alfresco Share clients, Virtual File System interfaces such as CIFS, WebDAV, and APIs.
-   **[Alfresco Integration](../concepts/integration-options.md)**  
Alfresco provides many programmatic ways to access the content management capabilities of the system to support applications that need access to content services. Because Alfresco supports a number of standards-based protocols; applications and application development environments can use existing tools to access, update, and search Alfresco content.
-   **[Web Scripts](../concepts/ws-architecture.md)**  
Alfresco web scripts provide a unique way to programmatically interact with the Alfresco content application server. Unlike other interfaces exposed by Alfresco, web scripts offer a RESTful API for the content residing in the content repository. The REST \(Representational State Transfer\) web architecture is based on HTTP requests and responses, URIs \(Uniform Resource Identifiers\), and document types.
-   **[Alfresco Extensions](../concepts/dev-extensions-intro.md)**  
This section of the documentation looks at developing extensions for Alfresco.
-   **[Share extensions](../concepts/dev-extensions-share.md)**  
This section of the documentation looks at developing extensions for Alfresco Share. In particular this documentation looks at the creation of Share Extensibility Modules.
-   **[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)**  
The Maven Alfresco SDK is a community project that provides an easy to use approach to developing applications and extensions for Alfresco.
-   **[Programming with Surf](../concepts/surf-fwork-intro.md)**  
Surf lets you build user interfaces for web applications using server-side scripts and templates without Java coding, recompilation, or server restarts. Surf follows a content-driven approach, where scripts and templates are simple files on disk so that you can make changes to a live site in a text editor.
-   **[Content modeling](../concepts/content-modeling-about.md)**  
Content modeling is a fundamental building block of the Alfresco content repository that provides a foundation for structuring and working with content.
-   **[Alfresco One API](../pra/1/topics/pra-welcome.md)**  
 The Alfresco One API lets you access content in an on-premise Alfresco repository, and in Alfresco cloud, from your own applications. The API is RESTful, which means each call is an HTTP request, so you don't even need a programming language to try it out. You can just type a URL address in a web browser. It consists of two parts, the standard CMIS API, which lets you manage and access content, and the new Alfresco One REST API which lets you manage Alfresco's additional features such as ratings and comments, that are not covered by the CMIS standard.
-   **[Alfresco API Reference](../concepts/API-intro-4.md)**  
 This reference describes the publicly available and supported APIs \(Application Programming Interfaces\) that enable developers to write applications that access Alfresco.
-   **[Alfresco Public Java API](../concepts/java-public-api-list.md)**  
The following alphabetically ordered list of class names is the complete Alfresco Public Java API. Your Java applications should only use methods found in these packages.
-   **[Alfresco RESTful API reference](../references/RESTful-intro.md)**  
The RESTful API lets your client remotely communicate with the Alfresco content application server using HTTP-based resource-oriented interfaces. This is the full list of the publicly available web scripts that compose the RESTful API. The web scripts are organized by package.

**Parent topic:**[For Developers](../concepts/dev-for-developers.md)

