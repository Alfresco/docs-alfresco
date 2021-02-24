---
author: Alfresco Documentation
---

# Get a list of deployments

Use this to get a list of deployments.

## Authorization

The authenticated user must have role admin \(non-network deployments\) or network admin \(networks enabled\).

If networks are enabled, the network admin can only see the deployments in the given network.

## Method

Using the HTTP GET method:-

```

deployments
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/deployments
```

## URL request parameters

|Name

|Description

|Type

|
|skipCount

|positive integer

|number

|
|maxItems

|positive integer

|number

|

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be JSON as specified in Basic list response where each deployment entity has following format:

```

...
entry: {
 "id": "92837492",
 "name": "activiti-examples.bar",
 "category": "http://alfresco.org/workflows/examples",
 "deployedAt": "2010-10-13T14:54:26.750+02:00"
}
...
```

**Parent topic:**[Deployments](../../../pra/1/concepts/act-deployments.md)

