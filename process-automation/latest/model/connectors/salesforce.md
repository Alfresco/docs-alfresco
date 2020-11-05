---
title: Salesforce connector
---

The Salesforce connector is used to integrate with an installation of [Salesforce](https://salesforce.com){:target="_blank"} and have a process operate on Salesforce objects.

The Salesforce connector is displayed on the process diagram with the Salesforce logo.

> **Important**: The Salesforce connector requires a Salesforce account to use. This account is separate to the Alfresco hosted environment and should be created and managed by customers.

The actions that can be executed using the Salesforce connector are:

* [Create an object instance](#create-an-object-instance)
* [Get an object instance](#get-an-object-instance)
* [Update an object instance](#update-an-object-instance)
* [Delete an object instance](#delete-an-object-instance)
* [Query an object instance](#query-an-object-instance)
* [Submit a Salesforce object instance for approval](#submit-an-object-instance-for-approval)
* [Query the current approval processes in Salesforce](#query-approval-process)
* [Approve a Salesforce object instance submitted for approval](#approve-an-object-instance-submitted-for-approval)
* [Reject a Salesforce object instance submitted for approval](#reject-an-object-instance-submitted-for-approval)
* [Create a new custom object in Salesforce](#create-a-custom-object-definition)

> **Important**: The Salesforce connector requires a [Salesforce developer account](https://developer.salesforce.com/signup){:target="_blank"} to interact with and a **Connected App** set up to interact with the Process Automation connector.

## Create an object instance

The **CREATE** action is used by the Salesforce connector to create a new Salesforce object.

The input parameters to create an object are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| SObjectName | String | *Required.* The name of the Salesforce object to create, for example `Account`. |
| salesforcePayload | JSON | *Required.* The payload to send to Salesforce as a JSON map. See [Salesforce API documentation](https://developer.salesforce.com/docs/api-explorer/sobject/Account){:target="_blank"} for valid fields to send. |

The output parameters from creating an object in Salesforce are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Get an object instance

The **GET** action is used by the Salesforce connector to retrieve a Salesforce object.

The input parameters to get an object are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| SObjectName | String | *Required.* The name of the Salesforce object to get, for example `Account`. |
| SObjectId | String | *Required.* The Salesforce object ID, for example `accountId`. |

The output parameters from getting an object from Salesforce are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Update an object instance

The **UPDATE** action is used by the Salesforce connector to update a Salesforce object.

The input parameters to update an object are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| SObjectName | String | *Required.* The name of the Salesforce object to update, for example `Account`. |
| SObjectId | String | *Required.* The Salesforce object ID, for example `accountId`. |
| salesforcePayload | JSON | *Required.* The payload to send to Salesforce as a JSON map. See [Salesforce API documentation](https://developer.salesforce.com/docs/api-explorer/sobject/Account){:target="_blank"} for valid fields to send. |

The output parameters from updating an object from Salesforce are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Delete an object instance

The **DELETE** action is used by the Salesforce connector to delete a Salesforce object.

The input parameters to delete an object are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| SObjectName | String | *Required.* The name of the Salesforce object to delete, for example `Account`. |
| SObjectId | String | *Required.* The Salesforce object ID, for example `accountId`. |

The output parameters from deleting an object from Salesforce are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Query an object instance

The **QUERY** action is used by the Salesforce connector to query a Salesforce object.

The input parameters to query an object are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceQuery | String | *Required.* The query to execute against Salesforce, for example `SELECT name FROM account`. |

The output parameters from querying an object from Salesforce are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Submit an object instance for approval

The **APPROVAL_SUBMIT** action is used by the Salesforce connector to submit a Salesforce object for approval.

The input parameters to submit an object for approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforcePayload | JSON | *Required.* The payload to send to Salesforce as a JSON map. See [Salesforce API documentation](https://developer.salesforce.com/docs/api-explorer/sobject/Account){:target="_blank"} for valid fields to send. |

The output parameters from submitting an object for approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Query approval process

The **APPROVAL_LIST** action is used by the Salesforce connector to query Salesforce objects awaiting approval.

The output parameters from querying objects awaiting approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Approve an object instance submitted for approval

The **APPROVAL_APPROVE** action is used by the Salesforce connector to approve a Salesforce object that is awaiting approval.

The input parameters to approve an object awaiting approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforcePayload | JSON | *Required.* The payload to send to Salesforce as a JSON map. See [Salesforce API documentation](https://developer.salesforce.com/docs/api-explorer/sobject/Account){:target="_blank"} for valid fields to send. |

The output parameters from approving an object awaiting approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Reject an object instance submitted for approval

The **APPROVAL_REJECT** action is used by the Salesforce connector to reject a Salesforce object that is awaiting approval.

The input parameters to reject an object awaiting approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforcePayload | JSON | *Required.* The payload to send to Salesforce as a JSON map. See [Salesforce API documentation](https://developer.salesforce.com/docs/api-explorer/sobject/Account){:target="_blank"} for valid fields to send. |

The output parameters from rejecting an object awaiting approval are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Create a custom object definition

The **CUSTOM_OBJECT_CREATE** action is used by the Salesforce connector to create a custom Salesforce object definition.

The input parameters to create a custom object definition are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforcePayload | JSON | *Required.* The payload to send to Salesforce as a JSON map. See [Salesforce API documentation](https://developer.salesforce.com/docs/api-explorer/sobject/Account){:target="_blank"} for valid fields to send. |

The output parameters from creating an object definition are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| salesforceResult | String | *Optional.* The result from the REST or SOAP call from Salesforce. |
| salesforceStatus | String | *Optional.* The HTTP status code of the response. |

## Configuration parameters

The configuration parameters for the Salesforce connector are:

| Parameter | Description |
| --------- | ----------- |
| SALESFORCE_CLIENT_ID | *Required.* The ID of your Salesforce account. When viewing your application in the Salesforce App Manager this is called the **Consumer Key**.  |
| SALESFORCE_CLIENT_SECRET | *Required.* The secret associated to your Salesforce account. When viewing your application in the Salesforce App Manager this is called the **Consumer Secret**. |
| SALESFORCE_USERNAME | *Required.* The user that the connector will use to interact with Salesforce. |
| SALESFORCE_PASSWORD | *Required.* The password for the user that will interact with Salesforce. |
| SALESFORCE_SECURITY_TOKEN | *Required.* The security token for the user that will interact with Salesforce. To obtain this token, log into Salesforce as the user and navigate to **Settings > My Personal Information**. |
| SALESFORCE_URL_LOGIN | *Required.* The URL to login to Salesforce, for example `https://login.salesforce.com/services/oauth2/token`. |
| SALESFORCE_SOAP_URL_LOGIN | *Required.* The URL for SOAP requests, for example `https://login.salesforce.com/services/Soap/c/45.0`. |
| SALESFORCE_VERSION | *Required.* The version of Salesforce, for example `45.0`. |

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Salesforce connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| REQUEST_TIMEOUT | Salesforce request timeout. |
| CIRCUIT_BREAKER_OPEN | Max number of retries reached without success. |
| MISSING_TOKEN | Salesforce access token could not be obtained. |
| CONNECTION_ERROR | Salesforce connection error. |
