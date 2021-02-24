---
author: Alfresco Documentation
---

# Sync menu items

Create menu items to display your synced files.

Use the type **org.alfresco.client.view.sync**, no parameters are required.

With this you could create a menu item that shows all your synced content.

```
 "views" : {
   "<view-sync-files>":
   {
      "label-id": "<Synced Files>",
      "type": "org.alfresco.client.view.sync"
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

