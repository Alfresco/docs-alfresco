---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Managing replication jobs

The Replication Jobs tool in the Admin Console enables you to create and manage replication jobs in Share.

A replication job specifies the content to be replicated; the day and time the job is to be performed; and the target location for the replicated content. The job, which is controlled by the Replication Service, calls the Transfer Service, which allows folders and content to be automatically copied between Alfresco repositories.

A replication job can be run according to a schedule or on-demand.

By default, the replicated content is read-only in the target repository. This ensures the integrity of the content is not compromised by uncontrolled updates.

-   **[Viewing a replication job](../tasks/adminconsole-replication-view.md)**  
Select a replication job to view the job details and display the available actions.
-   **[Creating a new replication job](../tasks/adminconsole-replication-create.md)**  
You can create any number of replication jobs to suit your needs.
-   **[Managing existing jobs](../concepts/adminconsole-replication-manage.md)**  
The Replication Jobs page of the Admin Console displays a list of all existing replication jobs. For each job in this list, you can perform any of the following actions to manage and maintain the jobs:
-   **[Viewing replication job reports](../tasks/adminconsole-replication-reports.md)**  
Two reports—local and remote—are available for each replication job run successfully.

**Parent topic:**[Share Admin Console](../concepts/adminconsole-intro.md)

