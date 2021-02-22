---
author: Alfresco Documentation
---

# Favorites menu items

Create menu items to display a list of favorite files or folders.

Use the type **org.alfresco.client.view.favorites** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|filters|Enable a filter object|Object|No|
|filters/mode|Values : all\|folders\|files|String|No|

So for example, you could create a Favorites menu item that links straight all your favorite files.

```
 "views" : {
   "<view-favorite-files>":
   {
      "label-id": "<Favorite Files>",
      "type": "org.alfresco.client.view.favorites"
      "params": {
          "filters": {  
             "filters/mode": "files"
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

