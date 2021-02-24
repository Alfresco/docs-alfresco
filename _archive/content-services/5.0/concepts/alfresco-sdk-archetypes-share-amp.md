---
author: Alfresco Documentation
---

# Share AMP archetype

The Alfresco Share AMP Archetype generates a sample project for managing Alfresco Share extensions/customizations. These extensions are packaged as Alfresco Module Packages \(AMP\).

This archetype should be used to extend the Alfresco Share web application \(share.war\).

The following are typical use-cases for when this archetype should be used:

-   You work in a bigger team and want to develop, tag, and release a Share UI module separately from the main Alfresco Extension project \(All-in-One\) that it is included in.
-   You want to add, and contain, an extra Share UI module in an All-In-One Project \(useful when you don't have a Nexus artifacts repo to which you can release individual Share UI modules\).
-   You intend to build an Add-On, Component, Module etc that should be distributed independently.

If you intend to build an extension for the Alfresco Repository web application, use the [Repository AMP archetype](alfresco-sdk-archetypes-repo-amp.md) instead.

The main features of this archetype are:

-   AMP packaging - the supported packing type for Alfresco extensions.
-   AMP dependency management in Maven.
-   Installation of AMPs into an Share WAR.
-   Sample Aikau page and widget to demonstrate how to develop new pages for the Alfresco Share UI.
-   AMP Unit Testing support. Just run the standard `mvn test` and see your `src/test/java` Alfresco unit tests run. An sample Unit Test is provided in this archetype.
-   Run embedded in Tomcat for demo purposes \(-Pamp-to-war\), rapid application development and integration testing.

    **Important:** Requires a running Alfresco Repository on localhost:8080.

-   Easy to integrate with an IDE environment such as Eclipse and IntelliJ IDEA.

**Parent topic:**[Introduction to Maven archetypes](../concepts/alfresco-sdk-archetypes.md)

