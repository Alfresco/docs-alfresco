---
author: Alfresco Documentation
---

# Creating Alfresco Mobile user menus

Use the View object to define Alfresco Mobile user menu options.

You can set up a range of menus, each one containing various options \(or view types\), from specific sites or searches through to individual files or folders.

For example you could set up a profile for your Sales team, so that when they use Alfresco Mobile they can drill straight into pricelists and sales tools without having to search for them. Another profile might give your IT team quick access to any outstanding Support tasks they have.

**Note:** All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined.

-   view-id = required and user-defined
-   label-id = optional and used for display in the Alfresco Mobile menu
-   description-id = optional
-   type = required and pre-defined

```
 "views" : {
   "<view-id>":
   {
      "label-id": "<label-id>",
      "description-id": "<description-id>",
      "type": "<view-type>"
      "params": {
   }
}
```

So for example, you could create an Activities menu item that links straight to the activities on your Sales team site.

```
 "views" : {
   "<view-activities-sales>":
   {
      "label-id": "<Activities>",
      "type": "org.alfresco.client.view.activities"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

See below for more details on the menu items you can add, and examples of how you could implement them.

-   [Activities](mobile-config-views-activities.md)
-   [Sites](mobile-config-views-sites.md)
-   [Nodes](mobile-config-views-nodes.md)
-   [Favorites](mobile-config-views-favorites.md)
-   [Tasks and Workflows](mobile-config-views-tasks.md)
-   [Users](mobile-config-views-users.md)
-   [Local Files](mobile-config-views-local.md)
-   [Search](mobile-config-views-search.md)
-   [Sync](mobile-config-views-sync.md)

-   **[Activities menu items](../references/mobile-config-views-activities.md)**  
Create menu items to display the activities for a specific user or site.
-   **[Sites menu items](../references/mobile-config-views-sites.md)**  
Create menu items to display all sites or a list of selected sites.
-   **[Nodes menu items](../references/mobile-config-views-nodes.md)**  
Create a menu item to display a link to a file, folder, or search results.
-   **[Favorites menu items](../references/mobile-config-views-favorites.md)**  
Create menu items to display a list of favorite files or folders.
-   **[Tasks menu items](../references/mobile-config-views-tasks.md)**  
Create menu items to display a list of tasks.
-   **[Users menu items](../references/mobile-config-views-users.md)**  
You can create menu items to display the profiles of one or more users.
-   **[Local Files menu items](../references/mobile-config-views-local.md)**  
Create menu items to display your device or Alfresco's Local files.
-   **[Search menu items](../references/mobile-config-views-search.md)**  
Create menu items to display a link to the search screen.
-   **[Sync menu items](../references/mobile-config-views-sync.md)**  
Create menu items to display your synced files.

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

