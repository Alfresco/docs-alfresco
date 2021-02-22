---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# IMAP mount points

IMAP mount points are used to control which folders are available using IMAP and the mode in which they are accessed. Modes are used to define the type of interaction available.

The IMAP integration offers the following access modes:

-   **Archive**

    Allows emails to be written to and read from Alfresco Content Services by the IMAP client by drag and drop, copy/paste, and so on, from the email client.

-   **Virtual**

    Documents managed by Alfresco Content Services can be viewed as emails from the IMAP client. Documents are shown as virtual emails with the ability to view metadata and trigger actions on the document, using links included in the email body.

-   **Mixed**

    A combination of both archive and virtual modes, that is, both document access and email management are available.


Add the IMAP composite property, `imap.config.server.mountPoints` along with the names of your IMAP mount points to the alfresco-global.properties file. For each mount point specify the following settings:

-   `beanName`
-   `store`
-   `rootPath`
-   `mode`

By default, a single mount point called `AlfrescoIMAP` is defined in the `MIXED` mode for Company Home and you can change it or add more mount points.

```
imap.config.server.mountPoints=AlfrescoIMAP
imap.config.server.mountPoints.default.mountPointName=IMAP
imap.config.server.mountPoints.default.modeName=ARCHIVE
imap.config.server.mountPoints.default.store=${spaces.store}
imap.config.server.mountPoints.default.rootPath=/${spaces.company_home.childname}
imap.config.server.mountPoints.value.AlfrescoIMAP.mountPointName=Alfresco IMAP
imap.config.server.mountPoints.value.AlfrescoIMAP.modeName=MIXED
```

In JMX dump, the same presentation looks like this:

```
** Object Name Alfresco:Type=Configuration,Category=imap,id1=default,id2=imap.config.server.mountPoints,id3=AlfrescoIMAP
** Object Type imap$default$imap.config.server.mountPoints$AlfrescoIMAP
folderPath     
mode           MIXED
modeName       MIXED
mountPointName Alfresco IMAP
rootPath       /app:company_home
store          workspace://SpacesStore
storeRef       workspace://SpacesStore
```

**Note:** Be careful when deciding what mount points you provide. When an IMAP client mounts a mount point, it issues a `LSUB "" *` command. This retrieves the entire tree of folders below the mount point.

**Parent topic:**[Configuring the email client with IMAP](../concepts/imap-intro.md)

