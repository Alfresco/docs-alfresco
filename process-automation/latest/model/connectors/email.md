---
title: Email service
---

The email service is used to send emails using the SMTP protocol as part of a process instance.  

The email service is displayed on the process diagram as an envelope.

> **Important**: The email service requires an email server to use. This server is separate to the Alfresco hosted environment and should be created and managed by customers.

## Send

The **SEND** action is used by the email service to send an email and optional attachments.

The input parameters to send an email are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| to | String | *Required.* The email addresses to send to, for example `jane.doe@jdoe.com`. Multiple addresses are separated by a comma. |
| from  | String | *Required.* The email address of the sender, for example `noreply@jdoe.com`. |
| cc | String | *Optional.* A carbon copy list of email addresses. Multiple addresses are separated by a comma. |
| bcc | String | *Optional.* A blind carbon copy list of email addresses. Multiple addresses are separated by a comma. |
| subject | String | *Optional.* The subject line of the email, for example `Order No: 1234`. |
| attachments | File | *Optional.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file containing attachments to send with the email. |
| charset | String | *Optional* Set the character set of the email, for example `UTF-8`. |
| html | String | *Optional.* The body of the email in HTML, for example `<p><b>Hello!</b></p>`. |
| text | String | *Optional.* The body of the email in plain non-rich text. Can be sent in addition to `html` and will be used as a fall-back if HTML is not supported by the email client reading the email. |
| template | File | *Optional.* The body of the email generated from a [FreeMarker template](https://freemarker.apache.org/docs/dgui_quickstart_basics.html){:target="_blank"} stored as a file variable. |
| metadata | JSON | *Optional.* Metadata to be used by the `template` when generating the file to include [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) in the output. |

### Template

A [FreeMarker template](https://freemarker.apache.org/docs/dgui_quickstart_basics.html){:target="_blank"} can be used to generate the body of the email. Optional metadata can also be used with the template to insert values from [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) into the document template.

An example of the `metadata` that can be used by the template is:

```json
{
"iceCream": {
	"flavor":"Mint"
	},
"timeOfYear": {
	"season":"Summer"
	}
}
```

An example of how the template can import values from the `metadata` is:

```html
<html>
<head>
  <title>Welcome!</title>
</head>
<body>
  <h1>Welcome to ${timeOfYear.season}!</h1>
  <p>Our latest product is ${iceCream.flavor} ice cream!</p>
</body>
</html>
```

## Configuration parameters

The configuration parameters for the email service are:

| Parameter | Description |
| --------- | ----------- |
| EMAIL_HOST | *Required.* The host address of the email server. |
| EMAIL_PORT | *Required.* The port the email server is running on. |
| EMAIL_USERNAME | *Required.* The username the connector will use to contact the email server. |
| EMAIL_PASSWORD | *Required.* The password of the user the connector will use to contact the email server. |
| EMAIL_SMTP_AUTH | *Required.* Sets whether the connection to the email server requires authentication, for example `true`. |
| EMAIL_SMTP_STARTTLS | *Required.*  Sets whether the connection uses TLS, for example `true`. |

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the email service are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| TEMPLATE_READ_ERROR | Cannot read the FreeMarker template. |
| TEMPLATE_METADATA_ERROR | The template references non-existing metadata. |
| TEMPLATE_SYNTAX_ERROR | Invalid FreeMarker syntax. |
| EMAIL_CONNECTION_ERROR | Unable to connect to the email service. |
| EMAIL_AUTHENTICATION_ERROR | Unable to authenticate into the email service. |
| EMAIL_SEND_ERROR | Unable to send the email. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |
