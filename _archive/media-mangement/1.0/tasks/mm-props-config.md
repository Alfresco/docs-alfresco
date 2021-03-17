---
author: Alfresco Documentation
audience: 
---

# Configuring Media Management

You can configure Media Management using the alfresco-global.properties file or by using a JMX client such as JConsole.

1.  Open the alfresco-global.properties file and add the required properties to the file.

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines properties for the FFmpeg path, ExifTool path, ActiveMQ broker URL, shared content workspace type, Zencoder and AWS Elastic Transcoder credentials, custom metadata extraction properties, video thumbnail settings, and video proxy timeout settings.

2.  Save the alfresco-global.properties file, and then restart your Alfresco server.

    The following table shows an overview of the available properties:

    |Property|Description|
    |--------|-----------|
    |`ffmpeg.exe=`|Sets the FFmpeg executable path. Default is ffmpeg. Remember to use the forward slash \(/\) in your path if you are using Unix, and back slash \(\\\) if you are using Windows.|
    |`exiftool.exe=`|Sets the ExifTool executable path. Default is exiftool. Remember to use the forward slash \(/\) in your path if you are using Unix, and back slash \(\\\) if you are using Windows.|
    |`messaging.broker.url=failover: (tcp://broker1:61616,tcp://broker2:61616)`|Sets the host name and port of the ActiveMQ instance. Default is localhost|
    |`content.remote.default.contentRefHandler. source.type=`|Sets the shared content workspace for source. Type can be file or s3|
    |`content.remote.default.contentRefHandler. source.file.dir=`|If you are using a file type for the shared content workspace, specify the file directory.|
    |`content.remote.default.contentRefHandler. source.s3.bucketName=`|If you are using S3 for the shared content workspace, specify the S3 bucket.|
    |`content.remote.default.contentRefHandler. target.s3.bucketRegion=`|If you are using S3 for the shared content workspace, specify the S3 bucket region.|
    |`content.remote.default.contentRefHandler. target.s3.accessKey=`|If you are using S3 for the shared content workspace, specify the S3 access key.|
    |`content.remote.default.contentRefHandler. target.s3.secretKey=`|If you are using S3 for the shared content workspace, specify the S3 secret key.|
    |`content.transformer.Zencoder.s3.accessKey=`|If you are using the Zencoder content transformer, specify the S3 access key.|
    |`content.transformer.Zencoder.s3.secretKey=`|If you are using the Zencoder content transformer, specify the S3 secret key.|
    |`content.transformer.Zencoder.s3.bucketName=`|If you are using the Zencoder content transformer, specify the S3 bucket.|
    |`content.transformer.Zencoder.s3.bucketRegion=`|If you are using the Zencoder content transformer, specify the S3 bucket region. Default is `us-east-1`|
    |`content.transformer.Zencoder.apiKey=`|If you are using the Zencoder content transformer, specify the Zencoder API key.|
    |`content.transformer.AwsElasticTranscoder. s3.accessKey=`|If you are using the AWS Elastic Transcoder content transformer, specify the S3 access key.|
    |`content.transformer.AwsElasticTranscoder. s3.secretKey=`|If you are using the AWS Elastic Transcoder content transformer, specify the S3 secret key.|
    |`content.transformer.AwsElasticTranscoder. s3.bucketName=`|If you are using the AWS Elastic Transcoder content transformer, specify the S3 bucket.|
    |`content.transformer.AwsElasticTranscoder. s3.bucketRegion=`|If you are using the AWS Elastic Transcoder content transformer, specify the S3 bucket region. Default is `us-east-1`|
    |`content.transformer.AwsElasticTranscoder. transcoder.accessKey=`|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder access key.|
    |`content.transformer.AwsElasticTranscoder. transcoder.secretKey=`|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder secret key.|
    |`content.transformer.AwsElasticTranscoder. transcoder.pipelineId=`|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder pipeline identifier.|
    |`content.transformer.AwsElasticTranscoder. transcoder.region`|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder region. Default is `us-east-1`|
    |`content.transformer.AwsElasticTranscoder. transcoder.defaultPreset.video/mp4=`|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder preset for video and MP4. Default is `1351620000001-000010`|
    |`metadata.extracter.TikaExifTool.extract. namespace.prefix.custom=`|URL used by external applications to read XMP custom metadata. Example entry is `http://example.com/model/custom/1.0`|
    |`metadata.extracter.TikaExifTool.extract. XMP-custom\:Text=`|Type of field for extraction of single lines of XMP custom metadata. Example value is `custom:text`|
    |`metadata.extracter.TikaExifTool.extract. XMP-custom\:TextML[]=`|Type of field for extraction of multiple lines of XMP custom metadata. Example value is `custom:textMultiLine`|
    |`content.metadataExtracter.default. timeoutMs=`|Maximum time for extracting content metadata to complete. Default is 60000 milliseconds \(60 seconds\).|
    |`video.thumbnail.defaultOffset=`|The offset time before creating a video thumbnail. Default is `00:00:00.5`.|
    |`video.thumbnail.storyboardIntervalSeconds=`|Time interval between video thumbnails. Default is 2 seconds.|
    |`video.thumbnail.storyboardMaxElements=`|Maximum number of video thumbnails. Default is 30 elements.|
    |`system.videoProxy.definition.default. timeoutMs=`|Maximum time for a video proxy to complete. Parameter is used by the `h264-720` proxy. Default is 64800000 milliseconds \(18 hours\).|

    You can also set where you want each of your transformations to take place; locally, with the remote content services node, or with a remote transformer like Elastic Transcoder or Zencoder, and in what order the transformations should be attempted. The default settings are appropriate for most configurations.

    The full list of remote properties, with their default values, that you can override in your alfresco-global.properties file is as follows:

    ```
    # mimetypes ffmpeg can be made to support, but support not present in many environments
    content.transformer.Ffmpeg.extensions.3gp.*.supported=false
    content.transformer.Ffmpeg.extensions.3g2.*.supported=false
    content.transformer.Ffmpeg.extensions.*.3gp.supported=false
    content.transformer.Ffmpeg.extensions.*.3g2.supported=false
    
    content.transformer.Ffmpeg.extensions.*.gif.supported=false
    content.transformer.Ffmpeg.extensions.*.jp2.supported=false
    content.transformer.Ffmpeg.extensions.*.ras.supported=false
    content.transformer.Ffmpeg.extensions.*.xbm.supported=false
    content.transformer.Ffmpeg.extensions.*.xwd.supported=false
    
    # conversions ffmpeg can support, but don't make much sense in most cases
    content.transformer.Ffmpeg.mimetypes.audio/*.video/*.supported=false
    
    # Grabbing thumbnail frames isn't resource intensive so perform locally
    content.transformer.Ffmpeg.mimetypes.video/*.image/*.priority=50
    content.transformer.Ffmpeg.mimetypes.application/mxf.video/*.supported=false
    content.transformer.Ffmpeg.mimetypes.application/mxf.image/*.supported=false
    
    # Remote transcoding should be preferred if available
    content.transformer.Ffmpeg.mimetypes.video/*.video/*.priority=150
    
    # Content service node settings 
    content.transformer.RemoteVideo.mimetypes.video/*.video/*.supported=true
    content.transformer.RemoteVideo.mimetypes.video/*.image/*.supported=true
    content.transformer.RemoteVideo.mimetypes.video/*.audio/*.supported=true
    content.transformer.RemoteVideo.mimetypes.video/*.application/*.supported=false
    content.transformer.RemoteVideo.mimetypes.video/*.text/*.supported=false
    content.transformer.RemoteVideo.mimetypes.application/*.*.supported=false
    content.transformer.RemoteVideo.mimetypes.application/mxf.video/*.supported=false
    content.transformer.RemoteVideo.mimetypes.application/mxf.image/*.supported=false
    content.transformer.RemoteVideo.mimetypes.image/*.*.supported=false
    content.transformer.RemoteVideo.mimetypes.text/*.*.supported=false
    content.transformer.RemoteImage.mimetypes.image/*.image/*.supported=true
    content.transformer.RemoteImage.mimetypes.application/pdf.image/*.supported=true
    
    # Conversions ffmpeg can support, but don't make much sense in most cases
    content.transformer.RemoteVideo.mimetypes.audio/*.video/*.supported=false
    
    # Only send resource intensive transcoding remote
    content.transformer.RemoteVideo.mimetypes.video/*.video/*.priority=50
    content.transformer.RemoteVideo.mimetypes.video/*.image/*.priority=150
    content.transformer.RemoteVideo.mimetypes.application/mxf.video/*.priority=100
    
    # Only send resource intensive RAW conversion remote
    content.transformer.RemoteImage.mimetypes.image/x-raw-*.image/*.priority=50
    content.transformer.RemoteImage.mimetypes.image/jpeg.image/*.priority=150
    content.transformer.RemoteImage.mimetypes.image/png.image/*.priority=150
    content.transformer.RemoteImage.mimetypes.image/gif.image/*.priority=150
    content.transformer.RemoteImage.mimetypes.image/bmp.image/*.priority=150
    
    # AWS Elastic Transcoder
    content.transformer.AwsElasticTranscoder.mimetypes.video/*.video/mp4.priority=110
    
    # Brightcove Zencoder
    content.transformer.Zencoder.mimetypes.video/*.video/*.priority=100
    ```

    The priority settings define which type of transformation will be tried first. The lower the number, the higher the priority. For example, if the default settings are used, video to video transcoding would have these settings:

    ```
    content.transformer.RemoteVideo.mimetypes.video/*.video/*.priority=50
    content.transformer.Zencoder.mimetypes.video/*.video/*.priority=100
    content.transformer.AwsElasticTranscoder.mimetypes.video/*.video/mp4.priority=110
    content.transformer.Ffmpeg.mimetypes.video/*.video/*.priority=150
    ```

    The content services node is tried first, as it has the highest priority with a value of `50`. Zencoder would be tried next, and Elastic Transcoder would be tried third. If any of the transformer types is not configured, or there is a problem, the video to video transcoding would fall back to the local FFmpeg transformer, which is set with the lowest priority as `content.transformer.Ffmpeg.mimetypes.video/*.video/*.priority=150`.

    You can set these variables in your alfresco-global.properties file, or dynamically when Alfresco is running, using a JMX client. If you set values in both places, the JMX client overrides the alfresco-global.properties value, but not the alfresco-global.properties file itself. The values are in the **Alfresco:Type=Configuration, Category=Transformers** MBean. See [JMX beans for Media Management](../concepts/mm-jmx-beans.md) for more information about Media Management JMX beans.

    **Note:** You can use a wildcard \(\*\) in the settings. However, more specific mimetype or extension configurations take precedence over wildcard configurations, regardless of the order specified.

