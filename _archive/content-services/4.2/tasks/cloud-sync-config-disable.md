---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
---

# Disabling Enterprise to Cloud Sync

This topic describes how to disable the Enterprise to Cloud Sync feature.

If your Alfresco license contains synchronization access, then synchronization is enabled by default.

1.  Open the <classpathRoot\>alfresco-global.properties file.

2.  Add the `sync.mode=OFF` property, and then save the file.

    **Note:** You can re-enable sync by setting the property to `sync.mode=ON_PREMISE`.

3.  Restart the Alfresco server.


**Parent topic:**[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)

