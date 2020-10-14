---
title: Defining custom search filters
---

## Defining custom search filters using configuration file

You can define and create your own custom filters for being displayed on the search results page.

You can define custom filters in the solr-facets-config-custom.properties file. You can also use this file to override the default filter properties.

1. Navigate to the <classpathRoot>/alfresco/extension directory.

2. Create the solr-facets-config-custom.properties file.

3. Open the solr-facets-config-custom.properties file and specify your custom filter properties.

    Here's an example of custom filter configuration:

    ```bash
    custom.cm:description.filterID=filter_newFilter
    custom.cm:description.displayName=faceted-search.facet-menu.facet.description
    custom.cm:description.displayControl=alfresco/search/FacetFilters
    custom.cm:description.maxFilters=3
    custom.cm:description.hitThreshold=1
    custom.cm:description.minFilterValueLength=2
    custom.cm:description.sortBy=DESCENDING
    custom.cm:description.scope=SCOPED_SITES
    custom.cm:description.scopedSites=
    custom.cm:description.isEnabled=true
    ```

    > **Note:** The values specified in the custom filters will overwrite the default filter's value. However, if you change the filter's default value(s) via Share, then any subsequent changes made to the filter values via the configuration files, won't be applied to the filter on server startup.
