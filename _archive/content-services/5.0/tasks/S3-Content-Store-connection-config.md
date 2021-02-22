---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the Alfresco S3 Connector

The Alfresco S3 Connector is configured using properties set in the global properties file.

1.  Open the <classpathRoot\>/alfresco-global.properties file.

2.  Add the `s3.accessKey`, for example:

    `s3.accessKey=AKIAIOSFODNN7EXAMPLE`

    The access key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).

3.  Add the `s3.secretKey` property, for example:

    `s3.secretKey=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

    The secret key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).

4.  Add the `s3.bucketName` property, for example:

    `s3.bucketName=myawsbucket`

    The bucket name must be unique among all Amazon Web Services users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. If the bucket has an error, it will be reported in the alfresco.log file. See [S3 bucket restrictions](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for more information on bucket naming.

5.  Add the `s3.bucketLocation` as specified in the [Amazon Simple Storage Service \(S3\) table](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

    The value is taken from the *Location constraint* column. For example, for EU \(Frankfurt\):

    ```
    s3.bucketLocation=eu-central-1
    ```

    **Note:** If you use a region other than the US Standard endpoint to create a bucket, `s3.bucketLocation` is a mandatory field. Use the [Amazon Simple Storage Service \(S3\) table](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) for guidance on the correct value.

6.  If you need to use a single bucket for multiple purposes, set the content store as a subdirectory of the bucket, using these properties:

    ```
    dir.contentstore=/SubPath/contentstore 
    dir.contentstore.deleted=/SubPath/contentstore.deleted
    ```

7.  Set optional configuration properties; for example, where the cached content is stored, and how much cache size you need:

    The cached content location \(and default value\) is `dir.cachedcontent=${dir.root}/cachedcontent`. See [CachingContentStore properties](../concepts/ccs-props.md) for more information on the caching content store.

    **Note:** The size of the local caching content store can be configured as necessary to limit its use to a maximum overall size or by files with a maximum file size. For example:

    ```
     #Maximum disk usage for the cache in MB 
      system.content.caching.maxUsageMB=51200
     #Maximum size of files which can be stored in the cache in MB (zero implies no limit) 
      system.content.caching.maxFileSizeMB=0
    ```

8.  To configure an advanced S3 setup; for example, using a proxy server, see the [JetS3t](https://jets3t.s3.amazonaws.com/toolkit/configuration.html) information for a full list of configuration parameters.

9.  Save the alfresco-global.properties file.

    You are now ready to start Alfresco.


-   **[Configuring the Alfresco S3 Connector with WebSphere Application Server](../tasks/S3-Content-Store-websphere-config.md)**  
If you are using WebSphere Application Server with the Alfresco S3 Connector, you must configure additional settings in the WAS Console.
-   **[Configuring the Alfresco S3 Connector with AWS GovCloud](../tasks/S3-Content-Store-GovCloud-config.md)**  
The Alfresco S3 Connector can be configured to use the AWS GovCloud region.

**Parent topic:**[Installing and configuring Alfresco S3 Connector](../concepts/S3content-intro.md)

