---
author: Alfresco Documentation
---

# Tasks menu items

Create menu items to display a list of tasks.

Use the type **org.alfresco.client.view.tasks** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|filters|Enable a filter object|Object|No|
|filters/status|Values : any\|active\|complete|String|No|
|filters/due|Values : today\|tomorrow\|week\|overdue\|none|String|No|
|filters/priority|Values : low\|medium\|high|String|No|
|filters/assignee|Values : me\|unassigned\|all\|none|String|No|

**Note:** If you don't enter a parameter then your My Tasks will be displayed by default.

So for example, you could create a Tasks menu item that links to all overdue, active high-priority tasks.

```
 "views" : {
   "<view-tasks-overdue>":
   {
      "label-id": "<Overdue Tasks>",
      "type": "org.alfresco.client.view.tasks"
      "params": {
         "filters": {
           "Status": "active",
           "due": "overdue",
           "priority": "high",
           "assignee": "all",
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

