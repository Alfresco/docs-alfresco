---
author: Alfresco Documentation
---

# Adding more custom AMPs to an AIO project

When you generate an All-in-One project you get one Repository extension AMP \(repo-amp\) and one Share extension AMP \(share-amp\). These AMPs are just starting point AMPs, showing you how to create extension AMPs for the Alfresco WAR and Share WAR applications. When the project grows you are likely to want to add more extension modules for different types of functionality.

The are many benefits to this:

-   It will be easier for multiple developers to work in parallel with different modules/functionality as it is not all baked into one big AMP.
-   You can release and tag modules separately, which is really handy as you are not constantly working with SNAPSHOTS in your main AIO project. Meaning you can decide when you want to bring in new functionality.
-   You can very easily do a maintenance release for a specific bit of functionality.
-   It encourages re-use by not having all the extension functionality in one big AMP.

There are two ways to go about this though:

1.  *Create new custom AMPs as separate projects outside the AIO project*, **this is the recommended approach** as you get all the benefits listed above.
2.  *Create new custom AMPs as part of the AIO project*, this does not give all of the above benefits. However, it is useful if you want to split up your extension code and structure it a bit, and you have only a very small team. It is also easier to implement as you don't need access to your own Maven Repository such as Nexus. It does however mean that you will be working with SNAPSHOT dependencies for all AMPs, so it will be difficult to decide when functionality should be included or not in the build. Basically, if the functionality exist in an AMP in the AIO project, it will be included in the build, whether it is complete or not.

-   **[Creating new stand-alone custom AMPs and linking them to the AIO project](../tasks/alfresco-sdk-advanced-link-custom-amps-aio.md)**  
Use this information to create a new custom Repository AMP project and a new custom Share AMP project and then link those as dependencies in the AIO project.
-   **[Create new custom AMPs as part of the AIO project](../tasks/alfresco-sdk-advanced-add-custom-amps-aio.md)**  
Use this information to create a new custom Repository AMP project and a new custom Share AMP project and have them added as sub-projects of a multi module AIO project.

**Parent topic:**[Advanced Topics](../concepts/alfresco-sdk-advanced-topics.md)

