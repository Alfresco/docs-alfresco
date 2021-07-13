---
title: DocuSign connector
---

The DocuSign connector is used to send documents via email to be digitally signed. The process flow waits for a document to be signed before continuing with the process. The signed document is saved to the Content Services repository.

> **Important**: The DocuSign connector requires a [DocuSign](https://www.docusign.com/){:target="_blank"} account to handle document signing. This account is separate to the Alfresco hosted environment and should be created and managed by customers.

The DocuSign connector is displayed on the process diagram as a pen.

## Sign document

The **SIGNDOCUMENT** action is used by the DocuSign connector to request a digital signature on a document.

The input parameters to request a DocuSign signature are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Required.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file containing the document to be signed. |
| documentId | Integer | *Optional.* Correlation ID to send to the DocuSign API, for example `250`. |
| nodeFormat | String | *Optional.* The format of the document to be signed. Values are `pdf` or `docx`. |
| outputFileName | String | *Optional.* The name of the file that will be created, for example `invoice.pdf`. |
| recipientEmail | String | *Required.* The email address of the person signing the document. |
| recipientName | String | *Optional.* The name of the person signing the document, for example `John Doe`. |
| emailSubject | String | *Optional.* The subject line of the email sent with the document to sign. |
| signHerePage | String | *Optional.* The page number in the document the `Sign Here` box will appear on, for example `3`. |
| signHereX | String | *Optional.* The X position of the `Sign Here` box in the document, for example `100`. |
| signHereY | String | *Optional.* The Y position of the `Sign Here` box in the document, for example `50`. |
| targetFileMetadata | Content-Metadata | *Optional.* Metadata to store the file with. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `targetFileMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |
| targetFileType | Content-Type | *Optional.* The type to set for the signed file, for example `fin:invoice`. |
| targetFile | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file that should be updated with the signed version of the document. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to store the signed document in. |
| targetFolderId | String | *Requires one.* The nodeId of the folder to store the signed document in. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to store the signed document in. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |
| timeout | Integer | *Optional.* The timeout period to wait for the document to be signed in milliseconds, for example `910000`. |

> **Note**: `underscoreMetadata` can be set to `true` and the `targetFileMetadata` input can still use `:` with the connector successfully executing the action. If `underscoreMetadata` is set to `false` and `targetFileMetadata` uses `_` then the connector will fail to execute the action.

An example of the `targetFileMetadata` that can be stored with the document is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from signing a document are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Optional.* The signed document available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

## Configuration

The DocuSign connector uses the DocuSign REST API. An application needs to be set up and authorized to utilize this functionality in the connector. The following steps outline this process:

1. Sign into your DocuSign account.
2. [Configure an application for JWT authentication](https://developers.docusign.com/platform/auth/jwt/jwt-get-token/){:target="_blank"} including the prerequisites required to setup an RSA key. 
3. [Grant consent to the application](https://developers.docusign.com/platform/auth/consent/obtaining-individual-consent/){:target="_blank"}.

### Configuration parameters

The configuration parameters for the DocuSign connector are:

| Parameter | Description |
| --------- | ----------- |
| DOCUSIGN_APILOCATION | *Required.* The URL of the DocuSign REST API. |
| DOCUSIGN_ACCOUNT_ID | *Required.* The DocuSign account ID the application is registered to. |
| DOCUSIGN_CLIENT_ID | *Required.* The application integration key from DocuSign. Found under **Admin > API & Keys**. |
| DOCUSIGN_IMPERSONATED_USER | *Required.* The GUID of the DocuSign user the application should impersonate. Found under **Admin > Users**. |
| DOCUSIGN_AUTH_SERVER | *Required.* The DocuSign OAuth server location. |
| DOCUSIGN_JWT_LIFETIME | *Required.* The lifetime of the DocuSign JWT token. |
| DOCUSIGN_RSA_KEY | *Required.* The private RSA key of the DocuSign application used for JWT authentication. |
| DOCUSIGN_DEFAULT_EMAIL_SUBJECT | *Required.*  The default email subject line of the email containing the document to sign. |
| DOCUSIGN_DEFAULT_SIGNHERE_LABEL | *Required.* The default label for the DocuSign **Sign Here** box on the document to sign. |
| DOCUSIGN_DEFAULT_SIGNHERE_PAGE | *Required.* The default page number for the DocuSign **Sign Here** box to appear on in the document to sign. |
| DOCUSIGN_DEFAULT_SIGNHERE_POSX | *Required.* The default X position of the **Sign Here** box on the document to sign. |
| DOCUSIGN_DEFAULT_SIGNHERE_POSY | *Required.* The default Y position of the **Sign Here** box on the document to sign. |
| DOCUSIGN_DEFAULT_TIMEOUT | *Required.* The default timeout period to wait for the document to be signed in millseconds. |
| DOCUSIGN_POLL_SLEEP | *Required.* The time between polling in milliseconds. |

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
