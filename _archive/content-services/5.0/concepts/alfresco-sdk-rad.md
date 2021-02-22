---
author: Alfresco Documentation
---

# Rapid Application Development \(RAD\)

These tutorials cover how to employ the RAD features of the Alfresco SDK.

Rapid Application Development \(RAD\) and Test Driven Development \(TDD\) are big goals for the Alfresco SDK. The SDK is designed to support the hot reloading of code \(via Spring Loaded\) so that you can modify JavaScript, FreeMarker and Java code, and have the changes take effect without having to click the **Refresh Web Scripts** button, restart Alfresco Tomcat, or restart anything else.

For example, in your SDK project, you can change test code, re-run your test, and the results will be displayed immediately. This allows for Test Driven Development \(TDD\).

The hot reloading above all saves you time as a developer. No more waiting around for Alfresco Tomcat restarts to see your code changes take effect.

**Important:** It is assumed that you will work through the tutorials in this section in the order in which they are presented.

-   **[Importing SDK projects into Eclipse](../tasks/alfresco-sdk-rad-eclipse-import-projects.md)**  
The Alfresco SDK is designed to work well with Eclipse. This support includes the ability to import existing SDK projects \(created via the command line\) into Eclipse.
-   **[Rapid Application Development in Eclipse \(Hot reloading\)](../tasks/alfresco-sdk-rad-eclipse-hot-reloading.md)**  
Hot reloading is the ability to modify your application's code, and view the changes without having to restart Alfresco Tomcat. This allows for significant savings in development time that would otherwise be wasted restarting Tomcat. Hot reloading is the key to enabling Rapid Application Development \(RAD\) and Test Driven Development \(TDD\).
-   **[Importing SDK projects into IntelliJ IDEA](../tasks/alfresco-sdk-rad-intellij-import-projects.md)**  
The Alfresco SDK is designed to work well with IntelliJ IDEA. This support includes the ability to import existing SDK projects \(created via the command line\) into IDEA.
-   **[Rapid Application Development in IntelliJ IDEA \(Hot reloading\)](../tasks/alfresco-sdk-rad-intellij-hot-reloading.md)**  
Hot reloading is the ability to modify your application's code, and view the changes without having to restart Alfresco Tomcat. This allows for significant savings in development time that would otherwise be wasted restarting Tomcat. Hot reloading is the key to enabling Rapid Application Development \(RAD\) and Test Driven Development \(TDD\).
-   **[Remote debugging with an IDE](../tasks/alfresco-sdk-rad-eclipse-remote-debugging.md)**  
It is possible to start an application ready for remote debugging by using the Maven `mvnDebug` command.

**Parent topic:**[Alfresco SDK 2.1.1](../concepts/alfresco-sdk-intro.md)

