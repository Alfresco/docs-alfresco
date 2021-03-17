---
author: Alfresco Documentation
---

# What's new?

This section describes new features in this version of the Alfresco SDK.

## What's new in Alfresco SDK 2.1.1

-   Reintroduce support for Java 7
-   Numerous bug fixes. See the [release notes](https://github.com/Alfresco/alfresco-sdk/issues?q=milestone%3A2.1.1+is%3Aclosed) for details.

## What's new in Alfresco SDK 2.1

-   Support for Solr 4
-   Regression testing Share Webapp with Alfresco Share Page Object \(PO\) tests
-   Functional testing of Custom Pages with Alfresco Share PO
-   Rapid Application Development \(RAD\) improvements:
    -   New `alfresco:refresh-repo` goal for alfresco-maven-plugin for automatic refresh of repository \(alfresco.war\)
    -   New `alfresco:refresh-share` goal for alfresco-maven-plugin for automatic refresh of Share \(share.war\)
-   Automatic JavaScript compression
-   Custom package name can be used when generating projects
-   Records Management profile 'rm' removed, now included as other AMPs in the repository and Share WAR POMs
-   Run script for Windows now available \(run.bat\)
-   Upgraded to Community 5.0.d and Enterprise 5.0.1 \(JDK8\)
-   Fixed DB initialization error \(dbObject cannot be null\)
-   Fixed blank Admin Console bug

## What's new in Alfresco SDK 2.0

-   Name changed from Maven Alfresco SDK to Alfresco SDK.
-   New Share AMP archetype.
-   RAD in Eclipse and IntelliJ.
-   Now requires Maven 3.2.2
-   RAD with Spring Loaded.
-   Support for JRebel has been deprecated.
-   Introduction of enterprise profile option -Penterprise.

## What was new in Alfresco SDK 1.1.1

-   Bug fixes.

## What was new in Alfresco SDK 1.1.0

-   Runs in Tomcat7 \(replaces Jetty\)
-   Remote running of JUnit
-   JRebel integration
-   Improved IDE integration

## What was in Alfresco SDK 1.0.x

-   Use of Alfresco POMs
-   Relied on a number of components:
    -   The SDK parent POM providing full Alfresco project lifecycle feature, to be added as a `<parent>` in your projects
    -   Archetypes like the AMP or all-in-one providing sample project to kickstart your Alfresco development and boost it with best practices
    -   The Alfresco Maven Plugin to manage AMP packaging and dependencies
    -   Alfresco Platform Distribution POM can \(optionally\) be used to provide centralized <dependencyManagement\> on a particular Alfresco version / edition \(Community / Enterprise\)
    -   The Alfresco Artifacts Repository provides backing for this SDK. Check the Alfresco Wiki for Community / Enterprise access information
-   Embedded Jetty server and H2 database

## What was in Maven Alfresco Lifecycle

-   First implementation of Alfresco Maven SDK \(**Now deprecated**\)
-   No use of Alfresco POMs
-   Available archetypes and plugins:
    -   maven-alfresco-extension-archetype to create WAR packaged webapps that can provide all Maven lifecycle and features
    -   maven-alfresco-share-archetype to create and manage Alfresco Share customization webapps
    -   maven-alfresco-share-module-archetype to create and manage Alfresco Share custom dashlets, pages as JARs
    -   maven-alfresco-amp-archetype to create maven-amp-plugin managed web apps, which can provide all Maven lifecycle and features to Alfresco modules. The maven-amp-plugin is also used as a replacement to MMT to unpack AMPs into WARs builds, using the Maven dependency mechanism provided by the maven-amp-plugin
-   Embedded Jetty server and H2 database to run Alfresco or Share
-   Possible to use Maven standard dependency management to pull in AMPs in your build
-   [Further information](https://wiki.alfresco.com/wiki/Managing_Alfresco_Lifecyle_with_Maven)

**Parent topic:**[Alfresco SDK 2.1.1](../concepts/alfresco-sdk-intro.md)

