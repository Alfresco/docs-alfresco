---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `getContainerGroups`

`getContainerGroups(person)` returns the groups that contain the specified authorities.

## Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


## Returns

Returns a list of `TemplateNode` objects that represent the groups that contain the specified authority.

## Example

```


<#assign containerGroups = people.getContainerGroups(myPerson)>
<#list containerGroups as cg>
  <p>${cg.name}</p>
  <p>${cg.type}</p>
</#list>
        
      
```

The preceding code snippet would produce output similar to the following:

```

GROUP_ALFRESCO_ADMINISTRATORS

{http://www.alfresco.org/model/content/1.0}authorityContainer

GROUP_EMAIL_CONTRIBUTORS

{http://www.alfresco.org/model/content/1.0}authorityContainer

ef14d966-9e21-4096-a4a4-72bbf1e43e73

{http://www.alfresco.org/model/content/1.0}authorityContainer        
      
```

**Parent topic:**[People API](../references/API-FreeMarker-People.md)

