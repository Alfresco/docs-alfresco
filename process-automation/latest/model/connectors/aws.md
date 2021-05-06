---
title: AWS connectors
---

There are five connectors that can be used to invoke different Amazon Web Services (AWS):

* [Lambda](#lambda)
* [Comprehend](#comprehend)
* [Rekognition](#rekognition)
* [Textract](#textract)
* [Transcribe](#transcribe)

All Amazon connectors are displayed on the process diagram with their respective AWS logos.

> **Important**: All AWS connectors require an AWS account with permission to access the features provided by Amazon. This account is separate to the Alfresco hosted environment and should be created and managed by customers.

## Lambda

The **INVOKE** action is used by the Lambda connector to invoke [Amazon Web Services (AWS) Lambda functions](https://aws.amazon.com/lambda/){:target="_blank"}.

The input parameters to invoke a Lambda function are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| function | String | *Required.* The name of the Lambda function to invoke, for example `lambda-2`. |
| payload | JSON | *Optional.* The payload that will be passed to the Lambda function as a JSON object. |

The output parameters from invoking a Lambda function are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| lambdaPayload | JSON | *Optional.* The Lambda function results payload. |
| lambdaStatus | Integer | *Optional.* The Lambda function invocation status code. |
| lambdaLog | String | *Optional.* The log produced during the function invocation. |

### Lambda configuration parameters

The configuration parameters for the Lambda connector are:

| Parameter | Description |
| --------- | ----------- |
| AWS_LAMBDA_AWS_ACCESS_KEY | *Required.* The access key to authenticate against AWS with. |
| AWS_LAMBDA_AWS_SECRET_KEY | *Required.* The secret key to authenticate against AWS with. |
| AWS_LAMBDA_AWS_REGION | *Required.* The region of AWS to invoke the Lambda functions in. |

### Lambda errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Lambda connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. | 
| INVALID_INPUT | The input variable has an invalid type. | 
| SERVICE_ERROR | The service encountered an internal error. | 
| INVALID_REQUEST | The request body could not be parsed as JSON. | 
| REQUEST_TOO_LARGE | The request payload exceeded the Invoke request body JSON input limit. | 
| UNKNOWN_ERROR | Unexpected runtime error. | 
| BAD_REQUEST | The server could not understand the request due to invalid syntax. | 
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. | 
| FORBIDDEN | The server understood the request but refuses to authorize it. | 
| NOT_FOUND | The server could not find what was requested. | 
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. | 
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. | 
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. | 
| CONFLICT | The request conflicts with current state of the server. | 
| GONE | No longer available. | 
| UNPROCESSABLE_ENTITY | The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. | 
| LOCKED | The resource that is being accessed is locked. | 
| FAILED_DEPENDENCY | The request failed due to failure of a previous request. | 
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. | 
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. | 
| BAD_GATEWAY | The server got an invalid response. | 
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. | 
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. | 

## Comprehend

The transcribe connector provides a standard mechanism to obtain speech to text information from audio and video files using [Amazon Transcribe](https://aws.amazon.com/transcribe/){:target="_blank"}.

The **ENTITY** action is used by the Comprehend connector to execute [Amazon Comprehend](https://aws.amazon.com/comprehend/){:target="_blank"} natural language processing (NLP) services and identify and analyze text from `UTF-8` plain text files and .

The Amazon Comprehend APIs that are called using the connector are:

* [Detect Dominant Language API](https://docs.aws.amazon.com/comprehend/latest/dg/API_DetectDominantLanguage.html){:target="_blank"}
* [Detect Entities API](https://docs.aws.amazon.com/comprehend/latest/dg/API_DetectEntities.html){:target="_blank"}
* [Batch Detect Entities API](https://docs.aws.amazon.com/comprehend/latest/dg/API_BatchDetectEntities.html){:target="_blank"}
* [Start Entities Detection Job API](https://docs.aws.amazon.com/comprehend/latest/dg/API_StartEntitiesDetectionJob.html){:target="_blank"}
* [Describe Entities Detection Job API](https://docs.aws.amazon.com/comprehend/latest/dg/API_DescribeEntitiesDetectionJob.html){:target="_blank"}
* [DetectPiiEntities](https://docs.aws.amazon.com/comprehend/latest/dg/API_DetectPiiEntities.html){:target="_blank"}
* [StartPiiEntitiesDetectionJob](https://docs.aws.amazon.com/comprehend/latest/dg/API_StartPiiEntitiesDetectionJob.html){:target="_blank"}
* [DescribePiiEntitiesDetectionJob](https://docs.aws.amazon.com/comprehend/latest/dg/API_DescribePiiEntitiesDetectionJob.html){:target="_blank"}

The input parameters of the Comprehend connector are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to send for analysis. |
| text | String | *Requires one.* Raw text to be sent for analysis. |
| mediaType | String | *Optional.* The media type of the file to be analyzed, for example `application/octect-stream`. |
| maxEntities | Integer | *Optional.* The maximum number of entities to be extracted, for example `5`. |
| confidenceLevel | String | *Optional* The confidence level to use in the analysis between 0 and 1, for example `0.75`. |
| timeout | Integer | *Optional.* The timeout period for calling the Comprehend service in milliseconds, for example `910000`. |

The output parameters from the Comprehend analysis are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| awsResponse | JSON | *Optional.* The result of the analysis from the Comprehend service. |
| aisResponse | JSON | *Optional.* The result of the analysis in [Alfresco Intelligence Service]({% link intelligence-services/latest/index.md %}) format. |
| entities | JSON | *Optional.* The result object containing the entities detected. |

### Comprehend configuration parameters

The configuration parameters for the Comprehend connector are:

| Parameter | Description |
| --------- | ----------- |
| AWS_ACCESS_KEY_ID | *Required.* The access key to authenticate against AWS with. |
| AWS_SECRET_KEY | *Required.* The secret key to authenticate against AWS with. |
| AWS_REGION | *Required.* The region of AWS to use the Comprehend service in. |
| AWS_S3_BUCKET | *Required.* The name of the S3 bucket to use. |
| AWS_COMPREHEND_ROLE_ARN | *Required.* The Amazon Resource Name for Comprehend to use. |

### Comprehend errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Comprehend connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| INVALID_RESULT_FORMAT | The REST service result payload cannot be parsed. |
| TEXT_SIZE_LIMIT_EXCEEDED | The size of the input text exceeds the limit. |
| TOO_MANY_REQUEST | The request throughput limit was exceeded. |
| UNSUPPORTED_LANGUAGE | The language of the input text can't be processed. |
| CLIENT_EXECUTION_TIMEOUT | The execution ends because of timeout. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. |
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
| CONFLICT | The request conflicts with current state of the server. |
| GONE | No longer available. |
| UNPROCESSABLE_ENTITY | The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. |
| LOCKED | The resource that is being accessed is locked. |
| FAILED_DEPENDENCY | The request failed due to failure of a previous request. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |

## Rekognition

The **LABEL** action is used by the Rekognition connector to execute [Amazon Rekognition](https://aws.amazon.com/rekognition/){:target="_blank"} services to identify and label the objects in JPEG and PNG files that are less than 15mb in size.

The Amazon Rekognition API that is called is the [Detect Labels API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectLabels.html){:target="_blank"}.

Files between 5mb and 15mb are uploaded to an Amazon S3 bucket before processing. The [IAM](https://aws.amazon.com/iam/){:target="_blank"} user configured to run the Rekognition service requires access to this bucket, the [Rekognition service itself](https://docs.aws.amazon.com/rekognition/latest/dg/access-control-overview.html){:target="_blank"} and to have the `rekognition:DetectLabels` permission.

The input parameters of the Rekognition connector are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Required.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to send for analysis. |
| mediaType | String | *Optional.* The media type of the file to be analyzed, for example `application/octect-stream`. |
| maxLabels | Integer | *Optional.* The maximum number of labels to be return. The default value is `10`. |
| confidenceLevel | String | *Optional* The confidence level to use in the analysis between 0 and 1, for example `0.75`. |
| timeout | Integer | *Optional.* The timeout period for calling the Rekognition service in milliseconds, for example `910000`. |

The output parameters from the Rekognition analysis are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| awsResponse | JSON | *Optional.* The result of the analysis from the Rekognition service. |
| aisResponse | JSON | *Optional.* The result of the image analysis in [Alfresco Intelligence Service]({% link intelligence-services/latest/index.md %}) format. |
| labels | JSON | *Optional.* The result object containing the labels detected. |

### Rekognition configuration parameters

The configuration parameters for the Rekognition connector are:

| Parameter | Description |
| --------- | ----------- |
| AWS_ACCESS_KEY_ID | *Required.* The access key to authenticate against AWS with. |
| AWS_SECRET_KEY | *Required.* The secret key to authenticate against AWS with. |
| AWS_REGION | *Required.* The region of AWS to use the Rekognition service in. |
| AWS_S3_BUCKET | *Required.* The name of the S3 bucket to use. |

### Rekognition errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Rekognition connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT| The input variable has an invalid type. |
| INVALID_RESULT_FORMAT | The REST service result payload cannot be parsed. |
| PROVISIONED_THROUGHPUT_EXCEEDED | The number of requests exceeded your throughput limit. |
| ACCESS_DENIED | The user is not authorized to perform the action. |
| IMAGE_TOO_LARGE | The input image size exceeds the allowed limit. |
| INVALID_IMAGE_FORMAT | The provided image format is not supported. |
| LIMIT_EXCEEDED | The service limit was exceeded. |
| THROTTLING_ERROR | The service is temporarily unable to process the request. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. |
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
| CONFLICT | The request conflicts with current state of the server. |
| GONE | No longer available. |
| UNPROCESSABLE_ENTITY | The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. |
| LOCKED | The resource that is being accessed is locked. |
| FAILED_DEPENDENCY | The request failed due to failure of a previous request. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |

## Textract

The **EXTRACT** action is used by the Textract connector to execute [Amazon Textract](https://aws.amazon.com/textract/){:target="_blank"} to extract text and metadata from JPEG and PNG files that are less than 5mb in size.

The Amazon Textract APIs called are the [Detect Document Text API](https://docs.aws.amazon.com/textract/latest/dg/API_DetectDocumentText.html){:target="_blank"} which joins all `LINE` block objects with a line separator between them and the [Analyze Document API](https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeDocument.html){:target="_blank"} with `FORM` and `TABLES` analysis.

The [IAM](https://aws.amazon.com/iam/){:target="_blank"} user configured to run the Textract services needs to have the `textract:DetectDocumentText` and `textract:AnalyzeDocument` permissions.

The input parameters of the Textract connector are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Required.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file to send for extraction. |
| outputFormat | String | *Optional.* The format of the output file. Possible values are `JSON` and `TXT`. The default value is `JSON`. |
| confidenceLevel | String | *Optional* The confidence level to use in the analysis between 0 and 1, for example `0.75`. |
| timeout | Integer | *Optional.* The timeout period for calling the Textract service in milliseconds, for example `910000`. |

The output parameters from the Textract analysis are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| awsResult | JSON | *Optional.* The result of the analysis from the Textract service. |

### Textract configuration parameters

The configuration parameters for the Textract connector are:

| Parameter | Description |
| --------- | ----------- |
| AWS_ACCESS_KEY_ID | *Required.* The access key to authenticate against AWS with. |
| AWS_SECRET_KEY | *Required.* The secret key to authenticate against AWS with. |
| AWS_REGION | *Required.* The region of AWS to use the Textract service in. |
| AWS_S3_BUCKET | *Required.* The name of the S3 bucket to use. |

### Textract errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Textract connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT| The input variable has an invalid type. |
| INVALID_RESULT_FORMAT | The REST service result payload cannot be parsed. |
| PROVISIONED_THROUGHPUT_EXCEEDED | The number of requests exceeded your throughput limit. |
| ACCESS_DENIED | The user is not authorized to perform the action. |
| IMAGE_TOO_LARGE | The input image size exceeds the allowed limit. |
| INVALID_IMAGE_FORMAT | The provided image format is not supported. |
| LIMIT_EXCEEDED | The service limit was exceeded. |
| THROTTLING_ERROR | The service is temporarily unable to process the request. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. |
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
| CONFLICT | The request conflicts with current state of the server. |
| GONE | No longer available. |
| UNPROCESSABLE_ENTITY | The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. |
| LOCKED | The resource that is being accessed is locked. |
| FAILED_DEPENDENCY | The request failed due to failure of a previous request. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |

## Transcribe

The transcribe connector provides a standard mechanism to obtain speech to text information from audio and video files using [Amazon Transcribe](https://aws.amazon.com/transcribe/){:target="_blank"}.

### Installation

The connector is a Spring Boot application that is included as a separate service of your AAE deployment.

### Configuration

The transcribe connector requires certain properties to be defined in the `application.properties` file of the Spring Boot application. By default, these properties are set to your environment variables.
The following are a set of properties that define the standard use of the connector:

```bash
aws.region=${AWS_REGION}
aws.s3.bucket=${AWS_S3_BUCKET}
aws.accessKeyId=${AWS_ACCESS_KEY_ID}
aws.secretKey=${AWS_SECRET_KEY}
aws.transcribe.languages=${AWS_TRANSCRIBE_LANGUAGES}
```

For increased accuracy with language identification, you can enter a list of comma-seperated languages that are spoken. For example, if you your media files are primarily going to be in U.S. English, U.S. Spanish, or French, enter the following into your `AWS_TRANSCRIBE_LANGUAGES` file: `en-US,es-US,fr-FR`.

The connector uses a stream mechanism to send and receive information from it and AAE. The following variable is used to identify the connector:

```bash
spring.cloud.stream.bindings.transcribeConnectorConsumer.destination=transcribe.TRANSCRIBE
```

The connector requires a connection to Alfresco in order to obtain the file containing the audio or video to be transcribed. This is achieved by setting the url to the Alfresco instance and user credentials using the following variables:

```bash
alfresco.identity.service.tokenUrl=${ALFRESCO_IDENTITY_SERVICE_AUTH_SERVER_URL}
alfresco.identity.service.grant-type=${CONTENT_GRANT_TYPE:client_credentials}
alfresco.identity.service.resource=${CONTENT_CLIENT_ID}
alfresco.identity.service.credentials-secret=${CONTENT_CLIENT_SECRET}
```

The response of the transcription is a file that must be stored temporarily. This path is set using the following variable:

```bash
file.content.reference.directory.path=${VOLUME_MOUNT_PATH:/tmp}
```

The input file could be stored in a folder instead of Alfresco. This path is set using the following variable:

```bash
file.content.tmp.path=${ACT_TEMPORARY_FOLDER:/tmp}
```

> **Note:** The name of the channel must match the implementation value defined in the Service Task as part of the [BPMN Tasks Configuration](#bpmn-tasks-configuration).

### Deployment Configuration

When deploying an application you are asked to input the image of the connector. The image and environment variables must be the same that were previously registered. The following is an example of the environment variables that could be set for the connector:

```json
{
    "AWS_ACCESS_KEY_ID":"*****************",
    "AWS_SECRET_KEY":"*****************",
    "AWS_S3_BUCKET":"aae-data",
    "AWS_REGION":"eu-west-1",
}
```

### AWS Configuration

Alfresco recommends you access AWS using AWS Identity and Access Management (IAM). To use IAM to access AWS, create an IAM user, add the user to an IAM group with administrative permissions, and then grant administrative permissions to the IAM user. You can then access AWS using a special URL and the IAM user's credentials.

### BPMN Tasks Configuration

As part of BPMN definition process, any service task responsible for triggering speech to text needs to set **_transcribe.TRANSCRIBE_** as the value for its implementation attribute.

In addition to the above configuration, these variables are required to perform the audio analysis:

The input parameters of the transcribe connector are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | Array | *Required.* File to be transcribed. If multiple files are passed, only the first one will be processed. |
| timeout | Integer | *Optional.* Timeout for the remote call to transcribe service in milliseconds. The default is `${aws.transcribe.asynchTimeout}`. |
| generateWebVTT | Boolean | *Optional* The output webVTT is only populated if generateWebVTT is set to `true`. |

The output parameters of the Transcribe connector are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| awsResult | JSON | *Optional.* Result of the AWS Transcribe speech to text process. |
| transcription | String | *Required.* Transcription result. |
| webVTT | JSON | *Optional* Subtitles result in Web Video Text Tracks format. |

### Limitations

Minimum confidence is not currently supported. The confidence is however included as part of the response.
