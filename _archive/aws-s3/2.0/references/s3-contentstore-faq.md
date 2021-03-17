---
author: [Alfresco Documentation, Alfresco Documentation]
---

# S3 Connector FAQs

Here are the answers to some frequently asked questions about S3 Connector 2.0.

-   [Does the S3 Connector support multipart upload?](s3-contentstore-faq.md#1)
-   [Is the S3 Connector compatible with existing data stores where IAM is not used?](s3-contentstore-faq.md#2)
-   [What is the default delete behaviour when using the S3 Connector with S3 versioning enabled?](s3-contentstore-faq.md#3)
-   [As a customer upgrading from a previous version to S3 Connector 2.0, should I remove the useTenantDomainPath property?](s3-contentstore-faq.md#4)
-   [Do I need to re-encrypt all content in an S3 bucket if I move to KMS?](s3-contentstore-faq.md#5)
-   [Why do I require the S3 Connector when AWS S3 can be mounted as a file system?](s3-contentstore-faq.md#6)
-   [Does the S3 Connector work with the Alfresco Content Encryption module?](s3-contentstore-faq.md#7)
-   [Is there any guidance to support cross-region replication when using KMS keys in S3?](s3-contentstore-faq.md#8)
-   [Do I need to do anything, such as re-encrypt all content in an S3 bucket, if I want to make use of IAM and KMS?](s3-contentstore-faq.md#9)

![](../images/hr.png)

**Does the S3 Connector support multipart upload?**

The S3 Connector supports multipart uploads where files larger than 20MB are split. The file upload is attempted and retried up to 5 times, in case there are issues. The number of attempts to write to the S3 bucket is configurable, but the read retry is not configurable at this time.

[back to top](s3-contentstore-faq.md#top)

**Is the S3 Connector compatible with existing data stores where IAM is not used?**

The use of IAMs is recommended best practice from AWS. Should you prefer not to leverage the IAM functionality, the S3 Connector remains compatible as long as the access key and secret key are provided in the `alfresco-global.properties` file. The S3 Connector will then use these credentials to connect to the S3 bucket.

[back to top](s3-contentstore-faq.md#top)

**What is the default delete behaviour when using the S3 Connector with S3 versioning enabled?**

AWS versioning-enabled buckets are completely transparent to Alfresco, so the standard delete activity should take place as defined in the node lifecycle. For more information, see the main stores section in [Repository concepts](http://docs.alfresco.com/5.2/concepts/dev-repository-concepts.html). In summary this means:

-   when a user deletes content, the store changes to the Archive Store - nothing happens to the content
-   when a user deletes content from the Trashcan \(or archive store\), `alf_node.deleted=1` and `alf_content_url.orphantime` is set
-   `ContentStoreCleaner` copies the content to the `.deleted` directory and removes the content \(by default after 14 days\)
-   `NodeServiceCleanup` purges the remaining database information

[back to top](s3-contentstore-faq.md#top)

**As a customer upgrading from a previous version to S3 Connector 2.0, should I remove the useTenantDomainPath property?**

The `s3.useTenantDomainInPath` property is `false` by default, so any new content you create won't add the tenant domain to the S3 path. If you want to add the tenant domain back to the path, then set this property to `true`. This may be useful for customers leveraging the [multi-tenant functionality](http://docs.alfresco.com/5.2/concepts/mt-intro.html), where you don't want content from different tenants to be stored in the same folder. Note that this doesn't provide the optimal path for high throughput reads and writes.

[back to top](s3-contentstore-faq.md#top)

**Do I need to re-encrypt all content in an S3 bucket if I move to KMS?**

No, content is encrypted with the S3 file itself, so content encrypted by a previous key will remain encrypted using that encryption. If you require the content to be re-encrypted, you will need to follow AWS recommended practices.

[back to top](s3-contentstore-faq.md#top)

**Why do I require the S3 Connector when AWS S3 can be mounted as a file system?**

You can mount S3 as a file system using a third party library, but is not recommended by AWS or supported by Alfresco due to the very poor performance.

[back to top](s3-contentstore-faq.md#top)

**Does the S3 Connector work with the Alfresco Content Encryption module?**

The S3 Connector is not compatible with the [Alfresco Content Encryption](http://docs.alfresco.com/5.2/concepts/encrypted-overview.html) module. To encrypt content in AWS S3 we recommend using [AWS KMS](https://aws.amazon.com/kms/). To configure the S3 Connector with KMS, follow the steps in [Configuring AWS Key Management Service](../tasks/s3-contentstore-kms-config.md).

[back to top](s3-contentstore-faq.md#top)

**Is there any guidance to support cross-region replication when using KMS keys in S3?**

If you require cross-region replication, then you will need to use the S3 Connector without KMS. AWS S3 does not currently provide support for cross-region replication with KMS enabled.

[back to top](s3-contentstore-faq.md#top)

**Do I need to do anything, such as re-encrypt all content in an S3 bucket, if I want to make use of IAM and KMS?**

You don't need to do anything. Any existing content is still encrypted as it was when initially uploaded. For example, if the content was encrypted with AES256 it will remain accessible and encrypted under AES256.

[back to top](s3-contentstore-faq.md#top)

**Parent topic:**[Alfresco Content Connector for AWS S3 2.0](../concepts/s3-contentstore-overview.md)

