---
author: Alfresco Documentation
---

# Administering

There are a number of processes and procedures for maintaining and administering an Alfresco production environment.

-   **[Starting and stopping Alfresco](../concepts/start-stop-intro.md)**  
Use this information to understand how to run the Alfresco server and Share.
-   **[Managing Share features](../concepts/manage-share.md)**  
Use the Admin Tools to manages features of Alfresco Share such as look and feel, tagging, categories, and sites.
-   **[Managing users and groups](../concepts/admintools-usersgroups.md)**  
Use this information to administer your users and groups in Alfresco.
-   **[Working with Alfresco licenses](../concepts/license-process.md)**  
Access to Alfresco One is licensed on a per user basis.
-   **[Setting up clustering](../concepts/ha-intro.md)**  
You can implement multiple Alfresco instances in a clustered environment.
-   **[Setting up multi-tenancy](../concepts/mt-intro.md)**  
Alfresco supports a single-instance, single-tenant \(ST\) environment where each tenant \(for example, customer, company, or organization\) runs a single instance that is installed on one server or across a cluster of servers.
-   **[Creating and managing workflows](../topics/wf-howto.md)**  
 Alfresco comes with a set of predefined workflow definitions which can be used right out of the box. For more complex requirements, you can also create, deploy, and manage your own Activiti workflows.
-   **[Setting up Enterprise to Cloud Sync](../concepts/cloud-sync-intro.md)**  
Enterprise to Cloud Sync gives Alfresco on-premise users the ability to synchronize their content to Alfresco in the Cloud. This feature supports scenarios where users wish to collaborate on documents with external parties that do not have access to systems behind the firewall. In these circumstances, the on-premise Alfresco instance becomes the system of record, and the cloud instance is the system of engagement for external collaboration.
-   **[Managing transformations](../concepts/managing-transformations.md)**  
When you are working with transformations, it is important to understand how file types map to one another and the transformation formats that each file type supports.
-   **[Setting up content stores](../concepts/manage-cs-home.md)**  
A content store provides low-level access to stored binaries ensuring that, for every write, a new binary storage location is made available. This information gives an overview on the content stores, their types, and configuration details with examples.
-   **[Setting up and managing content replication](../concepts/admintools-replication-config.md)**  
 You can automatically replicate folders and content between repositories using replication jobs. These jobs are controlled by the replication service, which finds content that needs to be replicated and then calls the transfer service to carry out the replication. Alfresco replication suits an environment where you are running multiple, separate instances of Alfresco and then replicating a subset of the content between these servers.
-   **[Importing and transferring files](../concepts/import-transfer.md)**  
Use this information to import files using the Bulk Import Tool, or transfer files using the File System Transfer Receiver \(FSTR\).
-   **[Migrating](../concepts/migrating.md)**  
You can perform various migration procedures for Alfresco servers and databases.
-   **[Monitoring Alfresco](../concepts/monitoring-intro.md)**  
There are a number of methods for monitoring Alfresco.
-   **[Backing up and restoring](../concepts/ch-backup-restore.md)**  
This information describes the process for backing up the Alfresco content repository only. It assumes that components other than the data residing in Alfresco \(operating system, database, JRE, application server, Alfresco binaries and configuration, etc.\) are being backed up independently.
-   **[Auditing Alfresco](../concepts/audit-intro.md)**  
Alfresco provides the ability to audit activity. The auditing system is disabled by default, as it has the potential to impact Alfresco ECM performance, but the auditing system is highly configurable, so that you only need generate data for those events of particular interest.

**Parent topic:**[Alfresco One](../concepts/welcome.md)

