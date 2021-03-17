---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Tutorial
option: 
---

# Roll back to a previous snapshot

You can roll back a site to ensure an older version of the content is being delivered in the live environment and also to allow re-edits prior to deployment. An example of where this is useful is the rollout of a new section of the site or the addition of application functionality. In these cases, simply redeploying an older site version is not enough: you also need to roll back the current working copy of the site for your Contributors, Publishers, Developers, and Designers to correct errors, restage, and redeploy the content.

Rolling back your authoring and development environment to a last known good state for modification prior to deployment is straightforward.

1.  In the Staging Sandbox, expand the **Recent Snapshots** list and click the **Revert** action, ![](../images/im-revert.png), for **version 3 – Initial Import**.

    This creates a new snapshot, **version 9 – Reverted to Version 3**.

    Note that while this is a new version of the site, no content has been duplicated in the repository; the new version is simply a new entry in the history chain noting that an older version has been pulled forward.

    Since all sandboxes in the web project are baselined off the current view of staging, each user instantly has an updated content for previewing and editing. Within the tutorial, this means that the profiles and press releases no longer exist.

2.  Enter your user sandbox \(**My Sandbox**\) and navigate to /media/releases/content. The content items you created as you worked through the tutorial were stored here; it is now empty.

3.  Similarly, click **Preview Website** in your user sandbox and select the submenu **News** in the sample website to see that this page is back to its original blank state.

    **Note:** If you continue to see a list of press releases, simply refresh your cache.


**Parent topic:**[Publish the website](../tasks/gs-wcm-publish.md)

