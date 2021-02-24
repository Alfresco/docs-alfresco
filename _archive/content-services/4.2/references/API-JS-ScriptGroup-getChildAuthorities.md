---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getChildAuthorities
---

# `getChildAuthorities`

`getChildAuthorities(...)` these methods return the child authorities \(users and groups\) of this group.

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

## `getChildAuthorities`

`getChildAuthorities()` this method returns the child authorities \(users and groups\) of this group.

### Parameters

None

### Returns

An array of `Authority` objects.

### Example

```

    var shortName = "MY_GROUP";
    var group = groups.getGroup(shortName);

    model.childAuthorities = group.getChildAuthorities();
        
```

The following FreeMarker code could be used to display the results from the preceding JavaScript code snippet:

```


  <#list childAuthorities as ca>
  
     <p>fullName: ${ca.fullName}</p>
     <p>displayName: ${ca.displayName}</p>
     <p>shortName: ${ca.shortName}</p>
     <p>authorityType: ${ca.authorityType}</p>

     <hr/>
  </#list>
          
        
```

The preceding code would display results such as the following:

```

fullName: abeecher

displayName: abeecher

shortName: abeecher

authorityType: USER

fullName: GROUP_ANOTHER_STARLIGHT_GROUP

displayName: Another example group

shortName: ANOTHER_STARLIGHT_GROUP

authorityType: GROUP

fullName: mjackson

displayName: mjackson

shortName: mjackson

authorityType: USER

fullName: GROUP_MY_SUB_GROUP

displayName: MySubGroup

shortName: MY_SUB_GROUP

authorityType: GROUP

fullName: GROUP_FINANCE

displayName: Starlight Finance

shortName: FINANCE

authorityType: GROUP        

```

## `getChildAuthorities`

`getChildAuthorities(paging, sortBy)` this method returns the child authorities \(users and groups\) of this group.

### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

An array of `Authority` objects.

### Example

```

    var shortName = "MY_GROUP";
    var group = groups.getGroup(shortName);

    // now find child authorities
    var paging = utils.createPaging(-1, 0);
    var sortBy = "displayName";
    model.childAuthorities = group.getChildAuthorities(paging, sortBy);
        
```

The following FreeMarker code could be used to display the results from the preceding JavaScript code snippet:

```


  <#list childAuthorities as ca>
  
     <p>fullName: ${ca.fullName}</p>
     <p>displayName: ${ca.displayName}</p>
     <p>shortName: ${ca.shortName}</p>
     <p>authorityType: ${ca.authorityType}</p>

     <hr/>
  </#list>
          
        
```

The preceding code would display results such as the following:

```

fullName: abeecher

displayName: abeecher

shortName: abeecher

authorityType: USER

fullName: GROUP_ANOTHER_STARLIGHT_GROUP

displayName: Another example group

shortName: ANOTHER_STARLIGHT_GROUP

authorityType: GROUP

fullName: mjackson

displayName: mjackson

shortName: mjackson

authorityType: USER

fullName: GROUP_MY_SUB_GROUP

displayName: MySubGroup

shortName: MY_SUB_GROUP

authorityType: GROUP

fullName: GROUP_FINANCE

displayName: Starlight Finance

shortName: FINANCE

authorityType: GROUP        

```

