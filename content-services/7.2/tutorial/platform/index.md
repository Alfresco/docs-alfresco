---
title: Creating a Platform Extension Project
---

You can create an extension project that you will use for many of the tutorials.

There are two different types of Alfresco SDK projects that you can use to develop extensions for the Platform/Repository application. 
Which one to use depends on the use case. If you are developing a component that should be distributed separately 
(that is, not part of the Alfresco Platform WAR - `alfresco.war`), then use the Platform JAR project type. On the other 
hand, if you are working for a client and are developing a whole solution, which requires you to work with Alfresco Repository, 
Alfresco Share, and Search (Solr), then use the so called All-in-One (AIO) project type.

The following list has links to both of the project types 
([SDK archetypes introduction]({% link content-services/7.2/develop/sdk.md %}#mvnarchetypes)):

* **Platform JAR**: [Project Structure]({% link content-services/7.2/develop/sdk.md %}#structureplatform), [Generate Project]({% link content-services/7.2/develop/sdk.md %}#workingplatform)
* **All-in-One**: [Project Structure]({% link content-services/7.2/develop/sdk.md %}#structureaio), [Generate Project]({% link content-services/7.2/develop/sdk.md %}#workingaio)

When going through the tutorials and doing other proof-of-concept work it might be easiest to use an 
All-in-One project as it has everything included. 
