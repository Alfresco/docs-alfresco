---
author: Alfresco Documentation
---

# Disabling Synchronization

This topic provides instructions on how to disable synchronization between the Alfresco Cloud Network and your on-premise Alfresco server.

Synchronization is enabled by default if your Alfresco license has synchronization enabled. To disable synchronization, complete the following steps.

1.  Browse to the <classpathRoot\> directory.

    For example for Tomcat 6, this is: $TOMCAT\_HOME/shared/classes/ directory.

2.  Synchronization can be disabled either permanently or temporarily.

    To disable synchronization permanently, locate the alfresco-global.properties file and add the `sync.mode=OFF` property.

    To disable synchronization temporarily:

    -   Locate the alfresco-global.properties file.
    -   Leave the on-premise `sync.mode property` value unchanged.
    -   Change both the `sync.pullJob.enabled` and the `sync.pushJob.enabled` properties to `False`.
    **Note:** Alfresco recommends not using the `sync.mode` property to disable synchronization temporarily as this may result in the loss of internal synchronization related system data.

3.  Restart your Alfresco server.


**Parent topic:**[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)

