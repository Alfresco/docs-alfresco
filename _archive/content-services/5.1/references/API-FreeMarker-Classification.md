---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Classification API

The `classification` object provides read access to classifications and root categories.

## `Classification` object

The following are `Classification` object properties:

|Property|Description|
|--------|-----------|
|`allClassificationAspects`|Returns a list of `QName` objects of all classification aspects.|

## Example

The following example displays the available classification types and top level category nodes:

```

        
<#list classification.allClassificationAspects as a>
  ${a}<br>
</#list>
 
      
```

The preceding code snippet would return output such as the following:

```

{http://www.alfresco.org/model/content/1.0}taggable
{http://www.alfresco.org/model/content/1.0}generalclassifiable
{http://www.alfresco.org/model/content/1.0}classifiable        
      
```

The following code snippet:

```


<#list classification.getRootCategories("cm:taggable") as n>
  ${n.name}<br>
</#list>     

    
```

Would produce output similar to the following:

```

text
examples
javascript
documentation
api        
        
```

The preceding output represents a list of tags available in the system that have been defined by the users.

-   **[getAllCategoryNodes](../references/API-FreeMarker-Classification-getAllCategoryNodes.md)**  
`getAllCategoryNodes` these methods return a list of `CategoryTemplateNodes` which represent the category nodes for a given classification.
-   **[getRootCategories](../references/API-FreeMarker-Classification-getRootCategories.md)**  
`getRootCategories(aspect)` returns the root categories in a classification.
-   **[CategoryTemplateNode](../references/API-FreeMarker-Classification-CategoryTemplateNode.md)**  
The `CategoryTemplateNode` object represents a category object.

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

