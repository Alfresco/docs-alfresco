---
author: Alfresco Documentation
---

# Sample configuration file

This sample Alfresco Mobile configuration file shows how you can customize the file.

All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined types.

For more information on how to create a configuration file, see the related object topics.

```

{
  "info": {
    "schema-version": 0.1
  },
  "repository": {
    "share-url": "https://hostname:port/share"
  },
  "profiles": {
    "default": {
      "default": true,
      "label-id": "Default Profile",
      "description-id": "Description of the Default Profile",
      "root-view-id": "views-menu-default"
    },
    "sample": {
      "label-id": "profile.sample.title",
      "description-id": "profile.sample.summary",
      "root-view-id": "views-sample"
    }
  },
  "view-groups": [
    {
      "id": "views-menu-default",
      "label-id": "Default Menu",
      "items": [
        {
          "item-type": "view-id",
          "view-id": "view-activities-default"
        },
        {
          "item-type": "view-id",
          "view-id": "view-repository-default"
        }
      ]
    },
    {
      "id": "views-sample",
      "items": [
        {
          "item-type": "view-group-id",
          "view-group-id": "views-sample-project"
        }
      ]
    },
    {
      "id": "views-sample-project",
      "label-id": "Sample Project",
      "items": [
        {
          "item-type": "view",
          "view": {
            "id": "activities",
            "type": "org.alfresco.client.view.activities",
            "label-id": "Project Activities",
            "params": {
              "siteShortName": "swsdp"
            }
          }
        },
        {
          "item-type": "view",
          "view": {
            "id": "site",
            "type": "org.alfresco.client.view.repository",
            "label-id": "Sample Site",
            "params": {
              "path": "/sites/swsdp/documentLibrary"
            }
          }
        }
      ]
    }
  ],
  "views": {
    "view-activities-default": {
      "type": "org.alfresco.client.view.activities"
    },
    "view-repository-default": {
      "type": "org.alfresco.client.view.repository"
    }
  }
}
}
```

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

