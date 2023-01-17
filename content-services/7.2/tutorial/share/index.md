---
title: Creating a Share UI Extension Project
---

You can create an extension project that you will use throughout the tutorials.

There are two different types of Alfresco SDK projects that you can use to develop extensions for the Share web application. 
Which one to use depends on the use case. If you are developing a component that should be distributed separately 
(that is, not part of the Share WAR), then use the Share JAR project type. On the other hand, if you are working for a 
client and are developing a whole solution, which requires you to work with Alfresco Repository, Alfresco Share, and Search (Solr), 
then use the so called All-in-One (AIO) project type.

The following list has links to both of the project types 
([SDK archetypes introduction]({% link content-services/7.2/develop/sdk.md %}#mvnarchetypes)):

* **Share JAR**: [Project Structure]({% link content-services/7.2/develop/sdk.md %}#structureshare), [Generate Project]({% link content-services/7.2/develop/sdk.md %}#workingshare)
* **All-in-One**: [Project Structure]({% link content-services/7.2/develop/sdk.md %}#structureaio), [Generate Project]({% link content-services/7.2/develop/sdk.md %}#workingaio)

When going through the tutorials it might be easiest to use an All-in-One project as it has everything included. 
If you for example use the Share JAR project you would also need a Repository running somewhere, and it does not support searching.
