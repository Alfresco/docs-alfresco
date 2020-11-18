---
title: Power users
---

Alfresco Share power users have additional options that aren't available to standard users.

These options are made available when your Alfresco administrator gives you advanced permissions by signing you up to a power user group.

The current additional options available are:

* Sites Manager
* Search Manager

If you have the following permissions you can access the Site Manager through an additional link on the toolbar, and the Search Manager from the Search Results screen.

* Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups.
* Search Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `ALFRESCO_SEARCH_ADMINISTRATORS` permissions groups.

## Sites Manager

The Sites Manager is used for maintaining sites. You have control over the visibility of all sites as well as deleting sites or making yourself a site manager.

> **Note:** Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups. If you are in the `ALFRESCO_ADMINISTRATORS` group, you can access the Site Manager through the **Admin Tools** on the toolbar. If you are a member of `SITE_ADMINISTRATORS` group, you'll have an additional **Sites Manager** option on the toolbar.

The Sites Manager displays the names and status of created sites, regardless of their visibility setting. You can use the **Visibility** menu to change the visibility of any site, for example, change the site visibility to either **Public**, **Moderated**, or **Private**. Any visibility change you make to a site is made immediately.

With the **Actions** menu, there are two options:

* **Delete Site**: You can delete any of the sites in the **Site Manager** list by selecting **Delete Site** from the **Actions** menu. This action deletes all site details and content.
* **Become Site Manager**: The I'm a Site Manager column shows the sites where you have the Site Manager permission. If you aren't already a manager of a site, then select **Become Site Manager** from the **Actions** menu.

## Search Manager {#searchmanager}

With the Search Manager you can see details of existing search filters and create new filters.

> **Note:** Search Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `ALFRESCO_SEARCH_ADMINISTRATORS` permissions groups.

The Search Manager is accessed from the search results screen. Just type a search in the search box and press Enter, then on the search results screen click **Search Manager**.

**Note:** Filtered search results can be bookmarked for quick and easy access.

All existing filters (including default filters) are shown along with their details, in the order that they are shown on the search results screen. You can change the order by using the ![arrows]({% link content-services/images/arrows.png %}) buttons to move filters up or down the order.

Click **Create New Filter** to [create new search filters](#createnewsearchfilter).

Most of the filter details are can be edited by hovering over them and clicking the ![Configure icon]({% link content-services/images/ico-configure.png %}) icon that displays:

* **Filter ID**: The unique filter ID. Click on this to edit any details.
* **Filter Name**: The name of the filter shown in the search results screen. Default filters display the internationalized message key rather than the filter name that's shown on the search results screen.
* **Filter Property**: The property or field that the filter is based on.
* **Filter Type**: How the filter is displayed on the search results screen. The default option is **Simple Filter**.
* **Show with Search Results**: Specifies if the filter is shown in the search results screen. Filters with this switched off aren't displayed. Default filters can't be deleted and must be switched off to hide them.
* **Default Filter**: Specifies if the filter is a default or custom filter. Default filters are predefined and can't be deleted. You can hide them by switching off **Show with Search Results**.
* **Filter Availability**: The site(s) where the filter is available.

### Creating new search filters {#createnewsearchfilter}

In the Search Manager you can quickly create your own custom filters with a wide range of options available.

1. In the **Search Manager**, accessed from the search results screen, click **Create New Filter**.

    > **Tip:** You can also click on an existing Filter ID to edit it.

2. Enter a **Filter ID** unique identifier for the new search filter.

3. Enter a **Filter Name**. This is the name of the filter shown in the search results screen. For default filters what is shown here doesn't represent what's shown on the search results screen.

    > **Note:** You can't select a custom filter to be a **Default Filter.**

4. The **Show with Search Results** option is selected by default. Deselect it if you don't want the filter to be shown on the search results screen.

5. Select a property to filter by from the **Filter Property** drop-down list.

6. Select a **Filter Type**. This is how the filter is displayed on the search results screen. The default option is **Simple Filter** which is a check box.

7. Select the **Sort By** order in which the filter results are displayed on the search results page.

8. Select the **Number of Filters** that are shown by default on the search results screen.

9. Select the **Minimum Filter Length**. This helps you exclude short words such as "and" and "to" from filter results.

10. Select the **Minimum Required Results** which is the minimum number of matches a filter result must have to be shown on the search results screen.

11. Select the Filter Availability:

    * **Everywhere** - shown on all sites
    * **Selected sited** - only shown on selected sites. Click ![add]({% link content-services/images/ico-add.png %}) to add a site then select it from the list and click ![tick]({% link content-services/images/ico-tick.png %}) to confirm. Click ![add]({% link content-services/images/ico-add.png %}) to add more sites if required.

12. Click **Save**
