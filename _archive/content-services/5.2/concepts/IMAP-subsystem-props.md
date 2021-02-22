---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# IMAP subsystem properties

The following properties can be configured for the IMAP subsystem.

## Enabling the IMAP protocol

The following properties control the IMAP subsystem:

-   **imap.server.enabled=true**

    Enables or disables the IMAP subsystem.

-   **imap.server.port=143**

    IMAP has a reserved port number of 143. You can change it using this property.

-   **imap.server.host=<your host name\>**

    Replace this value with the IP address \(or corresponding DNS name\) of your external IP interface.


Configure the following properties of the sysAdmin subsystem:

-   **alfresco.protocol=http**

    The protocol component of the Alfresco Content Services web application URL, for example, `http`.

-   **alfresco.host=$ \{localname\}**

    The host name of the Alfresco Content Services URL, which is externally resolved. Use `${localname}` for the locally-configured host name.

-   **alfresco.port=8080**

    The port number of the Alfresco Content Services URL, which is externally resolved. For example, `8080`

-   **alfresco.context=alfresco**

    The context path component of the Alfresco Content Services URL. Typically this is `alfresco`.


To configure the IMAP Home space, which is used to store user mailboxes in ARCHIVE mode, in particular the user's INBOX, use the following properties:

-   **imap.config.home.store=$\{spaces.store\}**

    Specifies the default location for the IMAP mount point. For example, `${spaces.store}`.

-   **imap.config.home.rootPath=/$\{spaces.company\_home.childname\}**

    Specifies the default location for the IMAP mount point. For example, `/${spaces.company_home.childname}`.

    This property may also be configured using an `XPath` query syntax.

    ```
    imap.config.home.rootPath=/app:company_home
    ```

    To add your own folder to this path, add the name of your folder path using the data model names. For example:

    ```
    /app:company_home/cm:Houses
    ```

    If your folder has a space in the name, include `_x0020_` where the space should be. For example:

    ```
    /app:company_home/cm:Home_x0020_Town
    ```

    Stop and start the IMAP subsystem for the changes to take effect.

-   **imap.config.home.folderPath=cm:Imap Home**

    Specifies the QName of the default location for the IMAP mount point. For example, `cm:Imap Home`.


## Enabling IMAPS

IMAPS is a secure IMAP that is encrypted using SSL. IMAPS is assigned to port number 993 by default. When you have enabled the IMAP subsystem, you must configure the default Java keystore, and then enable IMAPS.

To configure the default Java keystore, use the following properties:

-   **javax.net.ssl.keyStore=mySrvKeystore**

    Specifies the keystore to be used

-   **javax.net.ssl.keyStorePassword=123456**

    Specifies the keystore password


To enable IMAPS, use the following properties:

-   **imap.server.imaps.enabled=true**

    Specifies that IMAPS is enabled

-   **imap.server.imaps.port=993**

    Specifies the IMAPS port number


## Extracting attachments

An IMAP message can contain a message and a set of attachments, and the IMAP server can split the attachments into separate content nodes. Use this property with caution if you have a large repository. See [Troubleshooting IMAP](troubleshoot-imap.md) for more information.

-   **imap.server.attachments.extraction.enabled=true**

    Defines whether or not attachments are extracted.


**Parent topic:**[Configuring the email client with IMAP](../concepts/imap-intro.md)

