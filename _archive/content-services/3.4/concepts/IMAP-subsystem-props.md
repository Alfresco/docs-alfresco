---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: IMAP subsystem properties
---

# IMAP subsystem properties

The following properties can be configured for the IMAP subsystem.

The following properties control the IMAP subsystem.

-   **imap.server.enabled**

    Enables or disables the IMAP subsystem.

-   **imap.server.port=143**

    IMAP has a reserved port number of 143. You can change it using this property.

-   **imap.server.host=<your host name\>**

    Replace this value with the IP address \(or corresponding DNS address\) of your external IP interface.


You should also configure the following properties of the sysAdmin subsystem.

-   **alfresco.protocol**

    The protocol component of the alfresco web application URL, for example, `http`.

-   **alfresco.host**

    The host name of the Alfresco URL, which is externally resolved. Use `${localname}` for the locally-configured host name.

-   **alfresco.port**

    The port number of the Alfresco URL, which is externally resolved. For example, `8080`

-   **alfresco.context**

    The context path component of the Alfresco URL. Typically this is `alfresco`.


To configure the IMAP Home space, which is used to store user mailboxes in ARCHIVE mode, in particular the user's INBOX, use the following properties.

-   **imap.config.home.store=$\{spaces.store\}**

    Specifies the default location for the IMAP mount point. For example, `${spaces.store}`.

-   **imap.config.home.rootPath=/$\{spaces.company\_home.childname\}**

    Specifies the default location for the IMAP mount point. For example, `/${spaces.company_home.childname}`.

-   **imap.config.home.folderPath=cm:Imap Home**

    Specifies the QName of the default location for the IMAP mount point. For example, `cm:Imap Home`.


An IMAP message may contain a message and a set of attachments, and the IMAP server can split the attachments into separate content nodes.

-   **imap.server.attachments.extraction.enabled**

    Defines whether or not attachments are extracted.


**Parent topic:**[Configuring IMAP Protocol support](../concepts/imap-intro.md)

