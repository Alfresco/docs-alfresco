---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `getMembers`

`getMembers` these methods return the members of a group.

**Parent topic:**[People API](../references/API-FreeMarker-People.md)

## `getMembers(group)`

`getMembers(group)` returns the members of a group including all sub-groups.

### Parameters

-   **group**

    A `TemplateNode` object representing the group to return the members of.


### Returns

Returns a list of `TemplateNode` objects representing the members of the specified group.

### Example

```


<#assign members = people.getMembers(myGroup)>
<#list members as m>
  <p>${m.name}</p>
  <p>${m.id}</p>
</#list>

      
```

The preceding code snippet will return members of the specified group and sub-groups.

## `getMembers(group, recurse)`

`getMembers(group, recurse)` returns the members of a group.

### Parameters

-   **group**

    A `TemplateNode` object representing the group to return the members of.

-   **recurse**

    If true the method will return members including sub-groups. If false members of sub-groups will not be returned.


### Returns

Returns a list of `TemplateNode` objects representing the members of the specified group.

### Example

```


<#assign members = people.getMembers(myGroup, false)>
<#list members as m>
  <p>${m.name}</p>
  <p>${m.id}</p>
</#list>

        
```

The preceding code snippet will return members of the specified group, but will not return members of sub-groups.

