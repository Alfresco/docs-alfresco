---
author: Alfresco Documentation
---

# Get a list of processes

Use this to get a list of processes.

## Authorization

An authenticated user will have access to a processes if the user has started the process or if the user is involved in any of the process’s tasks. In a network, only processes that are inside the given network are returned.

In non-network deployments, administrators can see all processes and perform all operations on processes. In network deployments, network administrators can see all processes in their network and perform all operations on processes in their network.

## Method

Using the HTTP GET method:-

```

processes
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes
```

You can use the `where` parameter to get processes that meet certain criteria. The where parameter takes a single predicate that includes one or more conditions connected by `AND` . For example, to retrieve only processes started by ‘kermit’ for the business key of ‘55’ and with a variable called nameB whose value starts with 'elmo', the where parameter would be specified as

```

where=( startUserId='kermit' AND businessKey='55' AND
   variables/nameB MATCHES('elmo%') ).
```

The following table shows the `where` parameters you can use in this method:

|Name

|Description

|Operators

|Type

|
|businessKey|The business key. For example "item928374". Together with a processDefinitionId this will identify a process uniquely.|=|String|
|processDefinitionId|The process definition id, for example "financialReport:1"|=|String|
|processDefinitionKey|The process definition key, for example "financialReport".|=|String|
|startUserId|The user that started the process, for example "johndoe".|=|String|
|startedAt|The date the process was started.|<, \>|Date time|
|endedAt|The date the process completed.|<, \>|Date time|
|status|\{any\|active\|completed\}: Active returns only processes will be returned that are not completed. Completed, returns only completed processes are returned. By default only active processes will be returned.|=|String|
|includeVariables|Should process variables be returned in the query result? The default is false.|=|Boolean|
|variables|Variables are referenced using the JSON pointer syntax, using the key "variables" as the root. For example, a variable named "variableA" would be referenced as `/variables/variableA’?>` . You can combine multiple variables with an AND clause.|\>, <, \>=, <=, = and matches\(..\). The value to compare to can be a literal string or a value prefixed with a model data-type followed by a single space, for example `d:text test`.|String representing variable value to compare and an operator, for example `variables/variableA > 'd:int 50'`.|

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be JSON as specified in Basic list response where each process entity has following format:

```
entry: {
    "id": "2",
    "processDefinitionId": "financialReport:1",
    "processDefinitionKey": "financialReport",
    "businessKey": "55",
    "startedAt": "2010-10-13T14:54:26.750+02:00",
    "endedAt": "2010-10-13T14:54:26.750+02:00",
    "durationInMs": 9823720,  // expressed in millisecs 
    "completed": true
    "startActivityId": "startFinancialAnalysis",
    "endActivityId": "success",
    "startUserId": "kermit",
    "deleteReason": "cancelled",
    "superProcessInstanceId", "1"
}
```

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

