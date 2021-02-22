---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Encryption overview

Alfresco supports server-side encryption for content stored in AWS S3. There are several encryption types that you can configure to use with S3 Connector. These include AWS Managed Encryption, and AWS Key Management Service \(KMS\) Encryption.

**Note:** S3 doesn't work with the [Alfresco Content Encryption](http://docs.alfresco.com/5.2/concepts/encrypted-overview.html) module. When using the S3 Connector we recommend using AWS KMS.

**AWS Key Management Service \(KMS\) Encryption**

The AWS name is Server-Side Encryption with AWS KMS Managed Keys \(SSE-KMS\).

SSE-KMS is similar to SSE-S3, but with some additional benefits plus additional charges for using this service. There are separate permissions for the use of an envelope key \(that is, a key that protects your data's encryption key\) that provides added protection against unauthorized access to your content in S3. SSE-KMS also provides an audit trail of when your key was used and by whom. You also have the option to create and manage encryption keys yourself, or use a default key that is unique to you, the service you're using, and the region you're working in.

For more information, see [Protecting Data Using Server-Side Encryption with AWS KMS-Managed Keys \(SSE-KMS\)](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html).

**Customer-Provided Key Encryption**

The AWS name is Server-Side Encryption with Customer-Provided Keys \(SSE-C\). This type of key allows you to protect your data at rest, setting your own encryption keys.

This option isn't supported by the S3 Connector.

For more information, see [Protecting Data Using Server-Side Encryption with Customer-Provided Encryption Keys \(SSE-C\)](http://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html).

**AWS Managed Encryption**

This is the default encryption mechanism for the S3 Connector. The AWS name is S3-Managed Encryption Keys \(SSE-S3\).

Amazon S3 encrypts each object with a unique key. As an additional safeguard, it encrypts the key itself with a master key that it regularly rotates. Amazon S3 server-side encryption uses one of the strongest block ciphers available, 256-bit Advanced Encryption Standard \(AES-256\), to encrypt data.

For more information, see [Protecting Data Using Server-Side Encryption with Amazon S3-Managed Encryption Keys \(SSE-S3\)](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html).

**Unencrypted**

Storing your content unencrypted isn't recommended.

**Parent topic:**[Configuring AWS Key Management Service](../tasks/s3-contentstore-kms-config.md)

