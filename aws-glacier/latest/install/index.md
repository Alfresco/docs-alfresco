---
title: Install Glacier Connector
---

Use this information to install the Glacier Connector. You install the Glacier Connector by using an Alfresco Module Package (AMP).

## Prerequisites

There are a number of software requirements for installing the Glacier Connector. It can only be installed using an Alfresco Module Package (AMP) file.

### Alfresco requirements

* Alfresco Content Services - [installed using the distribution zip]({% link content-services/latest/install/zip/index.md %})

* Alfresco Content Connector for AWS S3 - [installed and configured]({% link aws-s3/latest/install/index.md %})

* (Optional) Alfresco Governance Services - [installed using the distribution zip]({% link governance-services/latest/install/zip.md %})

See [Supported Platforms]({% link aws-glacier/latest/support/index.md %}) for more information.

> **Note:** You don't need to install Alfresco Governance Services to use the Glacier Connector with Alfresco Content Services. You must have an Alfresco Governance Services **license** to use the Glacier Connector, even if you don't intend to use Alfresco Governance Services. If you plan to use Alfresco Governance Services with the Glacier Connector, ensure that you read the [Glacier Connector FAQs]({% link aws-glacier/latest/using/index.md %}) before you proceed.

> **Important:** If you're already using Amazon S3 with WORM storage, you're unable to use the Glacier Connector. Amazon S3 with WORM storage requires that you use multiple buckets, which is not supported by the Glacier Connector. See [Configuring multiple buckets using S3 Connector]({% link aws-s3/latest/config/index.md %}#multibucketconfig) for more.

### AWS related requirements

To use the S3 Connector and Glacier Connector you need an AWS account. See [AWS](https://aws.amazon.com/){:target="_blank"} for more information.

## Installing using AMP file

These steps describe how to install the Glacier Connector to an instance of Alfresco Content Services when you installed it using a distribution zip. The Glacier Connector is packaged as an Alfresco Module Package (AMP) file and is installed using the Module Management Tool (MMT).

When you purchase the Glacier Connector, a support case is created with the AMP file attached. If you no longer have access to the AMP file, or you didn't receive a case notification, raise a new case through [Hyland Community](https://community.hyland.com/){:target="_blank"}.

1. Stop Alfresco Content Services.

2. Use the Module Management Tool (MMT) to install the `alfresco-glacier-connector-repo-2.2.x.amp` file into the repository WAR (`alfresco.war`).

    See the Alfresco Content Services documentation for [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

3. Restart Alfresco Content Services.

## Creating a lifecycle rule in Amazon S3

These steps describe how to use the AWS Management Console to create a lifecycle rule in Amazon S3. The lifecycle rule allows you to manage the archiving of your files to Amazon S3 Glacier.

> **Note:** Ensure you have the required AWS login credentials before you begin.

1. Log in to your AWS Management Console and then open the **S3 console**.

2. Search for and select the S3 bucket you want to use as your Amazon S3 Glacier content store.

3. Select the **Management** tab.

4. Click **Add lifecycle rule**.

    This creates a lifecycle rule to define how Amazon S3 manages your files stored in an S3 bucket.

5. Enter a name for the rule.

6. Add the following tag and then press **Enter**:

    ```text
    archive | now
    ```

7. Click **Next**.

8. Select **Current version**.

9. From the **Object creation** list select **Transition to Amazon Glacier after**.

10. Enter **0** for **Days after creation** and then Click **Next**.

    Even when a transition of 0 days has been entered there may still be a minor delay.

11. Ensure **Current version** is the only item selected and then click **Next**.

12. Review your lifecycle rule and then click **Save**.

These steps can also be performed using the Amazon S3 API. For more information, see:

* [PUT Bucket lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycleConfiguration.html){:target="_blank"}
* [Examples of Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-configuration-examples.html){:target="_blank"}
