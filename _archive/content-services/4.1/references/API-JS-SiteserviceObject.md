---
author: Alfresco Documentation
---

# Site service object

The `siteService` object provides methods to create sites, list sites in the repository, list roles that can be assigned to members of a site, and get sites for given names.

-   **[createSite](../references/API-JS-createSite.md)**  
`createSite(sitePreset, shortName, title, description, visibility)` creates a new site.
-   **[listSites](../references/API-JS-listSites.md)**  
`listSites` methods list the sites that are available in the repository.
-   **[listSiteRoles](../references/API-JS-listSiteRoles.md)**  
`listSiteRoles()` these methods list all the roles that can be assigned to a member of a site.
-   **[listUserSites](../references/API-JS-listUserSites.md)**  
`listUserSites()` these methods list all the sites to which the specified user has an explicit membership.
-   **[getSite](../references/API-JS-getSite.md)**  
`getSite(shortName)` gets a site for a provided short name.
-   **[getSites](../references/API-JS-getSites.md)**  
`getSites(filter, sitePresetFilter, size)` returns a list of sites. Retrieves all the sites available in the repository. The returned list can optionally be filtered by name and site preset. If no filters are specified then all the available sites are returned.
-   **[findSites](../references/API-JS-findSites.md)**  
`findSites(filter, sitePresetFilter, size)` searches for and returns a list of sites. The returned list can be optionally filtered by name and site preset. If no filters are specified then all the available sites are returned.
-   **[hasCreateSitePermissions](../references/API-JS-hasCreateSitePermissions.md)**  
`hasCreateSitePermissions()` returns true if the currently logged on user has permission to create a site.
-   **[isSiteManager](../references/API-JS-isSiteManager.md)**  
`isSiteManager(shortName)` checks whether the currently authenticated user is a site manager or not, for the specified site.
-   **[cleanSitePermissions](../references/API-JS-cleanSitePermissions.md)**  
`cleanSitePermissions()` these methods clean permissions from a node.

**Parent topic:**[Site service](../references/API-JS-SiteService.md)

