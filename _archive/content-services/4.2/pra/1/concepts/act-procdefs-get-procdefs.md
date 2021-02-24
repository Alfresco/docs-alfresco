---
author: Alfresco Documentation
---

# Get a list of process definitions.

Use this to get a list of process definitions.

## Authorization

In non-network deployments, any authenticated user will see all the process definitions.

If networks are enabled, the network admin can only see the deployments in the given network.

## Method

Using the HTTP GET method:-

```

process-definitions
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/process-definitions
```

You can use the `where` parameter to get process definitions that meet certain criteria. The where parameter takes a single predicate that includes one or more conditions connected by `AND`. For example, if you only want process definitions in the category "com.acme.financial" the `where` parameter would be `where=( category='com.acme.financial')`

The following table shows the `where` parameters you can use in this method:

|Name

|Description

|Operators

|Type

|
|category

|Category of the process-definition

|=, matches

|String

|
|key

|Key of the process-definition

|=, matches

|String

|
|name

|Name of the process-definition

|=, matches

|String

|
|deploymentId

|ID of the deployment the process-definition is part of

|=

|String

|
|version

|Version of the process-definition for processes with the same key.

|=

|String

|

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be JSON as specified in Basic list response where each deployment resource entity has following format:

```
{
"list" : {
   "pagination" : {
     "count" : 2,
     "hasMoreItems" : false,
     "skipCount" : 0,
     "maxItems" : 100
   },
   "entries": [  
   {
     "entry": {
  "id": "financialReport:1",
  "key": "financialReport",
  "version": 1,
  "name": "April financial report",
  "category": "com.acme.financial",
  "deploymentId": "123",
  "startFormResourceKey": "wf:adhocTask",
  "graphicNotationDefined": true          
},
    {
     "entry": {
  "id": "financialReport:1",
  "key": "financialReport",
  "version": 1,
  "name": "May financial report",
  "category": "com.acme.financial",
  "deploymentId": "456",
  "startFormResourceKey": "wf:adhocTask",
  "graphicNotationDefined": true          
},
    ]
 }
}

```

**Parent topic:**[Process definitions](../../../pra/1/concepts/act-procdefs.md)

