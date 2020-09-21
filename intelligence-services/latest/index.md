---
title: Alfresco Intelligence Services
---

Alfresco Intelligence Services is an add-on module that adds AI capabilities to Alfresco Content Services. It uses a number of Amazon AI Services (i.e. Amazon Comprehend, Amazon Rekognition, and Amazon Textract) as an additional AI Transform Engine. This documentation describes how to install, set up, and configure Intelligence Services.

The Intelligence Services module enables you to configure and use custom ML models (for Natural Language Processing), created in Amazon Web Services (AWS), to enrich content stored in Alfresco Content Services. This is done through an integration with the Amazon Comprehend Custom service. This release also enables you to configure information provided from Textract analysis to Alfresco Content Services content models as metadata properties. You can configure and extract the following information:

* Key-value pairs as metadata properties
  * Including the ability to map multiple keys into the same metadata property
  * Check boxes as metadata properties
* All raw lines of text as a metadata property

Other features introduced in previous versions include:

* [Amazon Comprehend Custom Entity Recognition](https://docs.aws.amazon.com/comprehend/latest/dg/custom-entity-recognition.html){:target="_blank"} support (v1.1)
* [Amazon Comprehend Custom Classification](https://docs.aws.amazon.com/comprehend/latest/dg/how-document-classification.html){:target="_blank"} support (v1.1)
* [Amazon Textract Custom Metadata Extraction](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html){:target="_blank"} support (v1.1)
* Configurable **Request AI renditions** action (v1.1)
* [Amazon Comprehend](https://aws.amazon.com/comprehend/faqs/){:target="_blank"} support (v1.0)
* [Amazon Rekognition](https://aws.amazon.com/rekognition/faqs/){:target="_blank"} support (v1.0)
* [Amazon Textract](https://aws.amazon.com/textract/faqs/){:target="_blank"} support (v1.0)
* Enrichment of content metadata (v1.0)
* Easier access to insights from unstructured content (v1.0)

> **Important:** The Intelligence Services module can be applied to Alfresco Content Services 6.2 or later. See [Supported platforms]({% link intelligence-services/latest/support/index.md %}) for more.

See [Intelligence Services architecture]({% link intelligence-services/latest/admin/index.md %}) for a general overview.
