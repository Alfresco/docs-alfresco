---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# About the Admin Console

The Admin Console is a standalone console for managing the administration of the repository.

The Admin Console is a tool comprising separate pages that identify a particular administrative activity or feature:

-   System Summary: [Viewing the System Summary](adminconsole-systemsummary.md)
-   Consoles:
    -   GoogleDocs: [Configuring Google Docs using Admin Console](../tasks/adminconsole-googledocs.md)
    -   Model and Messages: [Managing models using the Admin Console](../tasks/adminconsole-modelconsole.md)
    -   Tenant: [Managing tenants](../tasks/mt-config.md)
    -   Workflow: [The Workflow Console](../tasks/adminconsole-workflowconsole.md)
-   Email Services:
    -   Inbound Email: [Managing inbound emails](../tasks/adminconsole-inboundemail.md)
    -   Outbound Email: [Managing outbound emails](../tasks/adminconsole-outboundemail.md)
-   General:
    -   License: [Uploading a new license](../tasks/at-adminconsole-license.md)
    -   Repository Information: [Viewing Repository Information](../tasks/adminconsole-repoinfo.md)
    -   System Settings: [Configuring server administration settings](../tasks/adminconsole-systemsettings.md)
-   Repository Services:

    -   Activities Feed: [Configuring the Activities Feed](../tasks/adminconsole-activitiesfeed.md)
    -   Repository Server Clustering: [Managing members of a cluster](../tasks/adminconsole-reposerverclustering.md)
    -   Index Server Sharding: [Configuring Solr sharding using the Admin Console](../tasks/adminconsole-index-server-sharding.md)
    -   Process Engines: [Enabling workflow process engines](../tasks/adminconsole-processengines.md)
    -   Replication Service: [Enabling the Replication Service](adminconsole-replication-config.md)
    -   Search Service: [Working with the Search Service](adminconsole-searchservice.md)
    -   Subscription Service: [Enabling the Subscription Service](../tasks/adminconsole-subscriptionservice.md)
    -   Transformation Services: [Changing the Office subsystems](../tasks/OOo-subsystems-config.md)
    **Note:** Use Repository Services to manage individual repository servers. This function not be accessed through a load balancer.

-   Support Tools:
    -   Download JMX Dump: [JMX Settings](../tasks/adminconsole-exportsystemsettings.md)
    -   Node Browser: [Using the Node Browser](../tasks/adminconsole-nodebrowser.md)
-   Directory Management: [Managing authentication directories](adminconsole-directorymgt.md)
-   Virtual File Systems:
    -   File Servers: [Enabling file servers](../tasks/adminconsole-fileservers.md)
    -   IMAP Service: [Enabling the IMAP Service using the Admin Console](../tasks/adminconsole-IMAPservice.md)

The links provide more information on configuring these activities.

You can use the Admin Console as your main tool to help you manage your production environment. It is a simple alternative to using a JMX console, or manually setting properties in the alfresco-global.properties file.

The settings that you choose in the Admin Console take precedence over any setting that you add in the alfresco-global.properties file.

**Parent topic:**[Using the Admin Console](../concepts/at-adminconsole.md)

