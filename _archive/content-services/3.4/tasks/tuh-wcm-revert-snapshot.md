---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Rolling back to a previous snapshot

The Revert action in the Staging Sandbox enables you to roll back to a previous snapshot. This creates a new snapshot of that version, which becomes the current staging snapshot.

The new snapshot in the staging history chain is simply the older version being pulled forward. Because the current staging snapshot is the baseline for all sandboxes in the web project, each user instantly has an updated context for previewing and editing.

When you want to publish a previous version of the website, it is recommended that you first roll back to the desired snapshot. This will allow users—Content Contributors, Content Publishers, Developers, and Designers—to correct errors, add content, and test the site before deploying it. Once ready for publishing, you deploy the updated snapshot.

1.  Navigate to the Sandbox view of the web project you want to work with.

2.  In the Staging Sandbox, click ![Expand](../images/im-expand.png) to expand the **Recent Snapshots** list.

    Use the filter options provided at the top of this list to limit the items displayed. You can choose to view all snapshots or those created today, within the past 7 days, or within the past 30 days.

    In the **Status** column, the currently deployed snapshot is marked LIVE.

3.  In this list, locate the snapshot you want to revert to and click ![Revert](../images/im-revert.png) **\(Revert\)** in the **Actions** column for that item.

    A message beneath the header indicates the reversion was successful. The **Recent Snapshots** list contains the new version of the website or web application.

    Because the current staging snapshot is the baseline for all sandboxes in the web project, each user instantly has an updated context for previewing and editing. Users can now work with this current snapshot to update and test the content.

    Once all necessary changes have been made, the appropriate snapshot can be deployed to publish the site.


**Parent topic:**[Publishing a Web Project](../concepts/cuh-wcm-publishing.md)

**Related information**  


[Deploying a snapshot](tuh-wcm-deploy.md)

