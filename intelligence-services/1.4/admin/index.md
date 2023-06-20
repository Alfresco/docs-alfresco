---
title: Administer Intelligence Services
---

This information provides an overview of Intelligence Services, and helps you to monitor and administer it.

## Intelligence Services architecture

This topic describes the key components of Intelligence Services, and the flow of information between the repository and these components.

### Components of the Intelligence Services module

The main components of the Intelligence Services are:

* **Content Repository (ACS)**: This is the repository where documents and other content resides. The repository produces and consumes events destined for the message broker (such as ActiveMQ or Amazon MQ). It also reads and writes documents to the shared file store. AI overrides for the content repository (via an AMP), Digital Workspace (using a configuration file), and Share (via an AMP) are required to work with the Intelligence Services module.
* **ActiveMQ**: This is the message broker (either a self-managed ActiveMQ instance or Amazon MQ), where the repository and the Transform Router send image transform requests and responses. These JSON-based messages are then passed to the Transform Router.
* **Transform Router**: The Transform Router allows simple (single-step) and pipeline (multi-step) transforms that are passed to the Transform Engines. The Transform Router (and the Transform Engines) run as independently scalable Docker containers. This requires an AI override to work with the Intelligence Services module.
* **Transform Engines**: The Transform Engines transform files referenced by the repository and retrieved from the shared file store. Here are some example transformations for each Transform Engine (this isn't an exhaustive list):
  * LibreOffice (e.g. docx to pdf)
  * ImageMagick (e.g. resize)
  * Alfresco PDF Renderer (e.g. pdf to png)
  * Tika (e.g. docx to plain text)
  * AI Transform Engine (e.g. extracts data from images, such as png, jpeg, gif & tiff, and text from various file types such as pdf, docx, xlsx, pptx, etc.). Note that Comprehend can't process images directly, so the rendition is produced by using multi-step transforms. For example, Textract gets the text from an image, that can then be processed by Comprehend. For a list of supported transformations, see `ai-pipeline-routes.json` (included in the Intelligence Services distribution zip). The data extracted by the AI Engine is saved as AI aspects in the original source file.
* **Shared File Store**: This is used as temporary storage for the original source file (stored by the repository), intermediate files for multi-step transforms, and the final transformed target file. The target file is retrieved by the repository after it's been processed by one or more of the Transform Engines.

The following diagram shows a simple representation of the Intelligence Services components:

![Simple architecture for Intelligence Services]({% link intelligence-services/images/ai-simple-arch.png %})

This shows an example implementation of how you can deploy into AWS, using a number of managed services:

* Amazon EKS - Elastic Container Service for Kubernetes
* Amazon MQ - Managed message broker service for [Apache ActiveMQ](https://activemq.apache.org/){:target="_blank"}
* Amazon EFS - Amazon Elastic File System

You can replace the AWS services (EKS, MQ, and EFS) with a self-managed Kubernetes cluster, ActiveMQ (configured with failover), and a shared file store, such as NFS.

### Integrated AWS Services

The Intelligence Services module integrates four different AWS services:

* [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/comprehend-general.html){:target="_blank"} for text analysis
* [Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html){:target="_blank"} for image analysis
* [Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/what-is.html){:target="_blank"} for text detection and form analysis of fields (key-value pairs) including check boxes
* [Amazon Transcribe](https://aws.amazon.com/transcribe/){:target="_blank"} for transcribing text from video and audio files

Alfresco Intelligence Services requests renditions for all four services (Comprehend, Rekognition, Textract, and Transcribe), using the default configuration. However, the API processing calls only take place for the relevant AWS service. From the release of version 1.1, you can configure the requested renditions.

Before you can add these services to your deployment, some configuration is first required in AWS. The details are covered in the [installation guide]({% link intelligence-services/1.4/install/index.md %}).

## Analysis using AWS services

The following sections summarize the key features provided by each AWS service. The details are covered in the [installation guide]({% link intelligence-services/1.4/install/index.md %})

### Amazon Comprehend

Amazon Comprehend allows you to analyze text by using natural language processing (NLP) to extract insights from your content.

It develops insights by recognizing common elements in your content into a number of content types, such as:

* entities (e.g. people, places, locations)
* language

> **Note:** This release of Alfresco Intelligence Services supports English only.

#### Prerequisites (Comprehend)

The general prerequisites for using Amazon Comprehend are documented in [Getting Started with Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/getting-started.html){:target="_blank"}. Since the Transform Engine has to use asynchronous jobs for large text files, some additional setup is required to get the service working correctly. This is covered in the later configuration section.

#### Supported regions (Comprehend)

See the list of supported AWS regions where Amazon Comprehend is [available](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}.

#### Limits (Comprehend)

Synchronous operations have a limit of 5KB (5000 bytes). The encoding of the content must be UTF-8. Note that Amazon Comprehend may store the analyzed content in order to continuously improve the quality of its analysis models.

To bypass the limit for synchronous calls, we use batch operations which analyze a set of up to 25 documents (maximum). Each individual document has the same limit of 5KB, which means that the Transform Engine is able to work synchronously with documents up to 25x5 = 125KB.

To process documents larger than 125KB, we use asynchronous operations that go via an S3 bucket setup for Intelligence Services and Comprehend.

See the AWS site for more details: [Guidelines and Quotas](https://docs.aws.amazon.com/comprehend/latest/dg/guidelines-and-limits.html){:target="_blank"}, [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html#limits_amazon_comprehend){:target="_blank"}.

#### Configuration (Comprehend)

You'll need to create an AWS Identity and Access Management (IAM) role with the correct permissions to control access to AWS services and resources.

There's a setting for the level of confidence that Amazon Comprehend has in the accuracy of the extracted content. This is defined as the minimum confidence level and has a default value of 80%.

### Amazon Rekognition

Amazon Rekognition makes it easy to add image analysis to your applications.

This service can identify the following in images:

* objects (e.g. flower, tree, or table)
* events (e.g. a wedding, graduation, or birthday party)
* concepts (e.g. a landscape, evening, and nature)

#### Prerequisites (Rekognition)

The general prerequisites to use Amazon Rekognition are documented in [Getting Started with Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/getting-started.html){:target="_blank"}. The configuration is simpler that Amazon Comprehend as you don't need to use asynchronous operations.

#### Supported regions (Rekognition)

See the list of supported AWS regions where Amazon Rekognition is [available](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}.

#### Limits (Rekognition)

There are a number of limits that relate to Amazon Rekognition:

* Amazon Rekognition supports the PNG and JPEG image formats. So the images provided as input to various API operations, such as `DetectLabels`, must be in one of the supported formats.
* Images up to 5 MB are passed directly as raw bytes. Images over 5 MB go via an S3 bucket setup for Intelligence Services and Rekognition. The maximum image size allowed by Rekognition is limited to 15 MB.
* The minimum image size is 80 pixels for both height and width.

See the AWS site for more details: [Limits in Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/limits.html){:target="_blank"}, [Amazon Rekognition service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html#limits_rekognition){:target="_blank"}.

#### Configuration (Rekognition)

You'll need to create an AWS Identity and Access Management (IAM) role with the correct permissions to control access to AWS services and resources.

There's a setting for the level of confidence that Amazon Rekognition has in the accuracy of the extracted content. This is defined as the minimum confidence level and has a default value of 80%.

### Amazon Textract

Amazon Textract makes it easy to add text detection and analysis of your content to your applications.

This service can detect text in a variety of documents (such as financial reports, medical records, and tax forms). For documents with structured data, the following can be detected:

* Forms with their fields and values
* Tables with their cells

#### Prerequisites (Textract)

The general prerequisites to use Amazon Textract are documented in [Getting Started with Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/getting-started.html){:target="_blank"}.

#### Supported regions (Textract)

See the list of supported AWS regions where Amazon Textract is [available](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}.

#### Limits (Textract)

There are a number of limits that relate to Amazon Textract:

* Amazon Textract synchronous operations (`DetectDocumentText` and `AnalyzeDocument`) support the PNG and JPEG image formats. The maximum document image (JPG/PNG) size is 5 MB.
* Asynchronous operations (`StartDocumentTextDetection`, `StartDocumentAnalysis`) also support the PDF file format. The maximum PDF file size is 500 MB, and a maximum of 3000 pages.
  * To process PDF documents, we use asynchronous operations that go via an S3 bucket setup for Intelligence Services and Textract.
  * The maximum number of concurrent jobs for all asynchronous operations is 1.

See the AWS site for more details on service limits: [Limits in Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/limits.html){:target="_blank"}.

#### Configuration (Textract)

You'll need to create an AWS Identity and Access Management (IAM) role with the correct permissions to control access to AWS services and resources.

There's a setting for the level of confidence that Amazon Textract has in the accuracy of the extracted content. This is defined as the minimum confidence level and has a default value of 80%.

### Amazon Transcribe

Amazon Transcribe makes it easy for you to generate speech to text from your video and audio files to your applications.

This service can be used to convert video and audio data into text files which can then be searched for key words or used as closed captions on your videos and audio files.

#### Prerequisites (Transcribe)

The general prerequisites to use Amazon Transcribe are documented in [Getting Started with Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/getting-started.html){:target="_blank"}.

#### Supported regions (Transcribe)

See the list of supported AWS regions where Amazon Transcribe is [available](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}.

#### Limits (Transcribe)

See the AWS site for more details on service limits: [Limits in Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/limits-guidelines.html){:target="_blank"}.

#### Configuration (Transcribe)

You'll need to create an AWS Identity and Access Management (IAM) role with the correct permissions to control access to AWS services and resources.

See the AWS site for transcription accuracy information [Improving domain-specific transcription accuracy with custom language models
](https://docs.aws.amazon.com/transcribe/latest/dg/custom-language-models.html){:target="_blank"}.
