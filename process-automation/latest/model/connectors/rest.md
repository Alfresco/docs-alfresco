---
title: REST connector
---

The REST connector is used to provide a connection with a REST service.

The REST connector is appears on the process diagram as a pair of curly brackets.

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
| restResponseHeaders | JSON | *Optional.* The HTTP response headers from the REST service call. |

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
