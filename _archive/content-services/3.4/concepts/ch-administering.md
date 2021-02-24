---
author: Alfresco Documentation
---

# Administering

This section provides guidance on configuring, maintaining, and administering an Alfresco production environment.

-   **[Starting and stopping](../concepts/start-stop-intro.md)**  
This section describes how to run the Alfresco server, Share, Explorer, virtualization server, and standalone deployment engine.
-   **[Configuring Alfresco](../concepts/ch-configuration.md)**  
This section provides information on the mechanisms for configuring Alfresco.
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
-   **[Backing up and restoring](../concepts/ch-backup-restore.md)**  
 This section describes the process for backing up the Alfresco content repository. It assumes that the various binaries \(operating system, database, JDK, application server, and so on.\) and configuration files \(operating system, database, JDK, application server, Alfresco, and so on\) are being backed up independently.
-   **[Exporting and importing](../concepts/import-export.md)**  
This section describes how to export and import information from a repository, and then import that information into either the same or another repository.
-   **[Creating and managing workflows](../topics/wf-howto.md)**  
This section contains steps for creating a workflow process definition and task model.
-   **[Managing the content store](../concepts/store-manage-content.md)**  
The Content Store Selector provides a mechanism to control the store used for the content file associated with a particular content item.
-   **[Migrating](../concepts/migrating.md)**  
This section describes how to perform various migration procedures for Alfresco servers and databases.
-   **[Monitoring Alfresco](../concepts/monitoring-intro.md)**  
This section describes the various methods for monitoring Alfresco.
-   **[Setting up Alfresco multi-tenancy](../concepts/mt-intro.md)**  
Alfresco supports a single-instance, single-tenant \(ST\) environment where each tenant \(for example, customer, company, or organization\) runs a single instance that is installed on one server or across a cluster of servers.
-   **[Setting up replication jobs](../concepts/adminconsole-replication-config.md)**  
The replication service provides control for replicating content between different Alfresco repositories.
-   **[Auditing Alfresco](../concepts/audit-intro.md)**  
Alfresco provides the ability to audit activity. This section describes how Alfresco generates, stores, and retrieves auditing information.
-   **[Deploying from AVM](../concepts/wcm-deployment-intro.md)**  
Deployment provides a framework for pushing content from an AVM authoring environment into another environment. For example you can push out content to a flat file system, to be served up by Apache or IIS, or to another instance of Alfresco.
-   **[Administering Explorer from the Administration Console](../topics/guh-hdg-administration.md)**  
The Administration Console enables Alfresco administrators to create and manage users and groups, manage categories, import and export spaces and content, and perform other administrative tasks from within Alfresco Explorer.
-   **[Share Admin Console](../concepts/adminconsole-intro.md)**  
The Admin Console enables Alfresco Administrators to create and manage both users and groups from within Share. It also provides the functionality for setting application preferences. Only those users who are members of the group ALFRESCO\_ADMINISTRATORS have access to the Admin Console.
-   **[Administering Records Management](../concepts/rm-admin-intro.md)**  
The administrator can manage Alfresco Records Management from the Management Console.

**Parent topic:**[Welcome](../concepts/welcome-infocenter.md)

