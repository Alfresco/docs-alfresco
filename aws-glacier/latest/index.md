---
title: Alfresco Content Connector for AWS Glacier
---

The Alfresco Content Connector for AWS Glacier (Glacier Connector) works in conjunction with the Alfresco Content Connector for AWS S3 (S3 Connector) and enables access to Amazon S3 Glacier.

Amazon S3 Glacier is a storage service optimized for infrequently used data, and it suits the long term storage of archive and backup data. Amazon S3 Glacier gives you a number of retrieval options, offering different levels of retrieval speed. See [Amazon S3 Glacier retrieval tiers](#retrieval-tiers) for more information on retrieval types.

Amazon S3 Glacier is supported with Alfresco Content Services and Alfresco Governance Services. See [Supported platforms]({% link aws-glacier/latest/support/index.md %}) and [Glacier Connector FAQs]({% link aws-glacier/latest/using/index.md %}) for more information.

> **Note:** The Glacier Connector is not available for the Alfresco Community Edition versions of the products.

> **Note:** Alfresco Content Connector for AWS Glacier 2.2 can be applied to Alfresco Content Services 6.2 - 7.1 only.

> **Important:** For customers who've previously used the **Archive** action in a folder rule to move content into AWS Glacier: this is no longer supported. **Customers wishing to continue using this functionality should not upgrade to Alfresco Content Services 7.2.** The S3 REST API provides support for moving content to AWS Glacier or content can be manually moved to Glacier via the AWS S3 tools.

The following diagram shows a simple representation of how Alfresco Content Services, Alfresco Governance Services, the S3 Connector and the Glacier Connector interact with Amazon S3 (Amazon Simple Storage Service). The S3 Connector connects you with Amazon S3 and the Glacier Connector allows you to connect with Amazon S3 Glacier.

![glacier-architecture]({% link aws-glacier/images/glacier-architecture.png %})

## Amazon S3 Glacier retrieval tiers {#retrieval-tiers}

Amazon S3 Glacier has three different retrieval tiers.

### Expedited retrieval

Expedited retrieval allows you to quickly access your data when you need to have almost immediate access to your information. This retrieval type can be used for archives up to 250MB. Expedited retrieval usually completes within 1 and 5 minutes.

### Standard retrieval

Standard retrieval provides access to any of your archives within several hours. Standard retrieval usually takes between 3 and 5 hours to complete.

### Bulk retrieval

Bulk retrieval is Amazon S3 Glacier's lowest-cost retrieval type. You can retrieve large amounts of data inexpensively. Bulk retrieval usually completes within 5 and 12 hours.

> **Note:** For more information on Amazon S3 Glacier retrieval tiers, see [Retrieving Glacier Archives](https://docs.aws.amazon.com/amazonglacier/latest/dev/downloading-an-archive-two-steps.html){:target="_blank"}.
