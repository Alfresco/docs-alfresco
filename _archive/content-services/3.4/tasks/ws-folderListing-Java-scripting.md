---
author: Alfresco Documentation
---

# Creating a Folder Listing Java-backed web script

A Folder Listing Java-backed web script mimics the behaviour of the `dir` command in Microsoft Windows, or `ls` in Linux and Mac OS X.The controller script in this implementation is in Java. The client interacts with it through HTTP requests and responses. In comparison to an implementation with JavaScript, this allows you to build a library of scripted web scripts exposing a well-defined interface and then, over time, replace their implementation with Java, if requirements such as performance become critical. As long as the interface does not change, the user will not notice.

-   **[Creating the scripted components of a Folder Listing web script](../tasks/ws-folderListing-Java-components.md)**  
The first task in creating a Folder Listing web script is to create the scripted components.
-   **[Developing a controller for a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-controller.md)**  
To complete the Folder Listing Java-backed web script, you must create its controller. The controller parses the URI to extract the token values, interacts with the Alfresco content repository to locate the specified folder, and populates the model for subsequent rendering by the HTML response template.
-   **[Parsing the URI](../concepts/ws-Java-URI.md)**  
Your Folder Listing web script defines the following URI template with one URI-path token and one query parameter token: `<uri>/javadir/{folderpath}?verbose={verbose?}</uri>`
-   **[Calling Alfresco services](../concepts/ws-Java-services.md)**  
As a Java-backed web script, all services provided by the Alfresco content application server are available for use. Any Java API within the server process, subject to security controls, is accessible.
-   **[Setting the response status code](../concepts/ws-Java-response.md)**  
A web script uses a response status code to inform the calling client of its execution outcome. In Java, exceptions are often used for this and Java-backed web scripts may follow suit.
-   **[Constructing the model](../concepts/ws-Java-model.md)**  
The controller creates a model for subsequent rendering by a response template. A model is a map of values indexed by name. In Java, the model is simply returned from the `executeImpl()` method as a `Map`.
-   **[Registering a Java-backed web script](../concepts/ws-Java-spring.md)**  
You must register a Java-backed web script with the Web Script Framework through Spring Framework configuration, which supports the notion of a bean: a declaration of a Java class instance.
-   **[Declaring service dependencies](../concepts/ws-Java-service.md)**  
The Spring bean is where service dependencies are declared.

**Parent topic:**[Java-backed web scripts](../concepts/ws-folderListing-JavaBacked-create.md)

