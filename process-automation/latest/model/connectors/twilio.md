---
title: Twilio connector
---

The Twilio connector is used to integrate with an instance of [Twilio](https://twilio.com){:target="_blank"} to send SMS messages. 

The Twilio connector is displayed on the process diagram with the Twilio logo.

## Send SMS

The **SEND_SMS** action is used by the Twilio connector to send an SMS message.

The input parameters to send an SMS are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| smsFrom | String | *Required.* The phone number the SMS will be sent from. |
| smsTo | String | *Required.* The list of numbers the SMS will be sent to. |
| smsBody | String | *Required.* The contents of the SMS. The message supports [Freemarker](https://freemarker.apache.org/docs/dgui_datamodel_basics.html){:target="_blank"} syntax, for example `${fullName.lastName}` can be used from the `metadata` parameter to include variables.|
| metadata | JSON | *Optional.* Metadata to be used by the `smsBody` parameter to include [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) in a message. |

The output parameters from sending an SMS using Twilio are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| smsResult | JSON | *Optional.* An object containing a map of message IDs and destination numbers the message was sent to. |

## Configuration

An account ID and token are required by the connector to access Twilio. These are specific to your Twilio account and act as the authorization credentials.

The values are provided by Twilio when an account is created. They can also be located in the [Twilio setup page](https://www.twilio.com/console/project/settings){:target="_blank"}.

### Configuration parameters

The configuration parameters for the Slack connector are:

| Parameter | Description |
| --------- | ----------- |
| TWILIO_ACCOUNT | *Required.* Your account name obtained from Twilio. |
| TWILIO_TOKEN | *Required.* A token for your account obtained from Twilio. |

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Twilio connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| TWILIO_CONNECTION_ERROR | Unable to connect to Twilio service. |
| AUTHENTICATION_CONNECTION_ERROR | Unable to authenticate to Twilio. |
| INVALID_REQUEST_ERROR | Invalid request. |
| INVALID_TO_PHONE_NUMBER_ERROR | Invalid 'to' phone number. |
| INVALID_FROM_PHONE_NUMBER_ERROR | Invalid 'from' phone number. |
| PERMISSION_DENIED_ERROR | Lack of permission to the resource and method requested. |
| INVALID_REGION_TO_PHONE_NUMBER_ERROR | Permission to send an SMS has not been enabled for the region indicated by the 'To' number. |
| TEMPLATE_READ_ERROR | Cannot read the Freemarker template. |
| TEMPLATE_METADATA_ERROR | The template references non-existing metadata. |
| TEMPLATE_SYNTAX_ERROR | Invalid Freemarker syntax. |
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
