---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating a new replication job

You can create any number of replication jobs to suit your needs.

1.  On the toolbar, expand the **More** menu and click **Replication Jobs** in the Tools list.

2.  In the Jobs section, click **Create Job**.

    The Create New Replication Job page appears. Fields marked with an asterisk \(\*\) are required.

3.  Complete the form.

    1.  Provide a name and description for the job.

        Only the job name is required.

    2.  Select the payload.

        In the Payload section, click **Select**. Navigate the repository and click **Add** to the right of each branch of the repository that you want to include in the payload; this is the content that will be replicated \(copied\) when the job is run. Click **OK**.

    3.  Specify the transfer target.

        In the Transfer Target section, click **Select**. Navigate the Transfer Target Groups and click **Select** to the right of the desired target. Click **OK**.

        **Note:** Out of the box, one target group, *default group*, is available. Use the Repository Browser to create additional target groups \(Data Dictionary \> Transfers \> Transfer Target Group\). A rule defined on the Transfer Groups folder specializes the type of any folder created within it.

    4.  Schedule the replication job.

        Select the **Schedule job** check box, then enter the date and time the job is to run. Specify the repeat period for this job.

    5.  Enable the job.

        Select the **Enabled** check box.

        **Note:** You must enable a replication job for it to be run.

4.  Click **Create Job**.

    The job created appears highlighted in the Jobs list. The job details appear on the right side of the page.


**Parent topic:**[Managing replication jobs](../concepts/adminconsole-replication-intro.md)

