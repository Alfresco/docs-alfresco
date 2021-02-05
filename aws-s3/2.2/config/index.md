---
title: Configure Content Connector for AWS S3
---

The Content Connector for AWS S3 is configured using properties set in the `alfresco-global.properties` file.

**Default settings**

These are the configuration properties that are applied when you install the S3 Connector:

```text
s3.bucketLocation=EU
s3.encryption=AES256
s3.flatRoot=true
system.content.caching.maxUsageMB=51200
system.content.caching.minFileAgeMillis=0
s3.maxErrorRetries=3
s3.useTenantDomainInPath=false
s3.autoLowerCaseBucketName=false
```

If you need to override them for your environment, check the available settings in the configuration guides or [properties reference]({% link aws-s3/2.2/config/index.md %}#properties-reference).

**Basic configuration properties**

1.  Open the `<classpathRoot>/alfresco-global.properties` file.

    If you plan to use IAM roles instead of AWS access and secret keys, ensure you have [configured AWS Identity and Access Management]({% link aws-s3/2.2/config/index.md %}#configiam) correctly before continuing from step 4.

    If you have existing content in a local contentstore (i.e. where Alfresco Content Services is deployed on-premises) and you'd like to transition to using AWS S3 as the only content store, ensure you include the property described in [Configuring S3 Connector on-premises]({% link aws-s3/2.2/config/index.md %}#onpremconfig) before continuing.

2.  Add the `s3.accessKey` property, for example:

    ```text
    s3.accessKey=AKIAIOSFODNN7EXAMPLE
    ```

    The access key is required to identify the AWS account and can be obtained from the AWS Management Console. See [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for access details.

3.  Add the `s3.secretKey` property, for example:

    ```text
    s3.secretKey=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    ```

    The secret key is required to identify the AWS account and can be obtained from the AWS Management Console. See [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for access details.

4.  Add the `s3.bucketName` property, for example:

    ```text
    s3.bucketName=myawsbucket
    ```

    The bucket name must be unique among all AWS users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. If the bucket has an error, it will be reported in the `alfresco.log` file. See [S3 bucket restrictions](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for more information on bucket naming.

5.  Add the `s3.bucketLocation` property as specified in the [AWS service endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) page.

    The value is taken from the *Code* column. For example, for *Region Name* Europe (Frankfurt):

    ```text
    s3.bucketLocation=eu-central-1
    ```

    >**Note:** If you use a region other than the US East (N. Virginia) endpoint (previously named US Standard) to create a bucket, `s3.bucketLocation` is a mandatory field. Use the [AWS service endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) for guidance on the correct value.

    **Optional configuration properties**

6.  If you plan to use the AWS KMS service to manage encryption, you'll need to change the default `s3.encryption` setting.

    See [Configuring AWS Key Management Service]({% link aws-s3/2.2/config/index.md %}#configkeymgmt) for more encryption options.

7.  Set where the cached content is stored, and how much cache size you need.

    The cached content location (and default value) is `dir.cachedcontent=${dir.root}/cachedcontent`. See [CachingContentStore properties](#LINK content-services/6.1/admin/content-stores.md caching-content-store-ccs) for more information on the caching content store.

    >**Note:** The size of the local caching content store can be configured as necessary to limit its use to a maximum overall size or by files with a maximum file size. For example:

    ```text
    # Maximum disk usage for the cache in MB 
    system.content.caching.maxUsageMB=51200
    # Maximum size of files which can be stored in the cache in MB (zero implies no limit) 
    system.content.caching.maxFileSizeMB=0
    ```

    The S3 Connector supports multipart uploads where files larger than 20MB are split. The file upload is attempted and retried, in case there are issues, up to a specific limit.

8.  Set the number of days that Amazon S3 should keep the files before marking them for deletion:

    ```text
    s3.abortIncompleteMultipartUploadDays=1
    ```

    See [Multipart upload overview](#multipart-upload-overview) for more details.

9. Save the `alfresco-global.properties` file.

    You are now ready to start Alfresco Content Services.

## Properties for backwards compatibility

You may need to configure a number of optional properties for the S3 Connector 2.x to ensure backwards compatibility with S3 Connector 1.x and behavior.

* `dir.contentstore`

    The `dir.contentstore` property provides backwards compatibility with S3 Connector 1.x.

    **S3 Connector 1.x**

    S3 Connector 1.x doesn't create S3 object IDs (or paths) that are ideal for high-scale S3 read and write request rates. To help achieve this, `dir.contentstore` should be ignored except for backwards compatibility reads of existing content stored in Alfresco Content Services.

    When using S3 Connector 1.x the format of the S3 path is:

    ```text
    /{contentRoot}/{tenant}/[datepath/]{guid}.bin
    ```

    When `s3.flatRoot=true` the s3 path format is:

    ```text
    /{contentRoot}/{tenant}/{guid}.bin
    ```

    **S3 Connector 2.0**

    Starting from S3 Connector 2.0 `dir.contentstore` is ignored except for backwards compatibility reads.

    When `flatRoot=true` the s3 path format is:

    ```text
    /{tenant}/{guid}.bin
    ```

    When `flatRoot=false` the s3 path format is:

    ```text
    /{tenant}/{datepath}/{guid.bin}
    ```

    >**Note:** The behavior of existing properties `s3.flatRoot` and `dir.contentstore.deleted` is maintained. You can apply the S3 Connector v2.0 to an existing installation where S3 Connector v1.x was previously used without affecting the running of the system. This means existing paths remain as they are, and new paths are generated based on your configuration.

* `s3.useTenantDomainInPath`

    Added in S3 Connector v2.0. When the property value is set to `true` the tenant domain is added to the S3 path. This was the default behavior in S3 Connector v1.x. The change in the default property value is required to achieve an optimal path for high throughput reads and writes where:

    ```text
    s3.useTenantDomainInPath=false
    dir.contentstore=
    s3.flatRoot=true
    ```

    >**Note:** For a multi-tenant system you can also set `s3.useTenantDomainInPath=false`, however content from different tenants is co-mingled. For more details, see [Setting up multi-tenancy](#LINK content-services/6.1/admin/multi-tenancy.md ).

    You can apply S3 Connector 2.0 to an existing installation where S3 Connector 1.x was previously used without affect to the running of the system. This means that existing paths remain as they are, and new paths are generated based on your configuration.

    **Example 1:**

    When `s3.useTenantDomainInPath=false` and `s3.flatRoot=true` the s3 path format is:

    ```text
    /{guid}.bin
    ```

    **Example 2:**

    When `s3.useTenantDomainInPath=false` and `s3.flatRoot=false` the s3 path format is:

    ```text
    /{datepath}/{guid.bin}
    ```

## On-premises configuration {#onpremconfig}

Use this information to configure the S3 Connector for an on-premises installation of Alfresco Content Services.

For on-premises customers, AWS S3 is often a more cost effective method to store your content, paying just for what you 
need and does not require you to budget up front for growth capacity.

The S3 Connector is supported as the default content store for Alfresco Content Services. When installed on-premises, 
existing content will remain accessible from your existing content store(s), and all new content is written to the 
S3 content store.

The following diagram shows a simple representation of how an on-premises (on-prem) deployment of Alfresco Content Services 
using the S3 Connector can interact with AWS S3.

![s3-onprem-architecture]({% link aws-s3/images/s3-onprem-architecture.png %})

**Installation and configuration**

You can install and configure Alfresco Content Services and the S3 Connector on-premises using the default configuration. 
Follow the steps in [Installing the S3 Connector]({% link aws-s3/2.2/install/index.md %}), and the basic 
configuration steps in [Configuring the S3 Connector]({% link aws-s3/2.2/config/index.md %}).

>**Note:** If you have existing content in a local content store, and you'd like to take advantage of the features provided by the S3 Connector, add the following property to `alfresco-global.properties`:

```text
dir.contentstore=${dir.root}/contentstore
```

As an existing customer using the default [Encrypted content store](#LINK content-services/6.1/admin/content-stores.md }#encrypted-content-store) configuration, the environment uses:

* AES256 encryption for new content
* Content decryption on reads from the existing on-premises files

**Best practice**

In order to connect an on-premises instance of Alfresco Content Services to AWS S3, it's recommended that you use the default credentials file (`~/.aws/credentials`). This ensures that the `secretKey` and `accessKey` aren't exposed beyond what's absolutely necessary. Here's an example credentials file:

```text
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY 
```

**Difference between running in AWS and running outside AWS**

The following table highlights the capabilities that are supported depending on your deployment scenario.

|Deployment|IAM|KMS|
|----------|---|---|
|New deployment (on-prem)|Supported via AWS API keys only|Supported|
|New deployment (in AWS)|Supported via Instance Profile|Supported|
|Existing deployment (on-prem)|Supported via AWS API keys only|Supported|
|Existing deployment (in AWS)|Supported via Instance Profile|Supported|

## Configuring AWS Storage Classes {#configstorageclass}

Use this information to configure S3 Connector for infrequent access to objects stored in AWS S3.

Objects in AWS S3 can be stored under several storage classes during an object's lifetime, such as 
Standard and Standard - Infrequent Access (Standard-IA).

* **Standard**

    This is the default storage class for objects uploaded to AWS S3, and should be used for frequently accessed data.

* **Standard-IA**

    Content should be changed to Standard-IA, or S3 IA, when it's less frequently used. For example, this may be useful for archiving or storing old data that is less likely to be accessed, as this may reduce storage costs. See [Amazon S3 Storage Classes](http://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html) and [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/) for more.

The transition of content from S3 to S3 IA is configured through the AWS console. You can change an object's 
storage class either manually or by adding a lifecycle policy for an S3 bucket. 
See [Creating a Lifecycle Policy](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html) for more.

You can use S3 storage class analysis to fine tune the lifecycle rules according to your storage access patterns, 
so that the right data is transitioned to Standard-IA storage class. 
See [Amazon S3 Storage Class Analysis](http://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html) for more.

**Conditions for changing storage class to Standard-IA**

Before transitioning objects to Standard-IA, consider the following limitations:

* The minimum retention period required before an object can be changed to Standard-IA is 30 days.
* The minimum object size is 128KB.

>**Note:** When using the S3 Connector, new versions of a document are stored using the Standard storage class by default.

Here are some example scenarios to help you consider if using storage classes is right for your environment:

1.  Collaboration: On an S3 bucket with frequently used content as part of any current work.
    * Create a lifecycle rule for content older than **365 days** to be moved to Standard-IA, as part of the aging process.
2.  Document Archiving: On an S3 bucket with content that's known to be archival content.
    * Create a lifecycle rule for content older than **30 days** to be moved to Standard-IA.

The following diagram shows a simple representation of how Alfresco Content Services and the S3 Connector 
interact with AWS S3, when using the default Standard storage class and transitioning content to Standard-IA (S3 IA).

![s3-ia-architecture]({% link aws-s3/images/s3-ia-architecture.png %})

## Configuring AWS Identity and Access Management {#configiam}

AWS Identity and Access Management (IAM) enables you to securely control access to AWS services and resources for 
your users. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their 
access to AWS resources. The S3 Connector uses AWS IAM's roles to ensure fine-grained control over access to 
the content stored in the S3 bucket.

In order to use IAM roles, instead of AWS secret and access keys, a new policy must be created that will be 
used by the IAM role. Policies are used to grant permissions to groups. If there isn't a policy already in 
place for S3 access, a new policy must be created.

1.  Create a new policy.
    Follow the steps from the AWS site to [Create a New Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html).

3.  Use the policy simulator to test the new IAM policy.

    Follow the steps from the AWS site to [Test IAM Policies](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html).

4.  Create a new role. You can attach up to 10 policies to each role.

    Follow the steps from the AWS site to [Create IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html).

    If an Amazon EC2 configuration is already in place, the new policy that you created is attached to the existing role used on the EC2 instance. Follow the steps from the AWS site to [Manage IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage.html).

5.  Attach the role to the EC2 instance where Alfresco Content Services is running.

    Note that one single role can be applied to an EC2 instance.

6.  Edit `alfresco-global.properties` to remove the `s3.accessKey` and `s3.secretKey` properties.

    By removing these properties, the IAM role that's attached to the EC2 instance takes over the responsibility of accessing the S3 bucket.

    You are now ready to start Alfresco Content Services.

## Configuring AWS Key Management Service {#configkeymgmt}

AWS Key Management Service (KMS) is a managed service that makes it easy for you to create and control the encryption 
keys used to encrypt your content.

The primary resources in AWS KMS are customer master keys (CMKs). These are either customer-managed or AWS-managed. 
You can use either type of CMK to protect data encryption keys (or data keys) which are then used to encrypt or 
decrypt content stored by Alfresco Content Services in AWS S3. CMKs never leave AWS KMS unencrypted, but data keys can.

For more details, see [AWS KMS Concepts](http://docs.aws.amazon.com/kms/latest/developerguide/concepts.html) 
and [How Envelope Encryption Works with Supported AWS Services](http://docs.aws.amazon.com/kms/latest/developerguide/workflow.html).

To learn more about how AWS KMS uses cryptography and secures master keys, see the 
[AWS Key Management Service Cryptographic Details whitepaper](https://d0.awsstatic.com/whitepapers/KMS-Cryptographic-Details.pdf).

The S3 Connector provides the following encryption options:

|Property setting|Description|
|----------------|-----------|
|s3.encryption|Setting `s3.encryption=none` means content stored in S3 is unencrypted. **Note:** Storing your content unencrypted isn't recommended.|
|s3.encryption=aes256|The content store is encrypted using AWS managed encryption.|
|s3.encryption=kms|The content store is encrypted using AWS KMS managed encryption.|

>**Note:** If the `s3.encryption` property is missing, then the content store is **AES256** encrypted by AWS-managed encryption.

For more information about each of these encryption options, see the [Encryption overview](#encryption-overview).

You can configure AWS KMS by adding the relevant properties to the global properties file.

1.  Edit `alfresco-global.properties` to set the server-encryption algorithm to KMS:

    ```text
    s3.encryption=kms
    ```

    If you plan to use the AWS-managed default master key then continue from step 4.

2.  To use a customer master key, either [create a new KMS key](http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) using the AWS steps, or use a CMK by [importing your existing key material](http://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html).

3.  Edit `alfresco-global.properties` and set the value of `s3.awsKmsKeyId` property to the key alias (see example) or the Amazon Resource Name (ARN) of the KMS key created.

    ```text
    s3.awsKmsKeyId=alias/kmsKeyAlias
    ```

    You can leave the property empty in order to use the default master key attached to your account.

4.  You are now ready to start Alfresco Content Services.

### Encryption overview

Alfresco supports server-side encryption for content stored in AWS S3. There are several encryption types that you can 
configure to use with S3 Connector. These include AWS Managed Encryption, and AWS Key Management Service (KMS) Encryption.

>**Note:** S3 doesn't work with the [Alfresco Content Encryption](#LINK content-services/6.1/admin/content-stores.md #encrypted-content-store) module. When using the S3 Connector we recommend using AWS KMS.

**AWS Key Management Service (KMS) Encryption**

The AWS name is Server-Side Encryption with AWS KMS Managed Keys (SSE-KMS).

SSE-KMS is similar to SSE-S3, but with some additional benefits plus additional charges for using this service. 
There are separate permissions for the use of an envelope key (that is, a key that protects your data's encryption key) 
that provides added protection against unauthorized access to your content in S3. SSE-KMS also provides an audit 
trail of when your key was used and by whom. You also have the option to create and manage encryption keys yourself, 
or use a default key that is unique to you, the service you're using, and the region you're working in.

For more information, see [Protecting Data Using Server-Side Encryption with AWS KMS-Managed Keys (SSE-KMS)](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html).

**Customer-Provided Key Encryption**

The AWS name is Server-Side Encryption with Customer-Provided Keys (SSE-C). This type of key allows you to protect your 
data at rest, setting your own encryption keys.

This option isn't supported by the S3 Connector.

For more information, see [Protecting Data Using Server-Side Encryption with Customer-Provided Encryption Keys (SSE-C)](http://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html).

**AWS Managed Encryption**

This is the default encryption mechanism for the S3 Connector. The AWS name is S3-Managed Encryption Keys (SSE-S3).

Amazon S3 encrypts each object with a unique key. As an additional safeguard, it encrypts the key itself with a master 
key that it regularly rotates. Amazon S3 server-side encryption uses one of the strongest block ciphers available, 
256-bit Advanced Encryption Standard (AES-256), to encrypt data.

For more information, see [Protecting Data Using Server-Side Encryption with Amazon S3-Managed Encryption Keys (SSE-S3)](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html).

**Unencrypted**

Storing your content unencrypted isn't recommended.

## Multipart upload overview

The S3 Connector supports multipart uploads where files larger than 20MB are split.

The multipart upload enables you to upload large files in parts, and is triggered when you upload a file larger 
than 20 MB. Amazon S3 stores these parts, but it creates the file from the parts only after you upload all of 
them and send a successful request to complete the multipart upload. Upon receiving the complete multipart 
upload request, AWS S3 constructs the file from the uploaded parts and you can then access the file just as 
you would any other file in your bucket.

**Abort incomplete multipart upload**

If you don't send the complete multipart upload request successfully, AWS S3 will not assemble the parts and will 
not create any file. So the parts remain in S3. As best practice, we recommend you configure a lifecycle rule. 
See [Aborting Incomplete Multipart Uploads Using a Bucket Lifecycle Policy](http://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config) for more details.

We create the bucket and a global lifecycle rule to enforce the abort and deletion of incomplete uploads automatically only if the bucket name configured in the global properties file doesn't exist in S3. In this case, you can configure the number of days that S3 should keep the files before marking it for deletion. The default setting is 1 day:

```text
s3.abortIncompleteMultipartUploadDays=1
```

When a file reaches the end of its lifetime, S3 queues it for removal and removes it asynchronously. 
There may be a delay between the expiration date and the date when S3 removes a file.

See [AWS Multipart Upload Overview](http://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html) for more details.

## Properties reference

The S3 Connector provides a number of properties on installation and for customizing your configuration.

|Property|Description|
|------------|-------|
|dir.contentstore| Directory name used within the S3 bucket for the contentstore and deleted contentstore. The default is `contentstore`.|
|dir.contentstore.deleted| Directory name used within the S3 bucket for the deleted contentstore. The default is `contentstore.deleted`|
|s3.bucketName|The bucket name must be unique among all AWS users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. If the bucket has an error, it will be reported in the `alfresco.log` file.|
|s3.bucketLocation|The location where the new S3 bucket should be created if it doesn't exist. Supported values are US and EU. The default is EU.|
|s3.endpoint|Can be used to add a custom endpoint, for example `s3.endpoint=s3.us-gov-west-1.amazonaws.com`.|
|s3.flatRoot|Defines whether all content items should be stored in the same single directory in the bucket, otherwise the standard date-based hierarchy is used. The default is true.|
|s3.useTenantDomainInPath|Defines whether the tenant name is used in the S3 path. The default is `false`.|
|s3.maxErrorRetries|The maximum number of attempts to retry reads or writes to the S3 bucket in case of failed transfers. The default is 3. This configuration uses throttling retries. For more see [Introducing Retry Throttling](https://github.com/Alfresco/alfresco-transform-core/tree/master/alfresco-transformer-base){:target="_blank"}.|
|s3.maxMultipartUploadRetries|The maximum number of upload retry attempts for failed requests. The default is 2.|
|s3.abortIncompleteMultipartUploadDays|The minimum number of days that AWS S3 should keep the incomplete multipart upload parts before marking them for deletion. If the value is 0 then the abort is disabled. The default is 1. If the bucket (identified by the value of `s3.bucketName`) doesn't already exist, then we create the bucket and a global lifecycle rule to enforce the abort and deletion of incomplete uploads after the specified number of days. When an object reaches the end of its lifetime, Amazon S3 queues it for removal and removes it asynchronously. **Note:** There may be a delay between the expiration date and the date on which AWS S3 removes an object.|
|s3.encryption| Encryption to be applied for content stored in AWS S3. Two options are supported for managing encryption keys: AES256 and KMS. The default value on installation is AES256.|
|s3.awsKmsKeyId| Indicates the key alias or ARN to be used for KMS encryption. For more see [Creating keys](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html){:target="_blank"} or by [Importing key material in AWS Key Management Service (AWS KMS)](https://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html){:target="_blank"}.If no value is provided, the default master key attached to your account is used. For more see [Protecting data with server-side encryption using AWS KMS CMKs (SSE-KMS)](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html){:target="_blank"}.|
|s3.accessKey| Required to identify the AWS account and can be obtained from the AWS Management Console. See [Programmatic access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys){:target="_blank"} for access details. This property is not required if you plan to use [Configuring AWS Identity and Access Management]({% link aws-s3/2.2/config/index.md %}#configiam).|
|s3.secretKey | Required to identify the AWS account and can be obtained from the AWS Management Console. See [Programmatic access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys){:target="_blank"} for access details. This property is not required if you plan to use [Configuring AWS Identity and Access Management]({% link aws-s3/2.2/config/index.md %}#configiam).|
