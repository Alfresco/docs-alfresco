# Content Storage

Alfresco Process Services enables you to upload content, such as attaching a file to a task or a form. This content is stored on a disk with the following configuration settings for the path:

```
contentstorage.fs.rootFolder=data/
```

**Important:** When using multiple instances of the application, make sure that this path references a shared network drive. This is so that all nodes are able to access all content as the application is stateless and any server can handle any request.

|Property|Description|Example|
|`contentstorage.fs.createRoot`|Sets whether the root folder is created by default.|true|
|`contentstorage.fs.depth`|Depth of the folder tree.|4|
|`contentstorage.fs.blockSize`|Maximum number of files in a single folder.|1024|

Alternatively, you can use Amazon S3 for content storage. To configure Amazon S3 for content storage, set the following properties in the activiti-app.properties file:

|Property|Description|
|`contentstorage.s3.accessKey`|Set to the S3 access key. The access key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).|
|`contentstorage.s3.secretKey`|Set to the S£ secret key.The secret key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).|
|`contentstorage.s3.bucketName`|Set to the S3 bucket name.The bucket name must be unique among all Amazon Web Services users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. See [S3 bucket restrictions](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for more information on bucket naming.|
|`contentstorage.s3.objectKeyPrefix`|Set to your AWS object prefix.|

Alfresco Content Services is also storage mechanism, and you can find more information in [Integration with external systems](integration_with_external_systems.md).

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

