---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
---

# Enabling Enterprise to Cloud Sync

To enable synchronization from your on-premise Alfresco server, you need an Enterprise Alfresco subscription and an Alfresco license that contains the synchronization feature.

Ensure that you have access to port 443 and that you are able to access https.

Enterprise to Cloud Sync relies on the Audit feature. Auditing is enabled by default, but if you set the `audit.enabled` property to false, the synchronization will stop working. Both `audit.enabled=true` and `audit.sync.enabled=true` are required in the application configuration to enable auditing.

1.  Copy the license file to the Alfresco installation directory.

    The license file has a file extension of .lic.

2.  Launch the Alfresco Admin Console.

    For more information on the Admin Console, see [Admin Console Quick Guide](../concepts/at-adminconsole.md).

3.  Click **Apply New License**.

    You have now applied the license and this will automatically enable the Enterprise to Cloud Sync feature.

    **Note:** You may need to restart the Alfresco server for the license to be applied.

4.  Verify that you have successfully enabled Enterprise to Cloud Sync.

    1.  **Sync to Cloud** action is available for documents and folders in the Alfresco Share Document Library.

    2.  Make sure that the log contains the following message:

        ```
        2012-09-04 13:38:50,458 INFO [repo.sync.SyncAdminServiceImpl] [main]
         A key is provided for cloud sync
        ```


**Parent topic:**[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)

