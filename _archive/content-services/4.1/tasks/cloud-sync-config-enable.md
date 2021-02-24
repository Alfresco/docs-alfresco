---
author: Alfresco Documentation
---

# Enabling Synchronization

This topic provides instructions on enabling the Enterprise to Cloud Sync feature within Alfresco Share.

To enable synchronization from your on-premise Alfresco server you need a Standard or Enterprise Alfresco Subscription and an Alfresco license file which enables the synchronization features. For more information on Alfresco subscriptions, see [Pricing & Subscriptions](http://www.alfresco.com/products/compare). Ensure that you have access to port 443 and that you are able to access https.

Synchronization is enabled by default if your Alfresco license has synchronization enabled.

1.  Copy the license file to your machine. The license file has a file extension of .lic.

2.  From the Alfresco installation directory, browse to the <extension\> directory.

    For example, for Tomcat on Windows, this is: C:\\Alfresco\\tomcat\\shared\\classes\\alfresco\\extension.

3.  Create the license directory if it does not exist and move the .lic file into the license directory.

4.  In Alfresco Share, click **More \> Application \> License Descriptor**.

5.  Click **Edit**.

6.  Click **Load License**.

    You have now applied the license.

7.  Verify that you have successfully enabled synchonization.

    1.  Make sure that the **Sync to Cloud** action is available for documents and folders in the Alfresco Share Document Library.

    2.  Make sure that the log contains the following message:

    ```
    2012-09-04 13:38:50,458 INFO [repo.sync.SyncAdminServiceImpl] [main]
     A key is provided for cloud sync
    ```

    **Note:** To enable synchronization, you must set up Enterprise to Cloud Sync in your on-premise Alfresco. See [Setting up Enterprise to Cloud Sync](sync-setup.md).


**Parent topic:**[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)

