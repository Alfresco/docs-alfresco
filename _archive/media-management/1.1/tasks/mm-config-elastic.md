---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring the Elastic Transcoder content transformer

Amazon Web Services \(AWS\) Elastic Transcoder is supported for remote video transcoding with Amazon S3. If you are using this transformer, configure your connection using alfresco-global.properties.

Ensure that you have installed the required external and internal software before configuring the transformer. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) and [Installing Media Management](mm-install.md) for more information. Make sure you have your Elastic Transcoder and S3 accounts set up.

1.  Stop the Alfresco server.

2.  Edit your alfresco-global.properties file to specify your Elastic Transcoder S3 access key, S3 keys, S3 bucket, and Elastic Transcoder information; for example:

    ```
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

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

    **Note:** Elastic Transcoder provides the following support only:

    -   `mp4` container
    -   `H.264` video
    -   `AAC` audio
    Each job must be submitted to a configured preset, which means that Elastic Transcoder handles `TransformationOptions` of type `AwsElasticTranscoderTransformationOptions with a valid awsTranscodePresetId` only. Additionally, Elastic Transcoder does not report percentage progress on jobs.

    For more information on using Amazon Elastic Transcoder with S3, see [Getting started with Elastic Transcoder](http://docs.aws.amazon.com/elastictranscoder/latest/developerguide/getting-started.html).

3.  Start your Alfresco server to apply the changes.


**Parent topic:**[Configuring transformation services for Media Management](../concepts/mm-config-remote.md)

