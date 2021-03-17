---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: replication service jobs
---

# Setting up replication jobs

Replication jobs is a feature that allows you to control the replication of content between different Alfresco repositories.

You manage replication jobs using the Admin Console tool in Alfresco Share, which provides the user interface for the replication service.

The replication service is responsible for persisting replication jobs that specify what is to be replicated, to where, and when. In addition, it monitors the status of currently executing replication jobs and allows you to cancel replications. The replication service finds the nodes that need to be transferred, and then it delegates to the transfer service.

Before you can use the replication jobs feature, you must set up transfer target definitions to specify where the transfer should be sent.

-   **[Creating a new transfer target for replication jobs](../tasks/adminconsole-replication-transfertarget.md)**  
To use the replication jobs feature for replicating content across Alfresco repositories, you need to create a transfer target definition \(in the source Alfresco server\) to specify where the transfer should go.
-   **[Configuring replication in the global properties file](../tasks/replication-share.md)**  
You can configure Alfresco to replicate content between source and target repositories.
-   **[Configuring Share to open locked content in the source repository](../tasks/adminconsole-replication-lockedcontent.md)**  
You can configure Alfresco Share to open a locked node in the source repository so that it can be edited.

**Parent topic:**[Administering](../concepts/ch-administering.md)

