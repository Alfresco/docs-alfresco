---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Disabling Enterprise to Cloud Sync

If your Alfresco license contains Enterprise to Cloud Sync access, then synchronization is enabled by default when you apply the license. You have the option to disable this feature if you prefer not to make it available to your users.

1.  Open the <classpathRoot\>/alfresco-global.properties file.

2.  Add the `sync.mode=OFF` property, and then save the file.

    **Note:** You can re-enable sync by setting the property to `sync.mode=ON_PREMISE`.

3.  Restart the Alfresco server.


**Parent topic:**[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)

