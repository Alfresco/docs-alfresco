---
author: Alfresco Documentation
---

# Enabling Google Docs and external publishing with Alfresco \(Lucene enabled\) deployed on WebLogic

To enable Google Docs and external publishing with WebLogic, disable host name verification and select JSSE SSL in the WebLogic Server Administration Console.

1.  In the Change Center, click **Lock and Edit**.

    For more information, see [Use the Change Center](http://docs.oracle.com/cd/E12839_01/apirefs.1111/e13952/taskhelp/console/UseTheChangeCenter.html).

2.  Expand **Environment** and select **Servers**.

3.  Click the name of the server for which you want to disable host name verification.

4.  Select **Configuration \> SSL**, and then click **Advanced**.

5.  Set the **Hostname Verification** field to **None**.

    Oracle recommends leaving host name verification on in production environments.

6.  Select **Use JSSE SSL**.

7.  Click **Save**.

8.  Restart your application server.


**Parent topic:**[Enabling Google Docs with WebLogic](../concepts/googledocs-Weblogic-integration_overview.md)

