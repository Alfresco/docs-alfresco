---
author: Alfresco Documentation
---

# Available Node Locators

The following table shows the node locators that are available out-of-the-box, the parameters that they accept, and their use.

|Name|Class|Parameters|Use|
|----|-----|----------|---|
|companyhome|`CompanyHomeNodeLocator`|None|Returns the Company Home node.|
|userhome|`UserHomeNodeLocator`|None|Returns the current users home folder node.|
|siteshome|`SitesHomeNodeLocator`|None|Returns the Sites root node.|
|doclib|`DocLibNodeLocator`|None|Returns the `documentLibrary` node for the site to which the source node belongs.|
|self|`SelfNodeLocator`|None|Returns the source node.|
|xpath|`XPathNodeLocator`|`query`, `store_type`, and `store_id`|Returns the node pointed to by the given XPath query. The XPath must be relative to the root of a store. If a source node is provided, the Store is taken from the node, otherwise the `store_type` and `store_id` must be provided.|
|ancestor|`AncestorNodeLocator`|`type` and `aspect`|Returns an ancestor node of the source node. If no parameters are provided, the immediate parent is returned. If a type parameter is present, the first ancestor node of that type is returned. If an aspect parameter is present, the first ancestor node with that aspect applied is returned. The type and aspect parameters can be combined thus finding an ancestor node of a certain type and with a specific aspect applied.|

**Parent topic:**[NodeLocator service](../concepts/node-locator-intro.md)

