---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Setting up and managing content replication

You can automatically replicate folders and content between repositories using replication jobs. These jobs are controlled by the replication service, which finds content that needs to be replicated and then calls the transfer service to carry out the replication. Alfresco replication suits an environment where you are running multiple, separate instances of Alfresco and then replicating a subset of the content between these servers.

Content replication is designed to assist geographically distributed deployments where performance may be affected by network latency or bandwidth limitations.

-   Fast access by serving content from local servers
-   High availability - removes the single point of failure

For network administrators replication provides:

-   Reduced network overhead

By default, replicated content is read-only on the target repository. This ensures the integrity of the content is not compromised by uncontrolled updates. A option is provided in the Alfresco Share user interface for users to navigate to the content's source repository to make any updates.

The replication service controls content replication between different Alfresco repositories. The replication service is responsible for persisting replication jobs that specify what is to be replicated, to where, and when. In addition, it monitors the status of currently executing replication jobs and enables replications to be canceled.

The replication service finds the nodes that need to be transferred, and then it delegates the transfer of content to the transfer service.

Replication jobs are managed in the Share Admin Tools.

**Note:** You can't run simultaneous replication jobs in Alfresco. If you send two replication jobs to a target repository at the same time, the first job received by the repository runs without issue. The second job attempts to run but fails with an error.

-   **[Configuring content replication](../tasks/replication-share.md)**  
You can configure Alfresco to replicate content between source and target repositories.
-   **[Enabling the Replication Service](../concepts/adminconsole-replication-config.md)**  
**Replication Service** in the Admin Console displays the settings to enable or disable the replication service and to control permissions.
-   **[Opening locked content in the source repository](../tasks/adminconsole-replication-lockedcontent.md)**  
For replication jobs, you must configure Alfresco to open a locked node in the source repository, where it can be edited. This is configured by mapping the remote repository identifier \(`repositoryId`\) and the URL, which gives access the remote repository.
-   **[Creating a new transfer target for content replication](../tasks/admintools-replication-transfertarget.md)**  
The transfer service stores files that control and monitor the operation of the transfer service in the **Transfers** space in the Data Dictionary.
-   **[Managing replication jobs](../concepts/admintools-replication-intro.md)**  
The Replication Jobs tool in Share Admin Tools enables you to create and manage jobs for content replication.

**Parent topic:**[Administering](../concepts/ch-administering.md)

