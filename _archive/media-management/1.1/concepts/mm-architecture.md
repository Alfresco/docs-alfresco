---
author: Alfresco Documentation
audience: 
---

# Media Management architecture

Media Management provides a framework for transforming and sharing content, ideally using a remote server to ensure that the Alfresco server is not overloaded.

A video transformer is provided when you install Media Management to locally transform your content, however using this instance can be resource intensive and slow down your repository. You can create one or more content services nodes to offload work, or you can use remote transformation services, like Brightcove Zencoder or Amazon Elastic Transcoder to transform your content. The configuration file for the content services node, config.yml, contains the location of ActiveMQ and the shared content workspace. The shared content workspace is a temporary workspace, used by the content services node to read source files and write to target files. See [Content services node architecture](mm-gytheio.md) for information about the content services nodes and [Configuring transformation services for Media Management](mm-config-remote.md) for information about transformation services.

**Note:** Ensure that your remote server and your Alfresco server are using Network Time Protocol \(NTP\). If your servers are not synchronized, work is not sent to the remote content services nodes, and jobs are processed on the local Alfresco server.

If you are using a remote content services node, Media Management components should be started in the following order:

1.  ActiveMQ
2.  Content services node
3.  Alfresco repository
4.  Alfresco Share

FFmpeg and ImageMagick from the command line are required on any server where a content services node is running to transform content. FFmpeg, ImageMagick and ExifTool are required on the Alfresco server to view media in Share. ExifTool is used for metadata handling in the repository only.

ActiveMQ monitors for events and we recommend that you install it on the Alfresco server if you have other components that use ActiveMQ. If you are using ActiveMQ solely for Media Management, you might prefer to install ActiveMQ on the content services node server, but ensure that it resides on one server only. See [Installing Media Management](../tasks/mm-install.md) for more information about installing ActiveMQ.

Using the alfresco-global.properties file you can define properties for the FFmpeg path, ExifTool path, ActiveMQ broker URL, shared content workspace type, Zencoder and AWS Elastic Transcoder credentials, and other properties. See [Configuring Media Management](../tasks/mm-props-config.md) for more information on alfresco-global.properties settings.

You can publish your content from the repository to Brightcove or CloudFront publishing channels. See [Configuring publishing channels for Media Management](mm-config-publish-channels.md) for more information.

The diagram shows the relationship between the Alfresco server and the content services node server. Alfresco can connect to a transformation service \(Zencoder or Amazon Elastic Transcoder\), a publishing channel \(Brightcove or CloudFront\), and a shared content workspace \(a file system or Amazon S3\). The content services node can connect to the shared content workspace and the transformation service that you defined in the alfresco-global.properties file.

**Important:** Ensure that you review the security of the following connections:

-   Alfresco server to server \(or servers\) where remote content services nodes are installed
-   Alfresco server to the shared content workspace
-   Remote content services node \(or nodes\) to the shared content workspace

Ensure that only the repository and the content services nodes have access to the shared content workspace, because temporary copies of the content binary files \(for both file and S3 types\) are stored in the workspace.

![The diagram shows the relationship between the Alfresco server and the content services node server. Alfresco can connect to a transformation service (Zencoder or Amazon Elastic Transcoder), a publishing channel (Brightcove or CloudFront), and a shared content workspace (a file system or Amazon S3). The content services node can connect to the shared content workspace and the transformation service that you defined in the Alfresco server alfresco-global.properties file.](../images/mm_architecture.png)

For information on monitoring the components of the architecture, see [Monitoring Media Management](../tasks/mm-events.md).

-   **[Content services node architecture](../concepts/mm-gytheio.md)**  
Media Management provides a content services node infrastructure to process your transformations. You can create content services nodes remotely to offload low level transformations.

**Parent topic:**[Installing and configuring Media Management](../concepts/mm-install-overview.md)

