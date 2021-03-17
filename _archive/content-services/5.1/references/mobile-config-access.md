---
author: Alfresco Documentation
---

# Setting profile availability

When you create a new mobile profile it's available to all of your users by default.

You can add evaluators to a profile and configure it so that the profile is only available for specified users.

**Note:** This feature is based on user name and not user groups.

The evaluator is *isUser* and is added directly to the profile that you want to restrict availability for. In the example below the profile is only available to members of the Sales Team.

```
"profiles":  {
   "sales":
   {
      "label-id": "Sales",
      "description-id": "Sales Dashboard",
      "root-view-id": "views-menu-sales"
      "evaluator": "isSalesUser"
      }
    }
```

In the configuration file you specify the users the evaluator applies to.

```
"evaluators": {
    "isSalesUser": {
      "type": "org.alfresco.client.evaluator.isUser",
      "params": {
        "users": [
          "JohnNewton",
          "HelenMullally",
          "MikeHatfield"
        ]
      }
    }
  }
```

Only users that you specify will have the profile available in Alfresco Mobile.

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

