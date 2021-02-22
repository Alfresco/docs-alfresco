---
author: Alfresco Documentation
---

# user

The user object provides a number of properties describing the user.

|`properties`|An associative array of user properties.|
|`id`|The user identifier.|
|`name`|The Principal name \(most commonly, this will be the same as the user ID\).|
|`fullName`|The user's full name \(for example, Joe Dwight Smith\).|
|`firstName`|The user's first name \(for example, Joe\). Read/write.|
|`middleName`|The user's middle name \(for example, Dwight\). Read/write.|
|`lastName`|The user's last name \(for example, Smith\). Read/write.|
|`email`|The user's email address. Read/write.|
|`organization`|The user's organization. Read/write.|
|`jobTitle`|The user's job title. Read/write.|
|`location`|The user's location. Read/write.|
|`biography`|The user's biography. Read/write.|
|`telephone`|The user's telephone entry. Read/write.|
|`mobilePhone`|The user's mobile phone entry. Read/write.|
|`skype`|The user's Skype name. Read/write.|
|`instantMsg`|The user's instant messaging ID. Read/write.|
|`googleUsername`|User name for Google account. REad/write.|
|`companyPostcode`|The user's company post code. Read/write.|
|`companyTelephone`|The user's company telephone entry. Read/write.|
|`companyFax`|The user's company fax entry. Read/write.|
|`companyEmail`|The user's company email address. Read/write.|
|`companyAddress1`|The user's company address entry 1. Read/write.|
|`companyAddress2`|The user's company address entry 2. Read/write.|
|`companyAddress3`|The user's company address entry 3. Read/write.|
|`isAdmin`|Returns a boolean. True if user is an administrator.|
|`isGuest`|Returns a boolean. True if user is a guest.|
|`nativeUser`|Returns the underlying user object for access to additional methods on custom user objects.|
|`capabilities`|Get a map of capabilities \(boolean assertions\) for the user.|

For example, to output text based on the current user location property, use:

```


<#if user.location == "Boston">
  <p>Welcome to the Red Sox appreciation page, ${user.firstName}!</p>
</#if>

      
```

-   **[save](../references/APISurf-ScriptUser-save.md)**  
`save` - this method persists any changes to the user object's properties.
-   **[getUser](../references/APISurf-ScriptUser-getUser.md)**  
`getUser(String userId)` - this method returns a user object with populated details for the given User ID.

**Parent topic:**[Surf root objects](../references/APISurf-rootscoped.md)

