---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# `CategoryTemplateNode`

The `CategoryTemplateNode` object represents a category object.

## Properties

The following properties are available for `CategoryTemplateNode` objects:

|Property|Description|
|--------|-----------|
|``categoryMembers``|Returns a list of members of a category as `TemplateNode` objects.|
|`subcategories`|Returns a list of subcategories of a category as `CategoryTemplateNode` objects.|
|`membersAndSubCategories`|Returns a list of `TemplateNode` objects representing all subcategories and members of a category.|
|`immediateCategoryMembers`|Returns a list of `TemplateNode` objects representing all immediate members of a category.|
|`immediateSubCategories`|Returns a list of `CategoryTemplateNode` objects representing all immediate subcategories of a category.|
|`immediateMembersAndSubCategories`|Returns a list of `TemplateNode` objects representing all immediate subcategories of a category.|
|`isCategory`|Returns true if the node is a category instance, false otherwise.|

**Parent topic:**[Classification API](../references/API-FreeMarker-Classification.md)

