---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enterprise to Cloud Sync FAQs

Frequently asked questions about the Enterprise to Cloud Sync feature.

**Why can't I synchronize my content?**

Synchronization problems in Enterprise to Cloud Sync can be caused by any of the following issues:

-   You are logged on to the wrong cloud network type
-   You do not have network access to cloud
-   You do not have a valid on-premise license key
-   Your new license key is not sync-enabled
-   Your global cloud property has a wrong value

    To troubleshoot these issues, use the following steps to check whether the issue is resolved. If the issue is not resolved, continue to the next item in the list.

    1.  Check that the cloud network type is **Enterprise**: Log into Alfresco in the cloud and check your network type.
    2.  Check that you have network access to Alfresco in the Cloud: There might be a communication problem either on the Alfresco in the Cloud side or with your on-premise instance.
    3.  Check that your on-premise license key has not expired.
    4.  Check that the `sync.mode` property is set to `ON_PREMISE`: You will not be able to synchronize if this property has a different value. The default value for this property is `ON_PREMISE` and you do not need to change it.
    5.  Check that the value for the global cloud property `sync.cloud.url` is set to `https://a.alfresco.me/alfresco/a/{network}/`. This is the default value for this property and you do not need to change it. The format of this property is:

        ```
        sync.cloud.url=https://a.alfresco.me/alfresco/a/{network}/ 
        ```


**How do I know if my content has only partially synchronized?**

The following list shows the error messages that you might see and their possible meanings.

-   **This file exceeds the content limit.**

    The file is too large to perform the action.

-   **You have exceeded the content quota.**

    There is not enough free space to perform the action.


**Parent topic:**[Troubleshooting Enterprise to Cloud Sync](../concepts/cloud-sync-troubleshooting.md)

