---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: searchUsers
---

# `searchUsers`

`searchUsers(nameFilter, paging, sortBy)` returns an array of `ScriptUsers` that match the specified parameters.

## Parameters

-   **nameFilter**

    String to allow a partial match of the name. The username, first name, and last name will all be checked to see if they start with the filter string. If empty then the string will match all users.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


## Returns

Returns an array of `ScriptUser` objects that represents the users matching the query.

## Example

```

    var filterName = "A";
    var paging =  utils.createPaging(-1, 0);
    var sortBy = "userName";

    model.scriptUsers = groups.searchUsers(filterName, paging, sortBy);
      
```

The return results could be displayed using the following FreeMarker template code snippet:

```



    <#list scriptUsers as su>
  
     <p>firstName: ${su.person.properties.firstName}</p>

     <p>lastName: ${su.person.properties.lastName}</p>

     <p>userName: ${su.userName}</p>

     <hr/>
   </#list>
        
        
```

The preceding code snippet would return results similar to the following:

```

firstName: Alice

lastName: Beecher

userName: abeecher

firstName: Administrator

lastName:

userName: admin

firstName: Tony

lastName: Tortilla

userName: Archvile

firstName: Peter

lastName: Andrews

userName: petethepiper

      
```

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

