---
title: DocuSign connector
---

The DocuSign connector provides a standard mechanism in Alfresco Process Automation to send documents for digital signing in
[DocuSign](https://www.docusign.com){:target="_blank"}. The DocuSign connector is displayed on the process diagram as a pen.

> **Important:** The DocuSign connector requires a DocuSign account to handle document signing. This account is separate to the Alfresco hosted environment and should be created and managed by customers.

The actions that can be executed using the DocuSign connector are:

* [SEND_FOR_SIGNATURE](#send_for_signature)
* [DOWNLOAD_DOCUMENT](#download_document)

As part of the BPMN definition process, any service task that is responsible for sending or downloading a document must set the `docusignconnector.SEND_FOR_SIGNATURE` or `docusignconnector.DOWNLOAD_DOCUMENT` properties as the value for its implementation attribute.

The following input parameters must also be provided for the DocuSign API in the Service task depending on the implementation.

### BPMN Tasks Configuration

This [process definition](https://github.com/Alfresco/alfresco-process-connector-services/blob/develop/alfresco-process-docusign-connector-spring-boot-starter/docuSignProcess.bpmn20.xml){:target="_blank"} shows an example of how to set up the connector in Process Automation.

As part of BPMN definition process, any Service Task responsible for sending the document needs to set `docusignconnector.SEND_FOR_SIGNATURE` or `docusignconnector.DOWNLOAD_DOCUMENT` as the value for its implementation attribute.

In addition to the above, these input variables must be provided for the DocuSign API in the Service Task depending on the implementation:

## SEND_FOR_SIGNATURE

The **SEND_FOR_SIGNATURE** action is used by the DocuSign connector to request a digital signature on a document.

The input parameters for SEND_FOR_SIGNATURE are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| signers | JSON | *Optional.* The list of signers, including email, name, sign here page, sign here tab label, position X and position Y, when the document is going to be signed by more than one signer. |
| recipientEmail | String | *Required.* The email address of the signer when the document is going to be signed by only one signer. |
| recipientName | String | *Optional.* The name of the signer, which means the email recipient, when the document is going to be signed by only one signer. |
| emailSubject | String | *Optional.* The subject line of the email sent with the document to sign. |
| metadata | JSON | *Optional.* Metadata of the document. |
| file | File | *Required.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file containing the document to be signed. |
| nodeFormat | String | *Optional.* The format of the document to be signed. Values are `pdf` or `docx`. |
| outputFileName | String | *Optional.* The name of the file that will be created, for example `invoice.pdf`. |
| documentId | Integer | *Optional.* Correlation ID to send to the DocuSign API, for example `250`. |
| signHereTabLabel | String  | *Optional.* **Sign Here** page in the document when the document is only going to be signed by one signer. |
| signHerePage | String | *Optional.* The page number in the document the `Sign Here` box will appear on, when the document is going to be signed by only one signer, for example `3`. |
| signHereX | String | *Optional.* The X position of the `Sign Here` box in the document, when the document is going to be signed by only one signer, for example `100`. |
| signHereY | String | *Optional.* The Y position of the `Sign Here` box in the document, when the document is going to be signed by only one signer, for example `50`. |
| timeout | Integer | *Optional.* The timeout period to wait for the document to be signed in milliseconds, for example `910000`. |
| allowMarkup | Boolean | *Optional.* Allow recipients to make changes to your documents by covering up existing text and replacing it with new text. Recipients can decide to use a special markup text field which they can place anywhere on the document. It can be scaled and optionally filled in. All changes must be reviewed and approved by all signers. |
| agents | JSON | *Optional.* The list of agents, including email and name, assigned as agents to the document. |
| carbonCopies | JSON | *Optional.* The list of carbon copies, including email, name, sign here page, sign here tab label, position X and position Y, assigned as recipients who should receive a copy of the envelope, but do not need to sign it. |
| certifiedDeliveries | JSON | *Optional.* The list of certified deliveries, including email, and name, who are assigned as recipients who must receive the completed documents for the envelope to be completed, but do not need to sign it. |
| editors | JSON | *Optional.* The list of editors, including email and name, assigned as editors on the document. |
| inPersonSigners | JSON | *Optional.* The list of in person signers, including email, name, signerName, hostName, sign here page, sign here tab label, position X and position Y, assigned as signers that are in the same physical location as a DocuSign user. These users act as a Signing Host for the transaction. The signer name and the host name are mandatory. Signer name is the full legal name of a signer for the envelope. Host name is the name of the signing host. |
| intermediaries | JSON | *Optional.* The list of intermediaries, including email, and name assigned as recipients. You are not required to add name and email information for recipients at the same level or subsequent level in the routing order, until subsequent agents, editors, or intermediary recipient types are added. |
| notaries | JSON | *Optional.* The list of notaries, including email, name, sign here page, sign here tab label, position X and position Y, assigned as notaries on the document. |
| witnesses | JSON | *Optional.* The list of witnesses including email, name, sign here page, sign here tab label, position X and position Y, assigned as witnesses on the document. |

> **Note:** The connector can only receive either **signers** or **recipientEmail** but not both at the same time. The connector must receive either **signHereTabLabel** or **signHerePage** to fixed the positioning. If one of them is null the signature can be where the signer selects.

The output parameters from SEND_FOR_SIGNATURE are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| envelopeId | String | Envelope ID of the document. |
| status | String | Status of the envelope. |
| URI | String | URI related to the envelope. |
| docusignOutput | JSON | DocuSign output after sending the document for signature. |

## DOWNLOAD_DOCUMENT

The **DOWNLOAD_DOCUMENT** action is used by the DocuSign connector to download the envelope from DocuSign. It takes into account the `envelopeId` that is the UUID that relates to the envelope.

The input parameters for DOWNLOAD_DOCUMENT are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| outputFileName | String | *Optional.* The name of the file that will be created, for example `invoice.pdf`. |
| envelopeId | String | *Required.* UUID related to the envelope from the DocuSign API. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to store the signed document in. |
| targetFolderId | String | *Optional.* The target folder ID to save the document in Content Services. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to store the signed document in Content Services. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` or a relative path: `/User Homes/hruser`.  |
| targetFileType | String | *Optional.* The type to set for the signed file, for example `fin:invoice`. |
| targetFileMetadata | Content-Metadata | *Optional.* Metadata assigned to the signed document in Content Services. |
| underscoreMetadata | Boolean | *Optional.* If set to `true` the received prefixed property names contain underscores (_) instead of colons (:) for separating the namespace prefix from the property name. |

The output parameters from DOWNLOAD_DOCUMENT are:

| Property  | Type | Description |
| --------- | ---- | ----------- |
| file | File | The file stored in Content Services of the document. |

No exceptions or errors are thrown by the connector, however all exceptions are caught and logged. The task execution is always successful, and errors will be returned in an error event.

The following is an example of the POST body for the Activiti REST API endpoint `http://{{domain}}/{{applicationName}}-rb/v1/process-instances`:

```JSON
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

```bash
<bpmn2:serviceTask id="ServiceTask_1cheezm" name="docuSignTask" implementation="docuSignConnector.SEND_FOR_SIGNATURE">
      <bpmn2:incoming>SequenceFlow_1siaofh</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0nmtcso</bpmn2:outgoing>
</bpmn2:serviceTask>
```

No exceptions or errors are thrown by the connector. All exceptions are caught and logged. The task execution is always successful, and errors will be returned in an error event.

### Configuration

1. Log into the DocuSign eSignature console and click Settings on the top right.

2. Click the **ADD CONFIGURATION** dropdown list and select **Custom**.

3. Under Listener Settings, select **Active Connection** from the **Status** dropdown list.

4. Under Listener Settings, enter your **URL to Publish** URL.

    The pattern of the URL must follow: `{domain-name}/{application-name}/connector/{connector_name}/listener`.

5. Under Event Settings, select **Aggregate** from the **Event Message Delivery Mode** dropdown list.

6. Under **Event settings > Trigger events > Envelope Events**, ensure the following are selected:

    * **Envelope Sent**
    * **Envelope Delivered**
    * **Envelope Signed/Completed**
    * **Envelope Declined**
    * **Envelope Voided**

7. Under **Event settings > Trigger events > Recipient Events**, ensure the following are selected:

    * **Recipient Sent**
    * **Recipient Auto Responded**
    * **Recipient Delivered**
    * **Recipient Signed/Completed**
    * **Recipient Declined**
    * **Recipient Authentication Failure**

8. Click **SAVE CONFIGURATION**.

![Settings]({% link process-automation/images/settings.png %})

#### Logs and failures

Once the listener has been created and is working you can see the logs and the failures from the same menu. You can click on one of the logs or failures and a popup with information is displayed.

#### Triggers for DocuSign events

1. From the Modeling Application, create a new trigger with one of the [events](#events).

2. You can filter the trigger using the condition field, which is an expression that must be true in order to trigger an action.

### DocuSign Environment Configuration

The connector uses the DocuSign client library that relies on the DocuSign REST API and uses OAuth JWT for authentication, for more see [OAuth JWT](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken){:target="_blank"}.

The basic steps to achieve this are:

1. Create a DocuSign account, for more see [Sign documents for free](https://www.docusign.co.uk/esignature/sign-documents-free){:target="_blank"}.

    Register for a free developer sandbox account.

2. Configure an app for JWT in DocuSign, for more see [How to get an access token with JWT Grant authentication](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken){:target="_blank"}.

    You need the private RSA key for the connector configuration.

3. Grant consent to the app, for more see [How to obtain individual consent](https://developers.docusign.com/esign-rest-api/guides/authentication/obtaining-consent){:target="_blank"}.

    The same user account from step 1. can be used, or a new one can be created.

### Events

The DocuSign connector produces events when the DocuSign envelope changes its status.

> **Note:** These events can be consumed by the process using Triggers. For example, a BPMN catch message event inside a process can be waiting for a trigger event that is set to `ENVELOPE_DECLINED`, and a trigger action set to throw a BPMN message.

The events are:

* `ENVELOPE_VOIDED` -  The envelope has been voided by the sender or has expired. The void reason indicates whether the envelope was manually voided or expired.
* `ENVELOPE_DECLINED` - The envelope has been declined by one of the recipients.
* `ENVELOPE_COMPLETED` - The envelope has been completed by all of the recipients.
* `ENVELOPE_DELIVERED` - This event is sent when all recipients have opened the envelope through the DocuSign signing website. This does not signify an email delivery of an envelope.
* `ENVELOPE_SENT` - This event is sent when the email notification, with a link to the envelope, is sent to at least one recipient or when it is a recipient's turn to sign during embedded signing. The envelope remains in this state until all recipients have viewed the envelope.

For more on events see [Webhook event triggers](https://developers.docusign.com/platform/webhooks/connect/event-triggers/){:target="_blank"}.

When a Process Automation process is instantiated this way, the following variables are populated:

| Property | Type | Description |
| -------- | ---- | ----------- |
| envelopeId | String | Envelope ID of the document. |
| documents | Array | Documents related to the envelope and data related to them like uri, and id. |
| extendedFields | JSON | Additional fields like decline reason etc. |

The connector is listening for events using the webhook that follows the pattern:

`- {domain-name}/{application-name}/connector/{connector_name}/listener`

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the DocuSign connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| MISSING_SOURCE_FILE | Input file not found. |
| MISSING_TARGET_FILE | Target file and folder not found. |
| SIGNING_TIMEOUT | Signing document timeout. |
| STATUS_NOT_FOUND | Error polling DocuSign for status. |
| MISSING_TOKEN | Could not update or obtain token. |
| ERROR_READING_FILE | Error reading input file. |
| ENVELOPE_NOT_CREATED | Could not create envelope in DocuSign. |
| ERROR_WRITING_FILE | Could not create or write result node. |
| ERROR_RETRIEVING_FILE | Could not retrieve document from DocuSign. |
| MISSING_ENVELOPE | The `envelopeId` is missing. |
