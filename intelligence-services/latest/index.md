---
title: Alfresco Intelligence Services
---

Alfresco Intelligence Services is an add-on module that adds AI capabilities to Alfresco Content Services and the Digital Workspace. It utilizes a number of Amazon AI Services (i.e. Amazon Transcribe, Amazon Comprehend, Amazon Rekognition, and Amazon Textract) as an additional AI Transform Engine. This documentation describes how to install, set up, and configure Intelligence Services.

The Intelligence Services module enables you to configure and use custom ML models (for Natural Language Processing), created in Amazon Web Services (AWS), to enrich content stored in Content Services and the Digital Workspace. This is done through an integration with the Amazon Comprehend Custom service. With this new release transcripts for audio and video files, including indexing and metadata generation are provided automatically and this content can then be searched easily. Personal Identification Information (PII) in documents can be detected and tagged automatically which provides easier privacy management including automatic detection of PII entities.

Other features introduced in previous versions include:

* Key-value pairs as metadata properties (v1.2)
  * Including the ability to map multiple keys into the same metadata property
  * Check boxes as metadata properties
* All raw lines of text as a metadata property (v1.2)
* [Amazon Comprehend Custom Entity Recognition](https://docs.aws.amazon.com/comprehend/latest/dg/custom-entity-recognition.html){:target="_blank"} support (v1.1)
* [Amazon Comprehend Custom Classification](https://docs.aws.amazon.com/comprehend/latest/dg/how-document-classification.html){:target="_blank"} support (v1.1)
* [Amazon Textract Custom Metadata Extraction](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html){:target="_blank"} support (v1.1)
* Configurable **Request AI renditions** action (v1.1)
* [Amazon Comprehend](https://aws.amazon.com/comprehend/faqs/){:target="_blank"} support (v1.0)
* [Amazon Rekognition](https://aws.amazon.com/rekognition/faqs/){:target="_blank"} support (v1.0)
* [Amazon Textract](https://aws.amazon.com/textract/faqs/){:target="_blank"} support (v1.0)
* Enrichment of content metadata (v1.0)
* Easier access to insights from unstructured content (v1.0)

See [Intelligence Services architecture]({% link intelligence-services/latest/admin/index.md %}) for a general overview.
