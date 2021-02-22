---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Verifying the Alfresco Distribution Policies Modules

Use the following steps to verify that the Alfresco Distribution Policies Module has been installed correctly.

1.  Inspect the Repository start-up log for the message "Starting module 'org.alfresco.module.distributionpolicies' version 1.0.0.".

2.  Login to Share and upload a content item to a known location.

3.  Navigate to the Document Preview for the item and choose **Manage Aspects**.

4.  Select the Restrictable aspect in the Available to Add list and click +, then click **Apply changes**.

5.  Open the Edit Properties page for the item and confirm that a new *Offline Expires After* property is displayed.

6.  Using the Alfresco Mobile iOS App v1.5, navigate to the content and you should see the ![Restricted icon](../images/restricted.png) icon indicating that the content has restrictions applied. For more details on using the Alfresco Mobile App refer to the built-in User Guide.


**Parent topic:**[Installing and verifying the Distribution Policies Module](../concepts/dist-pol-intro.md)

