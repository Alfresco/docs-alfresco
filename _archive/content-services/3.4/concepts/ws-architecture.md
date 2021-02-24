---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, architecture]
---

# Working with Alfresco web scripts

Alfresco web scripts provide a unique way to programmatically interact with the Alfresco content application server. Unlike other interfaces exposed by Alfresco, web scripts offer a RESTful API for the content residing in the content repository. The REST \(Representational State Transfer\) web architecture is based on HTTP requests and responses, URIs \(Uniform Resource Identifiers\), and document types.

Web scripts let you implement your own RESTful API without tooling or Java knowledge, requiring only a text editor or the Alfresco Explorer web client. This approach to developing an Alfresco API means that web scripts offer many advantages over existing technologies, such as SOAP, including ease and speed of development, and flexibility in API design. By focusing on the RESTful architectural style, web scripts let you build custom URI-identified and HTTP accessible content management web services backed by the Alfresco content application server.

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

-   **[Web script types](../concepts/ws-types.md)**  
A web script is a service bound to a URI that responds to HTTP methods such as GET, POST, PUT, and DELETE.
-   **[Web Script Framework](../concepts/ws-framework.md)**  
The Web Script Framework is designed according to the Model View Controller \(MVC\) pattern \(sometimes referred to as MVC for the web\). While its primary design goal is to ensure that simple web scripts are easy to develop, advanced web scripts can support various features, such as rendering outputs in multiple languages, exposing and adhering to configuration options, and handling HTML form uploads.
-   **[Developing a Hello World web script](../tasks/ws-hello-world-create.md)**  
Building a Hello World web script is the best way to gain an understanding of the Web Script Framework. This example is simple enough to build and execute within a few minutes.
-   **[Listing pre-built web scripts](../tasks/ws-prebuilt-list.md)**  
The Hello World example demonstrates how to create a simple web script, but there are many pre-built web scripts provided out-of-the-box available for reuse. Before developing a new web script, always check to see if one already exists that supports your requirements or is near enough to save you time.
-   **[Invoking web scripts](../concepts/ws-invoke-where.md)**  
A common client for invoking web scripts is a web browser, as many content rich applications are web applications. The web browser also provides an easy and convenient client for testing web scripts while developing them.
-   **[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)**  
To see authentication in action, you can make a slightly more interesting Hello World example named Hello User that requires authenticated access and responds with a personalized greeting.
-   **[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)**  
This describes how to create a Folder Listing web script that mimics the behaviour of the `dir` command in Microsoft Windows, or `ls` in Linux and Mac OS X.
-   **[Working with client limitations](../concepts/ws-client-limitations.md)**  
Not all HTTP clients are equivalent in their capabilities. Many clients have limitations that mean certain HTTP features are not supported. Rather than dismiss those clients and reduce the scope of where web scripts may be invoked, the Web Script Framework provides helpers for working around those limitations.
-   **[Caching](../concepts/ws-caching-about.md)**  
The Web Script Framework complies with HTTP caching, in particular with the notions of Last Modified Time and ETag \(a kind of hash\), allowing the caching of Web script responses using HTTP-aware caches.
-   **[Authenticating web scripts](../concepts/ws-authenticating.md)**  
You can invoke a web script without first authenticating, that is, without specifying a user name and password as identification. This is rare when interacting with the Alfresco content application server as access to or management of content in the content repository is usually restricted to particular people or groups of people.
-   **[Configuring web scripts](../tasks/ws-config.md)**  
When developing a web script, you can implement capabilities that provide flexibility in how they behave. The Web Script Framework supports this by allowing each web script to carry a configuration file, which the web script can interrogate to alter its behavior.
-   **[Creating a Knowledge Base Search web script](../tasks/ws-kb-search-create.md)**  
The Knowledge Base Search web script searches the Alfresco content repository for knowledge base articles within a specified Alfresco Share site using the fts-alfresco \(full text search\) query language. It returns a JSON formatted response containing the found articles.
-   **[Processing complex HTTP requests](../tasks/ws-content-negociation.md)**  
Content negotiation makes it possible to serve different versions of a document at a given URI so that a client can specify which version best fits its capabilities. For example, a web browser can specify which type of image is preferred, such as GIF or PNG, for display purposes.
-   **[Debugging a controller script](../tasks/ws-controller-debug.md)**  
The Alfresco content application server provides a built-in JavaScript Debugger that can be applied to web scripts. It is a useful tool for diagnosing the cause of issues and for stepping through the controller scripts of others to learn how they have implemented capabilities and used Alfresco services.
-   **[Forms and web scripts](../concepts/ws-forms-about.md)**  
Applications use HTML forms to create and update data. Content applications use forms to upload files from a user’s local file system. HTML forms allow data to be submitted in one of two content types: URL-encoded \(`application-x-www-form-urlencoded`\) and multipart form data \(`multipart/form-data`\).
-   **[Internationalization \(I18N\)](../concepts/ws-I18N.md)**  
Consider the importance of Internationalization \(often abbreviated to I18N\) when developing a web script.
-   **[Java-backed web scripts](../concepts/ws-folderListing-JavaBacked-create.md)**  
Java-backed web scripts are web scripts whose controller implementation is written in Java, rather than JavaScript.
-   **[Modifying a web script using the Surf Remote API](../tasks/surf-java-ws-ex-adjust.md)**  
This example uses the Surf Remote API to enhance the hotel listing example. It adjusts the Java-backed web script example to use a scriptable controller to access the remote service. This removes the need for Java code and makes the code much more portable.
-   **[Web script reference](../concepts/dev-ws-reference.md)**  
This section provides additional information on web script options, objects, and methods.

**Parent topic:**[Customizing and extending](../concepts/ch-customize.md)

