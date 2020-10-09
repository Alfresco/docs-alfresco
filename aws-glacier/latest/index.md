---
title: Alfresco Content Connector for AWS Glacier
---

The Alfresco Content Connector for AWS Glacier (Glacier Connector) works in conjunction with the 
Alfresco Content Connector for AWS S3 (S3 Connector) and enables access to Amazon S3 Glacier.

Amazon S3 Glacier is a storage service optimized for infrequently used data, and it suits the long term storage 
of archive and backup data. Amazon S3 Glacier gives you a number of retrieval options, offering different levels 
of retrieval speed. See [Understanding Amazon S3 Glacier retrieval tiers](TODO:glacier-storage-tiers.md) for more 
information on retrieval types.

Amazon S3 Glacier is supported with Alfresco Content Services and Alfresco Governance Services. 
See [Glacier Connector FAQs](TODO:../references/glacier-faq.md) for more information.

>**Note:** The Glacier Connector is not available for the Alfresco Community Edition versions of the products.

The following diagram shows a simple representation of how Alfresco Content Services, Alfresco Governance Services, 
the S3 Connector and the Glacier Connector interact with Amazon S3 (Amazon Simple Storage Service). 
The S3 Connector connects you with Amazon S3 and the Glacier Connector allows you to connect with Amazon S3 Glacier.

![glacier-architecture]({% link aws-glacier/images/glacier-architecture.png %})
