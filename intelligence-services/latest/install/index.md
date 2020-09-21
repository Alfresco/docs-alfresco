---
title: Install Intelligence Services
---

The AI capability in Alfresco Intelligence Services is delivered as a distribution zip and Docker image. The zip contains the AIS extensions as repository and Share AMP files, and a number of configuration files. The Docker image provides an AI T-Engine for connecting with Amazon AI Services.

In this section you'll install and set up everything you need to run Intelligence Services. To get started:

* Review the prerequisites
* [Set up services in AWS]({% link intelligence-services/latest/install/setup.md %})
* [Install Intelligence Services]({% link intelligence-services/latest/install/zip.md %})

## Prerequisites

* Make sure that you've tested your deployment with non-AI transforms and everything is working
* See [Supported Platforms]({% link intelligence-services/latest/support/index.md %}) for more

### Access to Docker images

* A [Quay.io](https://quay.io/){:target="_blank"} account is needed to pull Docker images that are needed for Intelligence Services.

> **Note:** Alfresco customers can request Quay.io credentials by logging a ticket at [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

> **Note:** Make sure that you request credentials for Alfresco Content Services and Alfresco Intelligence Services, so that you can use the additional `alfresco-ai-docker-engine-1.2.x` Docker image.

### AWS related requirements

To use Alfresco Intelligence Services, you need:

* An AWS account so that you can configure the Amazon AI services
* Follow the guidelines in [Set up services in AWS]({% link intelligence-services/latest/install/setup.md %})

### Limitations

* [Amazon Comprehend](https://aws.amazon.com/comprehend/faqs/){:target="_blank"} supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. For cost information, see [Amazon Comprehend Pricing](https://aws.amazon.com/comprehend/pricing/){:target="_blank"}.
* [Amazon Rekognition](https://aws.amazon.com/rekognition/faqs/){:target="_blank"} supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. For cost information, see [Amazon Rekognition Pricing](https://aws.amazon.com/rekognition/pricing/){:target="_blank"}.
* [Amazon Textract](https://aws.amazon.com/textract/faqs/) supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. For cost information, see [Amazon Textract Pricing](https://aws.amazon.com/textract/pricing/){:target="_blank"}.

You can also check the [AWS Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/){:target="_blank"} for all AWS global infrastructure.

> **Important:** Choose a common region that supports the Amazon AI Services that you wish to use.

### S3 buckets

You'll need to create a separate S3 bucket to use with the Amazon AI Services. It also needs to be in a common region that's supported by all the Amazon AI Services that you intend to use.

If you have an existing deployment that uses Alfresco Content Connector for AWS S3, it's recommended that you create a separate S3 bucket to use with Intelligence Services.

> **Important:** Create the AI S3 bucket in the same region as you intend to deploy Intelligence Services.
