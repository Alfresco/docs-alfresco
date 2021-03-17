---
author: Alfresco Documentation
---

# Upgrading Alfresco version for an extension project

When you have been working with your extension project for a while it is highly likely that there have been some new releases of the Alfresco software. These releases will have new functionality that you might want to take advantage of in your project. It might also be that you are starting to work with this SDK version a while after it has been released, and latest Alfresco version is now newer than what is default in the SDK. This section will walk through how you can upgrade your SDK project to use the newest Alfresco version.

These instructions include information about how to upgrade projects generated from each one of the artifacts. Make sure you are following upgrade instructions for the correct "From version -\> To version".

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

-   **[Upgrading SDK 2.1.1 projects from Enterprise 5.0.1 to 5.0.2](../tasks/alfresco-sdk-upgrading-alfresco-version-SDK-211-501-to-502.md)**  
These instructions will walk through what is needed when upgrading an SDK 2.1.1 project from using Alfresco Enterprise version 5.0.1 to using Enterprise version 5.0.2.
-   **[Upgrading SDK 2.1.1 projects from Enterprise 5.0.1 \(or 5.0.2\) to 5.0.3](../tasks/alfresco-sdk-upgrading-alfresco-version-SDK-211-501-or-502-to-503.md)**  
These instructions will walk through what is needed when upgrading an SDK 2.1.1 project from using Alfresco Enterprise version 5.0.1 \(or 5.0.2\) to using Enterprise version 5.0.3. There are a couple of changes in the 5.0.3 code base, such as new database scripts, that are not automatically handled by SDK 2.1.1. There is also a problem running with Spring Loaded because of some new security checks in the repository layer.
-   **[Upgrading SDK 2.2.0 projects from Community 5.1.e to 5.1.\[f\|g\]](../tasks/alfresco-sdk-upgrading-alfresco-version-SDK-220-51e-to-51f.md)**  
These instructions will walk through what is needed when upgrading an SDK 2.2.0 project from using Alfresco Community version 5.1.e to using Community version 5.1.f. These instructions also apply when upgrading to version 5.1.g.
-   **[Upgrading SDK 2.2.0 projects from Community 5.1.e to 5.2.a](../tasks/alfresco-sdk-upgrading-alfresco-version-SDK-220-51e-to-52a.md)**  
These instructions will walk through what is needed when upgrading an SDK 2.2.0 project from using Alfresco Community version 5.1.e to using Community version 5.2.a. In fact, we are upgrading to Alfresco Platform version 5.2.a and Alfresco Share version 5.1.g. Note that from now on the alfresco.war is no longer available using the `alfresco` artifactId. Now we have to use `alfresco-platform`.
-   **[Upgrading SDK 2.2.0 projects from Enterprise 5.1.0 to greater than 5.1.0](../tasks/alfresco-sdk-upgrading-alfresco-version-SDK-220-510-to-511.md)**  
These instructions will walk through what is needed when upgrading an SDK 2.2.0 project from using Alfresco Enterprise version 5.1.0 to using Enterprise version 5.1.1. These instructions also apply when upgrading to other versions greater than 5.1.0, such as 5.1.0.5.

**Parent topic:**[Upgrading](../concepts/alfresco-sdk-upgrading.md)

