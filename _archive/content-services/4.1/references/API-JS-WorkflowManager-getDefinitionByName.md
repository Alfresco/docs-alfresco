---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getDefinitionByName
---

# `getDefinitionByName`

`getDefinitionByName(name)` this method get the workflow definitions corresponding to the specified name.

## Parameters

-   **name**

    A string representing the name of the workflow definition to return.


## Returns

Returns the workflow definition with the given name or null if no workflow definition with the given name exists.

## Example

```

    var name = "activiti$activitiAdhoc";
    
    model.definition = workflow.getDefinitionByName(name);        
      
```

**Parent topic:**[Workflow Manager](../references/API-JS-WorkflowManager.md)

