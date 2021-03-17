---
title: Filtered search
---

Use this information to get an overview of the filtered search capability in Alfresco Share along with its configuration details. It also describes how to define your own custom filters.

Filtered search is a powerful search feature that allows users to filter and customize their results by applying multiple filters to their search results in a navigational way. Filtered search breaks up search results into multiple categories, typically showing counts for each, and allows the user to drill down or further restrict their search results based on those filters.

You can configure filtered search either by using the Filtered search configuration properties or by using the [Search Manager]({% link content-services/latest/admin/share-admin-tools.md %}#search-manager).

## Filtered search configuration properties

There are a number of default filtered search configuration properties defined. The default filtered search properties are explained here.

The following example shows how the default filters are defined:

```bash
#
# Alfresco default facets
# Note: If you have changed the filter's default value(s) via Share, then any
# subsequent changes of those default values won't be applied to the filter on
# server startup.
#

# Field-Facet-Qname => cm:content.mimetype
default.cm:content.mimetype.filterID=filter_mimetype
default.cm:content.mimetype.displayName=faceted-search.facet-menu.facet.formats
default.cm:content.mimetype.displayControl=alfresco/search/FacetFilters
default.cm:content.mimetype.maxFilters=5
default.cm:content.mimetype.hitThreshold=1
default.cm:content.mimetype.minFilterValueLength=4
default.cm:content.mimetype.sortBy=DESCENDING
default.cm:content.mimetype.scope=ALL
default.cm:content.mimetype.scopedSites=
default.cm:content.mimetype.isEnabled=true

# Field-Facet-Qname => cm:creator
default.cm:creator.filterID=filter_creator
default.cm:creator.displayName=faceted-search.facet-menu.facet.creator
default.cm:creator.displayControl=alfresco/search/FacetFilters
default.cm:creator.maxFilters=5
default.cm:creator.hitThreshold=1
default.cm:creator.minFilterValueLength=4
default.cm:creator.sortBy=ALPHABETICALLY
default.cm:creator.scope=ALL
default.cm:creator.scopedSites=
default.cm:creator.isEnabled=true

# Field-Facet-Qname => cm:modifier
default.cm:modifier.filterID=filter_modifier
default.cm:modifier.displayName=faceted-search.facet-menu.facet.modifier
default.cm:modifier.displayControl=alfresco/search/FacetFilters
default.cm:modifier.maxFilters=5
default.cm:modifier.hitThreshold=1
default.cm:modifier.minFilterValueLength=4
default.cm:modifier.sortBy=ALPHABETICALLY
default.cm:modifier.scope=ALL
default.cm:modifier.scopedSites=
default.cm:modifier.isEnabled=true

# Field-Facet-Qname => cm:created
default.cm:created.filterID=filter_created
default.cm:created.displayName=faceted-search.facet-menu.facet.created
default.cm:created.displayControl=alfresco/search/FacetFilters
default.cm:created.maxFilters=5
default.cm:created.hitThreshold=1
default.cm:created.minFilterValueLength=4
default.cm:created.sortBy=INDEX
default.cm:created.scope=ALL
default.cm:created.scopedSites=
default.cm:created.isEnabled=true

# Field-Facet-Qname => cm:modified
default.cm:modified.filterID=filter_modified
default.cm:modified.displayName=faceted-search.facet-menu.facet.modified
default.cm:modified.displayControl=alfresco/search/FacetFilters
default.cm:modified.maxFilters=5
default.cm:modified.hitThreshold=1
default.cm:modified.minFilterValueLength=4
default.cm:modified.sortBy=INDEX
default.cm:modified.scope=ALL
default.cm:modified.scopedSites=
default.cm:modified.isEnabled=true

# Field-Facet-Qname => cm:content.size
default.cm:content.size.filterID=filter_content_size
default.cm:content.size.displayName=faceted-search.facet-menu.facet.size
default.cm:content.size.displayControl=alfresco/search/FacetFilters
default.cm:content.size.maxFilters=5
default.cm:content.size.hitThreshold=1
default.cm:content.size.minFilterValueLength=4
default.cm:content.size.sortBy=INDEX
default.cm:content.size.scope=ALL
default.cm:content.size.scopedSites=
default.cm:content.size.isEnabled=true
```

### Filter property description

An example of a filter is `cm:modified`. It specifies the name of the filter field. It is the field on which you want to do a filtered search.

**filterID** - Specifies a unique name to identify the filter. Before adding a new filter, check the existing filters via the [Search Manager]({% link content-services/latest/admin/share-admin-tools.md %}#search-manager) to ensure that the `filterID` does not already exist.

**displayName** - Specifies the display name of the filter.

**displayControl** - Enables the user to decide the user interface control or how the filter is displayed on the **Search** page. The default option is **Check box**. `displayControl` is the full module name for an Aikau widget which is used for rendering the facet filters. By default, Alfresco Content Services provides `alfresco/search/FacetFilters` which is a basic rendering of the filters available for the facet.

**maxFilters** - Enables the user to select the maximum number of filters shown for search results. You can select to show more than one filter.

**hitThreshold** - Enables the user to select the minimum number of matches a filter result must have to be shown on the **Search** page.

**minFilterValueLength** - Specifies the minimum length of characters that a filter value must have to be displayed. This can be useful in hiding common short words.

**sortBy** - Enables the user to select the order in which the filter results must be shown on the **Search** page. The `sortBy` option is passed to the `FacetFilters` widget and defines how the filters should be sorted. This property has the following options:

|Option|Description|
|------|-----------|
|ALPHABETICALLY|Specifies the filter value A-Z.|
|REVERSE_ALPHABETICALLY|Specifies the filter value Z-A.|
|ASCENDING|Specifies the number of filter results (low to high).|
|DESCENDING|Specifies the number of filter results (high to low).|
|INDEX|This is a special value reserved for results rendered by filter queries.|

**scope** - Enables the user to select the sites where the filter will be available.

**scopedSites** - Displays a list of sites where the filter will be available.

**isEnabled** - Specifies if the filter is enabled for inclusion on the search results page. Disabled filters are not displayed. Only the filters you create via the Share console can be deleted; default filters must be disabled to hide them.

> **Note:** You cannot delete or modify any of the default filters, however you can disable them. To define your own custom filters, see [Defining custom search filters using configuration file](#defining-custom-search-filters-using-configuration-file).

## Defining custom search filters using configuration file

You can define and create your own custom filters for being displayed on the search results page.

You can define custom filters in the `solr-facets-config-custom.properties` file. You can also use this file to override the default filter properties.

1. Navigate to the `<classpathRoot>/alfresco/extension` directory.

2. Create the `solr-facets-config-custom.properties` file.

3. Open the `solr-facets-config-custom.properties` file and specify your custom filter properties.

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