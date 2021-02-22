---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating a new replication job

You can create any number of replication jobs to suit your needs.

1.  Expand the **More** menu.

2.  Select the **Replication Jobs** menu item.

    The **Admin Console** displays.

3.  In the **Jobs** section, click **Create Job**.

    The **Create New Replication Job** page displays. Fields marked with an asterisk \(\*\) are required.

4.  In the **Jobs** section, type the name for the job in the **Name** field.

5.  In the **Jobs** section, type the description for the job in the **Description** field.

6.  In the **Payload** section, click **Select**.

7.  Navigate the repository and click **Add** to the right of each branch of the repository that you want to include in the payload. This is the content that will be replicated \(copied\) when the job is run.

8.  Click **OK**.

9.  In the Transfer Target section, click **Select**.

10. Navigate the Transfer Target Groups and click **Select** to the right of the desired target.

11. Click **OK**.

    **Note:** Out of the box, one target group, **Default Group**, is available. Use the repository browser to create additional target groups \(Data Dictionary \> Transfers \> Transfer Target Group\). A rule defined on the **Default Group** transfer target folder specializes the type of any folder created within it. Refer to [Setting up replication jobs](../concepts/adminconsole-replication-config.md).

12. Select the **Schedule job** check box, then enter the date and time the job is to run. Specify the repeat period for this job.

13. Select the **Enabled** check box.

    **Note:** You must enable a replication job for it to be run.

14. Click **Create Job**.

    The job created appears highlighted in the Jobs list. The job details appear on the right side of the page.


**Parent topic:**[Managing replication jobs](../concepts/adminconsole-replication-intro.md)

