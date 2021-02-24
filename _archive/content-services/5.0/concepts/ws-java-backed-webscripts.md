---
author: Alfresco Documentation
---

# Java-backed web scripts

Java-backed web scripts are web scripts whose controller implementation is written in Java, rather than JavaScript.

Java-backed web scripts are useful when you want to:

-   Access Alfresco content application services not available by using the JavaScript API
-   Interact with systems whose only API is exposed by using Java
-   Override how responses are rendered, such as to stream large content
-   Ensure that performance is absolutely critical

Unlike scripted web scripts, Java-backed web scripts require more tooling for their development as you must compile the Java source code, package, and deploy to the Alfresco content application server.

A Java-backed web script is constructed like a scripted web script, except that a Java class replaces the controller script. It still has the same intent of encapsulating the behavior of the web script and producing a model for subsequent rendering by a response template. Alfresco is aware of the Java class through Spring Framework configuration, which identifies the Java class as being the behavior for the web script. All other components are exactly the same as those for scripted web scripts.

-   **[Java approach to web scripts](../concepts/ws-and-Java.md)**  
The Java class for a Java-backed web script has to follow one rule: it must implement the Java interface: `org.alfresco.web.scripts.WebScript`

**Parent topic:**[Repository-tier web scripts](../concepts/ws-overview.md)

