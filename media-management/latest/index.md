---
title: Alfresco Media Management
---

Alfresco Media Management provides the capability to transform and add metadata and relationships to your digital media.

Digital media in enterprises is becoming a core content type, from sharing video and images internally, for marketing requirements, and publishing externally. The ability to manipulate, find and store digital media is extremely important. Digital assets do not lend themselves to traditional text-based searching, so providing the ability to add informational metadata for file retrieval is key. Digital assets can be large and might also be located in silos across an enterprise and it is crucial to centrally store, re-use and share these assets to provide value and collaboration within the organization.

Media Management provides many user interface enhancements for rich media handling, including video timeline comments and thumbnails, video trimming, and image manipulation.

Media Management enables you to optimize the delivery of media to different devices in a more resource effective way.

> **Note:** Alfresco Media Management 1.4 can be applied to Alfresco Content Services 6.2 only.

With Media Management you have flexibility when transforming your content, either on-premise with content transformation nodes that use FFmpeg and ImageMagick, or remotely through Amazon Web Services (AWS) Elastic Transcoder content transformer.

The AWS CloudFront publishing channel is supported to make content available outside your organization.

International Press Telecommunications Council (IPTC) standards support is provided with Media Management to add metadata and relationships to your content, including:

* Full IPTC data model support
* Full IPTC metadata extraction (both core and extension metadata)
* Mapping of IPTC keywords to standard tags
* IPTC metadata embedding

You can also add and extract your own custom XMP metadata, and set up rules to process your digital assets.

For more information on IPTC, see [http://www.iptc.org/site/Home/](http://www.iptc.org/site/Home/){:target="_blank"}.

For more information about FFmpeg, see [http://ffmpeg.org](http://ffmpeg.org){:target="_blank"}.

For more information about ImageMagick, see [https://imagemagick.org/index.php](http://www.imagemagick.org/){:target="_blank"}.

For more information about installing Media Management, see [Installing Media Management]({% link media-management/latest/install/index.md %}).

## Media Management architecture

Media Management provides a framework for transforming and sharing content, ideally using a remote server to ensure that the Alfresco Content Services server is not overloaded.

A video transformer is provided when you install Media Management to locally transform your content, however using this instance can be resource intensive and slow down your repository. You can create one or more content services nodes to offload work, or you can use remote transformation services, like Amazon Elastic Transcoder to transform your content. The configuration file for the content services node, config.yml, contains the location of ActiveMQ and the shared content workspace. The shared content workspace is a temporary workspace, used by the content services node to read source files and write to target files. See [Content services node architecture](#content-services-node-architecture) for information about the content services nodes and [Configuring transformation services]({% link media-management/latest/config/index.md %}#configuring-transformation-services) for information about transformation services.

> **Note:** Ensure that your remote server and your Content Services server are using Network Time Protocol (NTP). If your servers are not synchronized, work is not sent to the remote content services nodes, and jobs are processed on the local Content Services server.

If you are using a remote content services node, Media Management components should be started in the following order:

1. ActiveMQ
2. Content services node
3. Alfresco repository
4. Alfresco Share

FFmpeg and ImageMagick from the command line are required on any server where a content services node is running to transform content. FFmpeg, ImageMagick and ExifTool are required on the Alfresco server to view media in Share. ExifTool is used for metadata handling in the repository only.

ActiveMQ monitors for events and we recommend that you install it on the Alfresco server if you have other components that use ActiveMQ. If you are using ActiveMQ solely for Media Management, you might prefer to install ActiveMQ on the content services node server, but ensure that it resides on one server only.

Using the `alfresco-global.properties` file you can define properties for the FFmpeg path, ExifTool path, ActiveMQ broker URL, shared content workspace type, Zencoder and AWS Elastic Transcoder credentials, and other properties. See [Configure Media Management]({% link media-management/latest/config/index.md %}) for more information on `alfresco-global.properties` settings.

You can publish your content from the repository to the CloudFront publishing channel. See [Configuring a CloudFront publishing channel]({% link media-management/latest/config/index.md %}#configuring-a-cloudfront-publishing-channel) for more information.

The diagram shows the relationship between the Alfresco server and the content services node server. Alfresco can connect to a transformation service (Amazon Elastic Transcoder), a publishing channel (CloudFront), and a shared content workspace (a file system or Amazon S3). The content services node can connect to the shared content workspace and the transformation service that you defined in the `alfresco-global.properties` file.

> **Note:** Ensure that you review the security of the following connections:

* Alfresco server to server (or servers) where remote content services nodes are installed
* Alfresco server to the shared content workspace
* Remote content services node (or nodes) to the shared content workspace

Ensure that only the repository and the content services nodes have access to the shared content workspace, because temporary copies of the content binary files (for both file and S3 types) are stored in the workspace.

![Architecture]({% link media-management/images/architecture.png %})

The diagram shows the relationship between the Alfresco server and the content services node server. Alfresco can connect to a transformation service (Amazon Elastic Transcoder), a publishing channel (CloudFront), and a shared content workspace (a file system or Amazon S3). The content services node can connect to the shared content workspace and the transformation service that you defined in the Alfresco server `alfresco-global.properties` file.

For information on monitoring the components of the architecture, see [Monitoring Media Management]({% link media-management/latest/admin/index.md %}#monitoring-media-management).

## Content services node architecture

Media Management provides a content services node infrastructure to process your transformations. You can create content services nodes remotely to offload low level transformations.

You can have multiple content services nodes running on the same server, ideally separate from your Alfresco server, however configuring a single content services node on a single server (with servers scaled as required) provides the optimum framework for multiple parallel transformations.

The four main architectural areas are:

* **Client Application (Alfresco repository)**: Task messages are generated and sent from the Alfresco repository, containing a reference to the source content (Source ContentReference) and other options. The options specified depend on the task, for example, a target reference or media type. The content reference needs to be in a format that the task nodes can handle, for example, a file on a shared disk, an S3 path, or a CMIS document ID. The source and target content is stored in a content workspace. Supported formats are shared file or Amazon S3 storage.
* **Message Routing (ActiveMQ)**: A message routing system, for example, ActiveMQ, then directs the request to the appropriate queue for consumption by processing nodes. When you view the ActiveMQ queues in the web console (`http://localhost:8161/admin`), there are separate queues for image transform requests, image transform responses, video transform requests and video transform responses.
* **Transform Component**: A component listens for messages on a queue and calls on ImageMagick or FFmpeg workers to perform the task specified by the source content reference. The component can optionally send a reply that is consumed by the original requestor or another party.
* **Task Node**: Task nodes bootstrap one or more components.

![Content Services Node architecture]({% link media-management/images/gytheio.png %})

1. Task message sent from Alfresco repository to Source content on shared content workspace.
2. Image transformation request sent from Alfresco repository to ActiveMQ (message routing).
3. Transform request sent from ActiveMQ to transform component on Task node.
4. Source content on shared content workspace sends request to SourceContentReferenceHandler in ImageMagick worker (in Transform Component.)
5. TargetContentReferenceHandler in ImageMagick worker (in Transform Component) sends response to Target content on Shared content workspace.
6. Transformation reply sent from Transform Component to MessageProducer and on to ActiveMQ.
7. Image Transformation Response (POJO) sent to Alfresco repository.
8. Target content sent to Alfresco repository.

For more information on launching a content services node, see [Start Media Management]({% link media-management/latest/config/start.md %}).

For more information on advanced ActiveMQ settings, see [Configuring advanced settings in ActiveMQ]({% link content-services/latest/config/activemq.md %}#advanced).
