---
author: Alfresco Documentation
---

# Get a single task

Get a task.

## Authorization

An authenticated user will have access to a processes if the user has started the process or if the user is involved in any of the process’s tasks. In a network, only tasks that are inside the given network are returned.

In non-network deployments, administrators can see all processes and perform all operations on tasks. In network deployments, network administrators can see all processes in their network and perform all operations on tasks in their network.

## Method

Using the HTTP GET method:-

```

tasks/<taskId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks/2
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be a single entry containing the task. following format:

```
{ entry : { 
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
  "state": "completed"
  } 
}

```

**Parent topic:**[Tasks](../../../pra/1/concepts/act-tasks.md)

