---
author: Alfresco Documentation
---

# Enabling publishing to YouTube with Alfresco \(Lucene enabled\) deployed on WebLogic

In an Alfresco environment deployed on WebLogic and with the Lucene search engine enabled, to enable the publish to YouTube feature requires additional steps in the WebLogic Administration Console.

1.  Open the WebLogic Administration Console.

2.  In the **Change Center**, click **Lock & Edit**.

3.  In the left pane, expand **Environment**.

4.  Select **Servers**.

5.  Click the name of the server for which you want to disable host name verification.

6.  Navigate to **Configuration** \>**SSL**.

7.  Click **Advanced** at the bottom of the page.

8.  Set the **Hostname Verification** field to **None**.

9.  In the **Change Center**, click **Activate Changes**.

10. Click **Save**.

11. Restart the Alfresco server.


**Parent topic:**[Installing Alfresco on WebLogic](../tasks/alf-weblogic-install.md)

