---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, CategoryNode API, JavaScript API]
option: JavaScript API CategoryNode
---

# CategoryNode Object API

The CategoryNode objects returned from the classification object methods are extended from the standard JavaScript ScriptNode model.

## Properties

-   **`isCategory`**

    Returns true if this is a category node, or false otherwise. This is supported by all nodes types.


-   **`categoryMembers`**

    Gets an array of all the members of this category at any depth


-   **`subCategories`**

    Gets an array of all the subcategories of this category at any depth


-   **`membersAndSubCategories`**

    Gets an array of all the subcategories and members of this category at any depth


-   **`immediateCategoryMembers`**

    Gets an array of all the immediate members of this category \(only direct members of this category and not through sub categories\).


-   **`immediateSubCategories`**

    Gets an array of all the immediate subcategories of this category \(only direct subcategories of this category and not through subcategories\)


-   **`immediateMembersAndSubCategories`**

    Gets an array of all the immediate subcategories and members of this category \(only direct subcategories and members of this category and not through subcategories\)


-   **[createSubCategory](../references/API-JS-createSubCategory.md)**  
`createSubCategory(name)` creates a new subcategory from the current category node.
-   **[removeCategory](../references/API-JS-removeCategory.md)**  
`removeCategory()` deletes the current category node.
-   **[rename](../references/API-JS-CategoryNode-rename.md)**  
`rename(name)` renames the current category node to the specified name.

**Parent topic:**[Classification API](../references/API-JS-Classification.md)

