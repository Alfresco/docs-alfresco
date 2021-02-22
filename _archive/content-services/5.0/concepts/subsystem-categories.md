---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
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

-   **ContentStore**

    Handles the properties for the encrypted and non-encrypted Content Stores.

-   **email**

    Handles the outbound and inbound SMTP property settings.

-   **fileServers**

    Handles the properties for the CIFS, FTP, and NFS servers.

-   **googledocs**

    Handles the properties for Google Docs integration.

-   **imap**

    Handles the properties for the IMAP service.

-   **OOoDirect**

    Handles the settings for LibreOffice transformations. With this subsystem, the Alfresco server directly manages LibreOffice.

-   **OOoJodconverter**

    Handles the JODConverter settings for LibreOffice transformations. With this subsystem, the JODConverter manages LibreOffice, including a pool of separate LibreOffice processes, automatic restart of crashed LibreOffice processes, automatic termination of slow LibreOffice operations, automatic restart of any LibreOffice process after a number of operations.

-   **Replication**

    Handles the settings for the replication jobs tool.

-   **Search**

    Handles the search mechanism for Alfresco, which can be set either to solr or solr4.

-   **Subscriptions**

    Handles the settings for the activities feeds.

-   **Synchronization**

    Performs regular synchronization of local user and group information with the user registry exporters \(usually LDAP directories\) in the authentication chain.

-   **sysAdmin**

    Handles the properties for server administration.

-   **thirdparty**

    Handles the properties for content transformers.

-   **Transformers**

    Handles the properties for the transformation server.

-   **wcm\_deployment\_receiver**

    Handles the properties for WCM Deployment Receiver.


**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

