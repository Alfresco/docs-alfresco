---
title: REST connector
---

The REST connector is used to provide a connection with a REST service. It can also be used to configure a [webhook]({% link process-automation/latest/model/triggers.md %}#webhooks) as an incoming trigger.

The REST connector appears on the process diagram as a pair of curly brackets. When configuring the REST connector you can use [Authentication]({% link process-automation/latest/model/authentication.md %}).

> **Important**: All REST services need to be separate to the Alfresco hosted environment and should be created and managed by customers.

The actions that can be executed using the REST connector are:

* [GET](#get)
* [HEAD](#head)
* [POST](#post)
* [PUT](#put)
* [PATCH](#patch)
* [DELETE](#delete)
* [OPTIONS](#options)
* [TRACE](#trace)

## GET

The **GET** action is used to send HTTP GET requests.

The input parameters for GET are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from GET are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restResult | JSON | *Optional.* The response from the REST service call. |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

## HEAD

The **HEAD** action is used to send HTTP HEAD requests.

The input parameters for HEAD are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from HEAD are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

## POST

The **POST** action is used to send HTTP POST requests.

The input parameters for POST are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| requestPayload | JSON | *Optional.* The body of the request. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from POST are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restResult | JSON | *Optional.* The response from the REST service call. |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

### Use the POST action to send files

You can use the `RequestPayload` property in the expression editor to reference and send a file from another location using the **POST** action.

To use the **POST** action to send files:

1. In the Modelling Application click the **+** icon next to processes and create a new process called `send-file`.

2. Create a **User task** called `Attach file`.

3. Create a **REST Connector** called `Send POST request`.

4. Join the **User task** to the **REST Connector**.

5. Select the **REST Connector** and from the **Properties pane** select the **POST** action from the **Action** dropdown list.

6. Click the edit icon next to **RequestPayload** under the **Input mapping** section.

7. In the **Value** column on the right add the following.

    ```{
    "base64File": "${getBase64FileContent(file)}"
       }
        ```

    Where `file` is the file process variable and might have a different name in your process.

8. Select the **restUrI** parameter on the left and then select **Value** on the right.

9. Enter the UrI you want to use, for example `https://postman-echo.com` and then click **Update**.

This process can now be used in your forms to send a file.

> **Note:** The maximum file size for each file is 10 MB and the files are processed one-by-one to decrease the amount of memory used. If you have a large number of concurrent processes with bigger files, the execution time might be longer than usual.

## PUT

The **PUT** action is used to send HTTP PUT requests.

The input parameters for PUT are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| requestPayload | JSON | *Optional.* The body of the request. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from PUT are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restResult | JSON | *Optional.* The response from the REST service call. |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

## PATCH

The **PATCH** action is used to send HTTP PATCH requests.

The input parameters for PATCH are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| requestPayload | JSON | *Optional.* The body of the request. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from PATCH are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restResult | JSON | *Optional.* The response from the REST service call. |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

## DELETE

The **DELETE** action is used to send HTTP DELETE requests.

The input parameters for DELETE are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from DELETE are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restResult | JSON | *Optional.* The response from the REST service call. |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

## OPTIONS

The **OPTIONS** action is used to send HTTP OPTIONS requests.

The input parameters for OPTIONS are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| restUrlEncoded | Boolean | *Optional.* Set whether the URL should be encoded or not, for example `true`. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from OPTIONS are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |
| responseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

## TRACE

The **TRACE** action is used to send HTTP TRACE requests.

The input parameters for TRACE are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restUrl | String | *Required.* URL of the REST endpoint including the protocol and path, for example `http://alfresco.com`. |
| restUrlParams | JSON | *Optional.* JSON map of the URL parameter names and values to append to the URL. |
| requestHeaders | JSON |  *Optional.* A JSON map of the request header names and values. Values can be fixed values or variables. |
| circuitBreaker | Boolean | *Optional.* Set whether the circuit breaker is enabled, for example `true`. |
| timeout | Integer | *Optional.* The timeout period to wait for the service in milliseconds, for example `910000`. |

The output parameters from TRACE are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| restResult | JSON | *Optional.* The response from the REST service call. |
| restStatus | Integer | *Optional.* The HTTP response status code from the REST service call. |

## Configuration parameters

The configuration parameters for the REST connector are:

| Parameter | Description |
| --------- | ----------- |
| EVENT_NOT_MATCH_STATUS | *Optional.* The HTTP response code to return to an external system if no triggers are matched by an incoming webhook request, for example `404`. |

> **Note**: The configuration parameters for the REST connector are used for configuring webhooks using [triggers]({% link process-automation/latest/model/triggers.md %}).

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the REST connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. |
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. |
| PROXY_AUTHENTICATION_REQUIRED | The request has not been applied because it lacks valid authentication. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
| CONFLICT | The request conflicts with current state of the server. |
| GONE | No longer available. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |
