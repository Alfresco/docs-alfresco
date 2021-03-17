---
author: Alfresco Documentation
---

# Administering

This section provides guidance on configuring, maintaining, and administering an Alfresco production environment.

-   **[Starting and stopping](../concepts/start-stop-intro.md)**  
This section describes how to run the Alfresco server, Share, Explorer, virtualization server, and standalone deployment engine.
-   **[Configuring Alfresco](../concepts/ch-configuration.md)**  
This section provides information on the mechanisms for configuring Alfresco.
-   **[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)**  
The Admin Console is a browser-based console that lets you manage your administration operations.
-   **[Configuring databases](../concepts/intro-db-setup.md)**  
This section describes how to configure supported databases for use with Alfresco.
-   **[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)**  
An Alfresco subsystem is a configurable module responsible for a sub-part of Alfresco functionality. Typically, a subsystem wraps an optional functional area, such as IMAP bindings, or one with several alternative implementations, such as authentication.
-   **[Configuring OpenOffice](../concepts/OOo-subsystems-intro.md)**  
Within Alfresco, you can transform a document from one format to another. This feature requires you to install OpenOffice.
-   **[Configuring synchronization](../concepts/sync-intro.md)**  
The synchronization subsystem manages the synchronization of Alfresco with all the user registries \(LDAP servers\) in the authentication chain.
-   **[Configuring file servers](../concepts/fileserv-subsystem-intro.md)**  
The File Server subsystem allows access to the Alfresco data stores through the SMB/CIFS, FTP, and NFS protocols. This allows you to browse to the repository using Windows Explorer or by creating a Network Place.
-   **[Configuring email](../concepts/email-intro.md)**  
The email subsystem allows you to configure the outbound and inbound SMTP email settings to interact with Alfresco.
-   **[Configuring IMAP Protocol support](../concepts/imap-intro.md)**  
IMAP protocol support allows email applications that support IMAP \(including Outlook, Apple Mail, Thunderbird, and so on\) to connect to and interact with Alfresco repositories.
-   **[Configuring system properties](../concepts/sysadmin-subsystem-intro.md)**  
The sysAdmin subsystem allows real time control across some of the general repository properties. The sysAdmin subsystem replaces the `RepoServerMgmt` management bean.
-   **[Configuring the repository](../concepts/intro-core.md)**  
This section describes how to configure the Alfresco repository.
-   **[Setting up Alfresco authentication and security](../concepts/auth-intro.md)**  
The first time you access a vanilla Alfresco installation through Alfresco Explorer, Alfresco identifies you as a ‘guest’ user. You can identify yourself as another user by clicking the Login link and entering a new user name and password in the Login window. If you log in with the credentials of a user with administrator privileges \(Alfresco uses admin as the default user name and password\), you can use the Administration Console to create additional users and assign them passwords.
-   **[Setting up high availability systems](../concepts/ha-intro.md)**  
This section describes how to implement multiple Alfresco instances in a high availability configuration.
-   **[Configuring Search](../concepts/solr-home.md)**  
This section provides an overview on the Solr server and describes how to configure it.
-   **[Backing up and restoring](../concepts/ch-backup-restore.md)**  
 This section describes the process for backing up the Alfresco content repository. It assumes that the various binaries \(operating system, database, JDK, application server, and so on.\) and configuration files \(operating system, database, JDK, application server, Alfresco, and so on\) are being backed up independently.
-   **[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)**  
 The Bulk Import Tool provides a mechanism for bulk importing existing content into a repository from the Alfresco server's file system.  
-   **[Creating and managing workflows](../topics/wf-howto.md)**  
 Alfresco comes with a set of predefined workflow definitions which can be used right out of the box. For more complex requirements, you can also create, deploy, and manage your own Activiti workflows.
-   **[Configuring templated nodes](../concepts/templated-nodes-intro.md)**  
Templated nodes allows for the storing of content templates in Alfresco repositories that users can then use to create content.
-   **[Managing content stores](../concepts/manage-cs-home.md)**  
This section gives an overview on the Content Store Selector and Caching Content Store, their properties, and configuration details with examples.
-   **[Migrating](../concepts/migrating.md)**  
This section describes how to perform various migration procedures for Alfresco servers and databases.
-   **[Monitoring Alfresco](../concepts/monitoring-intro.md)**  
This section describes the various methods for monitoring Alfresco.
-   **[Setting up Alfresco multi-tenancy](../concepts/mt-intro.md)**  
Alfresco supports a single-instance, single-tenant \(ST\) environment where each tenant \(for example, customer, company, or organization\) runs a single instance that is installed on one server or across a cluster of servers.
-   **[Setting up replication jobs](../concepts/adminconsole-replication-config.md)**  
The replication service provides control for replicating content between different Alfresco repositories.
-   **[Configuring the File System Transfer Receiver](../concepts/FSTR-intro.md)**  
The File System Transfer Receiver transfers folders and content from an Alfresco core repository \(the DM\) to configured targets using the Transfer Service, for example, a remote file system.
-   **[Auditing Alfresco](../concepts/audit-intro.md)**  
Alfresco provides the ability to audit activity. This section describes how Alfresco generates, stores, and retrieves auditing information.
-   **[Administering Explorer from the Administration Console](../topics/guh-hdg-administration.md)**  
The Administration Console enables Alfresco administrators to create and manage users and groups, manage categories, import and export spaces and content, and perform other administrative tasks from within Alfresco Explorer.
-   **[Administering Records Management](../concepts/rm-admin-intro.md)**  
The administrator can manage Alfresco Records Management from the Management Console.

**Parent topic:**[Welcome](../concepts/welcome-infocenter.md)

