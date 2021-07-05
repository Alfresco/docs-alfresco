---
author: Alfresco Documentation
audience: 
---

# Content services node architecture

Media Management provides a content services node infrastructure to process your transformations. You can create content services nodes remotely to offload low level transformations.

You can have multiple content services nodes running on the same server, ideally separate from your Alfresco server, however configuring a single content services node on a single server \(with servers scaled as required\) provides the optimum framework for multiple parallel transformations.

The four main architectural areas are:

-   **Client Application \(Alfresco repository\)**: Task messages are generated and sent from the Alfresco repository, containing a reference to the source content \(Source ContentReference\) and other options. The options specified depend on the task; for example, a target reference or media type. The content reference needs to be in a format that the task nodes can handle; for example, a file on a shared disk, an S3 path, or a CMIS document ID. The source and target content is stored in a content workspace. Supported formats are shared file or Amazon S3 storage.
-   **Message Routing \(ActiveMQ\)**: A message routing system, for example; ActiveMQ, then directs the request to the appropriate queue for consumption by processing nodes. When you view the ActiveMQ queues in the web console \(http://localhost:8161/admin\), there are separate queues for image transform requests, image transform responses, video transform requests and video transform responses.
-   **Transform Component**: A component listens for messages on a queue and calls on ImageMagick or FFmpeg workers to perform the task specified by the source content reference. The component can optionally send a reply that is consumed by the original requestor or another party.
-   **Task Node**: Task nodes bootstrap one or more components.

![1) Task message sent from Alfresco repository to Source content on shared content workspace. 2) Image transformation request sent from Alfresco repository to ActiveMQ (message routing). 3) Transform request sent from ActiveMQ to transform component on Task node. 4) Source content on shared content workspace sends request to SourceContentReferenceHandler in ImageMagick worker (in Transform Component.) 5) TargetContentReferenceHandler in ImageMagick worker (in Transform Component) sends response to Target content on Shared content workspace. 6) Transformation reply sent from Transform Component to MessageProducer and on to ActiveMQ. 7) Image Transformation Response (POJO) sent to Alfresco repository. 8) Target content sent to Alfresco repository.](../images/mm_gytheio.png)

For more information on launching a content services node, see [Starting Media Management](../tasks/mm-start.md).

For more information on advanced ActiveMQ settings, see [Configuring advanced settings in ActiveMQ](http://docs.alfresco.com/5.1/concepts/activemq-config.html).

**Parent topic:**[Media Management architecture](../concepts/mm-architecture.md)

