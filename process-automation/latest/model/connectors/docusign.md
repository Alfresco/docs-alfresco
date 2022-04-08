---
title: DocuSign connector
---

## Overview

The DocuSign connector is designed to provide a standard mechanism in APS to send documents for digital signing in
[DocuSign](https://www.docusign.com).

## Installation

The APS connector is a Spring Boot application which is expected to be included as a separate service as part of an APS deployment.

## Configuration

The connector has to be configured in the `application.properties` file of the Spring Boot application. By default, these properties are set to environment variables.

The connector also requires a DocuSign account and App to be configured. The DocuSign demo environment [(Developer Centre)](https://appdemo.docusign.com) can be used for that.


The following properties are needed to set up content service (Alfresco) connection:

```
alfresco.identity.service.grant-type=${CONTENT_GRANT_TYPE:client_credentials}
alfresco.identity.service.resource=${CONTENT_CLIENT_ID:}
alfresco.identity.service.credentials-secret=${CONTENT_CLIENT_SECRET:}
alfresco.identity.service.auth-server-url=${ALFRESCO_IDENTITY_SERVICE_AUTH_SERVER_URL:https://identity.aps2demo.envalfresco.com/auth}
alfresco.service.process.storage.url=${PROCESS_STORAGE_GATEWAY:https://gateway.aps2dev.envalfresco.com}
alfresco.service.process.storage.path=${PROCESS_STORAGE_PATH:/docgen/process-storage}
```

The following properties are needed to configure the DocuSign REST API:

```
# The DocuSign REST API location
docusign.apilocation=${DOCUSIGN_APILOCATION:https://demo.docusign.net/restapi}
# The DocuSign account ID under which the app operates
docusign.accountId=${DOCUSIGN_ACCOUNT_ID:}
# The App Integration Key from DocuSign (Admin > API & Keys)
docusign.clientId=${DOCUSIGN_CLIENT_ID:}
# The DocuSign User GUID whom the app impersonates (Admin > Users)
docusign.impersonatedUserGuid=${DOCUSIGN_IMPERSONATED_USER_ID:}
# The DocuSign OAuth server location
docusign.authServer=${DOCUSIGN_AUTH_SERVER:account-d.docusign.com}
# DocuSign JWT token lifetime
docusign.jwtTokenExpirationInSeconds=${DOCUSIGN_JWT_LIFETIME:3600}
# Private RSA key of the DocuSign App for JWT authentication
docusign.privateKey=${DOCUSIGN_RSA_KEY:}

# DocuSign defaults
# Default email subject (of email that DocuSign sends to signer)
docusign.email.subject=${DOCUSIGN_DEFAULT_EMAIL_SUBJECT:Please sign this document}
# DocuSign "Sign Here" box - an invisible tab label
docusign.signhere.label=${DOCUSIGN_DEFAULT_SIGNHERE_LABEL:SignHereTab}
# Default page in document where DocuSign "Sign Here" box should go
docusign.signhere.page=${DOCUSIGN_DEFAULT_SIGNHERE_PAGE:1}
# Default X position in page for "Sign Here"
docusign.signhere.posx=${DOCUSIGN_DEFAULT_SIGNHERE_POSX:1}
# Default Y position in page for "Sign Here"
docusign.signhere.posy=${DOCUSIGN_DEFAULT_SIGNHERE_POSY:1}
```

As the connector uses a stream mechanism to send/receive information between APS and the connector, the following properties are used to identify the connector actions:

```
spring.cloud.stream.bindings.sendForSignatureConsumer.destination=docusignconnector.SEND_FOR_SIGNATURE
spring.cloud.stream.bindings.downloadDocumentConsumer.destination=${docusign.connector.name}.DOWNLOAD_DOCUMENT
```

The name of the channel requires to match the implementation value defined in the Service Task as part of the BPMN definition.

### BPMN Tasks Configuration

The following [process definition](docuSignProcess.bpmn20.xml) was created to show an example of how to set up the connector in APS:

![BPMN](docuSignProcess.png)

As part of BPMN definition process, any Service Task responsible for sending the document needs to set **_docusignconnector.SEND_FOR_SIGNATURE_** or **_docusignconnector.DOWNLOAD_DOCUMENT_** as the value for its implementation attribute.

In addition to the above, these input variables must be provided for DocuSign API in the Service Task depending on the implementation:

### SEND_FOR_SIGNATURE

#### Inbound Variables

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Required.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file containing the document to be signed. |
| documentId | Integer | *Optional.* Correlation ID to send to the DocuSign API, for example `250`. |
| nodeFormat | String | *Optional.* The format of the document to be signed. Values are `pdf` or `docx`. |
| outputFileName | String | *Optional.* The name of the file that will be created, for example `invoice.pdf`. |
| recipientEmail | String | *Required.* The email address of the signer when the document is going to be signed by only one signer. **Note:** The connector can only receive either **signers** or **recipientEmail** but not both at the same time.  |
| recipientName | String | *Optional.* The name of the signer i.e. the email recipient, when the document is going to be signed by only one signer. |
| emailSubject | String | *Optional.* The subject line of the email sent with the document to sign. |
| signHerePage | String | *Optional.* The page number in the document the `Sign Here` box will appear on, when the document is going to be signed by only one signer, for example `3`. |
| signHereX | String | *Optional.* The X position of the `Sign Here` box in the document, when the document is going to be signed only by one signer, for example `100`. |
| signHereY | String | *Optional.* The Y position of the `Sign Here` box in the document, when the document is going to be signed only by one signer for example `50`. |
| targetFileMetadata | Content-Metadata | *Optional.* Metadata to store the file with. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `targetFileMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |
| targetFileType | Content-Type | *Optional.* The type to set for the signed file, for example `fin:invoice`. |
| targetFile | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file that should be updated with the signed version of the document. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to store the signed document in. |
| targetFolderId | String | *Requires one.* The nodeId of the folder to store the signed document in. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to store the signed document in. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| timeout | Integer | *Optional.* The timeout period to wait for the document to be signed in milliseconds, for example `910000`. |
| signers | JSON | *Optional.* The list of signers (including email, name, sign here page, sign here tab label, position X and position Y) when the document is going to be signed by more than one signer.. |
| allowMarkup | Boolean | *Optional.* Allow recipients to make changes to your documents by covering up existing text and replacing it with new text (i.e. markup). Recipients can decide to use a special markup text field which they can place anywhere on the document. It can be scaled and optionally filled in. All changes must be reviewed and approved by all signers. |
| file | File | *Required* File to be signed. If multiple files are received, only the first one will be processed. |

#### Outbound Variables

| Parameter | Type | Description |
|--- | --- | --- |
| envelopeId | String | Envelope ID of the document. |
| status | String | Status of the envelope. |
| URI | String | URI related to the envelope. |
| docusignOutput | JSON | DocuSign output after sending the document for signature. |

### DOWNLOAD_DOCUMENT

#### Inbound Variables

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| outputFileName | String | *Optional.* The name of the file that will be created, for example `invoice.pdf`. |
| envelopeId | yes | *Required* UUID related to the envelope from the DocuSign API. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to store the signed document in. |
| targetFolderId | String | *Optional.* The target folder ID to save the document in Content Services. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to store the signed document in Content Services. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` or a relative path: `/User Homes/hruser`.  |
| targetFileType | String | *Optional.* The type to set for the signed file, for example `fin:invoice`. |
| targetFileMetadata | content-metadata | *Optional.* Metadata assigned to the signed document in Content Services. |
| underscoreMetadata | boolean | *Optional.* If set to `true` the received prefixed properties names contain underscores (_) instead of colons (:), for separating the namespace prefix from the property name. |

#### Outbound Variables

| Property | Type | Description |
|--- | --- |
| file | file | The file stored in Content Services of the document. |

The following is an example of the POST body for the Activiti REST API `http://{{domain}}/{{applicationName}}-rb/v1/process-instances` endpoint:

```json
{
  "processDefinitionKey": "DocuSignProcessTest",
  "processInstanceName": "processDocuSignTest_Simple",
  "businessKey": "MyBusinessKey",
  "variables": {
  	"recipientEmail" : "test@test.com",
  	"recipientName" : "AAE Test",
  	"emailSubject" : "Sign this document",
    "files" : [
        {
  	        "nodeId" : "<node-id-of-document-to-be-signed>"
        }
    ],
  	"outputFileName" : "testFileName.docx",
  	"nodeFormat" : "docx",
  	"documentId" : "10",
  	"signHerePage" : "1",
  	"signHereX" : "100",
  	"signHereY" : "200",
  	"timeout: "3600"
  },
  "payloadType":"StartProcessPayload"
}
```

In the business process definition, the service task called **docuSignTask** has the implementation attribute configured to use the connector.
```
<bpmn2:serviceTask id="ServiceTask_1cheezm" name="docuSignTask" implementation="docuSignConnector.SIGNDOCUMENT">
      <bpmn2:incoming>SequenceFlow_1siaofh</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0nmtcso</bpmn2:outgoing>
</bpmn2:serviceTask>
```

No exceptions or errors shall be thrown by the connector. All exceptions are caught and logged. The task execution is always successful. Errors will be returned in an error event.

### Events

The DocuSign connector produces events when DocuSign envelope change its status:

- ENVELOPE_VOIDED
- ENVELOPE_DECLINED
- ENVELOPE_COMPLETED
- ENVELOPE_DELIVERED
- ENVELOPE_SENT

When an APS process is instantiated this way, the following variables are populated:

| Property | Type | Description |
|--- | --- |
| envelopeId | string | Envelope ID of the document. |
| documents | array | Documents related to the envelope and data related to them like uri, id, etc. |

### DocuSign Environment Configuration
The connector uses DocuSign client library that relies on DocuSign REST API. For authentication, the
[OAuth JWT](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken) is used.
See the above page for detailed instructions how to configure an app in the DocuSign environment.

**Configuration steps on a high level**
1. Create a DocuSign account. Register for a free developer sandbox account.
2. [Configure an app for JWT](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken) in DocuSign. You will need the private RSA key for connector configuration.
3. [Grant consent](https://developers.docusign.com/esign-rest-api/guides/authentication/obtaining-consent) to the app. The
same user account can be used that was created in step 1 (or a new one can be created).

Configuration for production is similar. See DocuSign documentation for details.


## Testing

- Deploy the Activiti and the connector following the documentation in https://activiti.gitbook.io/activiti-7-developers-guide/
- Add the example process definition to an Activiti runtime bundle
- Upload content to the Alfresco instance used by the connector. This can be of any type supported by DocuSign (e.g. PDF, Word etc).
See [DocuSign documentation for details](https://support.docusign.com/en/guides/ndse-user-guide-supported-file-formats)
- Using an API client like Postman, set the function and payload variables as described above. Use your email for the `recipientEmail` and
the UUID of previously uploaded node for `nodeId`.
- Start the process with the Activiti REST API `v1/process-instances` endpoint with `StartProcessPayload`
- The service task will execute automatically
- An email will be sent by DocuSign with a link to the document to be signed. Open it and sign it in DocuSign.
- The service task will now automatically complete.
- The result will be UUID of the node in Alfresco that now contains the signed document
- The `getVarsTask` will be created if no error ocurred

