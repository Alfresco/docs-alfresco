---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [listUserSites, JavaScript, Site service]
---

# `listUserSites`

The `listUserSites()` methods list all the sites to which the specified user has an explicit membership.

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

## `listUserSites`

`listUserSites(userName)` lists all the sites to which the specified user has an explicit membership.

### Parameters

-   **userName**

    The user name for the user whose site membership is to be listed.


### Returns

Returns a list of the sites to which the specified user has an explicit membership.

### Example

```

      var sites = siteService.listUserSites("admin"); 
    
```

## `listUserSites`

`listUserSites(userName, size)` lists all the sites to which the specified user has an explicit membership.

### Parameters

-   **userName**

    The user name for the user whose site membership is to be listed.

-   **size**

    An integer representing the number of results to return. The default is 0 which returns all results.


### Returns

Returns a list of the sites to which the specified user has an explicit membership.

### Example

```

      var sites = siteService.listUserSites("admin", 10); 
    
```

