---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: moduleInstalled
---

# `moduleInstalled`

`moduleInstalled(moduleName)` checks if a module is installed.

## Parameters

-   **moduleName**

    A string representing the module name, for example `org.alfresco.module.foo`.


## Returns

True if the specified module is installed.

## Example

```

    var result = false;
    result = utils.moduleInstalled("org.alfresco.module.vti");
    model.result = result;
   
```

The preceding code snippet would return `result` as `true` if the module was installed.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

