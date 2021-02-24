---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: reference
---

# Controlling indexes

This section provides instructions on how to index content using the `cm:indexControl` aspect.

You can use the `cm:indexControl` aspect to set up indexes in Alfresco Share. The cm:indexControl aspect enables you to control indexes for the control items. The aspect exposes the following two properties to allow configuration of indexing of nodes to which it is applied.

-   cm:isIndexed \(\(content + metadata\)\): This property controls whether the node is indexed or not.
-   cm:isContentIndexed: This property controls whether the node content \(binary\) is indexed or not. Setting this to `false` inhibits full text indexing of the document binary.

The following table shows the possible combinations of settings along with the behaviour for each case:

|cm:isIndexed|cm:isContentIndexed|Result|
|------------|-------------------|------|
|True|True|Metadata is indexed. Content is indexed.|
|True|False|Metadata is indexed. Content is not indexed.|
|False|True|No indexing at all.|
|False|False|No indexing at all.|

Using this aspect you can choose to disable repository-wide indexing. This can prove useful in situations, such as bulk loading.

For more information on working with aspects, see [Managing aspects](../tasks/library-item-manage-aspects.md).

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

