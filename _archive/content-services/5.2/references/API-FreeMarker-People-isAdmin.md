---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `isAdmin`

`isAdmin(person)` returns the administrator status of the specified user.

## Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


## Returns

Returns true of the specified user is an Administrator, false otherwise.

## Example

```

          
<p>isAccountEnabled: <#if people.isAccountEnabled(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isAdmin: <#if people.isAdmin(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isGuest: <#if people.isGuest(myPerson)>TRUE<#else>FALSE</#if></p>
        
      
```

The preceding code snippet would produce output similar to the following:

```

isAccountEnabled: TRUE

isAdmin: TRUE

isGuest: FALSE      
      
```

**Parent topic:**[People API](../references/API-FreeMarker-People.md)

