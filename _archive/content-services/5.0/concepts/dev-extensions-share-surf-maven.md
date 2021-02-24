---
author: Alfresco Documentation
---

# Creating a Share Extension Project with Maven

This topic describes how to create an extension project that can be used when going through the tutorials.

There are basically two different types of projects that you can use to develop extensions for the Share web application. Which one to use depends on the use case. If you are developing a component that should be distributed separately \(i.e. not part of the Share WAR\), then use the Share AMP project type. On the other hand, if you are working for a client and are developing a whole solution, which requires you to work with Alfresco Repository, Alfresco Share, and Search \(Solr\), then use the so called All-in-One \(AIO\) project type.

The following list has links to both of the project types:

-   **Share AMP**: [Information](alfresco-sdk-archetypes-share-amp.md), [Generate Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)
-   **All-in-One**: [Information](alfresco-sdk-archetypes-aio.md), [Generate Project](../tasks/alfresco-sdk-tutorials-all-in-one-archetype.md)

When going through the tutorials it might be easiest to use an All-in-One project as it has everything included. If you for example use the Share AMP project you would also need a Repository running somewhere, and it does not support searching.

**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials-intro.md)

