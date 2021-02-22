---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed, APi/Script, web script]
---

# Java-backed web scripts

Java-backed web scripts are web scripts whose controller implementation is written in Java, rather than JavaScript.

Java-backed web scripts are useful when you want to:

-   Access Alfresco content application services not available via the JavaScript API
-   Interact with systems whose only API is exposed via Java
-   Override how responses are rendered, such as to stream large content
-   Ensure that performance is absolutely critical

Unlike scripted web scripts, Java-backed web scripts require more tooling for their development as you must compile the Java source code, package, and deploy to the Alfresco content application server.

A Java-backed web script is constructed like a scripted web script, except that a Java class replaces the controller script. It still has the same intent of encapsulating the behavior of the web script and producing a model for subsequent rendering by a response template. Alfresco is aware of the Java class through Spring Framework configuration, which identifies the Java class as being the behavior for the web script. All other components are exactly the same as those for scripted web scripts.

-   **[Java approach to web scripts](../concepts/ws-and-Java.md)**  
The Java class for a Java-backed web script has to follow one rule: it must implement the Java interface: `org.alfresco.web.scripts.WebScript`
-   **[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)**  
A Folder Listing Java-backed web script mimics the behaviour of the `dir` command in Microsoft Windows, or `ls` in Linux and Mac OS X.
-   **[Creating a new kind of web script](../tasks/ws-new-kind-create.md)**  
To extend the capabilities of the Web Script Framework, you can develop a new kind of web script to encapsulate behavior you want to reuse across many scripted web scripts.
-   **[Using a new kind of web script](../tasks/ws-new-kind-using.md)**  
When developing a scripted web script, you can specify its kind through its web script description document. If the new kind of web script supports extensions to the web script description document, you must provide those as well. Otherwise, development of the web script is the same as any other web script.
-   **[Creating a reusable Java-backed web script](../tasks/surf-java-ws-ex.md)**  
You can build a page using an annotated controller to fetch information for the rendering page. The FreeMarker template consults the model to build the markup, for example, of hotel listings. This is a good approach to have the hotel information loaded ahead of the page actually rendering. The penalty of retrieving the information is done ahead of anything on the page even rendering. If multiple components on the page need that information, this avoids the cost of potentially loading it more than one time.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

