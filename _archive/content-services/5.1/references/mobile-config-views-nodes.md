---
author: Alfresco Documentation
---

# Nodes menu items

Create a menu item to display a link to a file, folder, or search results.

There are three different parameter options available that you can use.

**Display a folder**

Use the type **org.alfresco.client.view.repository** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|path|Displays a folder defined by its absolute path|String|No \(exclusive\)|
|nodeRef|Displays a folder retrieved by its nodeRef|String|No \(exclusive\)|
|siteShortName|Displays the document library folder associated to the specified site|String|No \(exclusive\)|
|folderTypeId|Displays the system folder shared\|userhome|String|No \(exclusive\)|

**Note:** If you don't enter a parameter then the Company Home folder will be displayed by default.

So for example, you could create an menu item that links straight to the document library of your Sales team site.

```
 "views" : {
   "<view-sales-files>":
   {
      "label-id": "<Sales Files>",
      "type": "org.alfresco.client.view.repository"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

**Display search results**

Use the type **org.alfresco.client.view.repository-search** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|keywords|keywords to search|String|Yes \(exclusive\)|
|isExact|Exact search. Requires : keywords|String|No \(exclusive\)|
|fullText|Fulltext search. Requires : keywords|String|No \(exclusive\)|
|searchFolderOnly|Display a list of folders. Requires : keywords|String|No \(exclusive\)|
|statement|CMIS query|String|Yes \(exclusive\)|

**Note:** By default a list of files is displayed.

So for example, you could create a menu item that links to all files containing the word Alfresco.

```
 "views" : {
   "<view-alfresco-files>":
   {
      "label-id": "<Alfresco Files>",
      "type": "org.alfresco.client.view.repository-search"
      "params": {
         "fullText": "Alfresco"
   }
}
```

**Display file or folder**

Use the type **org.alfresco.client.view.node-details** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|path|Displays a file or folder defined by its absolute path|String|Yes \(exclusive\)|
|nodeRef|Displays a file or folder retrieved by its nodeRef|String|No \(exclusive\)|

**Note:** By default a list of files is displayed.

So for example, you could create a menu item that links straight to your price list.

```
 "views" : {
   "<view-price-list>":
   {
      "label-id": "<Price List>",
      "type": "org.alfresco.client.view.node-details"
      "params": {
         "nodeRef": "workspace://SpacesStore/e1db8fed-ded7-45eg-ap30-02abcd1a1a20"
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

