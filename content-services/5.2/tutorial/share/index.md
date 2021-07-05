---
title: Creating a Share Extension Project with Maven
---

You can create an extension project that you will use through the tutorials.

There are two different types of projects that you can use to develop extensions for the Share web application. Which one to use depends on the use case. If you are developing a component that should be distributed separately (that is, not part of the Share WAR), then use the Share JAR project type. On the other hand, if you are working for a client and are developing a whole solution, which requires you to work with repository, Alfresco Share, and Search (Solr), then use the so called All-in-One (AIO) project type.

The following list has links to both of the project types ([SDK archetypes introduction]({% link content-services/5.2/develop/sdk.md %}#selecting-an-archetype)):

-   **Share JAR**: [Project Structure]({% link content-services/5.2/develop/sdk.md %}#share-jar-project-structure), [Generate Project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3)
-   **All-in-One**: [Project Structure]({% link content-services/5.2/develop/sdk.md %}#all-in-one-project-structure), [Generate Project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3)

When going through the tutorials it might be easiest to use an All-in-One project as it has everything included. If you for example use the Share AMP project you would also need a repository running somewhere, and it does not support searching.
