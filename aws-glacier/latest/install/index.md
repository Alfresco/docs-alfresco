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

-   Alfresco Content Services 6.2 or later, installed using the distribution zip. See [Installing using distribution zip](https://docs.alfresco.com/6.2/concepts/ch-install.html) and [Supported Platforms and Languages](https://www.alfresco.com/services/subscription/supported-platforms) for more information.

**Alfresco Governance Services**

-   Alfresco Governance Services 3.2 or later, installed using the distribution zip. See [Installing Governance Services using the Distribution zip](https://docs.alfresco.com/ags/tasks/rm-amp-install.html) and [Supported Platforms and Languages](https://www.alfresco.com/services/subscription/supported-platforms) for more information.

    >**Note:** You do not need to install Alfresco Governance Services to use the Glacier Connector with Alfresco Content Services. You must have an Alfresco Governance Services license to use the Glacier Connector, even if you do not intend to use Alfresco Governance Services. If you intend to use Alfresco Governance Services with the Glacier Connector, ensure that you read the [Glacier Connector FAQs](../references/glacier-faq.md) before you proceed.


**Alfresco Content Connector for AWS S3**

-   Alfresco Content Connector for AWS S3 3.1 or later, already configured to work with Alfresco Content Services. See [Alfresco Content Connector for AWS S3](https://docs.alfresco.com/s3connector/concepts/s3-contentstore-overview.html) for more information.

**AWS related requirements**

To use the S3 Connector and Glacier Connector you need an AWS account. See [AWS](https://aws.amazon.com/) for more information.
