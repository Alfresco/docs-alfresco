---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring an Amazon S3 shared content workspace

Amazon S3 can be configured as a shared content workspace using alfresco-global.properties.

Ensure that you have installed the required external and internal software. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information. Make sure you have your Amazon S3 account set up.

1.  Stop the Alfresco server.

2.  Edit your alfresco-global.properties file to specify your source and target content workspace type, source and target S3 keys, and S3 bucket information; for example:

    ```
    content.remote.default.contentRefHandler.source.type=s3 
    content.remote.default.contentRefHandler.source.s3.bucketName=
    content.remote.default.contentRefHandler.source.s3.bucketRegion=
    content.remote.default.contentRefHandler.source.s3.accessKey=
    content.remote.default.contentRefHandler.source.s3.secretKey=
    content.remote.default.contentRefHandler.target.type=s3
    content.remote.default.contentRefHandler.target.s3.bucketName=
    content.remote.default.contentRefHandler.target.s3.bucketRegion=
    content.remote.default.contentRefHandler.target.s3.accessKey=
    content.remote.default.contentRefHandler.target.s3.secretKey=
    ```

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

    You can find your S3 details in your AWS S3 settings.

3.  Update your remote-node/config.yml file that you extracted from the Media Management installation zip with your shared content workspace properties:

    ```
    source:
      type: s3
      s3:
         accessKey: <key>
         secretKey: <secret>
         bucketName: <bucket>
         bucketRegion: us-east-1
    target:
      type: s3
      s3:
         accessKey: <key>
         secretKey: <secret>
         bucketName: <bucket>
         bucketRegion: us-east-1
    ```

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable or are specified in alfresco-global.properties. See [Configuring Media Management](mm-props-config.md) for more information on alfresco-global.properties settings.

    For more information about the content services framework, see [Content services node architecture](../concepts/mm-gytheio.md).

4.  Start your Alfresco server to apply the changes.


**Parent topic:**[Configuring shared content workspaces for Media Management](../concepts/mm-config-shared-workspace.md)

