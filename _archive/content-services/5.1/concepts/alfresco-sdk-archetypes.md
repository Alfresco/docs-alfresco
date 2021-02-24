---
author: Alfresco Documentation
---

# Introduction to Maven archetypes

There are three Maven archetypes that can be used to generate Alfresco extension projects.

The following project types, and archetypes, are available:

-   *Alfresco Repository AMP*: this archetype is used to create extensions for the Alfresco Repository Web Application \(alfresco.war\) in the form of Alfresco Module Packages \(AMP\).
-   *Alfresco Share AMP*: this archetype is used to create extensions for the Alfresco Share Web Application \(share.war\) in the form of AMPs.
-   *Alfresco all-in-one \(AIO\)*: this archetype is a multi-module project that leverages the Alfresco SDK's powerful capabilities to customize and run the full Alfresco platform embedded with all its components. The archetype does not require additional downloads and provides a perfect starting point for full-blown Alfresco projects.

You can view these archetypes when you obtain a list of archetypes from Maven Central:

```

mvn archetype:generate -Dfilter=org.alfresco:
```

**Note:** Note the use of a filter to display only archetypes in the namespace `org.alfresco`.

-   **[Repository AMP archetype](../concepts/alfresco-sdk-archetypes-repo-amp.md)**  
The Alfresco Repository \(Repo\) AMP Archetype generates a sample project for managing Alfresco Repository extensions/customizations. These extensions are packaged as Alfresco Module Packages \(AMP\).
-   **[Share AMP archetype](../concepts/alfresco-sdk-archetypes-share-amp.md)**  
The Alfresco Share AMP Archetype generates a sample project for managing Alfresco Share extensions/customizations. These extensions are packaged as Alfresco Module Packages \(AMP\).
-   **[All-in-One archetype](../concepts/alfresco-sdk-archetypes-aio.md)**  
The Alfresco All-in-One \(AIO\) Archetype is a multi-module project, leveraging Alfresco SDK's powerful capabilities to customize and run the full Alfresco platform embedded with all its components. The archetype does not require additional downloads, such as an Alfresco installer, and provides a perfect starting point for full-blown Alfresco projects where the final artifacts should be the customized alfresco.war and share.war.

**Parent topic:**[Introduction to the Alfresco SDK](../concepts/alfresco-sdk-introduction.md)

