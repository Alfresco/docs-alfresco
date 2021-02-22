---
author: Alfresco Documentation
---

# Local Files menu items

Create menu items to display your device or Alfresco Share Local files.

There are two different parameter options available that you can use.

**Display your device's Local Files**

Use the type **org.alfresco.client.view.local**, no parameters are required.

With this you could create a menu item that links to your device's Local Folder.

```
 "views" : {
   "<view-local-folder-device>":
   {
      "label-id": "<Local Folder>",
      "type": "org.alfresco.client.view.local"
   }
}
```

**Display Alfresco Share Local Files**

Use the type **org.alfresco.client.view.person-profile** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|path|Absolute path to the specified folder.|String|No|

**Note:** If you don't enter any parameters then the Alfresco Share Local Files folder will be displayed.

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

