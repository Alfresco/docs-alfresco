---
author: Alfresco Documentation
---

# Creating Alfresco Mobile profiles

Use the Profiles object to store multiple configurations in a single configuration file.

This means that you can set up different configurations for different users or situations. You need to add at least one profile to a configuration file.

**Note:** All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined.

```
 {
   "<profile-id>":
   {
      "default": true,
      "label-id": "<label-id>",
      "description-id": "<description-id>",
      "root-view-id": "<view-id> or <view-group-id>"
   }
}
```

The following example shows how your default profile might look.

```
 {
   "<default>":
   {
      "default": true,
      "label-id": "Default Profile",
      "description-id": "Description of the Default Profile",
      "root-view-id": "views-menu-default"
   }
}
```

And this is how a profile set up for your Sales team could look.

```
 {
   "sales":
   {
      "label-id": "Sales",
      "description-id": "Sales Dashboard",
      "root-view-id": "views-menu-sales"
   }
}
```

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

