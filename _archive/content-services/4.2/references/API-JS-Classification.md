---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Classification API

The Classification API has two parts: manipulating classifications, and manipulating the categories they contain. A root level `classification` object is provided to return category nodes. The `CategoryNode` objects returned from the methods are extended from the standard JavaScript `ScriptNode` model to include category manipulation.

-   **[createRootCategory](../references/API-JS-createRootCategory.md)**  
`createRootCategory(aspect, name)` - creates a root category.
-   **[getAllCategoryNodes](../references/API-JS-getAllCategoryNodes.md)**  
`getAllCategoryNodes(aspect)` gets an array of all the category nodes in the given classification.
-   **[getAllClassificationAspects](../references/API-JS-getAllClassificationAspects.md)**  
`getAllClassificationAspects()` gets all the aspects that define a classification. An array of aspect QNames in `prefix:localName` form is returned.
-   **[getCategory](../references/API-JS-getCategory.md)**  
`getCategory(catRef)` returns a category node
-   **[getCategoryUsage](../references/API-JS-getCategoryUsage.md)**  
`getCategoryUsage(aspect, maxCount)` returns categories with the most number of objects. The number of categories returned is specified in `maxCount`.
-   **[getRootCategories](../references/API-JS-getRootCategories.md)**  
`getRootCategories(aspect)` returns an array of root category nodes for a given classification.
-   **[setStoreUrl](../references/API-JS-setStoreUrl.md)**  
`setStoreUrl(storeRef)` - set the default store reference.
-   **[CategoryNode API](../references/API-JS-CategoryNode.md)**  
The CategoryNode objects returned from the classification object methods are extended from the standard JavaScript ScriptNode model.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

