---
author: Alfresco Documentation
---

# Get the tasks in a process

Use this to get the tasks for a specific process.

## Authorization

An authenticated user will have access to a processes tasks if the user has started the process or if the user is involved in any of the process’s tasks. In a network, only tasks for a process that is inside the given network are returned.

In non-network deployments, administrators can see all tasks and perform all operations on those tasks. In network deployments, network administrators can see all tasks in their network and perform all operations on tasks in their network.

## Method

Using the HTTP GET method:-

```

processes/<processId>/tasks
```

You can use the `status` parameter to filter the returned tasks:

-   **active**

    Only active tasks will be returned. This is the default.

-   **completed**

    Only completed tasks will be returned.

-   **all**

    All tasks will be returned.


## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/2/tasks
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be a list containing all the matching tasks for the specified processId.

```
entry: {
       "id": "127", 
       "processDefinitionId": "financialReport:1", 
       "processId": "123", 
       "activityDefinitionId": "review"  // the activity id of the usertask
       "activityDefinitionName": "Review",
       "name": "Handle vacation request", 
       "description": "Vacation request by Kermit", 
       "dueDate": "2010-10-13T14:54:26.750+02:00", 
       "startedAt": "2010-10-13T14:54:26.750+02:00", 
       "endedAt": "2010-10-13T14:54:26.750+02:00", 
       "durationInMs": 982374,  // expressed in millis 
       "priority": 50, 
       "owner": "Kermit", 
       "assignee": "johndoe", 
       "formResourceKey": "wf:submitAdhocTask",
       "state": "completed" 
}


```

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

