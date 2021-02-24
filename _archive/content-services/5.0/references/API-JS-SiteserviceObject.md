---
author: Alfresco Documentation
---

# Site service object

The `siteService` object provides methods to create sites, list sites in the repository, list roles that can be assigned to members of a site, and get sites for given names.

-   **[cleanSitePermissions](../references/API-JS-SiteService-cleanSitePermissions.md)**  
`cleanSitePermissions()` these methods clean permissions from a node.
-   **[createSite](../references/API-JS-SiteService-createSite.md)**  
The `createSite(...)` methods partially create a new site.
-   **[findSites](../references/API-JS-SiteService-findSites.md)**  
`findSites(filter, sitePresetFilter, size)` searches for and returns a list of sites. The returned list can be optionally filtered by name and site preset. If no filters are specified then all the available sites are returned.
-   **[getSite](../references/API-JS-SiteService-getSite.md)**  
`getSite(shortName)` gets a site for a provided short name.
-   **[getSites](../references/API-JS-SiteService-getSites.md)**  
`getSites(filter, sitePresetFilter, size)` returns a list of sites. Retrieves all the sites available in the repository. The returned list can optionally be filtered by name and site preset. If no filters are specified then all the available sites are returned.
-   **[hasCreateSitePermissions](../references/API-JS-SiteService-hasCreateSitePermissions.md)**  
`hasCreateSitePermissions()` returns true if the currently logged on user has permission to create a site.
-   **[hasSite](../references/API-JS-SiteService-hasSite.md)**  
`hasSite(String shortName)` returns true if the specified site exists. Allows private site existence to be tested.
-   **[isSiteManager](../references/API-JS-SiteService-isSiteManager.md)**  
`isSiteManager(siteId)` checks whether the currently authenticated user is a site manager or not, for the specified site.
-   **[listSiteRoles](../references/API-JS-SiteService-listSiteRoles.md)**  
The `listSiteRoles()` methods list all the roles that can be assigned to a member of a site.
-   **[listSites](../references/API-JS-SiteService-listSites.md)**  
The `listSites` methods list the sites that are available in the repository.
-   **[listUserSites](../references/API-JS-SiteService-listUserSites.md)**  
The `listUserSites()` methods list all the sites to which the specified user has an explicit membership.

**Parent topic:**[Site service](../references/API-JS-SiteService.md)

