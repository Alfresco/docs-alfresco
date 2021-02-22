---
author: Alfresco Documentation
---

# Creating user menu groups

The view-groups object is a type of view in which you can store other views.

Store views in a view-group to avoid duplication.

```
"view-groups": [
    {
      "id": "<view-group-id>",
      "label-id": "<label-id>",
      "description-id": "<description-id>",
      "items": [
        {
          "item-type": "view-id",
          "view-id": "<view-id>"
        },
        {
          "item-type": "view-group-id",
          "view-group-id": "<view-group-id>"
        },
        {
          "item-type": "view",
          "view": {
            "label-id": "<label-id>",
            "description-id": "<description-id>",
            "type": "<view-type>",
            "form-id": "<form-id>",
            "params": {
              "<param-name>": "<param-value>"
            }
          }
        }
      ]
    }
  ]
```

The following example shows how you might set up a view-group.

```
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
  ]
```

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

