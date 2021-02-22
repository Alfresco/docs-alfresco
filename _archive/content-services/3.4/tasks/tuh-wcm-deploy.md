---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Deploying a snapshot

You deploy a snapshot in the Staging Sandbox to publish it to the production environment.

Before deploying a snapshot, it is recommended that you preview and test the snapshot.

If you are deploying a previous snapshot, you will need to do a rollback in order to preview and test that snapshot.

1.  Navigate to the Sandbox view of the web project you want to work with.

2.  In the Staging Sandbox, click ![Expand](../images/im-expand.png) to expand the **Recent Snapshots** list.

    Use the filter options provided at the top of this list to limit the items displayed. You can choose to view all snapshots or those submitted today, within the past 7 days, or within the past 30 days.

3.  In this list, locate the snapshot you want to deploy and click ![Deploy](../images/im-deploy.png) **\(Deploy\)** in the **Actions** column for that item.

    The Deploy Snapshot page opens. Each server indicated in the web project properties \(the **Deploy To** entry\) is represented on this page with a check box.

4.  Select the server\(s\) to which you want to deploy the selected snapshot.

    When the selected snapshot is being deployed for the first time, all servers are selected by default. Ensure only the desired servers are selected.

5.  Click **OK**.

    The page title changes to Monitor Deployment. The symbol ![Monitor Deployment](../images/im-monitordeployment.png) on this page displays the progress of the deployment on each server you are deploying to.

    Once complete, the status is displayed:

    -   When successful, the symbol ![Deployment Successful](../images/im-successfuldeployment.png) and the message **Deployment Successful** are displayed.
    -   When unsuccessful, the symbol ![Deployment Failed](../images/im-faileddeployment.png) and the message **Deployment Failed** are displayed.
    You can monitor the deployment progress on this page or return to the Staging Sandbox and monitor the progress there.

6.  Click **Close**.

7.  In the Staging Sandbox, click ![Expand](../images/im-expand.png) to expand the **Recent Snapshots** list.

    The **Status** column indicates the status of the snapshot you deployed. There are four possible values:

    -   **IN PROGRESS**

        Deployment is currently occurring on one or more servers

    -   **LIVE**

        Deployment was successful to all servers selected

    -   **PARTIAL FAILURE**

        Deployment to one or more servers selected has failed

    -   **FAILED**

        Deployment to all servers selected has failed

    This column displays IN PROGRESS until the deployment is complete. Click **Refresh** in the upper right corner of the Staging Sandbox to update the status.


-   **[Viewing deployment reports](../tasks/tuh-wcm-deploy-viewreport.md)**  
After deployment, a report detailing the most recent deployment is made available.
-   **[Deleting the deployment reports](../tasks/tuh-wcm-deploy-deletereport.md)**  
When no longer needed, you can clear out the old deployment reports. This action deletes all deployment reports across all sandboxes for the current web project.

**Parent topic:**[Publishing a Web Project](../concepts/cuh-wcm-publishing.md)

**Related information**  


[Previewing the web project](tuh-wcm-content-preview-project.md)

[Rolling back to a previous snapshot](tuh-wcm-revert-snapshot.md)

