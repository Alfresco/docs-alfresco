---
author: Alfresco Documentation
---

# What's New?

This section describes what's new in this version of the Maven Alfresco SDK.

## What's new in Maven Alfresco SDK 1.1.0 \(current version\)

-   Runs in Tomcat7 \(replaces Jetty\)
-   Remote JUnit running
-   Jrebel Integration
-   Improved IDE integration

## What was in Maven Alfresco SDK 1.0.x

-   Use of Alfresco POMs
-   It relied on a number of components:
    -   The SDK parent POM providing full Alfresco project lifecycle feature, to be added as a `<parent>` in your projects
    -   Archetypes like the AMP or All-in-One providing sample project to kickstart your Alfresco development and boost it with best practices
    -   The Alfresco Maven Plugin to manage AMP packaging and dependencies
    -   Alfresco Platform Distribution POM can \(optionally\) be used to provide centralized <dependencyManagement\> on a particular Alfresco version / edition \(Community / Enterprise\)
    -   The Alfresco Artifacts Repository provides backing for this SDK. Check the Alfresco Wiki for Community / Enterprise access information
-   Embedded Jetty Server and H2 Database

## What was in Maven Alfresco Lifecycle

-   First implementation of Alfresco Maven SDK \(**Now deprecated**\)
-   No use of Alfresco POMs
-   Available archetypes and plugins:
    -   maven-alfresco-extension-archetype to create WAR packaged webapps that can provide all Maven lifecycle and features
    -   maven-alfresco-share-archetype to create and manage Alfresco Share customization webapps
    -   maven-alfresco-share-module-archetype to create and manage Alfresco Share custom dashlets, pages as JARs
    -   maven-alfresco-amp-archetype to create maven-amp-plugin managed webapps which can provide to Alfresco modules all Maven lifecycle and features. Also the maven-amp-plugin is used as a replacement to MMT to unpack AMPs into WARs builds, using the maven dependency mechanism provided by the maven-amp-plugin
-   Embedded Jetty server and H2 Database to run Alfresco or Share
-   Possible to use Maven standard dependency management to pull in AMPs in your build
-   [Further info](https://wiki.alfresco.com/wiki/Managing_Alfresco_Lifecyle_with_Maven)

**Parent topic:**[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)

