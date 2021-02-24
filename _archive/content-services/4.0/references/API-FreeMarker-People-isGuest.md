---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: isGuest
---

# `isGuest`

`isGuest(person)` returns the guest status for the specified user.

## Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


## Returns

Returns true if the specified user is a guest, false otherwise.

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

