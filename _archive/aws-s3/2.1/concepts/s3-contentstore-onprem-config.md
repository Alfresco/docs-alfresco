---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring S3 Connector on-premises

Use this information to configure the S3 Connector for an on-premises installation of Alfresco Content Services.

For on-premises customers, AWS S3 is often a more cost effective method to store your content, paying just for what you need and does not require you to budget up front for growth capacity.

The S3 Connector is supported as the default content store for Alfresco Content Services. When installed on-premises, existing content will remain accessible from your existing content store\(s\), and all new content is written to the S3 content store.

The following diagram shows a simple representation of how an on-premises \(on-prem\) deployment of Alfresco Content Services using the S3 Connector can interact with AWS S3.

![](../images/s3-onprem-architecture.png)

**Installation and configuration**

You can install and configure Alfresco Content Services and the S3 Connector on-premises using the default configuration. Follow the steps in [Installing and configuring the S3 Connector](s3-contentstore-install-intro.md), and the basic configuration steps in [Configuring the S3 Connector](../tasks/s3-contentstore-config.md).

**Note:** If you have existing content in a local content store, and you'd like to take advantage of the features provided by the S3 Connector, add the following property to `alfresco-global.properties`:

```
dir.contentstore=${dir.root}/contentstore
```

As an existing customer using the default [Encrypted content store](https://docs.alfresco.com/5.2/concepts/encrypted-cs-home.html) configuration, the environment uses:

-   AES256 encryption for new content
-   Content decryption on reads from the existing on-premises files

**Best practice**

In order to connect an on-premises instance of Alfresco Content Services to AWS S3, it's recommended that you use the default credentials file \(`~/.aws/credentials`\). This ensures that the `secretKey` and `accessKey` aren't exposed beyond what's absolutely necessary. Here's an example credentials file:

```
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY 
```

**Difference between running in AWS and running outside AWS**

The following table highlights the capabilities that are supported depending on your deployment scenario.

|Deployment|IAM|KMS|
|----------|---|---|
|New deployment \(on-prem\)|Supported via AWS API keys only|Supported|
|New deployment \(in AWS\)|Supported via Instance Profile|Supported|
|Existing deployment \(on-prem\)|Supported via AWS API keys only|Supported|
|Existing deployment \(in AWS\)|Supported via Instance Profile|Supported|

**Parent topic:**[Configuring the S3 Connector](../tasks/s3-contentstore-config.md)

