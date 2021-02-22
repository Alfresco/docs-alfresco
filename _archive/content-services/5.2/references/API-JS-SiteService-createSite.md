---
author: Alfresco Documentation
---

# `createSite`

The `createSite(...)` methods partially create a new site.

CAUTION:

These methods will only create a site at the repository level, and do not create a fully functional site. It should be considered for internal use only at the moment. You need to create a site programmatically in the Share context, using the `create-site` module. Further information can be found at the address http://your\_domain:8080/share/page/index/uri/modules/create-site.post within your Alfresco Content Services installation.

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

## `createSite`

`createSite(sitePreset, shortName, title, description, visibility)` creates a new site.

CAUTION:

This method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. You need to a site programmatically in the Share context, using the `create-site` module. Further information can be found at the address `http://your_domain:8080/share/page/index/uri/modules/create-site.post` within your Alfresco Content Services installation.

### Parameters

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


### Returns

Returns a Site object representing the created site with the specified parameters.

### Example

```

var site = siteService.createSite("site-dashboard", "gamma-site", "Gamma Site", "A site description", siteService.PUBLIC_SITE);      
      
```

## `createSite`

`createSite(sitePreset, shortName, title, description, visibility, siteType)` creates a new site.

CAUTION:

This method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. Youy need to create a site programmatically in the Share context, using the `create-site` module. Further information can be found at the address `http://your_domain:8080/share/page/index/uri/modules/create-site.post` within your Alfresco Content Services installation.

### Parameters

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

-   **siteType**

    QName of site type to create. By default this would be a collaboration site, `st:site`. It is possible to create other types of site, and these can be selected here. This value must be a sub-type of `st:site`.


### Returns

Returns a Site object representing the created site with the specified parameters.

### Example

```

var site = siteService.createSite("site-dashboard", "gamma-site", "Gamma Site", "A site description", siteService.PUBLIC_SITE, "st:site");      
      
```

