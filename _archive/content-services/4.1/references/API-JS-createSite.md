---
author: Alfresco Documentation
---

# `createSite`

`createSite(sitePreset, shortName, title, description, visibility)` creates a new site.

CAUTION:

This method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. Currently, creating a site programmatically needs to be done in the Share context, using the `create-site` module. Further information can be found at the address `http://your_domain:8080/share/page/index/uri/modules/create-site.post` within your Alfresco installation.

## Parameters

-   **sitePreset**

    The site preset, for example `site-dashboard` or custom-defined preset.

-   **shortName**

    The unique site short name to identify the site

-   **title**

    A title for the site

-   **description**

    A description for the site

-   **visibility**

    The visibility of the site, which is one of `siteService.PUBLIC_SITE`, `siteService.MODERATED_SITE`, `siteService.PRIVATE_SITE`.


## Returns

Returns a Site object representing the created site with the specified parameters.

## Example

```

var site = siteService.createSite("site-dashboard", "gamma-site", "Gamma Site", "A site description", siteService.PUBLIC_SITE);      
      
```

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

