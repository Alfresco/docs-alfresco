---
author: Alfresco Documentation
---

# Search menu items

Create menu items to display a link to the search screen.

There are two different parameter options available that you can use.

**Display the search**

Use the type **org.alfresco.client.view.search**, no parameters are required.

With this you could create a menu item that links to the Alfresco search.

```
 "views" : {
   "<view-search>":
   {
      "label-id": "<Search>",
      "type": "org.alfresco.client.view.search"
   }
}
```

**Display an advanced search**

Use the type **org.alfresco.client.view.search-advanced** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|type|values available : person\|document\|folder|String|Yes|

So for example, you could create a menu item that links to the search for Alfresco users.

```
 "views" : {
   "<view-search-person>":
   {
      "label-id": "<Find People>",
      "type": "org.alfresco.client.view.search-advanced"
      "params": {
         "type": "person"
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

