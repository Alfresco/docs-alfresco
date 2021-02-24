---
author: Alfresco Documentation
---

# Processes

A process describes a running instance of a process definition.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/processes](https://api-explorer.alfresco.com/api-explorer/#/processes). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/processes](http://localhost:8080/api-explorer/#/processes).

When a new deployment includes a process definition that is already deployed with the same key, the newly deployed process definition will be considered a new version of the same process definition. By default processes will keep running in the process definition they are started in. But new processes can be started in the latest version of a process definition by using the processDefinitionKey parameter.

In non-network deployments, administrators can see all processes and perform all operations on tasks. In network deployments, network administrators can see processes in their network and perform all operations on tasks in their network.

## Process object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|string|This process's unique id|
|processDefinitionId|id|string|The unique identity of this process definition|
|businessKey|key|string|Business key|
|startedAt|Date Time|String|The date time this process started|
|endedAt|Date Time|String|If the process is completed, contains the date time this process ended|
|durationInMs|Number|Number|duration|
|startActivityDefinitionId|id|string|The id of the first activity in the process|
|endActivityDefinitionId|id|string|The id of the last activity in the process|
|startUserId|id|string|The id of the user who started the process|
|deleteReason|string|string|The reason this process was canceled|

## Example of a process object

```
 : {
    "id": "2",
    "processDefinitionId": "financialReport:1",
    "businessKey": "55",
    "startedAt": "2010-10-13T14:54:26.750+02:00",
    "endedAt": "2010-10-13T14:54:26.750+02:00",
    "durationInMs": 9823720,  // expressed in milliseconds
    "completed": true
    "startActivityDefinitionId": "startFinancialAnalysis",
    "endActivityDefinitionId": "success",
    "startUserId": "kermit",
    "deleteReason": "cancelled"
  }
```

**Parent topic:**[Entity reference](../../../pra/1/concepts/pra-resources.md)

