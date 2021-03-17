---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [listSiteRoles, JavaScript API, Site service]
---

# `listSiteRoles`

The `listSiteRoles()` methods list all the roles that can be assigned to a member of a site.

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

## `listSiteRoles`

`listSiteRoles()` lists all the roles that can be assigned to a member of a site.

### Returns

Returns an array containing strings representing the roles available to assign to a member of a site.

### Example

```

  var roles = siteService.listSiteRoles(); 
      
```

The preceding code snippet would return a list of roles such as:

```

  SiteManager

  SiteCollaborator

  SiteContributor

  SiteConsumer

```

## `listSiteRoles(shortName)`

`listSiteRoles(shortName)` lists all the roles that can be assigned to a member of a site, for a specific site.

### Parameters

-   **shortName**

    A string representing the short name of the site to list roles for.


### Returns

Returns an array containing strings representing the roles available to assign to a member of a site.

### Example

```

  var roles = siteService.listSiteRoles("test-site"); 
      
```

The preceding code snippet would return a list of roles for the specified site, such as:

```

  SiteManager

  SiteCollaborator

  SiteContributor

  SiteConsumer

```

