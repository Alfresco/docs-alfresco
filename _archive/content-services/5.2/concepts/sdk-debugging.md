---
author: Alfresco Documentation
---

# Debugging

When developing add-ins, fixing bugs, or changing Alfresco from the source code, it is helpful to debug an instance of Alfresco running on a standard application server. This section outlines the steps needed to configure Alfresco and Eclipse \(or IntelliJ IDEA\) to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.

Here we assume you have already generated an Alfresco project using the Alfresco SDK. If you don't have a project already, follow the steps in [Getting started with Alfresco Content Services SDK 3](sdk-getting-started.md) to learn how to generate it in a few easy steps.

-   **[Running the project in debug mode](../tasks/sdk-debug-mode.md)**  
The first step is to run your project in debug mode irrespective of the IDE used. The command `mvnDebug` starts the application in remote debugging mode, where it listens on port `8000`, ready for a remote debugger to attach.
-   **[Remote debugging using Eclipse](../tasks/sdk-debug-eclipse.md)**  
Here you'll see how to create and manage a configuration to remotely debug your launched Alfresco project that's waiting for a connection. This assumes you have an Eclipse IDE up and running, and have already imported the same project you are going to debug.
-   **[Remote debugging using IntelliJ](../tasks/sdk-debug-intellij.md)**  
Here you'll see how to create and manage a configuration to remotely debug your launched Alfresco project that's waiting for a connection. This assumes you have an IntelliJ IDEA IDE up and running, and have already imported the same project you are going to debug.

**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

