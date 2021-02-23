---
author: Alfresco Documentation
---

# Processes

A process describes a running instance of a process definition.

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

-   **[Start a new process](../../../pra/1/concepts/act-processes-post-process.md)**  
Use this to start a new process.
-   **[Get a list of processes](../../../pra/1/concepts/act-processes-get-processes.md)**  
Use this to get a list of processes.
-   **[Get a single process.](../../../pra/1/concepts/act-processes-get-process.md)**  
Use this to get a process.
-   **[Delete a process](../../../pra/1/concepts/act-processes-delete-process.md)**  
Use this to delete a specific process
-   **[Get variables for a process](../../../pra/1/concepts/act-processes-get-variables.md)**  
Use this to get all the variables for a specific process.
-   **[Create or update variables for a process](../../../pra/1/concepts/act-processes-post-variables.md)**  
Use this to create or update variables for a given process. If one of the variables doesn't exist yet, it will be created.
-   **[Create or update variables for a process](../../../pra/1/concepts/act-processes-put-variables.md)**  
Use this to create or update variables for a given process. If one of the variables doesn't exist yet, it will be created.
-   **[Delete a process variable](../../../pra/1/concepts/act-processes-delete-variables.md)**  
Use this to delete a process variable.
-   **[Get the tasks in a process](../../../pra/1/concepts/act-processes-get-tasks.md)**  
Use this to get the tasks for a specific process.
-   **[Get the items in a process](../../../pra/1/concepts/act-processes-get-items.md)**  
Use this the items in a specific process.
-   **[Add an item to a process](../../../pra/1/concepts/act-processes-post-items.md)**  
Use this to create an item for a given process. If the item already is part of that process the request will have no effect.
-   **[Delete an item](../../../pra/1/concepts/act-processes-delete-item.md)**  
Use this to delete an item from a specific process.

**Parent topic:**[API Reference](../../../pra/1/concepts/pra-resources.md)

