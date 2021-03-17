---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getUser
---

# `getUser`

`getUser(username)` gets a user given the user's user name.

## Parameters

-   **username**

    A string representing the user name of the user.


## Returns

Returns a `ScriptUser` object, or null if the user cannot be found.

## Example

```

    var username = "joe.user";

    model.scriptUser = groups.getUser(username);
      
```

The returned ScriptUser object can be passed to the following FreeMarker template code:

```


   <p>authorityType: ${scriptUser.authorityType}</p>
   <p>shortName: ${scriptUser.shortName}</p>
   <p>fullName: ${scriptUser.fullName}</p>
   <p>userName: ${scriptUser.userName}</p>
   <p>displayName: ${scriptUser.displayName}</p>
   <p>personNodeRef: ${scriptUser.personNodeRef}</p>
   <p>person.properties.name: ${scriptUser.person.properties.name}</p>
   <p>person.type: ${scriptUser.person.type}</p>
        
      
```

The preceding FreeMarker code would display results similar to the following:

```

authorityType: USER

shortName: joe.user

fullName: joe.user

userName: joe.user

displayName: joe.user

personNodeRef: workspace://SpacesStore/4d7abb60-d8ff-4fcf-956f-93e53ebafed0

person.properties.name: 4d7abb60-d8ff-4fcf-956f-93e53ebafed0

person.type: {http://www.alfresco.org/model/content/1.0}person        
      
```

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

