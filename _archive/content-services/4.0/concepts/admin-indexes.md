---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: reference
---

# Controlling indexes

This section provides instructions on how to index content using the `cm:indexControl` aspect.

You can use the `cm:indexControl` aspect to set up indexes in Alfresco Share. This aspect enables you to control indexes for the control items. The aspect exposes two properties that allow configuration of indexing of nodes to which it is applied.

|Property|Allowed values|Default|Description|
|--------|--------------|-------|-----------|
|`cm:isIndexed ((content + metadata))`|True or False|True|Controls whether the node is indexed or not.|
|`cm:isContentIndexed`|True or False|True|Controls whether the node content \(binary\) is indexed or not. Setting this to false inhibits full text indexing of the document binary.|

Using this aspect you can choose to disable repository-wide indexing. This can prove useful in situations, such as bulk loading.

For more information on working with aspects, see [Managing aspects](../tasks/library-item-manage-aspects.md) section.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

