---
author: Alfresco Documentation
---

# Users menu items

You can create menu items to display the profiles of one or more users.

There are two different parameter options available that you can use.

**Display a list of users**

Use the type **org.alfresco.client.view.people** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|keywords|Displays a list of users who match the keywords. For Alfresco Server the keywords can use a query such as "User jobtitle:admin".|String|Yes \(exclusive\)|
|siteShortName|Displays a a list of members for the specific site.|String|Yes \(exclusive\)|

So for example, you could create an menu item that links to all members of your Sales team site.

```
 "views" : {
   "<view-sales-team>":
   {
      "label-id": "<Sales Team>",
      "type": "org.alfresco.client.view.people"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

**Display a single user**

Use the type **org.alfresco.client.view.person-profile** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|userName|Displays the profile for the specified username.|String|No|

**Note:** If you don't enter any parameters then the currently logged in users profile will be displayed.

So for example, you could create a menu item that links to John Newton's profile.

```
 "views" : {
   "<view-profile-johnnewton>":
   {
      "label-id": "<John Newton>",
      "type": "org.alfresco.client.view.person-profile"
      "params": {
         "userName": "JohnNewton"
   }
}
```

**Parent topic:**[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)

