---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Classification API

The `classification` object provides read access to classifications and root categories.

|Type|Description|
|----|-----------|
|`getRootCategories(String aspectQName)`|A function to get a sequence of root categories for a classification.|
|`getAllCategoryNodes(String aspectQName)`|A function to get a sequence of the category nodes for a classification.|
|`allClassificationAspects`|Returns a sequence of QName objects of all classification aspects.|

The following extended node API methods are provided to work with Category node objects:

|Type|Description|
|----|-----------|
|``categoryMembers``|Gets all members of a category.|
|`subcategories`|Gets all subcategories of a category.|
|``membersAndSubCategories``|Get all subcategories and members of a category.|
|``immediateCategoryMembers``|Gets all immediate members of a category.|
|``immediateSubCategories``|Gets all immediate subcategories of a category.|
|```immediateMembersAndSubCategories```|Gets all immediate subcategories of a category.

For example, display the available classification types and top level category nodes:

```
<#list classification.allClassificationAspects as a>
   ${a}<br>
 </#list>
 <p>
 <#list classification.getAllCategoryNodes("cm:generalclassifiable") as n>
   ${n.name}<br>
 </#list>

```

|

**Parent topic:**[Template models](../concepts/APIfreemarker-models.md)

