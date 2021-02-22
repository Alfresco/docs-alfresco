---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Viewing deployment reports

After deployment, a report detailing the most recent deployment is made available.

Once deployment is complete, whether successful or not, the **View Deployments** option appears in the upper right corner of the Staging Sandbox. When deploying a snapshot to multiple servers, this option becomes available once the first deployment is complete. To see a report on all servers, access the report when the snapshot status is no longer IN PROGRESS.

1.  In the Staging Sandbox, click **View Deployments** in the upper right corner.

    The report displays a pane for each server to which the snapshot was deployed. The report information details:

    -   deployment status: **Deployment Successful** or **Deployment Failed**
    -   snapshot deployed \(snapshot number\)
    -   deployment start and end time
    -   user who deployed the snapshot
    -   reason for failure \(if applicable\)
    -   deployment details
2.  Click ![Expand](../images/im-expand.png) to expand the **Details** list.

    If a deployment does not result in any changes to the destination server because it is already up to date, the deployment is considered successful but a **Details** list will not be displayed in the report.

3.  Click ![Expand](../images/im-expand.png) to expand the **More Deployment Reports** list.

    This list displays all previous deployment attempts. You can choose to view all attempts or those made today, yesterday, within the past 7 days, or within the past 30 days.

    Use the **All** filter carefully as it can return a great deal of information making the page slow to render.

4.  Click an entry in this list to view the associated deployment report.

5.  Click **Show Last Deployment Report** to return to the report for the most recent deployment attempt.

6.  Click **Close** to return to the Staging Sandbox.


**Parent topic:**[Deploying a snapshot](../tasks/tuh-wcm-deploy.md)

