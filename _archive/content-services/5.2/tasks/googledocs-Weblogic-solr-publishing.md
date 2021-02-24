---
author: Alfresco Documentation
---

# Enabling Google Docs with Alfresco Content Services deployed on WebLogic

Follow these steps to enable Google Docs for Alfresco Content Services running on WebLogic.

1.  Ensure you have downloaded and installed the Google Docs amp files.

    See [Installing Google Docs Integration manually](googledocs-amp-install.md) for more information.

2.  In the Change Center, click **Lock and Edit**.

    For more information, see [Use the Change Center](http://docs.oracle.com/cd/E12839_01/apirefs.1111/e13952/taskhelp/console/UseTheChangeCenter.html).

3.  Expand **Environment** and select **Servers**.

4.  Select **Configuration \> SSL**, and then click **Advanced**.

5.  In the AlfrescoServer \> Keystores choose the **Custom Identity and Java Standard Trust** keystore.

6.  Set the **Hostname Verification** field to **None**.

    Oracle recommends leaving host name verification on in production environments.

7.  Select **Use JSSE SSL**.

8.  Click **Save**.

9.  Restart the server.


**Parent topic:**[Installing Alfresco Content Services on WebLogic](../tasks/alf-weblogic-install.md)

