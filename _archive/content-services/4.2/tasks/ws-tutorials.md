---
author: Alfresco Documentation
---

# Tutorials

This section of the documentation contains hands-on tutorials to help get you up and running with web scripts as quickly as possible.

These tutorials assume you have Alfresco installed locally at http://localhost:8080. If this is not the case you will need to amend the URLs used in the tutorials accordingly.

-   **[Listing pre-built web scripts](../tasks/ws-prebuilt-list.md)**  
There are many pre-built web scripts provided out-of-the-box available for reuse. Before developing a new web script, always check to see if one already exists that supports your requirements or is near enough to save you time.
-   **[Invoking a web script using cURL](../tasks/ws-curl.md)**  
When exploring or developing web scripts, a web browser can be limiting as a client. For example, it cannot perform any HTTP method other than GET without coding. You can use an alternative client called cURL, a command line tool that supports common protocols such as FTP and HTTP. cURL is a valuable web script debugging and testing tool.
-   **[Developing a Hello World web script](../tasks/ws-hello-world-create.md)**  
Building a Hello World web script is the best way to gain an understanding of the Web Script Framework. This example is simple enough to build and execute within a few minutes.
-   **[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)**  
To see authentication in action, you can make a slightly more interesting Hello World example named Hello User that requires authenticated access and responds with a personalized greeting.
-   **[Processing complex HTTP requests](../tasks/ws-content-negotiation.md)**  
Content negotiation makes it possible to serve different versions of a document at a given URI so that a client can specify which version best fits its capabilities. For example, a web browser can specify which type of image is preferred, such as GIF or PNG, for display purposes.
-   **[Configuring a web script](../tasks/ws-config.md)**  
When developing a web script, you can implement capabilities that provide flexibility in how they behave. The Web Script Framework supports this by allowing each web script to carry a configuration file, which the web script can interrogate to alter its behavior.
-   **[Creating a web script using cache controls](../tasks/ws-cache-using.md)**  
Caching is an important aspect of web scripts and is often required to support high-load applications such as Internet websites backed by the Alfresco content application server. You should consider caching when developing web scripts.
-   **[Processing multipart forms](../tasks/ws-forms-process.md)**  
This task demonstrates how to handle multipart/form-data form submits by creating two web scripts for the following functions:
-   **[Creating request processing web scripts](../tasks/ws-request-process.md)**  
When performing an HTTP POST to a web script, the posted request body often contains content that needs processing by the web script. To allow access to the request body, the Web Script Framework provides a special root object named `requestbody` that represents the content of the request. The `requestbody` is a `ScriptContent` object allowing access to the request content either as a string or as a content stream.
-   **[Creating a photo search script](../tasks/ws-photo-search.md)**  
This tutorial shows you how to develop a script that provides the ability to search a site for photos.
-   **[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)**  
This tutorial describes how to create a Folder Listing web script that mimics the behaviour of the `dir` command in Microsoft Windows, or `ls` in Linux and Mac OS X.
-   **[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)**  
A Folder Listing Java-backed web script mimics the behaviour of the `dir` command in Microsoft Windows, or `ls` in Linux and Mac OS X.
-   **[Creating a new kind of web script](../tasks/ws-new-kind-create.md)**  
To extend the capabilities of the Web Script Framework, you can develop a new kind of web script to encapsulate behavior you want to reuse across many scripted web scripts.

**Parent topic:**[Web Scripts](../concepts/ws-architecture.md)

