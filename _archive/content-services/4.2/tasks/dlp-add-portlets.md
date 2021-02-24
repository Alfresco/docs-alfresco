---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: DocLib Portlets
keyword: [DocLib Portlets, Liferay, installing, configuring]
---

# Adding portlets to Liferay

This task describes how to add the portlets to Liferay.

Ensure that the Alfresco server is started first, and then start up Liferay. Check that no errors are recorded in the application logs.

1.  Log in to Liferay.

2.  Create a new page and set the layout to one full-sized portlet.

3.  In the **Add Application** menu, expand **Alfresco** and select **Share: My Document Libraries**.

    Liferay creates the My Document Libraries portlet.

4.  Create another page with the same layout and add the **Share: Repository Browser** portlet.

5.  Create another full-sized page and add the **Share: Site Document Library** portlet. A message displays indicating that the portlet must be configured before use. Select the portlet **Preferences** option, and then select the site to which the portlet will be bound.

    **Important:** Each of the three Alfresco Share portlets must be deployed to its own Liferay page. There is no support for deploying more than one portlet to the same page.


**Parent topic:**[Installing and configuring Alfresco DocLib Portlets](../tasks/dlp-install-config.md)

