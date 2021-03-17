---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring AWS Key Management Service

AWS Key Management Service \(KMS\) is a managed service that makes it easy for you to create and control the encryption keys used to encrypt your content.

The primary resources in AWS KMS are customer master keys \(CMKs\). These are either customer-managed or AWS-managed. You can use either type of CMK to protect data encryption keys \(or data keys\) which are then used to encrypt or decrypt content stored by Alfresco Content Services in AWS S3. CMKs never leave AWS KMS unencrypted, but data keys can.

For more details, see [AWS KMS Concepts](http://docs.aws.amazon.com/kms/latest/developerguide/concepts.html) and [How Envelope Encryption Works with Supported AWS Services](http://docs.aws.amazon.com/kms/latest/developerguide/workflow.html).

To learn more about how AWS KMS uses cryptography and secures master keys, see the [AWS Key Management Service Cryptographic Details whitepaper](https://d0.awsstatic.com/whitepapers/KMS-Cryptographic-Details.pdf).

The S3 Connector provides the following encryption options:

|Property setting|Description|
|----------------|-----------|
|`s3.encryption=` `s3.encryption=none`

|The content stored in S3 is unencrypted. **Note:** Storing your content unencrypted isn't recommended.

|
|`s3.encryption=aes256`|The content store is encrypted using AWS managed encryption.|
|`s3.encryption=kms`|The content store is encrypted using AWS KMS managed encryption.|

**Note:** If the `s3.encryption` property is missing, then the content store is **AES256** encrypted by AWS-managed encryption.

For more information about each of these encryption options, see the [Encryption overview](../concepts/s3-contentstore-encrypt.md).

You can configure AWS KMS by adding the relevant properties to the global properties file.

1.  Edit `alfresco-global.properties` to set the server-encryption algorithm to KMS:

    ```
    s3.encryption=kms
    ```

    If you plan to use the AWS-managed default master key then continue from step 4.

2.  To use a customer master key, either [create a new KMS key](http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) using the AWS steps, or use a CMK by [importing your existing key material](http://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html).

3.  Edit `alfresco-global.properties` and set the value of `s3.awsKmsKeyId` property to the key alias \(see example\) or the Amazon Resource Name \(ARN\) of the KMS key created.

    ```
    s3.awsKmsKeyId=alias/kmsKeyAlias
    ```

    You can leave the property empty in order to use the default master key attached to your account.

4.  You are now ready to start Alfresco Content Services.


-   **[Encryption overview](../concepts/s3-contentstore-encrypt.md)**  
Alfresco supports server-side encryption for content stored in AWS S3. There are several encryption types that you can configure to use with S3 Connector. These include AWS Managed Encryption, and AWS Key Management Service \(KMS\) Encryption.

**Parent topic:**[Configuring the S3 Connector](../tasks/s3-contentstore-config.md)

