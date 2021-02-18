---
title: Configure Media Management
---

You can configure Media Management using the alfresco-global.properties file or by using a JMX client such as JConsole.

1. Open the `alfresco-global.properties` file and add the required properties to the file.

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines properties for the FFmpeg path, ExifTool path, ActiveMQ broker URL, shared content workspace type, and AWS Elastic Transcoder credentials, custom metadata extraction properties, video thumbnail settings, and video proxy timeout settings.

2. Save the `alfresco-global.properties` file, and then restart your Alfresco server.

    The following table shows an overview of the available properties:

    |Property|Description|
    |--------|-----------|
    |ffmpeg.exe=|Sets the FFmpeg executable path. Default is ffmpeg. Remember to use the forward slash (/) in your path if you are using Unix, and back slash (\) if you are using Windows.|
    |exiftool.exe=|Sets the ExifTool executable path. Default is exiftool. Remember to use the forward slash (/) in your path if you are using Unix, and back slash (\) if you are using Windows.|
    |messaging.broker.url=failover: (tcp://broker1:61616,tcp://broker2:61616)|Sets the host name and port of the ActiveMQ instance. Default is localhost|
    |content.remote.default.contentRefHandler. source.type=|Sets the shared content workspace for source. Type can be file or s3|
    |content.remote.default.contentRefHandler. source.file.dir=|If you are using a file type for the shared content workspace, specify the file directory.|
    |content.remote.default.contentRefHandler. source.s3.bucketName=|If you are using S3 for the shared content workspace, specify the S3 bucket.|
    |content.remote.default.contentRefHandler. target.s3.bucketRegion=|If you are using S3 for the shared content workspace, specify the S3 bucket region.|
    |content.remote.default.contentRefHandler. target.s3.accessKey=|If you are using S3 for the shared content workspace, specify the S3 access key.|
    |content.remote.default.contentRefHandler. target.s3.secretKey=|If you are using S3 for the shared content workspace, specify the S3 secret key.|
    |content.transformer.AwsElasticTranscoder. s3.accessKey=|If you are using the AWS Elastic Transcoder content transformer, specify the S3 access key.|
    |content.transformer.AwsElasticTranscoder. s3.secretKey=|If you are using the AWS Elastic Transcoder content transformer, specify the S3 secret key.|
    |content.transformer.AwsElasticTranscoder. s3.bucketName=|If you are using the AWS Elastic Transcoder content transformer, specify the S3 bucket.|
    |content.transformer.AwsElasticTranscoder. s3.bucketRegion=|If you are using the AWS Elastic Transcoder content transformer, specify the S3 bucket region. Default is `us-east-1`|
    |content.transformer.AwsElasticTranscoder. transcoder.accessKey=|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder access key.|
    |content.transformer.AwsElasticTranscoder. transcoder.secretKey=|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder secret key.|
    |content.transformer.AwsElasticTranscoder. transcoder.pipelineId=|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder pipeline identifier.|
    |content.transformer.AwsElasticTranscoder. transcoder.region|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder region. Default is `us-east-1`|
    |content.transformer.AwsElasticTranscoder. transcoder.defaultPreset.video/mp4=|If you are using the AWS Elastic Transcoder content transformer, specify the transcoder preset for video and MP4. Default is `1351620000001-000010`|
    |metadata.extracter.TikaExifTool.extract. namespace.prefix.custom=|URL used by external applications to read XMP custom metadata. Example entry is `http://example.com/model/custom/1.0`|
    |metadata.extracter.TikaExifTool.extract. XMP-custom\:Text=|Type of field for extraction of single lines of XMP custom metadata. Example value is `custom:text`|
    |metadata.extracter.TikaExifTool.extract. XMP-custom\:TextML[]=|Type of field for extraction of multiple lines of XMP custom metadata. Example value is `custom:textMultiLine`|
    |content.metadataExtracter.default. timeoutMs=|Maximum time for extracting content metadata to complete. Default is 60000 milliseconds \(60 seconds\).|
    |video.thumbnail.defaultOffset=|The offset time before creating a video thumbnail. Default is `00:00:00.5`.|
    |video.thumbnail.storyboardIntervalSeconds=|Time interval between video thumbnails. Default is 2 seconds.|
    |video.thumbnail.storyboardMaxElements=|Maximum number of video thumbnails. Default is 30 elements.|
    |system.videoProxy.definition.default. timeoutMs=|Maximum time for a video proxy to complete. Parameter is used by the `h264-720` proxy. Default is 64800000 milliseconds (18 hours).|

    You can also set where you want each of your transformations to take place: locally, with the remote content services node, or with a remote transformer like Elastic Transcoder, and in what order the transformations should be attempted. The default settings are appropriate for most configurations.

    The full list of remote properties, with their default values, that you can override in your `alfresco-global.properties` file is as follows:

    ```bash
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
    ```

    The priority settings define which type of transformation will be tried first. The lower the number, the higher the priority. For example, if the default settings are used, video to video transcoding would have these settings:

    ```bash
    content.transformer.RemoteVideo.mimetypes.video/*.video/*.priority=50
    content.transformer.AwsElasticTranscoder.mimetypes.video/*.video/mp4.priority=110
    content.transformer.Ffmpeg.mimetypes.video/*.video/*.priority=150
    ```

    The content services node is tried first, as it has the highest priority with a value of `50`. Elastic Transcoder would be tried next. If any of the transformer types is not configured, or there is a problem, the video to video transcoding would fall back to the local FFmpeg transformer, which is set with the lowest priority as `content.transformer.Ffmpeg.mimetypes.video/*.video/*.priority=150`.

    You can set these variables in your `alfresco-global.properties` file, or dynamically when Alfresco is running, using a JMX client. If you set values in both places, the JMX client overrides the `alfresco-global.properties` value, but not the `alfresco-global.properties` file itself. The values are in the **Alfresco:Type=Configuration, Category=Transformers** MBean.
    See [JMX beans for Media Management]({% link media-management/1.3/admin/jmxbeans.md %}) for more information about Media Management JMX beans.

   > **Note:** You can use a wildcard (*) in the settings. However, more specific mimetype or extension configurations take precedence over wildcard configurations, regardless of the order specified.

3. Use the `log4j.properties.sample` file to add loggers to your `tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org_alfresco_mm_repo/log4j.properties` file.

    A `log4j.properties.sample` file is provided in the Media Management installation zip.

    See [Runtime administration with a JMX client]({% link content-services/6.1/config/index.md %}#using-jmx-client-to-change-settings-dynamically) for instructions on how to connect a JMX client to your Alfresco server.

## Configuring a shared file content workspace

You can configure Alfresco to use Amazon S3 or file directories for sharing content.

Configure a directory as a shared content workspace using `alfresco-global.properties`.

Ensure that you have installed the required external and internal software. See [Prerequisites for using Media Management]({% link media-management/1.3/install/index.md %})

1. Stop the Alfresco server.

2. Edit your `alfresco-global.properties` file to specify your source and target content workspace type, and the location of your source and target directories, for example:

    ```bash
    content.remote.default.contentRefHandler.source.type=file
    content.remote.default.contentRefHandler.source.file.dir=
    content.remote.default.contentRefHandler.target.type=file
    content.remote.default.contentRefHandler.target.file.dir=
    ```

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines custom properties.

3. Update your `remote-node/config.yml` file that you extracted from the Media Management distribution zip with your shared content workspace properties:

    ```yaml
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

    You can use the same mounted network volume directory (for example, NFS) for both the Content Services repository (configured using `content.remote.default.contentRefHandler.* properties`) and the remote node.

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable or are specified in `alfresco-global.properties`.

    For more information about the content services framework, see [Content services node architecture]({% link media-management/1.3/index.md %}).

4. Start your Content Services server to apply the changes.

## Configuring an Amazon S3 shared content workspace

Amazon S3 can be configured as a shared content workspace using `alfresco-global.properties`.

Ensure that you have installed the required external and internal software. See [Prerequisites for using Media Management]({% link media-management/1.3/install/index.md %}) for more information. Make sure you have your Amazon S3 account set up.

1. Stop the Alfresco server.

2. Edit your `alfresco-global.properties` file to specify your source and target content workspace type, source and target S3 keys, and S3 bucket information, for example:

    ```bash
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

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines custom properties.

    You can find your S3 details in your AWS S3 settings.

3. Update your `remote-node/config.yml` file that you extracted from the Media Management distribution zip with your shared content workspace properties:

    ```yaml
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

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable or are specified in `alfresco-global.properties`.

    For more information about the content services framework, see [Content services node architecture]({% link media-management/1.3/index.md %}).

4. Start your Content Services server to apply the changes.

## Configuring transformation services

This information helps you to configure Alfresco to communicate with AWS Elastic Transcoder. This transformation service is often configured for cloud deployments or very large resource intensive on-premise deployments.

Edit the `alfresco-global.properties` file to turn off content service node transformations for certain file (MIME) types, for example, video to video, video to audio, and image to image:

```bash
content.transformer.RemoteVideo.mimetypes.video/*.video/*.supported=false
content.transformer.RemoteVideo.mimetypes.video/*.audio/*.supported=false
content.transformer.RemoteImage.mimetypes.image/*.image/*.supported=false

```

> **Note:** Video transformation (transcoding) is very resource intensive and can take a long time to complete. Make sure that any rules that you configure using video transcoding run in the background, to prevent the rule from failing due to a Share timeout. For more information about creating rules, see [Creating a rule]({% link content-services/6.1/using/content/rules.md %}).

## Configuring the Elastic Transcoder content transformer

Amazon Web Services (AWS) Elastic Transcoder is supported for remote video transcoding with Amazon S3. If you are using this transformer, configure your connection using `alfresco-global.properties`.

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management]({% link media-management/1.3/install/index.md %}) for more information. Make sure you have your Elastic Transcoder and S3 accounts set up.

1. Stop the Alfresco server.

2. Edit your `alfresco-global.properties` file to specify your Elastic Transcoder S3 access key, S3 keys, S3 bucket, and Elastic Transcoder information, for example:

    ```bash
    content.transformer.AwsElasticTranscoder.s3.accessKey=**MY-S3-ACCESS-KEY**
    content.transformer.AwsElasticTranscoder.s3.secretKey=**MY-S3-SECRET-KEY**
    content.transformer.AwsElasticTranscoder.s3.bucketName=**MY-S3-BUCKET-NAME**
    content.transformer.AwsElasticTranscoder.s3.bucketLocation=EU
    # Access and secret keys below can be the same as above
    content.transformer.AwsElasticTranscoder.transcoder.accessKey=**MY-TRANSCODE-ACCESS-KEY**
    content.transformer.AwsElasticTranscoder.transcoder.secretKey=**MY-TRANSCODE-SECRET-KEY**
    content.transformer.AwsElasticTranscoder.transcoder.pipelineId=**MY-PIPELINE-ID**
    content.transformer.AwsElasticTranscoder.transcoder.region=EU_WEST_1
    content.transformer.AwsElasticTranscoder.transcoder.defaultPreset.video/mp4=1351620000001-000010
    ```

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines custom properties.

    > **Note:** Elastic Transcoder provides the following support only:

    * `mp4` container
    * `H.264` video
    * `AAC` audio
    Each job must be submitted to a configured preset, which means that Elastic Transcoder handles `TransformationOptions` of type `AwsElasticTranscoderTransformationOptions with a valid awsTranscodePresetId` only. Additionally, Elastic Transcoder does not report percentage progress on jobs.

    For more information on using Amazon Elastic Transcoder with S3, see [Getting started with Elastic Transcoder](http://docs.aws.amazon.com/elastictranscoder/latest/developerguide/getting-started.html){:target="_blank"}.

3. Start your Alfresco server to apply the changes.

## Configuring a CloudFront publishing channel

You can configure Content Services to use the AWS CloudFront publishing channel to make content available outside your organization.

Configure a publishing channel to allow you upload and manipulate content in the Amazon CloudFront Content Delivery Network (CDN).

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management]({% link media-management/1.3/install/index.md %}) for more information. Make sure you have your Amazon S3 account set up.

1. Start Alfresco Share and click Admin Tools from the toolbar, and Content Publishing > Channel Manager.

    The Channel Manager section lists the channels that are configured for users to publish media.

2. Click New and the CloudFront channel type.

    A Channel Authentication screen is displayed.

3. Enter your AWS credentials in the User Name and Password fields.

    Use your S3 access key in the User Name field, and your S3 secret key in the Password field.

    A new channel is created.

4. You can edit the user groups and permissions (using the Permissions option), or reauthorize with new credentials or delete the channel.

    Additionally, if you click the icon for the channel you created, an Edit Channel window appears. From this window you can perform these actions:

    * Edit the name of the channel
    * S3 Bucket Name: define the Amazon S3 bucket that is used for the channel (mandatory field)
    * S3 Path: define the Amazon S3 path
    * S3 Region: define the Amazon S3 region
    * Distribution Domain Name: define the preferred domain name for distribution
    You can create channels for different S3 buckets, paths or distribution domain names, for example, a campaign-specific channel for Marketing, and a web channel for final website content.

## Configuring custom XMP metadata extraction

You can map custom XMP (Extensible Metadata Platform) metadata fields to custom Alfresco data model properties using `alfresco-global.properties`.

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management]({% link media-management/1.3/install/index.md %}) for more information.

1. Stop the Alfresco server.

2. Edit your `alfresco-global.properties` file to specify your custom metadata properties, for example:

    ```bash
    metadata.extracter.TikaExifTool.extract.namespace.prefix.cm=http://www.alfresco.org/model/content/1.0
    metadata.extracter.TikaExifTool.extract.namespace.prefix.custom=http://example.com/model/custom/1.0
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Text=custom:text
    # Force multi-line parsing with []
    metadata.extracter.TikaExifTool.extract.XMP-custom\:TextML[]=custom:textMultiLine
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Date=custom:date
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Integer=custom:integer
    metadata.extracter.TikaExifTool.extract.XMP-custom\:ClosedChoice=custom:closedChoice
    metadata.extracter.TikaExifTool.extract.XMP-custom\:OpenChoice=custom:openChoice
    metadata.extracter.TikaExifTool.extract.XMP-custom\:Boolean=custom:boolean
    ```

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines custom properties.

    The `metadata.extracter.TikaExifTool.extract.XMP-custom\:Text` attribute specifies simple text fields. The `metadata.extracter.TikaExifTool.extract.XMP-custom\:TextML[]` attribute specifies multi-line text fields for metadata extraction.

3. Start your Alfresco server to apply the changes.

## Configuring storyboard thumbnails for Media Management

Use this information to configure storyboard thumbnails for video.

Storyboard thumbnails are images shown at regular intervals along the timeline of a video, that show the progress of the video as you hover over the timeline. These thumbnails are shown on videos rendered using an HTML5 player. If you do not want to use the default settings, you can configure this thumbnail information.

1. Stop the Alfresco server.

2. Edit your `alfresco-global.properties` file to specify when the thumbnails start, the interval and number of thumbnails shown in a timeline, for example:

    ```bash
    video.thumbnail.defaultOffset=00:00:00.5
    video.thumbnail.storyboardIntervalSeconds=2
    video.thumbnail.storyboardMaxElements=30
    ```

    A sample `alfresco-global.properties` file is shipped in the root folder of the Media Management distribution zip, which defines custom properties.

3. Start your Alfresco server to apply the changes.

## Setting up a new proxy for Media Management

Use this information to configure an new proxy rendition.

The standard H.264 proxy is used for video transformations in Media Management. This proxy is called in `tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org\_alfresco\_mm\_repo/alfresco-mm-standard-context.xml`.

1. If you need to use a different proxy, you can use the standard proxyDefinition720p bean as a template:

    ```xml
    <bean id="proxyDefinition720p" class="org.alfresco.repo.thumbnail.DeletingThumbnailDefinition">
      <property name="name" value="h264-720"/>
      <property name="mimetype" value="video/mp4"/>
      <property name="transformationOptions">
       <bean class="org.alfresco.repo.content.transform.GytheioPassthroughTransformationOptions">
        <property name="gytheioTransformationOptions">
         <bean class="org.gytheio.content.transform.options.VideoTransformationOptions">
          <property name="resizeOptions">
           <bean class="org.gytheio.content.transform.options.ImageResizeOptions">
            <property name="width" value="1280"/><property name="height" value="720"/>
            <property name="maintainAspectRatio" value="true"/>
           </bean>
          </property>
          <property name="targetVideoCodec" value="h264"/>
          <property name="targetVideoBitrate" value="2400000"/>
          <property name="targetVideoFrameRate" value="29.97"/>
          <property name="targetAudioCodec" value="aac"/>
          <property name="targetAudioBitrate" value="160000"/>
          <property name="targetAudioSamplingRate" value="44100"/>
          <property name="targetAudioChannels" value="2"/>
          <property name="additionalOptions">
           <map>
            <entry key="AWS_TRANSCODE_PRESET_ID" value="1351620000001-000010"/>
           </map>
          </property>
         </bean>
        </property>
        <property name="timeoutMs" value="${system.thumbnail.definition.default.timeoutMs}"/>
        <property name="readLimitTimeMs" value="${system.thumbnail.definition.default.readLimitTimeMs}"/>
        <property name="maxSourceSizeKBytes" value="${system.thumbnail.definition.default.maxSourceSizeKBytes}"/><property name="readLimitKBytes" value="${system.thumbnail.definition.default.readLimitKBytes}"/>
        <property name="pageLimit" value="${system.thumbnail.definition.default.pageLimit}"/>
        <property name="maxPages" value="${system.thumbnail.definition.default.maxPages}"/>
       </bean>
      </property>
      <property name="placeHolderResourcePath" value="alfresco/thumbnail/thumbnail_placeholder_256.png"/>
      <property name="mimeAwarePlaceHolderResourcePath" value="alfresco/thumbnail/thumbnail_placeholder_256{0}.png"/><property name="runAs" value="System"/>
      <property name="failureHandlingOptions" ref="standardFailureOptions"/>
      <property name="deleteOnContentUpdate" value="true"/>
    </bean>
    ```

2. Change the bean id, value and property name, and any H.264 proxy specific attributes to reflect your new proxy.
