---
author: Alfresco Documentation
---

# Tasks

A task describes one task for a human user.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/tasks](https://api-explorer.alfresco.com/api-explorer/#/tasks). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/tasks](http://localhost:8080/api-explorer/#/tasks).

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

**Parent topic:**[Entity reference](../../../pra/1/concepts/pra-resources.md)

