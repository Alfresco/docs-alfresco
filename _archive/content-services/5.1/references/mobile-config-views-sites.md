---
author: Alfresco Documentation
---

# Sites menu items

Create menu items to display all sites or a list of selected sites.

Use the type **org.alfresco.client.view.sites** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|show|values available : favorites\|my\|all|String|No|

**Note:** If you don't enter a parameter then all sites will be shown by default.

So for example, you could create a Site menu item that links straight to your favorite sites.

```
 "views" : {
   "<view-sites-favorites>":
   {
      "label-id": "<Favorite Sites>",
      "type": "org.alfresco.client.view.sites"
      "params": {
         "show": "favorites"
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

