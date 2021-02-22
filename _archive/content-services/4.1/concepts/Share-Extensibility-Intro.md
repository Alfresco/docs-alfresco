---
author: Alfresco Documentation
---

# Share Extensibility

With Alfresco, Version 4.0, there are new extensibility features that provide a number of different ways to make configuration and customization easier.   

The primary goals for these features are:

-   Extend Share without deep knowledge of how Share is built
-   Ensure that the solution is compatible with previous Alfresco releases
-   Provide the ability to easily extend Share without copying and pasting code
-   Easier deployment through simple JAR deployment

As a result, with Version 4.0, the solution compromises the following:

-   Two distinct approaches to extension:
    -   Customization by targeting existing files
    -   Customization through Component configuration

-   Creation of an in-memory output model:
    -   Provides opportunity to amend the default output
    -   Each FreeMarker template gets an output model
    -   Models can be nested

-   Introduction of Sub-Components:
    -   Solves the 1-1 Region to Component mapping challenge

-   **[Customizing Share targeting existing files](../concepts/Surf_extensions_Share.md)**  
You can customize existing files through templates or web scripts. This allows you to extend FreeMarker templates, JavaScript Controllers, and i18n properties,
-   **[Customizing Share through Advanced Component configuration](../concepts/Surf_v4_components_Share.md)**  
You can also customize Share through Advanced Component configuration.
-   **[Tutorials](../concepts/surf_share_v4-tutorials.md)**  
With Alfresco 4.0, there are new extensibility features that have been added into the Spring Surf framework upon which Alfresco Share is built to make customization easier.

**Parent topic:**[Customizing and extending Alfresco Share](../concepts/dev-Share-intro.md)

