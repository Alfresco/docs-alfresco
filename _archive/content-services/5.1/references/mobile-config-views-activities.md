---
author: Alfresco Documentation
---

# Activities menu items

Create menu items to display the activities for a specific user or site.

Use the type **org.alfresco.client.view.activities** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|userName|Displays activities stream for a specific user|String|No|
|siteShortName|Displays activities stream for a specific site.|String|No|

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

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

