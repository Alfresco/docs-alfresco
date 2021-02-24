---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script components, description document, controller script, response template]
---

# Repository-tier web scripts

Alfresco web scripts provide a unique way to programmatically interact with the Alfresco content application server. Unlike other interfaces exposed by Alfresco, web scripts offer a RESTful API for the content residing in the content repository. The REST \(Representational State Transfer\) web architecture is based on HTTP requests and responses, URIs \(Uniform Resource Identifiers\), and document types.

Web scripts let you implement your own RESTful API without tooling or Java knowledge, requiring only a text editor. This approach to developing an Alfresco API means that web scripts offer many advantages over existing technologies, including ease and speed of development, and flexibility in API design. By focusing on the RESTful architectural style, web scripts let you build custom URI-identified and HTTP accessible content management web services backed by the Alfresco content application server.

Web scripts provide RESTful access to content held within your Alfresco content repository. You can place controls on your content to manage it and provide uniform access for a wide variety of client applications and services, such as a browser, portal, search engine, or custom application. Because of the inherent distributed nature of this interface, all Alfresco content repositories within the enterprise can resemble one logical collection of inter-related documents \(like the web\), letting you apply web technologies such as caching, authentication, proxies, and negotiation to your repository resources.

You can build your own RESTful interface using lightweight scripting technologies \(such as JavaScript and FreeMarker\), allowing you to arbitrarily map any content in the repository to resources on the web, or you can use out-of-the-box web scripts that already encapsulate many of the mappings. The Alfresco CMIS \(Content Management Interoperability Services\) AtomPub binding is implemented as a series of web scripts.

You can use web scripts for various solutions, such as:

-   Integrating Alfresco with third party systems
-   Providing feeds
-   Developing data services
-   Developing UI services such as portlets
-   Customizing search
-   Acting as a back-end to client tools, such as Orbeon Forms
-   Integrating with Microsoft Office
-   Developing Facebook applications
-   Building UI components in Alfresco Surf

-   **[Understanding web scripts](../concepts/ws-intro.md)**  
Alfresco web scripts let you programmatically interact with the Alfresco content application server. Unlike other interfaces exposed by Alfresco, web scripts offer a RESTful API for content in the content repository.
-   **[Web script types](../concepts/ws-types.md)**  
A web script is a service bound to a URI that responds to HTTP methods such as GET, POST, PUT, and DELETE.
-   **[Web Script Framework](../concepts/ws-framework.md)**  
The Web Script Framework is designed according to the Model View Controller \(MVC\) pattern \(sometimes referred to as MVC for the web\). While its primary design goal is to ensure that simple web scripts are easy to develop, advanced web scripts can support various features, such as rendering outputs in multiple languages, exposing and adhering to configuration options, and handling HTML form uploads.
-   **[Invoking web scripts](../concepts/ws-invoke-where.md)**  
A common client for invoking web scripts is a web browser, as many content rich applications are web applications. The web browser also provides an easy and convenient client for testing web scripts while developing them.
-   **[Working with client limitations](../concepts/ws-client-limitations.md)**  
Not all HTTP clients are equivalent in their capabilities. Many clients have limitations that mean certain HTTP features are not supported. Rather than dismiss those clients and reduce the scope of where web scripts can be invoked, the Web Script Framework provides helpers for working around those limitations.
-   **[Exception handling in web scripts](../concepts/ws-exception-handling.md)**  
Great care must be taken when using exception handling within a web script. If any exception expected to be handled by the repository is handled by the web script, this can lead to inconsistency of state, and potentially corruption of the repository.
-   **[Caching](../concepts/ws-caching-about.md)**  
The Web Script Framework complies with HTTP caching, in particular with the notions of Last Modified Time and ETag \(a kind of hash\), allowing the caching of Web script responses using HTTP-aware caches.
-   **[Authenticating web scripts](../concepts/ws-authenticating.md)**  
You can invoke a web script without first authenticating, that is, without specifying a user name and password as identification. This is rare when interacting with the Alfresco content application server as access to or management of content in the content repository is usually restricted to particular people or groups of people.
-   **[Forms and web scripts](../concepts/ws-forms-about.md)**  
Applications use HTML forms to create and update data. Content applications use forms to upload files from a user's local file system. HTML forms allow data to be submitted in one of two content types: URL-encoded \(`application-x-www-form-urlencoded`\) and multipart form data \(`multipart/form-data`\).
-   **[Internationalization \(i18n\)](../concepts/ws-I18N.md)**  
Internationalization \(often abbreviated to i18n\) is an important consideration when developing a web script.
-   **[Java-backed web scripts](../concepts/ws-java-backed-webscripts.md)**  
Java-backed web scripts are web scripts whose controller implementation is written in Java, rather than JavaScript.
-   **[Tutorials](../tasks/ws-tutorials.md)**  
This section of the documentation contains hands-on tutorials to help get you up and running with web scripts as quickly as possible.
-   **[Web scripts reference](../concepts/ws-reference.md)**  
This information provides reference material for web script options, objects, and methods.
-   **[Alfresco Repository JavaScript API reference](../concepts/API-JS-intro.md)**  
The Repository JavaScript API lets you develop JavaScript \(ECMAScript\) 1.6 compatible files to access, modify, and create Alfresco repository objects such as nodes, aspects, and properties.
-   **[Alfresco Repository FreeMarker Template reference](../references/API-FreeMarker-intro.md)**  
FreeMarker templates can be used to generate the view component of the Model-View-Controller \(MVC\) pattern.

**Parent topic:**[Web scripts](../concepts/ws-webscripts.md)

