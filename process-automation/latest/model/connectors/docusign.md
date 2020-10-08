---
title: DocuSign connector
---

The DocuSign connector is used to send documents via email to be digitally signed. The process flow waits for a document to be signed before continuing with the process. The signed document
is saved to the Alfresco Content Services repository folder that corresponds to the process instance ID that called the connector in the following format:

```bash
<application-name> Site / Document Library / <process-instance-id> / <service-task-id> / <signed-document>
``` 

> **Note**: The DocuSign requires a [DocuSign](https://www.docusign.com/) account to handle document signing.

The DocuSign connector is graphically represented by the DocuSign logo under the connectors menu whilst modeling a process.

The `implementation` value of the DocuSign connector in a service task would be similar to the following:

```xml
<bpmn2:serviceTask id="ServiceTask_1jas8cr" implementation="docusignConnector.SIGNDOCUMENT" />
```

## DocuSign configuration

The DocuSign connector uses the DocuSign REST API. An application needs to be set up and authorized to utilize this functionality in the connector. The following steps outline this process:

1. Sign into your DocuSign account. 
2. [Configure an application for JWT authentication](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken){:target="_blank"} including the prerequisites required to setup an RSA key. 
3. [Grant consent to the application](https://developers.docusign.com/esign-rest-api/guides/authentication/obtaining-consent){:target="_blank"}.

## Configuration parameters

Values for configuration parameters that are specific to a connector instance can be set in the modeling application or during application deployment.

The following are the configuration parameters that need to be set for the DocuSign connector: 

| Parameter | Description | 
| --------- | ----------- | 
| `DOCUSIGN_APILOCATION` | The URL of the DocuSign REST API to use | 
| `DOCUSIGN_ACCOUNT_ID` | The DocuSign account that the application is registered to | 
| `DOCUSIGN_CLIENT_ID` | The application integration key | 
| `DOCUSIGN_IMPERSONATED_USER_ID` | The GUID of the DocuSign user that the application impersonates  | 
| `DOCUSIGN_AUTH_SERVER` | The URL of the DocuSign authorization server | 
| `DOCUSIGN_JWT_LIFETIME` | The expiration time of the JWT expressed in seconds | 
| `DOCUSIGN_RSA_KEY` | The private RSA key for the DocuSign application | 
| `ALFRESCO_CONTENT_REPO_BASE_URL` | The base URL of the Content Services deployment |

## Input parameters 

The following are the parameters that can be passed to the DocuSign connector as input parameters using the `SIGNDOCUMENT` action:

| Parameter | Description | Type | Required? |
| --------  | ----------- | ---- | --------- |
| `nodeId` | The node ID of the file to sign from Alfresco Content Services | String | `*` |
| `uri` | The URI of the file to sign | String | `*` |
| `files` | A [file](../../files.md) uploaded in a process and set as a process variable or uploaded as part of a form or another connector to sign | File | `*` |
| `recipientEmail` | The email address to send the file to for signing | String | Yes |
| `recipientName` | The name of the email recipient | String | No |
| `emailSubject` | The subject line of the email | String | No | 
| `documentId` | A document ID for the Docusign API to use. The value must be positive integer | Integer | No | 
| `nodeFormat` | The document format for the Docusign API. The default value is `pdf` | String | No |
| `signHerePage` | The label for the `Sign Here` box in the document | String | No | 
| `signHereX` | The X position of the `Sign Here` box in the document | String | No |
| `signHereY` | The Y position of the `Sign Here` box in the document | String | No | 
| `timeout` | The time to wait for the document to be signed expressed in seconds | Integer | No | 
| `parentFolder` | The node ID of the folder to store the signed document in. If this value is set, the generated document will be output here and not to the default process instance folder for the process instance | String | No |
| `outputFileName` | The name of the signed document | String | No |
| `targetFile` | An existing file to overwrite with the signed document | File | No |
| `nodeType` | The node type assigned to the signed document in ACS. The default is `cm:content` | String | No |

`*` One of these parameters is required.

## Output parameter

The following is the parameter that is returned to the process by the DocuSign connector as an output parameter using the `SIGNDOCUMENT` action:

| Parameter | Description | Type |
| --------  | ----------- | ---- |
| `docusign.result` | The node ID of the signed document | String | 
| `docusign.error` | A list of errors if any are caught by the connector | String |
