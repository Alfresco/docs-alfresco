---
author: Alfresco Documentation
---

# Introduction to Maven archetypes

The Alfresco SDK 3 comes with a number of Maven archetypes that can be used to generate Alfresco extension projects.

For more details, see [Getting started with Alfresco Content Services SDK 3](sdk-getting-started.md).

These archetypes are available during the creation of a brand new project. In short, a Maven archetype is a project templating toolkit. It's defined as an original pattern or model from which all other things of the same kind are made. Using archetypes provides a great way to enable developers to quickly follow best practice in a consistent way. This is valid for every project built with Apache Maven and it's valid in particular when using Alfresco SDK 3.

In this section we are going to introduce all the available archetypes in Alfresco SDK 3, with a brief description of their purpose and main use. After reading this information, you should be able to understand the various possibilities that Alfresco SDK 3 can offer to developers, in terms of projects.

When generating your project, you'll be prompted to select the Maven archetype you want to use through an interactive menu, similar to what you can see below.

```
[INFO] Generating project in Interactive mode
[INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.ar
chetypes:maven-archetype-quickstart:1.0)
Choose archetype:
1: remote -> org.alfresco.maven.archetype:activiti-jar-archetype (Sample project w
ith full support for lifecycle and rapid development of Activiti JARs)
2: remote -> org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample mult
i-module project for All-in-One development on the Alfresco platform. Includes mod
ules for Platform/Repository JAR and Share JAR)
3: remote -> org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project w
ith full support for lifecycle and rapid development of Repository AMPs (Alfresco 
Module Packages))
4: remote -> org.alfresco.maven.archetype:alfresco-platform-jar-archetype (Sample 
project with full support for lifecycle and rapid development of Platform/Reposit
ory JARs and AMPs (Alfresco Module Packages))
5: remote -> org.alfresco.maven.archetype:alfresco-share-jar-archetype (Share pro
ject with full support for lifecycle and rapid development of JARs and AMPs (Alfr
esco Module
Packages))
6: remote -> org.alfresco.maven.archetype:share-amp-archetype (Share project with 
full support for lifecycle and rapid development of AMPs (Alfresco Module
Packages))
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive con
tains): : 
```

The menu shows 6 possible options, where each option corresponds to a different Maven archetype that you can select by using the listed numbers. Please note that the numbering is not sequential and some numbers may be skipped.

-   **[Selecting an archetype](../concepts/sdk-archetypes-intro.md)**  
Review the brief description of each archetype, what the archetype implements, and suggestions of when the archetype should be used.
-   **[All-in-One \(AIO\) archetype command reference](../concepts/alfresco-sdk-cmd-reference-aio.md)**  
This describes the scripts and Maven commands that can be used on an Alfresco All-in-One \(AIO\) extension project based on the AIO archetype.

**Parent topic:**[Alfresco Content Services SDK 3](../concepts/sdk-intro.md)

