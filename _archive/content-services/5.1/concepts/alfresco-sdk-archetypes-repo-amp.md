---
author: Alfresco Documentation
---

# Repository AMP archetype

The Alfresco Repository \(Repo\) AMP Archetype generates a sample project for managing Alfresco Repository extensions/customizations. These extensions are packaged as Alfresco Module Packages \(AMP\).

This archetype should be used to extend the Alfresco Repository web application \(alfresco.war\).

The following are typical use-cases for when this archetype should be used:

-   You work in a bigger team and want to develop, tag, and release a Repo module separately from the main Alfresco Extension project \(All-in-One\) that it is included in.
-   You want to add, and contain, an extra Repo module in an All-In-One Project \(useful when you don't have a Nexus artifacts repo to which you can release individual repo AMPs\).
-   You intend to build an Add-On, Component, Module etc that should be distributed independently.

If you intend to build an extension for the Alfresco Share web application, use the [Share AMP archetype](alfresco-sdk-archetypes-share-amp.md) instead.

The main features of this archetype are:

-   AMP packaging - the supported packing type for Alfresco extensions.
-   AMP dependency management in Maven.
-   Installation of AMPs into an Alfresco WAR.
-   Sample repository web script demonstrating how to implement a custom REST-based API.
-   Content Model Skeleton XML file ready to be filled in with your domain specific content model.
-   AMP Unit Testing support. Just run the standard `mvn test` and see your `src/test/java` Alfresco unit tests run. An sample Unit Test is provided in this archetype.
-   Run embedded in Tomcat with an embedded H2 database for demo purposes \(-Pamp-to-war\), rapid application development and integration testing.

    **Important:** This is not a supported stack, so it should only be used for development purposes.

-   Support for \(remote\) Junit and integration testing and Rapid Application Development. This uses spring-loaded. Project can easily be launched for this scenario using `run.sh`.
-   Easy to integrate with an IDE environment such as Eclipse and IntelliJ IDEA.

**Parent topic:**[Introduction to Maven archetypes](../concepts/alfresco-sdk-archetypes.md)

