---
author: Alfresco Documentation
---

# Turning Alfresco Mobile features on and off

Use the Features object to turn Alfresco Mobile features on and off.

**Note:** All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined.

```
"features":[
    {
      "id": "<feature-id>",
      "type": "<feature-type>",
      "enable": true|false
    }
  ],
```

Currently the only feature type available is Analytics, which uses the type:

```
org.alfresco.client.feature.analytics
```

You can use this to turn Alfresco Mobile analytics on and off. The following example shows how it would look when turned off.

```
"features":[
    {
      "id": "feature-analytics-default",
      "type": "org.alfresco.client.feature.analytics",
      "enable": false
    }
  ],
```

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

