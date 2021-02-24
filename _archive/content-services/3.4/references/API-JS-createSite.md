---
author: Alfresco Documentation
---

# `createSite`

`createSite(sitePreset, shortName, title, description, visibility)` creates a new site.

CAUTION:

This method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. Currently, creating a site programmatically needs to be done in the Share context, using the `create-site` module. Further information can be found at the address `http://your_domain:8080/share/page/index/uri/modules/create-site.post` within your Alfresco installation.

## Parameters

-   **sitePreset**

    The site preset

-   **shortName**

    The unique site short name to identify the site

-   **title**

    A title for the site

-   **description**

    A description for the site

-   **visibility**

    The visibility of the site \(PUBLIC\|PRIVATE\|MODIFIED\)


## Returns

Returns the created site with the specified parameters.

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

