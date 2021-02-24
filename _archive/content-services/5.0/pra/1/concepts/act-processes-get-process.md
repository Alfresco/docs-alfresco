---
author: Alfresco Documentation
---

# Get a single process.

Use this to get a process.

## Authorization

An authenticated user will have access to a processes if the user has started the process or if the user is involved in any of the process’s tasks. In a network, only processes that are inside the given network are returned.

In non-network deployments, administrators can see all processes and perform all operations on tasks. In network deployments, network administrators can see all processes in their network and perform all operations on tasks in their network.

## Method

Using the HTTP GET method:-

```

processes/<processId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/2
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be a single entry containing the process. following format:

```
{ entry: {
    "id": "2",
    "processDefinitionId": "financialReport:1",
    "processDefinitionKey": "financialReport",
    "businessKey": "55",
    "startedAt": "2010-10-13T14:54:26.750+02:00",
    "endedAt": "2010-10-13T14:54:26.750+02:00",
    "durationInMs": 9823720,  // expressed in millis
    "completed": true
    "startActivityDefinitionId": "startFinancialAnalysis",
    "endActivityDefinitionId": "success",
    "startUserId": "kermit",
    "deleteReason": "cancelled",
    "superProcessInstanceId": "1"
}}

```

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

