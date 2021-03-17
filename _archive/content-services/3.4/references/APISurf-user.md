---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# user

The user object provides the following properties.

|`properties`|An associative array of user properties.|
|`id`|The user identifier.|
|`name`|The Principal name \(most commonly, this will be the same as the user ID\).|
|`fullName`|The user's full name \(for example, Joe Dwight Smith\).|
|`firstName`|The user's first name \(for example, Joe\).|
|`middleName`|The user's middle name \(for example, Dwight\).|
|`lastName`|The user's last name \(for example, Smith\).|
|`email`|The user's email address.|
|`organization`|The user's organization.|
|`jobTitle`|The user's job title.|
|`location`|The user's location.|
|`biography`|The user's biography.|
|`telephone`|The user's telephone entry.|
|`mobilePhone`|The user's mobile phone entry.|
|`skype`|The user's Skype name.|
|`instantMsg`|The user's instant messaging ID.|
|`companyPostcode`|The user's company post code.|
|`companyTelephone`|The user's company telephone entry.|
|`companyFax`|The user's company fax entry.|
|`companyEmail`|The user's company email address.|
|`companyAddress1`|The user's company address entry 1.|
|`companyAddress2`|The user's company address entry 2.|
|`companyAddress3`|The user's company address entry 3.|

The `user` object provides the following methods:

## `save()`

Saves changes to the user's properties if supported by the User object implementation.

## `getUser(userId)`

Retrieves a user object with populated details for the given user ID.

For example, to output text based on the current user location property, use:

```
<#if user.location == "Boston">
   <p>Welcome to the Red Sox appreciation page, ${user.firstName}!</p>
</#if>
```

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

