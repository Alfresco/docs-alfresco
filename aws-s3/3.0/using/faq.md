---
title: Content Connector for AWS S3 FAQ
---

Here are the answers to some frequently asked questions about the S3 Connector.

## Does the S3 Connector support multipart upload?

The S3 Connector supports multipart uploads where files larger than 20MB are split. The file upload is attempted and retried up to 3 times, in case there are issues. The number of attempts to read and write to the S3 bucket is configurable (see `s3.maxErrorRetries`).

## Is the S3 Connector compatible with existing data stores where IAM is not used?

The use of IAMs is recommended best practice from AWS. Should you prefer not to leverage the IAM functionality, the S3 Connector remains compatible as long as the access key and secret key are provided in the `alfresco-global.properties` file. The S3 Connector will then use these credentials to connect to the S3 bucket.

## What is the default delete behaviour when using the S3 Connector with S3 versioning enabled?

AWS versioning-enabled buckets are completely transparent to Alfresco, so the standard delete activity should take place as defined in the node lifecycle. In summary this means:

* when a user deletes content, the store changes to the Archive Store - nothing happens to the content
* when a user deletes content from the Trashcan (or archive store), `alf_node.deleted=1` and `alf_content_url.orphantime` is set
* The `ContentStoreCleaner` copies the content to the `.deleted` directory and removes the content (by default after 14 days).

## As a customer upgrading from a previous version to S3 Connector 3.x, should I remove the useTenantDomainPath property?

The `s3.useTenantDomainInPath` property is `false` by default, so any new content you create won't add the tenant domain to the S3 path. If you want to add the tenant domain back to the path, then set this property to `true`. Note that this doesn't provide the optimal path for high throughput reads and writes.

## Do I need to re-encrypt all content in an S3 bucket if I move to KMS?

No, content is encrypted with the S3 file itself, so content encrypted by a previous key will remain encrypted using that encryption. If you require the content to be re-encrypted, you will need to follow AWS recommended practices.

## Why do I require the S3 Connector when AWS S3 can be mounted as a file system?

You can mount S3 as a file system using a third party library, but is not recommended by AWS or supported by Alfresco due to the very poor performance.

## Does the S3 Connector work with the Alfresco Content Encryption module?

The module can't be applied to the S3 content [Alfresco Content Encryption]({% link content-services/latest/admin/content-stores.md %} store. To encrypt content in AWS S3 we recommend using [AWS Key Management Service (KMS)](https://aws.amazon.com/kms/){:target="_blank"}. To configure the S 3 Connector with KMS, follow the steps in [Configuring AWS Key Management Service]({% link aws-s3/3.0/config/index.md %}#configkeymgmt).

## Is there any guidance to support cross-region replication when using KMS keys in S3?

If you require cross-region replication, then you will need to use the S3 Connector without KMS. AWS S3 does not currently provide support for cross-region replication with KMS enabled.

## Do I need to do anything, such as re-encrypt all content in an S3 bucket, if I want to make use of IAM and KMS?

You don't need to do anything. Any existing content is still encrypted as it was when initially uploaded. For example, if the content was encrypted with AES256 it will remain accessible and encrypted under AES256.

## Does the S3 Connector support Amazon S3 Glacier?

The S3 Connector supports Amazon S3 Glacier. See [Alfresco Content Connector for AWS Glacier]({% link aws-glacier/latest/index.md %} for more information.
