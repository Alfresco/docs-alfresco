---
title: Troubleshoot Intelligence Services
---

Use this information to help troubleshoot Intelligence Services.

Make sure that Alfresco Transform Service is working before testing Alfresco Intelligence Services. See [Troubleshoot Transform Service]({% link transform-service/latest/admin/index.md %}#troubleshoot-transform-services) for more.

## Why don't I see any extracted metadata (AI properties)?

Check that your configured rule adds the desired AI aspects to extract and **Requests AI renditions**.

* For Rekognition, you need to add the **AI Labels** aspect.
* For Comprehend, you need to add one or more of the other AI aspects (AI People, AI Organizations, etc.) or all nine of them, if desired.

## I've added AI aspects and requested AI renditions but I'm still not seeing any extracted AI data. Which logs can I refer to see if anything is failing?

First, check the Alfresco Transform Service is running for a document transform (e.g. docx to pdf). See [Troubleshoot Transform Service]({% link transform-service/latest/admin/index.md %}#troubleshoot-transform-services) for more.

Next, check the logs for each microservice (container) including the Transform Router and AI Transform Engine. You can also check ActiveMQ queues to see the Transform Requests / Replies.

## Why don't I see a Rekognition image analysis?

Check the service logs for the Transform Router and AI Transform Engine. You may see the following error:

```bash
Source File size or mime type is not within allowable limits
```

Here's a snippet from the logs:

```bash
aws-ai_1 | 2019-03-26 14:01:43.595 ERROR 1 --- [enerContainer-4] o.a.t.AbstractTransformerController :
 Failed to perform transform (Exception), sending TransformReply{requestId='5575d683-5a7e-476c-9c1c-14e071cbc85b',
 status=500, errorDetails='Failed at processing transformation - AIClientException: [AWS Rekognition Label Detection]
 Source file too large to perform operation on', sourceReference='b75a08b8-17b1-4612-ba65-5ecd582a23e0',
 targetReference='null', clientData='workspace://SpacesStore/67ff9be4-7596-4ddb-bead-929366262e2f aiLabels
 1337801886 mjackson 1553608903465 304 jpg json-ailabels', schema=1, internalContext=InternalContext{multiStep=null,
 attemptedRetries=0, currentSourceMediaType='image/jpeg', currentTargetMediaType='application/vnd.alfresco.ai.labels.v1+json',
 currentSourceSize=21202469, transformRequestOptions={maxLabels=1000, minConfidence=0.8, transform=TikaAuto,
 includeContents=false, notExtractBookmarksText=true, targetMimetype=text/plain, targetEncoding=UTF-8}}}
aws-ai_1 |
aws-ai_1 | org.alfresco.transformer.ai.exception.AIClientException: [AWS Rekognition Label Detection] Source file too large to
 perform operation on
aws-ai_1 | at org.alfresco.transformer.ai.client.AwsRekognitionLabelDetectionRequestFactory.createDetectLabelsRequest(
 AwsRekognitionLabelDetectionRequestFactory.java:88) ~[alfresco-ai-image-analysis-0.4.0.jar!/:na]
```

If the image file size is larger than 15 MB then it'll be skipped. See [Amazon Rekognition limits]({% link intelligence-services/1.5/admin/index.md %}#amazon-rekognition) for more.

## Why don't I see a Comprehend text analysis?

Check the service logs for the Transform Router and AI Transform Engine.

If you see the request but not the response, then check if the text file is larger than 125 KB. If so, it may take some time for the asynchronous response. Check again after 5 to 15 minutes.

Verify that you have correctly configured the AWS Comprehend Role to allow the Comprehend service read/write access to the S3 bucket used to temporarily store source files and results.

See [Amazon Comprehend limits]({% link intelligence-services/1.5/admin/index.md %}#amazon-comprehend) and [Role-Based Permissions Required for Asynchronous Operations](https://docs.aws.amazon.com/comprehend/latest/dg/access-control-managing-permissions.html#auth-role-permissions){:target="_blank"} for more.

## Why don't I see a Textract image / text analysis?

Check the service logs for the Transform Router and AI Transform Engine. You may see the following error:

```bash
Source File size or mime type is not within allowable limits
```

Here's a snippet from the logs:

```bash
aws-ai_1 | 2019-03-26 13:47:24.848 ERROR 1 --- [enerContainer-5] o.a.t.AbstractTransformerController :
 Failed to perform transform (Exception), sending TransformReply{requestId='5fda6718-27b0-4289-b968-88a6f3bc3fb8',
 status=500, errorDetails='Failed at processing transformation - AIApplicationParameterException: Source File size
 or mime type is not within allowable limits', sourceReference='d36c0d14-06fb-4648-b72a-439af16d7f12',
 targetReference='null', clientData='workspace://SpacesStore/26522de2-6aa5-400c-b670-130dccd010c5 aiTextract
 -1927981676 mjackson 1553607988261 244 png json-aitextract', schema=1, internalContext=InternalContext{multiStep=null,
 attemptedRetries=2, currentSourceMediaType='image/png', currentTargetMediaType='application/vnd.alfresco.ai.textract.v1+json',
 currentSourceSize=12398590, transformRequestOptions={minConfidence=0.8, timeout=910000, transform=TikaAuto,
 includeContents=false, notExtractBookmarksText=true, targetMimetype=text/plain, targetEncoding=UTF-8}}}
aws-ai_1 |
aws-ai_1 | org.alfresco.transformer.ai.exception.AIApplicationParameterException: Source File size or mime type is not
 within allowable limits
aws-ai_1 | at org.alfresco.transformer.ai.service.AwsTextractTransformer.transformInternal(AwsTextractTransformer.java:87)
 ~[alfresco-ai-image-text-analysis-0.4.0.jar!/:na]
```

If the image file size is larger than 5 MB then it'll be skipped. See [Amazon Textract limits]({% link intelligence-services/1.5/admin/index.md %}#amazon-textract) for more.

## Why do I see an AWS error when I upload a test folder of test files (e.g. via drag and drop)?

```bash
com.amazonaws.services.textract.model.ProvisionedThroughputExceededException: Provisioned rate exceeded (Service: AmazonTextract;
 Status Code: 400; Error Code: ProvisionedThroughputExceededException; Request ID: fef613f2-2e96-4f03-afd9-936a22dbff36)
```

This is likely to be a limitation of the Textract limits. Check the rate limits in the [Amazon Textract documentation](https://docs.aws.amazon.com/textract/latest/dg/limits.html){:target="_blank"}.

## What file formats/media types can be passed to the AWS services for processing?

The following file types can be passed and processed by AWS services.

**Images** (jpg, png, gif, tiff) are processed by Rekognition and Textract:

* jpg & png are sent directly to Rekognition & Textract.
* gif is converted to jpg (by the Alfresco Transform Engines), and then sent to Rekognition & Textract.
* tiff is converted to gif, then converted to jpg (by the Alfresco Transform Engines), and then sent to Rekognition & Textract.

**Text** (txt) is processed by Comprehend

**Pdf** is processed by Comprehend & Textract:

* pdf is converted to txt (by the Alfresco Transform Engines), and then sent to Comprehend.
* pdf is also sent directly to Textract.

**Office docs** (word, excel, powerpoint & outlook msg) are processed by Comprehend & Textract:

* doc is converted to txt (by the Alfresco Transform Engines), and then sent to Comprehend.
* doc is also converted to pdf and then sent to Textract.

You'll find a summary of the Transform Router configuration properties in `ai-pipeline-routes.json`, which is included in the Intelligence Services distribution zip file.

## I'm getting a lot of inaccurate metadata, what can I do?

The current default on minimum confidence levels is set at 80%.

See [Configuring the minimum confidence level]({% link intelligence-services/1.5/install/index.md %}#configure-minimum-confidence-level) for more.

## Which Amazon AI/ML APIs are used for processing?

For Comprehend, we use the Language Detection and Entity Recognition APIs. See the [Amazon Comprehend Features](https://aws.amazon.com/comprehend/features/){:target="_blank"} for more details.

For Rekognition, we use the Object and Scene Detection APIs. See the [Amazon Rekognition Features](https://aws.amazon.com/rekognition/image-features/){:target="_blank"} for more details.

For Textract, we use the Synchronous Operations APIs. See the [Amazon Textract Features](https://docs.aws.amazon.com/textract/latest/dg/how-it-works.html){:target="_blank"} for more details.

## Where can I get more information on the content data model for the AI rendition?

The data model is in a private GitHub project. Alfresco customers can request access to this project by logging a ticket with [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

## I might be having AWS credential errors, what can I check?

Check your AWS setup and configuration. This also appears in AI Transform Engine service log.

> **Note:** For security reasons, the AWS credentials in the logs are masked (i.e. only a few characters appear - similar to the AWS CLI).

## After starting Intelligence Services, and trying to request AI renditions, what AWS connection errors / exceptions might I see in the AI Transform Engine logs?

You may see one of the following errors:

```bash
* The security token included in the request is invalid
```

```bash
* The request signature we calculated does not match the signature you provided.
Check your AWS Secret Access Key and signing method
```

If you notice AWS connection errors for Rekognition, Comprehend and/or Textract, then check your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` carefully.

For example:

* A mistyped `AWS_ACCESS_KEY_ID` may cause an error such as "`The security token included in the request is invalid`".
* A mistyped `AWS_SECRET_ACCESS_KEY` may cause the error shown in the second example (above).

You may see other connection errors, for example, if neither `AWS_ACCESS_KEY_ID` nor `AWS_SECRET_ACCESS_KEY` has been set.

Also, if you're using Docker Compose, then you may find that setting or exporting environment variables overrides a local `.env` configuration file.

## What do I need to set up to access Amazon AI services: Comprehend, Rekognition & Textract?

See [Set up services in AWS]({% link intelligence-services/1.5/install/index.md %}) for more.

## How do the Amazon AI services access the content to be processed?

For very small files, the AWS synchronous APIs are called. However, for many files (see limits above) we may need to call the AWS asynchronous APIs. In this case, you'll need to set up an S3 bucket for asynchronous AWS calls, such that the AWS services can read the files to be processed.

We recommend the following setup:

* Use a different bucket than the one used by Content Services (when using Alfresco Content Connector for AWS S3).
* Create an S3 bucket in the same region as the Amazon AI services.
* For Comprehend, you also need to enable Comprehend to have write access to your S3 bucket for returning the results. This can be done by setting up an IAM role.

See [Set up services in AWS]({% link intelligence-services/1.5/install/index.md %}#set-up-services-in-aws) to configure AWS Identity and Access Management and the Amazon AI services.

## When is Amazon Elastic File System (EFS) used?

From the architecture diagram in the [Intelligence Services overview]({% link intelligence-services/1.5/admin/index.md %}), the Shared File Store (SFS) provides a mechanism for Content Services to send source files to the Transform Engines and receive target files from the Transform Engines. This includes the new AI Transform Engine that's used to call the Amazon AI services. In order to scale SFS for performance and reliability, it must be able to access a shared volume storage, such as managed EFS or self-managed NFS.

## I'm concerned about data privacy of the content that's processed by AWS. Do I have any control around this?

The AWS data privacy policies state that authorized AWS employees will have access to your content. Review the following AWS pages:

* [Comprehend Data Privacy Policy](https://aws.amazon.com/comprehend/faqs/#Data_privacy){:target="_blank"}
* [Rekognition Data Privacy Policy](https://aws.amazon.com/rekognition/faqs/#Data_Privacy){:target="_blank"}
* [Textract Data Privacy Policy](https://aws.amazon.com/textract/faqs/#Data_Privacy){:target="_blank"}

For Comprehend, Rekognition, and Textract, you can speak directly with your Account Manager at AWS and ask that when your content is passed for processing, it won't be used and stored for the improvement and development of their algorithms.

## What can you tell me about the performance of Intelligence Services?

The performance of this module is mostly dependent on the limitations around processing times and rates for Comprehend, Rekognition, Textract, and less dependent on the Alfresco components. The architecture of the Alfresco components for Intelligence Services are easily scalable to support larger ingestion of content going to Amazon, and also coming back from Amazon. We have internal benchmarking data on the Transform Service which can be referenced, if more information is requested.

## What happens if I leave the 'Request AI renditions' input text field empty?

The default renditions are requested (i.e. `aiFeatures`, `aiLabels`, `aiTextract`, `aiSpeechToText`, `webvtt`, and `aiPiiEntities`).

## What happens if I specify only one default AI rendition?

If you specify only one default AI rendition, such as `aiFeatures`, the other five renditions (`aiLabels`, `aiTextract`, `aiSpeechToText`, `webvtt`, and `aiPiiEntities`) are ignored. This may be really useful for saving costs if other renditions aren't required.

## Do I need to pay for the Amazon Textract service in my AWS account?

In previous versions of Intelligence Services, you could configure a folder rule to request AI renditions. This means that you'd have to pay for any files that are analyzed by Textract, Rekognition and/or Comprehend (depending on the media types and default routes).

Starting from version 1.1, Intelligence Services allows you to explicitly configure the folder rule to request a specific AI rendition (or set of AI renditions). This means that you don't have to use Textract. Note that if you don't specify a rendition, Intelligence Services defaults back to the version 1.0 behavior.

## Do I need to pay for the Amazon S3 service in my AWS account?

The Amazon S3 service is mandatory and required to use the complete functionality of Intelligence Services.

Alfresco Content Connector for AWS S3 is not specifically required for Intelligence Services. However, it can be purchased to use as an alternative content store when deploying Content Services.
