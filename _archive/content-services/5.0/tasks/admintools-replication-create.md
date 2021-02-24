---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Creating a new replication job

You can create any number of replication jobs to suit your needs.

1.  Click **Admin Tools**, and then click **Replication Jobs**.

2.  In the Jobs section, click **Create Job**.

    The Create New Replication Job page appears. Fields marked with an asterisk \(\*\) are required.

3.  Enter the details for the new replication job.

    1.  Enter a name for the job, and enter a description, if required.

    2.  In the Payload section, click **Select**.

        Navigate the repository and click **Add** to the right of each space that you want to include in the payload. This content will be replicated \(copied\) when the job is run. Click **OK**.

    3.  In the Transfer Target section, click **Select**.

        Navigate the Transfer Target Groups and click **Select** to the right of the target. Click **OK**.

        **Note:** Out of the box, one target group, **Default Group**, is available. Create additional target groups in **Data Dictionary \> Transfers \> Transfer Target Group**. A rule defined on the Transfer Target Groups folder specializes the type of any folder created within it.

        See [Creating a new transfer target for content replication](adminconsole-replication-transfertarget.md) for more information.

    4.  Specify when you want the replication job to run.

        Select the **Schedule job** check box, then enter the date and time the job is to run. Specify the repeat period for this job.

    5.  Select the **Enabled** check box to enable to replication job to run.

        **Note:** You must enable a replication job for it to be run.

4.  Click **Create Job**.

    The job created appears highlighted in the Jobs list. The job details appear on the right side of the page.


**Parent topic:**[Managing replication jobs](../concepts/admintools-replication-intro.md)

