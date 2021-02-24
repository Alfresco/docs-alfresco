---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Web Content Management, Deployment]
keyword: [deployment target, DM]
---

# DM deployment target properties

The following properties can be configured for the DM Deployment Target.

-   **Store name mapping**

    The authoring environment for a WCM Web Project consists of a set of related AVM stores. There is a staging store, one or more author stores and possibly workflow stores. The different stores have a naming convention for their store names.

    The consolidate flag says deploy all these related stores to the same location. If it is turned off by setting deployment.dmr.consolidate to false there will be a separate paths for each store and content will be duplicated in the DM store. For example, set the following in the alfresco.global.properties file:

    ```
    deployment.dmr.consolidate= true | false
    deployment.dmr.name=alfresco
    ```

    You can use spring to plug in your own implementation of the StoreNameMapper interface to control your project name mappings.

-   **Root location mapping**

    The default implementation of `RootMapper`, the `RootMapperImpl` class, allows you to specify a default location for all web projects and also a map of mappings, one for each web project. By default, the web projects are deployed to /app:company\_home/app:wcm\_deployed.


**Parent topic:**[DM deployment target](../concepts/wcm-targets-alfresco.md)

