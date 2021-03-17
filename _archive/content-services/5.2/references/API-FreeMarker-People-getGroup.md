---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
---

# `getGroup`

`getGroup(groupName)` returns the group corresponding to the specified group name.

## Parameters

-   **groupName**

    A string representing the name of the group to be returned.


## Returns

Returns a `TemplateNode` object representing the group whose group name was specified.

## Example

```


<#assign myGroup = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS")>
<p>id: ${myGroup.id}</p>
<p>name: ${myGroup.name}</p>
<p>type: ${myGroup.type}</p>
        
      
```

The preceding code snippet would produce output similar to the following:

```

id: GROUP_ALFRESCO_ADMINISTRATORS

name: GROUP_ALFRESCO_ADMINISTRATORS

type: {http://www.alfresco.org/model/content/1.0}authorityContainer      
      
```

**Parent topic:**[People API](../references/API-FreeMarker-People.md)

