---
title: Install Content Connector for AWS Glacier
---

Use this information to install the Glacier Connector. You install the Glacier Connector by using an 
Alfresco Module Package (AMP).

## Prerequisites 

There are a number of software requirements for installing the Glacier Connector. It can only be installed using an 
Alfresco Module Package (AMP) file.

>**Important:** You are unable to use the Glacier Connector if you are already using Amazon S3 with WORM storage. Amazon S3 with WORM storage requires that you use multiple buckets which is not supported by the Glacier Connector. For more see [Configuring multiple buckets using S3 Connector](TODO_LINK:https://docs.alfresco.com/s3connector/concepts/s3-contentstore-multiple-buckets.html).

**Alfresco Content Services**

* Alfresco Content Services 6.2 or later, installed using the distribution zip. See [Installing using distribution zip](TODO_LINK:https://docs.alfresco.com/6.2/concepts/ch-install.html) and [Supported Platforms]({% link aws-glacier/latest/support/index.md %}) for more information.

**Alfresco Governance Services**

* Alfresco Governance Services 3.2 or later, installed using the distribution zip. See [Installing Governance Services using the Distribution zip](TODO_LINK:https://docs.alfresco.com/ags/tasks/rm-amp-install.html) and [Supported Platforms]({% link aws-glacier/latest/support/index.md %}) for more information.

    >**Note:** You do not need to install Alfresco Governance Services to use the Glacier Connector with Alfresco Content Services. You must have an Alfresco Governance Services license to use the Glacier Connector, even if you do not intend to use Alfresco Governance Services. If you intend to use Alfresco Governance Services with the Glacier Connector, ensure that you read the [Glacier Connector FAQs]({% link aws-glacier/latest/using/faq.md %}) before you proceed.

**Alfresco Content Connector for AWS S3**

* Alfresco Content Connector for AWS S3 3.1 or later, already configured to work with Alfresco Content Services. See [Alfresco Content Connector for AWS S3](TODO_LINK:https://docs.alfresco.com/s3connector/concepts/s3-contentstore-overview.html) for more information.

**AWS related requirements**

To use the S3 Connector and Glacier Connector you need an AWS account. See [AWS](https://aws.amazon.com/) for more information.

## Installing using AMP file

These steps describe how to install the Glacier Connector to an instance of Alfresco Content Services when you installed 
it using a distribution zip. The Glacier Connector is packaged as an Alfresco Module Package (AMP) file and is 
installed using the Module Management Tool (MMT).

When you purchase the Glacier Connector, a support case is created with the AMP file attached. If you no longer have 
access to the AMP file, or you didn’t receive a case notification, raise a new case through the 
[Support Portal](https://support.alfresco.com).

1.  Stop Alfresco Content Services.

2.  Use the Module Management Tool (MMT) to install the `alfresco-glacier-connector-repo-2.1.x.amp` file into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)](TODO_LINK:http://docs.alfresco.com/6.2/concepts/dev-extensions-modules-management-tool.html) and [Installing an Alfresco Module Package](TODO_LINK:http://docs.alfresco.com/6.2/tasks/amp-install.html).

3.  Restart Alfresco Content Services.

## Creating a lifecycle rule in Amazon S3

These steps describe how to use the AWS Management Console to create a lifecycle rule in Amazon S3. 
The lifecycle rule allows you to manage the archiving of your files to Amazon S3 Glacier.

>**Note:** Ensure you have the required AWS login credentials before you begin.

1.  Log in to your AWS Management Console and then open the **S3 console**.

2.  Search for and select the S3 bucket you want to use as your Amazon S3 Glacier content store.

3.  Select the **Management** tab.

4.  Click **Add lifecycle rule**.

    This creates a lifecycle rule to define how Amazon S3 manages your files stored in an S3 bucket.

5.  Enter a name for the rule.

6.  Add the following tag and then press **Enter**:

    `archive | now`

7.  Click **Next**.

8.  Select **Current version**.

9.  From the **Object creation** list select **Transition to Amazon Glacier after**.

10. Enter **0** for **Days after creation** and then Click **Next**.

    Even when a transition of 0 days has been entered there may still be a minor delay.

11. Ensure **Current version** is the only item selected and then click **Next**.

12. Review your lifecycle rule and then click **Save**.

    These steps can also be performed using the Amazon S3 API. See [PUT Bucket lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTlifecycle.html) and [Examples of Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-configuration-examples.html) for more information.

