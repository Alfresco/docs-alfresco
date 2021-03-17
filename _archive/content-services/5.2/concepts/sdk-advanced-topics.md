---
author: Alfresco Documentation
---

# Advanced topics

This information provides more advanced topics that you might come in contact with when you have been working with an SDK project for a while. We will have a look at how you can add more custom modules to an All-in-One project, and more.

-   **[Configuring the Alfresco Maven plugin](../concepts/sdk-maven-plugin-configure.md)**  
One of the most important changes of the Alfresco SDK 3 is that all the logic to run Alfresco Content Services and Share has been moved out of the profiles and Maven parent pom. The Maven plugin now has a single goal `alfresco:run`, which can be invoked directly.
-   **[Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md)**  
The latest version of the Alfresco SDK supports different versions for Alfresco Content Services and Alfresco Share. Since each product is no longer released under one common version number, ACS \(that is, `alfresco.war`\) and the Share UI \(`share.war`\) are now released with individual version numbers.
-   **[Working with Enterprise](../concepts/sdk-using-enterprise.md)**  
By default the Alfresco SDK will use Community Edition releases but it can be configured to use Enterprise Edition releases. Here you will learn how to set up a project to work with an Enterprise Edition release, highlighting the changes required to make it work.
-   **[Working with AMPs](../tasks/sdk-using-amps.md)**  
Since the early days of the Alfresco SDK, the Alfresco Module Packages \(AMP\) have been the way customizations were packaged. In Alfresco SDK 3.0 everything is now packaged as a JAR by default, while the AMPs are still available as an optional assembly. This gives you much more control over packaging, and simple modules can easily be deployed as JARs.
-   **[Debugging](../concepts/sdk-debugging.md)**  
When developing add-ins, fixing bugs, or changing Alfresco from the source code, it is helpful to debug an instance of Alfresco running on a standard application server. This section outlines the steps needed to configure Alfresco and Eclipse \(or IntelliJ IDEA\) to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.
-   **[Integration testing](../concepts/sdk-integration-testing.md)**  
“Integration testing is the phase in software testing where individual software modules are combined and tested as a group. It occurs after unit testing and before validation testing. Integration testing takes as its input modules that have been unit tested, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing. \[*Wikipedia*\].”
-   **[Hot reloading](../concepts/sdk-hot-reloading.md)**  
Hot reloading in a Java project is the ability to avoid the infamous *change \> restart and wait \> check* development lifecycle. This allows you to modify your application's code, and view the changes without having to restart Alfresco Tomcat. You can potentially gain significant savings in development time that would otherwise be wasted restarting Tomcat.

**Parent topic:**[Alfresco Content Services SDK 3](../concepts/sdk-intro.md)

