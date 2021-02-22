---
author: Alfresco Documentation
---

# NodeLocator service

The section describes the `NodeLocatorService`. The service provides a way to lookup one node from another.

The `NodeLocator` service is manly used from the forms `association.ftl` association control. It allows you to plug in custom `startLocation` strategies to forms.

-   **[Creating node locators](../tasks/node-locator-config.md)**  
This section describes how to configure the `NodeLocatorService`.
-   **[NodeLocator Service Java API](../concepts/node-locator-javaAPI.md)**  
The `NodeLocatorService` looks up node locators registered using Spring configuration by name.
-   **[NodeLocator Service REST API](../concepts/node-locator-REST.md)**  
A REST API is provided for the `NodeLocatorService`. It is used by the form association control to determine the `startLocation` of the control but can be used by any client if required.
-   **[NodeLocator service startLocation](../concepts/node-locator-startloc.md)**  
The main use of the `NodeLocatorService` is to determine where the forms association control should start when it is first displayed. In some scenarios, the picker may need to start in the root of the document library of a Share site or start in the folder where the node being edit is located.
-   **[Available Node Locators](../concepts/node-locator-available.md)**  
The following table shows the node locators that are available out-of-the-box, the parameters that they accept, and their use.

**Parent topic:**[Customizing and extending Alfresco Share](../concepts/dev-Share-intro.md)

