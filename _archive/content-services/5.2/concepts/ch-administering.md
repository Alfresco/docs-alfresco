---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Administering

There are a number of processes and procedures for maintaining and administering an Alfresco Content Services production environment.

For a description of the system paths used within this documentation, see [System path conventions](../reuse/conv-syspaths.md#).

-   **[Starting and stopping Alfresco Content Services](../concepts/start-stop-intro.md)**  
Use this information to understand how to run the Alfresco Content Services server and Alfresco Share.
-   **[Using the Admin Console](../concepts/at-adminconsole.md)**  
The Admin Console application that gives you control over the management and settings of the Alfresco Content Services environment.
-   **[Using the Alfresco Share Admin Tools](../concepts/admintools.md)**  
Share Admin Tools help you to manage your administration operations.
-   **[Managing Alfresco Share features](../concepts/manage-share.md)**  
Use the Admin Tools to manages features of Alfresco Share such as look and feel, tagging, categories, and sites.
-   **[Managing users and groups](../concepts/admintools-usersgroups.md)**  
Use this information to administer your users and groups in Alfresco Content Services.
-   **[Working with licenses](../concepts/license-process.md)**  
Access to Alfresco Content Services is licensed on a per user basis.
-   **[Setting up authentication and security](../concepts/auth-intro.md)**  
Use this information to manage authentication in Alfresco Content Services, and to configure keystores for repository encryption.
-   **[Managing search services](../concepts/search-home.md)**  
Use this information to configure and manage the search services for Alfresco Content Services 5.2.7.
-   **[Setting up clustering](../concepts/ha-intro.md)**  
You can implement multiple Alfresco Content Services instances in a clustered environment.
-   **[Setting up multi-tenancy](../concepts/mt-intro.md)**  
Alfresco Content Services supports a single-instance, single-tenant \(ST\) environment where each tenant \(for example, customer, company, or organization\) runs a single instance that is installed on one server or across a cluster of servers.
-   **[Creating and managing workflows](../topics/wf-howto.md)**  
Alfresco Content Services comes with a set of predefined workflow definitions which can be used right out of the box. For more complex requirements, you can also create, deploy, and manage your own workflows.
-   **[Managing transformations](../concepts/managing-transformations.md)**  
When you are working with transformations, it is important to understand how file types map to one another and the transformation formats that each file type supports.
-   **[Setting up content stores](../concepts/manage-cs-home.md)**  
A content store provides low-level access to stored binaries ensuring that, for every write, a new binary storage location is made available. This information gives an overview on the content stores, their types, and configuration details with examples.
-   **[Setting up and managing content replication](../concepts/admintools-replication-config.md)**  
 You can automatically replicate folders and content between repositories using replication jobs. These jobs are controlled by the replication service, which finds content that needs to be replicated and then calls the transfer service to carry out the replication. Replication suits an environment where you are running multiple, separate instances of Alfresco Content Services and then replicating a subset of the content between these servers.
-   **[Importing and transferring files](../concepts/import-transfer.md)**  
Use this information to import files using the Bulk Import Tool, or transfer files using the File System Transfer Receiver \(FSTR\).
-   **[Migrating](../concepts/migrating.md)**  
You can perform various migration procedures for Alfresco Content Services servers and databases.
-   **[Support Tools](../concepts/monitoring-intro.md)**  
With the Support Tools you can monitor your Alfresco Content Services system and diagnose performance, communication, and memory issues.
-   **[Backing up and restoring](../concepts/ch-backup-restore.md)**  
This information describes the process for backing up the content repository only. It assumes that components other than the data residing in Alfresco Content Services \(operating system, database, JRE, application server, binaries and configuration, etc.\) are being backed up independently.
-   **[Auditing](../concepts/audit-intro.md)**  
Alfresco Content Services provides the ability to audit activity. The auditing system is disabled by default, as it has the potential to impact performance, but the auditing system is highly configurable, so that you only need generate data for those events of particular interest.

**Parent topic:**[Alfresco Content Services](../concepts/welcome.md)

