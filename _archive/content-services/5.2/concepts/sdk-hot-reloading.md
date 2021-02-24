---
author: Alfresco Documentation
---

# Hot reloading

Hot reloading in a Java project is the ability to avoid the infamous *change \> restart and wait \> check* development lifecycle. This allows you to modify your application's code, and view the changes without having to restart Alfresco Tomcat. You can potentially gain significant savings in development time that would otherwise be wasted restarting Tomcat.

Hot reloading is a well known behaviour in several other languages \(C\# for example\), and the most practical and fast lifecycle like Save&Reload should be possible. Hot reloading is the key to enabling [Rapid Application Development \(RAD\)](https://en.wikipedia.org/wiki/Rapid_application_development) and [Test Driven Development \(TDD\)](https://en.wikipedia.org/wiki/Test-driven_development).

Since the Java 1.4 JVM, the Debugger API allowed debuggers to update class bytecode in place, using the same class identity. This meant that all objects could refer to an updated class and execute new code when their methods were called, preventing the need to reload a container whenever class bytecode was changed. All modern IDEs support it, including Eclipse, IntelliJ IDEA, and NetBeans. Since Java 5, this functionality has also been available directly to Java applications through the [Instrumentation API](http://docs.oracle.com/javase/6/docs/technotes/guides/instrumentation/index.html).

In the Alfresco development lifecycle hot reloading is possible as in every other Java project \(and with the same limitations\). You can manage a project created with the Alfresco SDK using hot reloading through two different tools:

-   [HotSwapAgent](../tasks/sdk-hot-reload-hotswap.md)
-   [JRebel](../tasks/sdk-hot-reload-jrebel.md)

Both have advantages and disadvantages, so it's up to you to make the right choice for your needs. JRebel is a commercial product while HotSwapAgent is open source. Both products can reload classes and web resources. However, JRebel is more powerful than HotSwapAgent and can also reload changes to the Spring XML context files, for example.

-   **[Using HotSwapAgent](../tasks/sdk-hot-reload-hotswap.md)**  
HotSwapAgent is the agent that enables you to do *hot reloading*. This allows you to modify the application code, and view the changes without having to restart Alfresco Tomcat.
-   **[Using JRebel](../tasks/sdk-hot-reload-jrebel.md)**  
JRebel is the agent that enables you to do *hot reloading*. This allows you to modify the application code, and view the changes without having to restart Alfresco Tomcat.
-   **[Using JRebel with Eclipse IDE](../tasks/sdk-hot-reload-jrebel-eclipse.md)**  
Before using this tutorial, you should have an existing project \(All-In-One or Platform JAR\) already set up and working in your Eclipse IDE instance.

**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

