---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring a shared file content workspace

You can configure a directory as a shared content workspace using alfresco-global.properties.

Ensure that you have installed the required external and internal software. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information.

1.  Stop the Alfresco server.

2.  Edit your alfresco-global.properties file to specify your source and target content workspace type, and the location of your source and target directories; for example:

    ```
    content.remote.default.contentRefHandler.source.type=file 
    content.remote.default.contentRefHandler.source.file.dir=
    content.remote.default.contentRefHandler.target.type=file
    content.remote.default.contentRefHandler.target.file.dir=
    ```

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

3.  Update your remote-node/config.yml file that you extracted from the Media Management installation zip with your shared content workspace properties:

    ```
    transform:
        contentReferenceHandler:
            source:
                type: file
                file:
                    path: /tmp/AlfrescoContentServices
            target:
                type: file
                file:
                    path: /tmp/AlfrescoContentServices
    ```

    You can use the same mounted network volume directory \(for example, NFS\) for both the Alfresco repository \(configured using content.remote.default.contentRefHandler.\* properties\) and the remote node.

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable or are specified in alfresco-global.properties. See [Configuring Media Management](mm-props-config.md) for more information on alfresco-global.properties settings.

    For more information about the content services framework, see [Content services node architecture](../concepts/mm-gytheio.md).

4.  Start your Alfresco server to apply the changes.


**Parent topic:**[Configuring shared content workspaces for Media Management](../concepts/mm-config-shared-workspace.md)

