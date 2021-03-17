---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Properties reference

The S3 Connector provides a number of properties on installation and for customizing your configuration.

-   **dir.contentstore**

    Directory name used within the S3 bucket for the contentstore and deleted contentstore. The default is `contentstore`.

-   **dir.contentstore.deleted**

    Directory name used within the S3 bucket for the deleted contentstore. The default is `contentstore.deleted`.

-   **s3.bucketName**

    The bucket name must be unique among all AWS users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. If the bucket has an error, it will be reported in the `alfresco.log` file.

-   **s3.bucketLocation**

    The location where the new S3 bucket should be created if it doesn't exist. Supported values are US and EU. The default is `EU`.

-   **s3.flatRoot**

    Defines whether all content items should be stored in the same single directory in the bucket, otherwise the standard date-based hierarchy is used. The default is `true`.

-   **s3.useTenantDomainInPath**

    Defines whether the tenant name is used in the S3 path. The default is `false`.

-   **s3.maxMultipartUploadRetries**

    The maximum number of upload retry attempts for failed requests. The default is `2`.

    Added in S3 Connector 2.0.0

-   **s3.abortIncompleteMultipartUploadDays**

    The minimum number of days that AWS S3 should keep the incomplete multipart upload parts before marking them for deletion. If the value is `0` then the abort is disabled. The default is `1`.

    If the bucket \(identified by the value of `s3.bucketName`\) doesn't already exist, then we create the bucket and a global lifecycle rule to enforce the abort and deletion of incomplete uploads after the specified number of days. When an object reaches the end of its lifetime, Amazon S3 queues it for removal and removes it asynchronously.

    Added in S3 Connector 2.0.

    **Note:** There may be a delay between the expiration date and the date on which AWS S3 removes an object.

-   **s3.encryption**

    Encryption to be applied for content stored in AWS S3. Two options are supported for managing encryption keys: AES256 and KMS. The default value on installation is `AES256`.

    KMS support is added in S3 Connector 2.0.

-   **s3.awsKmsKeyId**

    Indicates the key alias or ARN to be used for KMS encryption.

    For more details see [create a key using KMS key material origin](http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) or by [importing key material in AWS Key Management Service](http://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html).

    If no value is provided, the default master key attached to your account is used. See [Protecting Data Using Server-Side Encryption with AWS KMS-Managed Keys \(SSE-KMS\)](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html).

    Added in S3 Connector 2.0.

-   **s3.accessKey**

    Required to identify the AWS account and can be obtained from [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys). This property is not required if you plan to use [IAM roles](../tasks/s3-contentstore-iam-config.md).

-   **s3.secretKey**

    Required to identify the AWS account and can be obtained from [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys). This property is not required if you plan to use [IAM roles](../tasks/s3-contentstore-iam-config.md).


**Parent topic:**[Installing and configuring the S3 Connector](../concepts/s3-contentstore-install-intro.md)

