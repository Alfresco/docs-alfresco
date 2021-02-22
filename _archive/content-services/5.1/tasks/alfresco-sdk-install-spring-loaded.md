---
author: Alfresco Documentation
---

# Install Spring Loaded

The Alfresco SDK's Rapid Application Development \(RAD\) features uses Spring Loaded.

There are no pre-requisites for this installation. \(**Note**. ONLY works with the [Share AMP archetype](../concepts/alfresco-sdk-archetypes-share-amp.md) at the moment\).

[Spring Loaded](https://github.com/spring-projects/spring-loaded) is a Java agent \(represented by a JAR file\) that enables class reloading in a running JVM. It will enable you to update a Java file in your Alfresco extension project and then see the effect of the change directly in a running Alfresco-Tomcat-JVM instance without having to re-build JARs, AMPs, and WARs and re-deploying them, saving you loads of time.

1.  Download the Spring Loaded JAR from [here](https://github.com/spring-projects/spring-loaded).

2.  Copy JAR to some directory.

    There is no specific installation needed, just copy the JAR to a permanent place where you can refer to it.


You now have the Spring Loaded JAR readily available in a directory.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

