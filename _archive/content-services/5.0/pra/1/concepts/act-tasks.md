---
author: Alfresco Documentation
---

# Tasks

A task describes one task for a human user.

## Task object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|string|This task's unique id|
|processId|id|string|The containing process's unique id|
|processDefinitionId|id|string|The containing process's process definition id|
|activityDefinitionId|id|string|The activity id of this task|
|name|string|string|The text name of this task|
|description|string|string|A description this task|
|dueAt|Date Time|String|The date time this task is due|
|startedAt|Date Time|String|The date time this task started|
|endedAt|Date Time|String|If the task is completed, contains the date time this task ended|
|durationInMs|Number|Number|The duration of this task|
|priority|Number|Number|The numeric priority of this task|
|owner|id|string|The id of the user who owns this task|
|assignee|id|string|The id of the user who is currently assigned this task|
|formResourceKey|string|string|The key of the form for this task|
|state|string|string|The state of this task|
|variables|array of objects|array of objects|An array of variables for this task|

## Example of a task object

```
 : entry : { 
  "id": "127", 
  "processId": "123", 
  "processDefinitionId": "financialReport:1", 
  "activityDefinitionId": "review"  // the activity id of the usertask
  "name": "Handle vacation request", 
  "description": "Vacation request by Kermit", 
  "dueAt": "2010-10-13T14:54:26.750+02:00", 
  "startedAt": "2010-10-13T14:54:26.750+02:00", 
  "endedAt": "2010-10-13T14:54:26.750+02:00", 
  "durationInMs": 982374,  // expressed in millis 
  "priority": 50, 
  "owner": "Kermit", 
  "assignee": "johndoe",
  "formResourceKey": "wf:submitAdhocTask",
  "state": "completed",
  "variables": [
     {
       "scope": "global",
       "name": "bpm_priority",
       "value": 1,
       "type": "d_int"
     }
  ]
}

```

-   **[Get a list of tasks](../../../pra/1/concepts/act-tasks-get-tasks.md)**  
Use this to get a list of tasks visible to the authenticated user.
-   **[Get a single task](../../../pra/1/concepts/act-tasks-get-task.md)**  
Get a task.
-   **[Update the state of a task](../../../pra/1/concepts/act-tasks-put-task.md)**  
Use this to update the state of a specific task.
-   **[Get model of the task form type definition](../../../pra/1/concepts/act-tasks-get-form-model.md)**  
Use this to get the model of the task form type definition.
-   **[Get variables for a task](../../../pra/1/concepts/act-tasks-get-variables.md)**  
Use this to get all the variables for a specific task.
-   **[Create or update variables for a task](../../../pra/1/concepts/act-tasks-post-variables.md)**  
Use this to create or update variables for a given task. If one of the variables doesn't exist yet, it will be created.
-   **[Update variables for a task](../../../pra/1/concepts/act-tasks-put-variables.md)**  
Use this to update variables for a given task. If one of the variables doesn't exist yet, it will be created.
-   **[Delete a task variable](../../../pra/1/concepts/act-tasks-delete-variables.md)**  
Use this to delete a task variable.
-   **[Get the items in a task](../../../pra/1/concepts/act-tasks-get-items.md)**  
Use this to get items in a specific task.
-   **[Add an item to a task](../../../pra/1/concepts/act-tasks-post-items.md)**  
Use this to create an item for a given task. If the item already is part of that task the request will have no effect.
-   **[Delete an item](../../../pra/1/concepts/act-tasks-delete-item.md)**  
Use this to delete an item from a specific task.

**Parent topic:**[API reference](../../../pra/1/concepts/pra-resources.md)

