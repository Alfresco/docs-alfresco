---
author: Alfresco Documentation
---

# Enabling Google Docs with Alfresco \(Solr enabled\) deployed on WebLogic

To enable Google Docs with WebLogic, disable host name verification in the WebLogic Server Administration Console.

1.  In the Change Center, click **Lock and Edit**.

    For more information, see [Use the Change Center](http://docs.oracle.com/cd/E12839_01/apirefs.1111/e13952/taskhelp/console/UseTheChangeCenter.html).

2.  Expand **Environment** and select **Servers**.

3.  Click the name of the server for which you want to disable host name verification.

4.  Select **Configuration \> SSL**, and click **Advanced**.

5.  Set the **Hostname Verification** field to **None**.

    Oracle recommends leaving host name verification on in production environments.

6.  Click **Save**.

7.  Restart your application server.


**Parent topic:**[Enabling Google Docs with WebLogic](../concepts/Slideshare-Weblogic-integration_overview.md)

