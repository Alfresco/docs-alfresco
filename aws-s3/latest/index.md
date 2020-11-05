---
title: Alfresco Content Connector for AWS S3
---

The Content Connector for AWS S3 is an add-on module that provides an alternative content store. 
It uses Amazon's Simple Storage Service (S3) as the storage mechanism for Alfresco Content Services, 
allowing for virtually unlimited and inexpensive storage.

New features introduced in v3.1 are:

* S3 Content Store Subsystems
* S3MultipleBuckets subsystem configuration
* Changes to the S3 Connector configuration and properties

Two content store subsystems are provided out-of-the-box with this release: `S3OnPrem` and `S3`. 
The default subsystem that's enabled on installation is `S3OnPrem`. 
See [S3 Connector content store subsystems]({% link aws-s3/latest/config/index.md %}#content-store-subsystems) for more.

Other features introduced in previous versions include:

* Support for AWS S3 for on-premises installation of Alfresco Content Services (v2.1)
* [AWS S3 Standard - Infrequent Access (S3 IA) storage class](https://aws.amazon.com/s3/storage-classes/) support (v2.1)
* Refactored to use AWS SDK instead of old JetS3t libraries as it's less error prone (v2.0)
* [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/) support (v2.0)
* [AWS Key Management Service (KMS)](https://aws.amazon.com/kms/) support (v2.0)
* Storage path approach optimized for high-throughput reads and writes (v2.0)
* Handling incomplete multipart uploads abort (v2.0)

The AWS SDK provides better support, stability, and extensibility for developers, and is more actively maintained.

>**Important:** The S3 Connector 3.1 module can be applied to Alfresco Content Services 6.2 or later.

>**Important:** To leverage the full capabilities, it's recommended to run your Alfresco Content Services instance on Amazon's Elastic Compute Cloud (EC2), connected to Amazon's Simple Storage Service (S3). From S3 Connector 2.1 you can also use the S3 Connector with an Alfresco Content Services instance running on-premises, with [some limitations]({% link aws-s3/latest/config/index.md %}#onpremconfig). Other devices or services that advertise as being S3 compatible have not been tested and aren't supported.

The following diagram shows a simple representation of how Alfresco Content Services and the S3 Connector interact with AWS S3.

![]({% link aws-s3/images/s3-simple-architecture.png %})


