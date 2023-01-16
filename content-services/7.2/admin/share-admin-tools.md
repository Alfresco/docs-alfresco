---
title: Share Admin Tools
---

Share Admin Tools help you to manage your administration operations.

Administrators can use the Share Admin Tools to create and manage users and groups directly in Share, set application preferences, manage categories and tags, and browse the system information in the node browser.

>**Note:** You can find additional admin tools in the [Repository Admin Console]({% link content-services/7.2/admin/admin-console.md %}).

**Admin Tools** is visible on the toolbar if you're an Administrator or a user who is a member of the `ALFRESCO_ADMINISTRATORS` or `ALFRESCO_MODEL_ADMINISTRATORS` groups. If you're a member of `SITES_ADMINISTRATORS`, you'll have an additional **Sites Manager** option on the toolbar instead of **Admin Tools**.

## Overview

You can see the **Admin Tools** option on the menu bar if you're an administrator user or a user who is a member of the `ALFRESCO_ADMINISTRATORS` group. Use the links to see more information about each tool.

1. Click **Admin Tools**.

    The tools are listed on the left-side of the page. The first set of tools are for general Content Services administration:

    * Application: [Share theme and logo](#theme-logo)
    * Category Manager: [Managing categories](#cat-manager)
    * Module Browser: [Viewing module packages]({% link content-services/7.2/install/zip/amp.md %}#viewing-module-packages)
    * Node Browser: [Using the Node Browser in Share Admin Tools]({% link content-services/7.2/admin/troubleshoot.md %}#using-the-node-browser)
    * Search Manager: [Manage search filters](#search-manager)
    * Tag Manager: [Managing tags](#tag-manager)
    * Model Manager: [Content modeling with Model Manager]({% link content-services/7.2/config/models.md %})
    * Sites Manager: [Sites Manager](#sites-manager)

    The remaining tools are grouped into the following categories:

    * Repository:
        * Replication Jobs: [Managing replication jobs]({% link content-services/7.2/admin/replication.md %})
    * Users and Groups:
        * Groups: [Managing groups]({% link content-services/7.2/admin/users-groups.md %}#manage-groups)
        * Users: [Managing users]({% link content-services/7.2/admin/users-groups.md %}#manage-users)

        > **Note:** You can also test an alternative way of managing users and groups using containerized deployment. See [Alfresco Control Center]({% link content-services/7.2/admin/control-center.md %}).

2. Select an Admin Tool from the left side to see the page for each tool.

## Manage Share Theme and Logo {#theme-logo}

Use the Admin Tools to manages look and feel of Alfresco Share.

### Change Share theme

The look and feel of the user interface is set by a theme. The Application tool lets you select a color scheme for the user interface.

1. Click **Admin Tools**, and then click **Application**.

2. On the **Options** page, select a theme from the list.

    Choose one of the available themes:

    * Green Theme
    * Blue Theme
    * Light Theme
    * Yellow Theme
    * Google Docs Theme
    * High Contrast Theme

3. Click **Apply**.

    The new theme applies the CSS and image assets across all pages.

The page refreshes to display with the selected theme. The changed theme affects all users from the next time they sign in and persists across sessions.

A new installation uses the default theme.

> **Note:** Site managers can customize the theme for an individual site. If a site theme has been changed, this will override any theme setting made in the **Admin Tools**.

### Change Share logo

You can change the Alfresco logo to another image file.

1. Click **Admin Tools**, and then click **Application**.

2. On the **Options** page, click **Upload** to view the **Upload File** window.

3. Click **Select files to upload**.

4. Choose a file and click **Open**.

    You can choose to upload any image you like but there are some recommendations for suitable sizes for the image. The maximum recommended image height for your image file is 48 pixels.

    The file you chose shows in the **Upload File** window. If it's not the right file, click **Remove** to select another file.

5. Click **Upload File(s)**.

6. When you see that the file is successfully uploaded, click **OK**.

7. Click **Apply**.

8. If you wish to change the logo back to the default logo, click **Reset** to display the original logo, and then click **Apply**.

## Category Manager {#cat-manager}

Use the **Category Manager** to add, edit, and delete content categories.

1. Click **Admin Tools**, and then click **Category Manager**.

    The Category Manager page shows a tree structure of the categories created in the system. The top level is called **Category Root** and by default, the following sub-categories are listed:

    * Languages
    * Regions
    * Software Document Classification
    * Tags

    You can categorize files using parent categories and their child categories.

2. Click the category icons ![category-icon]({% link content-services/images/category-icon.jpg %}){:height="18px" width="18px"} to expand the list of categories.

    When you hover over the category name, you see the available action icons for:

    * Edit category ![ico-configure]({% link content-services/images/ico-configure.png %}){:height="18px" width="18px"}
    * Add category ![ico-admin-add]({% link content-services/images/ico-admin-add.png %}){:height="18px" width="18px"}
    * Delete category ![ico-delete]({% link content-services/images/ico-delete.png %}){:height="18px" width="18px"}

3. To edit a category, click the **Edit Category** icon, edit the category name inline, and then click **Save**.

4. To add a category, click the **Add Category** icon, enter a name in the **Category name** field, and then click **OK**.

    When using Solr, there maybe a delay before the new category appears in a search query until after Solr has been reindexed. Categories are eventually consistent. Categories are available for use across all sites and by all users.

5. To delete a category, click the **Delete Category** icon, and then click **Delete** to confirm that you wish to delete the category.

    The category is deleted from the system. Any content is removed from that category label.

## Tag Manager

Tags can be added to content within the Document Library. Use the **Tag Manager** page to view, edit, and delete all the tags that have been created by users.

1. Click **Admin Tools**, and then click **Tag Manager**.

    The **Tag Manager** page shows a list of the tags that have been created, the name of the user who created or modified the tag, and the date on which the change was made.

    If there are no tags in the system, you see the message: **No tags found**.

    When you hover over the right hand **Actions** column, you see the available action icons for - **Edit tag** and **Delete tag**:

    1. To edit a tag, click the **Edit tag** icon, edit the tag name in the **Rename Tag** field, and then click **OK**.

    2. To delete a tag, click the **Delete tag** icon, and then click **Delete** to confirm that you wish to delete the tag. The tag is deleted from the system and removed from any content where it was previously tagged.

2. Click the tag name to see a list of the repository content that uses this tag.

3. Click the user name to see the profile of the user who last modified the tag.

## Sites Manager

The Sites Manager is used for maintaining sites. You have control over the visibility of all sites as well as deleting sites or making yourself a site manager.

> **Note:** Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups. If you're in the `ALFRESCO_ADMINISTRATORS` group, you can access the Site Manager through the **Admin Tools** on the toolbar. If you're a member of `SITE_ADMINISTRATORS` group, you'll have an additional **Sites Manager** option on the toolbar.

The Sites Manager displays the names and status of created sites, regardless of their visibility setting. You can use the **Visibility** menu to change the visibility of any site, for example, change the site visibility to either **Public**, **Moderated**, or **Private**. Any visibility change you make to a site is made immediately.

With the **Actions** menu, there are two options:

* Delete Site
* Become Site Manager

You can delete any of the sites in the Site Manager list by selecting **Delete Site** from the **Actions** menu. This action deletes all site details and content.

The `I'm a Site Manager` column shows the sites where you have the Site Manager permission. If you'ren't already a manager of a site, then select **Become Site Manager** from the **Actions** menu.

Take a look at this video to learn more: [Site Manager]({% link content-services/7.2/tutorial/video/sites.md %}#use-sites-manager)

## Search Manager

With the **Search Manager** you can see details of existing search filters and create new filters.

Filtered search is a powerful search feature that allows users to filter and customize their results by applying multiple filters to their search results in a navigational way. Filtered search breaks up search results into multiple categories, typically showing counts for each, and allows the user to drill down or further restrict their search results based on those filters.

You can configure filtered search either by using [configuration files](#configfilteredsearch) or by using the Search Manager.

Take a look at this video to learn more: [Search Manager]({% link content-services/7.2/tutorial/video/content.md %}#use-search-manager)

### Configure filtered search using configuration files {#configfilteredsearch}

This section shows how to configure filtered search manually with configuration files.

#### Filtered search configuration file and default properties

There are a number of default filtered search configuration properties defined. The default filtered search properties are explained here.

The following example shows how the default filters are defined:

```text
#
# Alfresco default facets
# Note: If you've changed the filter's default value(s) via Share, then any
# subsequent changes of those default values won't be applied to the filter on
# server startup.
#

# Field-Facet-Qname => cm:content.mimetype
default.cm\:content.mimetype.filterID=filter_mimetype
default.cm\:content.mimetype.displayName=faceted-search.facet-menu.facet.formats
default.cm\:content.mimetype.displayControl=alfresco/search/FacetFilters
default.cm\:content.mimetype.maxFilters=5
default.cm\:content.mimetype.hitThreshold=1
default.cm\:content.mimetype.minFilterValueLength=4
default.cm\:content.mimetype.sortBy=DESCENDING
default.cm\:content.mimetype.scope=ALL
default.cm\:content.mimetype.scopedSites=
default.cm\:content.mimetype.isEnabled=true

# Field-Facet-Qname => cm:creator
default.cm\:creator.filterID=filter_creator
default.cm\:creator.displayName=faceted-search.facet-menu.facet.creator
default.cm\:creator.displayControl=alfresco/search/FacetFilters
default.cm\:creator.maxFilters=5
default.cm\:creator.hitThreshold=1
default.cm\:creator.minFilterValueLength=4
default.cm\:creator.sortBy=ALPHABETICALLY
default.cm\:creator.scope=ALL
default.cm\:creator.scopedSites=
default.cm\:creator.isEnabled=true

# Field-Facet-Qname => cm:modifier
default.cm\:modifier.filterID=filter_modifier
default.cm\:modifier.displayName=faceted-search.facet-menu.facet.modifier
default.cm\:modifier.displayControl=alfresco/search/FacetFilters
default.cm\:modifier.maxFilters=5
default.cm\:modifier.hitThreshold=1
default.cm\:modifier.minFilterValueLength=4
default.cm\:modifier.sortBy=ALPHABETICALLY
default.cm\:modifier.scope=ALL
default.cm\:modifier.scopedSites=
default.cm\:modifier.isEnabled=true

# Field-Facet-Qname => cm:created
default.cm\:created.filterID=filter_created
default.cm\:created.displayName=faceted-search.facet-menu.facet.created
default.cm\:created.displayControl=alfresco/search/FacetFilters
default.cm\:created.maxFilters=5
default.cm\:created.hitThreshold=1
default.cm\:created.minFilterValueLength=4
default.cm\:created.sortBy=INDEX
default.cm\:created.scope=ALL
default.cm\:created.scopedSites=
default.cm\:created.isEnabled=true

# Field-Facet-Qname => cm:modified
default.cm\:modified.filterID=filter_modified
default.cm\:modified.displayName=faceted-search.facet-menu.facet.modified
default.cm\:modified.displayControl=alfresco/search/FacetFilters
default.cm\:modified.maxFilters=5
default.cm\:modified.hitThreshold=1
default.cm\:modified.minFilterValueLength=4
default.cm\:modified.sortBy=INDEX
default.cm\:modified.scope=ALL
default.cm\:modified.scopedSites=
default.cm\:modified.isEnabled=true

# Field-Facet-Qname => cm:content.size
default.cm\:content.size.filterID=filter_content_size
default.cm\:content.size.displayName=faceted-search.facet-menu.facet.size
default.cm\:content.size.displayControl=alfresco/search/FacetFilters
default.cm\:content.size.maxFilters=5
default.cm\:content.size.hitThreshold=1
default.cm\:content.size.minFilterValueLength=4
default.cm\:content.size.sortBy=INDEX
default.cm\:content.size.scope=ALL
default.cm\:content.size.scopedSites=
default.cm\:content.size.isEnabled=true
```

An example of a filter is `cm:modified`. It specifies the name of the filter field. It is the field on which you want to do a filtered search.

| Property | Description |
| -------- | ----------- |
| filterID | Specifies a unique name to identify the filter. Before adding a new filter, check the existing filters via Search Manager to ensure that the `filterID` does not already exist. |
| displayName | Specifies the display name of the filter. |
| displayControl | Enables the user to decide the user interface control or how the filter is displayed on the **Search** page. The default option is **Check box**. `displayControl` is the full module name for an Aikau widget which is used for rendering the facet filters. By default, Content Services provides `alfresco/search/FacetFilters` which is a basic rendering of the filters available for the facet. |
| maxFilters | Enables the user to select the maximum number of filters shown for search results. You can select to show more than one filter. |
| hitThreshold | Enables the user to select the minimum number of matches a filter result must have to be shown on the **Search** page. |
| minFilterValueLength | Specifies the minimum length of characters that a filter value must have to be displayed. This can be useful in hiding common short words. |
| sortBy | Enables the user to select the order in which the filter results must be shown on the **Search** page. The `sortBy` option is passed to the `FacetFilters` widget and defines how the filters should be sorted. This property has the following options {::nomarkdown}<ul><li>ALPHABETICALLY - Specifies the filter value A-Z.</li><li>REVERSE_ALPHABETICALLY - Specifies the filter value Z-A.</li><li>ASCENDING - Specifies the number of filter results (low to high).</li><li>DESCENDING - Specifies the number of filter results (high to low).</li><li>INDEX - This is a special value reserved for results rendered by filter queries.</li></ul>{:/} |
| scope | Enables the user to select the sites where the filter will be available. |
| scopedSites | Displays a list of sites where the filter will be available. |
| isEnabled | Specifies if the filter is enabled for inclusion on the search results page. Disabled filters are not displayed. Only the filters you create via Share console can be deleted; default filters must be disabled to hide them. |

> **Note:** You can't delete or modify any of the default filters, however you can disable them. To define your own custom filters, see next section.

#### Define custom search filters using configuration file

You can define and create your own custom filters for being displayed on the search result page.

You can define custom filters in the `solr-facets-config-custom.properties` file. You can also use this file to override the default filter properties.

1. Navigate to the `<classpathRoot\>/alfresco/extension` directory.

2. Create the `solr-facets-config-custom.properties` file.

3. Open the `solr-facets-config-custom.properties` file and specify your custom filter properties.

    Here's an example of custom filter configuration:

    ```text
    custom.cm\:description.filterID=filter_newFilter
    custom.cm\:description.displayName=faceted-search.facet-menu.facet.description
    custom.cm\:description.displayControl=alfresco/search/FacetFilters
    custom.cm\:description.maxFilters=3
    custom.cm\:description.hitThreshold=1
    custom.cm\:description.minFilterValueLength=2
    custom.cm\:description.sortBy=DESCENDING
    custom.cm\:description.scope=SCOPED_SITES
    custom.cm\:description.scopedSites=
    custom.cm\:description.isEnabled=true
    ```

    > **Note:** The values specified in the custom filters will overwrite the default filter's value. However, if you change the filter's default value(s) via Share, then any subsequent changes made to the filter values via the configuration files, won't be applied to the filter on server startup.