3.  Use the log4j.properties.sample file to add loggers to your tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org\_alfresco\_mm\_repo/log4j.properties file.

    A log4j.properties.sample file is provided in the Media Management installation zip.

    See [Runtime administration with a JMX client](http://docs.alfresco.com/5.2/concepts/jmx-intro-config.html) for instructions on how to connect a JMX client to your Alfresco server.


-   **[Configuring shared content workspaces for Media Management](../concepts/mm-config-shared-workspace.md)**  
You can configure Alfresco to use Amazon S3 or file directories for sharing content.
-   **[Configuring transformation services for Media Management](../concepts/mm-config-remote.md)**  
This information helps you to configure Alfresco to communicate with Brightcove Zencoder and AWS Elastic Transcoder. These transformation services are often configured for cloud deployments or very large resource intensive on-premise deployments.
-   **[Configuring publishing channels for Media Management](../concepts/mm-config-publish-channels.md)**  
You can configure Alfresco to use Brightcove and AWS CloudFront publishing channels to make content available outside your organization.
-   **[Configuring custom XMP metadata extraction](../tasks/mm-config-metadata.md)**  
You can map custom XMP \(Extensible Metadata Platform\) metadata fields to custom Alfresco data model properties using alfresco-global.properties.
-   **[Configuring storyboard thumbnails for Media Management](../tasks/mm-config-thumbnails.md)**  
Use this information to configure storyboard thumbnails for video.
-   **[Setting up a new proxy for Media Management](../tasks/mm-config-proxy.md)**  
Use this information to configure an new proxy rendition.

**Parent topic:**[Installing and configuring Media Management](../concepts/mm-install-overview.md)

