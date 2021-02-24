---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [Admin Console, User Interface]
---

# Managing Alfresco using the Admin Console

The Admin Console is a browser-based console that lets you manage your administration operations.

In the Admin Console, you can manage users, groups, email, file systems, and transformer availability. You can also view information about the repository and server, and statistics \(like the number of users/groups, storage used, and so on\). You can also manage archived documents.

The Admin Console is visible only if you are an Administrator user or a user who is a member of the `ALFRESCO_ADMINISTRATORS` group.

**Note:** If you have a clustered environment in which each node in the cluster needs a unique configuration, then the configuration values for each node must be set via the properties file, and not via Share admin console or JMX.

-   **[Opening the Admin Console](../tasks/at-adminconsole-open.md)**  
You can only see the Admin Console if you are an administrator user or a user who is a member of the `ALFRESCO_ADMINISTRATORS` group.
-   **[Admin Console tools in the More menu](../concepts/at-more-menu-intro.md)**  
The **More** menu on the toolbar contains links to Admin Console pages you may wish to access often. These links to the Admin Console page are visible only to Administrators.
-   **[Specifying application preferences](../concepts/adminconsole-prefs.md)**  
The Application tool in the Admin Console lets you set application preferences.
-   **[Managing categories](../tasks/adminconsole-catmanager.md)**  
Manage your categories on the Category Manager page.
-   **[Using the Node Browser](../tasks/adminconsole-nodebrowser.md)**  
The Node Browser is a debugging aid that allows you to browse the raw Alfresco repository structure. This feature is intended for developers responsible for customizing the application.
-   **[Managing tags](../tasks/adminconsole-tagbrowser.md)**  
Tags can be added to content within the Document Library. Use the Tag Manager page to view, edit, and delete all the tags that have been created by users.
-   **[Emptying deleted files from the Trashcan](../tasks/at-adminconsole-trashcan.md)**  
When a user deletes any content, the file is not completely removed from the system. At first, it is placed in the Trashcan.
-   **[Managing social content publishing](../concepts/adminconsole-channelsman-intro.md)**  
Social content publishing allows you to use content from Alfresco to publish out through other social platforms or delivery mechanisms.
-   **[Managing activities feed emails](../tasks/at-adminconsole-activitiesfeed.md)**  
The Activities Feed shows the settings for activity emails in your Alfresco environment. Activity emails are sent to the Administrator user to provide information for managing Alfresco.
-   **[Managing file servers](../tasks/at-adminconsole-fileservers.md)**  
The Fileservers page handles the properties for the CIFS and FTP servers.
-   **[Integrating with Google Docs](../concepts/at-googledocs-integration.md)**  
Alfresco provides a way to integrate with the documents that you want to store and edit in Google Docs. This feature is not available to you out of the box and you must enable the settings and Google Docs user name before you can start using it.
-   **[Managing your Alfresco license](../concepts/license-manage-intro.md)**  
Your access and use of Alfresco is managed by a license. The license sets the maximum number of users and a maximum number of content objects that you can use. The license is not tied to specific servers, for example, by IP or MAC address.
-   **[Managing replication jobs](../concepts/adminconsole-replication-intro.md)**  
The Replication Jobs tool in the Admin Console enables you to create and manage replication jobs in Share.
-   **[Viewing the Repository Descriptor](../tasks/at-adminconsole-repodesc-orig.md)**  
There are two Repository Descriptor pages.
-   **[Downloading the JMX dump](../tasks/at-adminconsole-repotools.md)**  
When you make configuration changes in the Admin Console, the current values of your running system are stored in an area in the JMX interface. When talking to Alfresco Support, it may be convenient to have a dump of these settings.
-   **[Viewing the system runtime information](../tasks/adminconsole-runtime.md)**  
The Runtime page shows the properties that specify the available memory in the system.
-   **[Managing subscriptions to follow users](../tasks/adminconsole-subscriptions.md)**  
The Subscriptions page allows you to enable or disable the Follow feature for users to follow each other in Share.
-   **[Viewing the system administration properties \(Sysadmin\)](../tasks/at-adminconsole-sysadmin.md)**  
The Sysadmin page shows the properties for server administration. These are properties that are used throughout Alfresco.
-   **[Managing workflow](../concepts/adminconsole-workflow-intro.md)**  
Alfresco workflows run on an embedded Activiti workflow engine.
-   **[Managing search](../concepts/adminconsole-search.md)**  
The Search tool in the Admin Console lets you manage the search mechanisms and settings.
-   **[Managing users](../concepts/at-adminconsole-users.md)**  
The Users tool in the Admin Console lets you create and manage the user accounts.
-   **[Managing groups](../concepts/at-adminconsole-groups.md)**  
The Groups tool in the Admin Console lets you create and manage user groups.
-   **[Managing IMAP emails](../tasks/at-adminconsole-IMAPemail.md)**  
This section describes how to set the options for emails sent using IMAP.
-   **[Managing inbound emails](../tasks/adminconsole-inboundemail.md)**  
This section describes how to set the options for inbound emails. You need to set these properties to activate sending and receiving site invites, and also for receiving activity notification emails.
-   **[Managing outbound emails](../tasks/at-adminconsole-outboundemail.md)**  
This section describes how to set the options for outbound emails. You need to set these properties to activate sending and receiving site invites, and also for receiving activity notification emails.
-   **[Managing OpenOffice](../tasks/at-adminconsole-openoffice.md)**  
This section describes how to view the properties for the OpenOffice.
-   **[Viewing the ImageMagick transformer details](../tasks/at-adminconsole-imagemagick.md)**  
The Transformer ImageMagick page shows the location of the installed version of ImageMagick that Alfresco uses for transformations. Use this page to check the location.
-   **[Viewing the pdf2swf transformer details](../tasks/at-adminconsole-pdf2swf.md)**  
The Transformer pdf2swf page shows the location of the installed version of SWT Tools that Alfresco uses for transformations. Use this page to check the location.

**Parent topic:**[Administering](../concepts/ch-administering.md)

