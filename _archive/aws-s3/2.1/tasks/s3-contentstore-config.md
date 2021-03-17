---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring the S3 Connector

The S3 Connector is configured using properties set in the global properties file.

**Default settings**

These are the configuration properties that are applied when you install the S3 Connector:

```
s3.bucketLocation=EU
s3.encryption=AES256
s3.flatRoot=true
system.content.caching.maxUsageMB=51200
system.content.caching.minFileAgeMillis=0
s3.maxErrorRetries=3
s3.useTenantDomainInPath=false
s3.autoLowerCaseBucketName=false
```

If you need to override them for your environment, check the available settings in the configuration guides or [properties reference](../references/s3-contentstore-ref-config-props.md).

**Basic configuration properties**

1.  Open the <classpathRoot\>/alfresco-global.properties file.

    If you plan to use IAM roles instead of AWS access and secret keys, ensure you have [configured AWS Identity and Access Management](s3-contentstore-iam-config.md) correctly before continuing from step [4](#bucketName).

    If you have existing content in a local contentstore \(i.e. where Alfresco Content Services is deployed on-premises\) and you'd like to transition to using AWS S3 as the only content store, ensure you include the property described in [Configuring S3 Connector on-premises](../concepts/s3-contentstore-onprem-config.md#on-prem-config) before continuing.

2.  Add the `s3.accessKey` property, for example:

    ```
    s3.accessKey=AKIAIOSFODNN7EXAMPLE
    ```

    The access key is required to identify the AWS account and can be obtained from the AWS Management Console. See [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for access details.

3.  Add the `s3.secretKey` property, for example:

    ```
    s3.secretKey=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    ```

    The secret key is required to identify the AWS account and can be obtained from the AWS Management Console. See [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for access details.

4.  Add the `s3.bucketName` property, for example:

    ```
    s3.bucketName=myawsbucket
    ```

    The bucket name must be unique among all AWS users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. If the bucket has an error, it will be reported in the alfresco.log file. See [S3 bucket restrictions](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for more information on bucket naming.

    The S3 Connector uses a single S3 bucket, and all content is stored in that bucket within one of the following directories:

    ```
    # Main content store
    dir.contentstore=contentstore
    # 'Deleted' content store
    dir.contentstore.deleted=contentstore.deleted 
    ```

5.  Add the `s3.bucketLocation` property as specified in the [Amazon Simple Storage Service \(S3\) table](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

    The value is taken from the *Location constraint* column. For example, for EU \(Frankfurt\):

    ```
    s3.bucketLocation=eu-central-1
    ```

    **Note:** If you use a region other than the US East \(N. Virginia\) endpoint \(previously named US Standard\) to create a bucket, `s3.bucketLocation` is a mandatory field. Use the [Amazon Simple Storage Service \(S3\) table](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) for guidance on the correct value.

    **Optional configuration properties**

6.  If you plan to use the AWS KMS service to manage encryption, you'll need to change the default `s3.encryption` setting.

    See [Configuring AWS Key Management Service](s3-contentstore-kms-config.md) for more encryption options.

7.  Set where the cached content is stored, and how much cache size you need.

    The cached content location \(and default value\) is `dir.cachedcontent=${dir.root}/cachedcontent`. See [CachingContentStore properties](http://docs.alfresco.com/5.2/concepts/ccs-props.html) for more information on the caching content store.

    **Note:** The size of the local caching content store can be configured as necessary to limit its use to a maximum overall size or by files with a maximum file size. For example:

    ```
    # Maximum disk usage for the cache in MB 
    system.content.caching.maxUsageMB=51200
    # Maximum size of files which can be stored in the cache in MB (zero implies no limit) 
    system.content.caching.maxFileSizeMB=0
    ```

    The S3 Connector supports multipart uploads where files larger than 20MB are split. The file upload is attempted and retried, in case there are issues, up to a specific limit.

8.  Set the number of days that Amazon S3 should keep the files before marking them for deletion:

    ```
    s3.abortIncompleteMultipartUploadDays=1
    ```

    See [Multipart upload overview](../concepts/s3-contentstore-multipart-upload.md) for more details.

9.  Save the alfresco-global.properties file.

    You are now ready to start Alfresco Content Services.


-   **[Properties for backwards compatibility](../concepts/s3-contentstore-config-props.md)**  
You may need to configure a number of optional properties for the S3 Connector 2.1 to ensure backwards compatibility with S3 Connector 1.x and behavior.
-   **[Configuring S3 Connector on-premises](../concepts/s3-contentstore-onprem-config.md)**  
Use this information to configure the S3 Connector for an on-premises installation of Alfresco Content Services.
-   **[Configuring AWS Storage Classes](../concepts/s3-contentstore-storage-config.md)**  
Use this information to configure S3 Connector for infrequent access to objects stored in AWS S3.
-   **[Configuring AWS Identity and Access Management](../tasks/s3-contentstore-iam-config.md)**  
AWS Identity and Access Management \(IAM\) enables you to securely control access to AWS services and resources for your users. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. The S3 Connector uses AWS IAM's roles to ensure fine-grained control over access to the content stored in the S3 bucket.
-   **[Configuring AWS Key Management Service](../tasks/s3-contentstore-kms-config.md)**  
AWS Key Management Service \(KMS\) is a managed service that makes it easy for you to create and control the encryption keys used to encrypt your content.
-   **[Multipart upload overview](../concepts/s3-contentstore-multipart-upload.md)**  
The S3 Connector supports multipart uploads where files larger than 20MB are split.

**Parent topic:**[Installing and configuring the S3 Connector](../concepts/s3-contentstore-install-intro.md)

