---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: replication service jobs
---

# Setting up replication jobs

The replication service provides control for replicating content between different Alfresco repositories.

The replication service is responsible for persisting replication jobs that specify what is to be replicated, to where, and when. In addition, it monitors the status of currently executing replication jobs and enables replications to be canceled.

The replication service finds the nodes that need to be transferred, and then it delegates to the transfer service.

Alfresco Share provides the user interface for the replication service, which is available through the administration tools menu. The methods are exposed by Java-based replication web scripts.

-   **[Configuring Share to open locked content in the source repository](../tasks/adminconsole-replication-lockedcontent.md)**  
For replication jobs, you must configure Alfresco Share to open a locked node in the source repository, where it can be edited. This is configured by mapping the remote repository identifier \(`repositoryId`\) and the URL, which gives access the remote repository.
-   **[Creating a new transfer target for replication jobs](../tasks/adminconsole-replication-transfertarget.md)**  
The transfer service stores files that control and monitor the operation of the transfer service in the **Transfer** space in the Data Dictionary.

**Parent topic:**[Administering](../concepts/ch-administering.md)

