---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Subsystem categories

Every subsystem has a category and a type.

-   Category is a broad description of the subsystem's function, for example, Authentication.
-   Type is a name for the particular flavor of implementation, where multiple alternative implementations exist, for example, `ldap`. Where a subsystem has only one implementation, you can use the default type name of `default`.

The Alfresco-supplied subsystem categories are:

|Subsystem name|Functional area|More information|
|--------------|---------------|----------------|
|ActivitiesFeed|Activities notifications|[Configuring the Activities Feed](../tasks/adminconsole-activitiesfeed.md)|
|Audit|Audit related functions|[Auditing Alfresco](audit-intro.md)|
|Authentication|Authentication related functions|[Setting up authentication and security](auth-intro.md)|
|ContentStore|Properties for the encrypted and non-encrypted Content Stores|[Setting up content stores](manage-cs-home.md)|
|email|Outbound and inbound SMTP property settings|[Configuring inbound and outbound email](email-intro.md)|
|fileServers|Properties for the CIFS and FTP servers.|[Configuring file servers](fileserv-subsystem-intro.md)|
|googledocs|Properties for Google Docs integration|[Installing and configuring Google Docs integration](googledocs-intro.md)|
|imap|Properties for the IMAP service|[Configuring the email client with IMAP](imap-intro.md)|
|OOoDirect|OpenOffice transformations settings \(use LibreOffice where possible\)|[Configuring OpenOffice transformations in place of LibreOffice](../tasks/OOo-props-config.md)|
|OOoJodconverter|Default settings for LibreOffice transformations|[Configuring LibreOffice](OOo-subsystems-intro.md)|
|Replication|Settings for the replication jobs tool|[Setting up and managing content replication](admintools-replication-config.md)|
|Search|Search mechanism for Alfresco|[Configuring search](solr-home.md)|
|Subscriptions|Settings for the activities feeds|[Enabling the Subscription Service](../tasks/adminconsole-subscriptionservice.md)|
|Synchronization|Synchronization of local user and group information with the user registry exporters \(usually LDAP directories\) in the authentication chain|[Configuring synchronization](sync-intro.md)|
|sysAdmin|Properties for server administration|[Configuring server administration settings](../tasks/adminconsole-systemsettings.md)|
|thirdparty|Properties for third-party software that is used by Alfresco, for example, ImageMagick|[Changing the Office subsystems](../tasks/OOo-subsystems-config.md)|
|Transformers|Properties for the transformation server|[Managing transformations](managing-transformations.md)|
|wcm\_deployment\_receiver|Properties for WCM Deployment Receiver|[The Workflow Console](../tasks/adminconsole-workflowconsole.md)|

**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

