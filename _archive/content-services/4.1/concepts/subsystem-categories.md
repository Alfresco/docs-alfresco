---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
keyword: [subsystems, Audit, Authentication, OOoDirect, OOoJodconverter, Synchronization, fileServers, email, imap, sysAdmin, thirdparty, wcm\_deployment\_receiver]
---

# Subsystem categories

Every subsystem has a category and a type.

-   Category is a broad description of the subsystem's function, for example, Authentication.
-   Type is a name for the particular flavor of implementation, where multiple alternative implementations exist, for example, `ldap`. Where a subsystem has only one implementation, you can use the default type name of `default`.

The Alfresco-supplied subsystem categories are:

-   **ActivitiesFeed**

    Handles the activities notifications.

-   **Audit**

    Handles the audit related functions.

-   **Authentication**

    Handles all authentication related functions, including:

    -   Password-based authentication
    -   Single Sign-on \(SSO\) for WebClient, WebDAV, Web Scripts, and SharePoint Protocol
    -   CIFS and FTP authentication
    -   User registry export \(LDAP only\)
    The subsystem is chained so that multiple instances of different types can be configured and used together.

-   **OOoDirect**

    Handles the settings for OpenOffice transformations. With this subsystem, the Alfresco server directly manages OpenOffice.

-   **OOoJodconverter**

    Handles the JODConverter settings for OpenOffice transformations. With this subsystem, the JODConverter manages OpenOffice, including a pool of separate OpenOffice processes, automatic restart of crashed OpenOffice processes, automatic termination of slow OpenOffice operations, automatic restart of any OpenOffice process after a number of operations.

-   **Synchronization**

    Performs regular synchronization of local user and group information with the user registry exporters \(usually LDAP directories\) in the authentication chain.

-   **fileServers**

    Handles the properties for the CIFS, FTP, and NFS servers.

-   **email**

    Handles the outbound and inbound SMTP property settings.

-   **imap**

    Handles the properties for the IMAP service.

-   **sysAdmin**

    Handles the properties for server administration.

-   **thirdparty**

    Handles the properties for SWF Tools and ImageMagick content transformers.

-   **wcm\_deployment\_receiver**

    Handles the properties for WCM Deployment Receiver.

-   **Search**

    Handles the search mechanism for Alfresco, which can be set either to solr or lucene.

-   **googledocs**

    Handles the properties for Google Docs integration.

-   **replication**

    Handles the settings for the replication jobs tool.

-   **Subscriptions**

    Handles the settings for the activities feeds.


**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

