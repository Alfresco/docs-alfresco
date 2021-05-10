---
author: Alfresco Documentation
audience: 
---

# Configuring transformation services for Media Management

This information helps you to configure Alfresco to communicate with Brightcove Zencoder and AWS Elastic Transcoder. These transformation services are often configured for cloud deployments or very large resource intensive on-premise deployments.

Edit your alfresco-global.properties file to turn off content service node transformations for certain file \(MIME\) types; for example, video to video, video to audio and image to image:

```
content.transformer.RemoteVideo.mimetypes.video/*.video/*.supported=false
content.transformer.RemoteVideo.mimetypes.video/*.audio/*.supported=false
content.transformer.RemoteImage.mimetypes.image/*.image/*.supported=false

```

See [Configuring Media Management](../tasks/mm-props-config.md) for more information on different transformation options.

**Important:** Video transformation \(transcoding\) is very resource intensive and can take a long time to complete. Make sure that any rules that you configure using video transcoding run in the background, to prevent the rule from failing due to a Share timeout. For more information about creating rules, see [Creating a rule](http://docs.alfresco.com/5.1/tasks/library-folder-rules-define-create.html).

-   **[Configuring the Zencoder content transformer](../tasks/mm-config-zencoder.md)**  
Brightcove Zencoder is supported for remote video transcoding with Amazon S3. If you are using this transformer, configure your connection using alfresco-global.properties.
-   **[Configuring the Elastic Transcoder content transformer](../tasks/mm-config-elastic.md)**  
Amazon Web Services \(AWS\) Elastic Transcoder is supported for remote video transcoding with Amazon S3. If you are using this transformer, configure your connection using alfresco-global.properties.

**Parent topic:**[Configuring Media Management](../tasks/mm-props-config.md)

