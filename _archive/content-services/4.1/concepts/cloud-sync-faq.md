---
author: Alfresco Documentation
---

# Frequently asked questions

This section lists the FAQs about the Enterprise to Cloud Sync feature.

Why can't I synchronize my content?

Synchronization problems in Enterprise to Cloud Sync can be caused by any of the following issues:

-   You are logged on to the wrong cloud network type
-   You do not have network access to cloud
-   You do not have a valid on-premise license key
-   Your new license key is not sync-enabled
-   Your global cloud property has a wrong value

    To troubleshoot these issues use the following steps to check whether the issue is resolved. If the issue is not resolved, continue to the next item in the list.


-   **Check cloud network type**

    Make sure that your cloud network type is **Enterprise**. To do this, log into cloud and check your network type.

-   **Check network access to cloud**

    Make sure that you have network access to cloud. There may be a communication problem either on the Alfresco Cloud side or with your on-premise instance. Contact Alfresco customer support if the Alfresco Cloud Server is down.

-   **Check validity of your on-premise license key**

    Make sure that your on-premise license has not expired.

-   **Check that the `sync.mode` property is set to ON\_PREMISE**

    You will not be able to synchronize, if this property has a wrong value. The default value for this property is ON\_PREMISE.

-   **Check the value of the global cloud property**

    Make sure that the value for the Global cloud property is set to `https://a.alfresco.me/alfresco/a/{network}/`. This is the default value for this property and you do not need to amend it. You can set this property as follows.

    ```
    sync.cloud.url=https://a.alfresco.me/alfresco/a/{network}/ 
    ```


How do I know if my content has only partially synchronized?

You encounter either of the following errors:

-   This file exceeds the content limit. The file is too large to perform the action.
-   You have exceeded the content quota. There isn't enough free space to perform the action.

**Parent topic:**[Troubleshooting Enterprise to Cloud Sync](../concepts/cloud_sync_troubleshooting.md)

