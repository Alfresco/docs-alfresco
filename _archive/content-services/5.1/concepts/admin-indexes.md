---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Controlling indexes

You can use the `cm:indexControl` aspect to control the indexing of content in Alfresco Share. Using this aspect you can choose to disable repository-wide indexing. This can prove useful in certain situations, such as bulk loading.

The `cm:indexControl` aspect enables you to control indexing for the nodes to which it is applied. The aspect exposes the following two properties:

-   `cm:isIndexed ((content + metadata))`: This property controls whether or not the node is indexed.
-   `cm:isContentIndexed`: This property controls whether or not the node content \(binary\) is indexed. Setting this to `false` inhibits full text indexing of the document binary.

The following table shows the possible combinations of settings along with the behavior for each case:

|cm:isIndexed|cm:isContentIndexed|Result|
|------------|-------------------|------|
|True|True|Metadata is indexed. Content is indexed.|
|True|False|Metadata is indexed. Content is not indexed.|
|False|True|No indexing at all.|
|False|False|No indexing at all.|

For more information on working with aspects, see [Managing aspects](../tasks/library-item-manage-aspects.md).

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

