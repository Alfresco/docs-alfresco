---
author: Alfresco Documentation
---

# Update the state of a task

Use this to update the state of a specific task.

## Authorization

To perform a task action the authenticated user must be the assignee or a candidate. If networks is enabled, the task action is only performed if the task is inside the given network.

In non-network deployments, administrators can perform all operations on tasks. In network deployments, network administrators can see all tasks in their network and perform all operations on tasks in their network.

## Method

Using the HTTP PUT method:-

```
tasks/<taskId>?<select-parameter>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks/127/variables?select=state,variables
```

## PUT body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|name|string|string|The task name. This is used as the title of the task in Alfresco.|
|description|string|string|The task description.|
|state|enumerated string, one of claimed. unclaimed, completed, resolved|string|The state of the task.|
|assignee|id|string|The userId of the person to whom the task is to be assigned.|
|owner|id|string|The userId of the person who will become the task owner.|
|dueAt|Date Time|String|The date time this task is due|
|priority|Number|Number|The numeric priority of this task|
|variables|array of objects|array of objects|An array of variables to be set when completing or resolving the task. If variables are set and the requested state change is not complete or resolve action, an HTTP error response is returned|

## State transitions

Clients can invoke actions by assigning an allowed value to the `state` property of a task. The select parameter can be used to allow for a partial update of the resource. Alfresco will check for illegal state transitions and return an HTTP Bad Request \(Response 400\) if an illegal state transition is attempted. There are five state transitions, completing, claiming, unclaiming, delegating, resolving.

-   **Completing a task**

    If variables are included in the JSON body, they will be set in the task and then the process will continue.

    To complete a task, the authenticated user must be the assignee of the task, the owner of the task, or have started the process.

    In non-network deployments, administrators can perform this task operation on all tasks. In network deployments, network administrators can perform this action on all tasks in their network.

    An example PUT request:

    ```
    /tasks/127?select=state,variables
    ```

    An example PUT body:

    ```
    {
      “state : “completed”,
      “variables” : [
        {
            "name" : "bpm_priority",
            "type" : "d_int",
            "value" : 1,
            "scope" : "global"
        }
      ]
    }
    
    ```

-   **Claiming a task**

    To claim a task, the authenticated user must be the assignee of the task, the owner of the task, or have started the process.

    An example PUT request:

    ```
    /tasks/127?select=state
    ```

    An example PUT body:

    ```
    {
      “state : “claimed”
    }
    
    
    ```

-   **Unclaiming a task**

    This removes the current assignee of the task.

    To unclaim a task, the authenticated user must be the assignee of the task, the owner of the task, or have started the process.

    An example PUT request:

    ```
    /tasks/127?select=state
    ```

    An example PUT body:

    ```
    {
      “state : “unclaimed”
    }
    
    
    ```

-   **Delegating a task**

    This delegates the task from the owner to an assignee. The result is the same as if the assignee had claimed the task, but the task can then be resolved and the owner will become the assignee again.

    To delegate a task, the authenticated user must be the assignee of the task and the assignee must be different from the owner.

    An example PUT request:

    ```
    /tasks/127?select=state,assignee
    ```

    An example PUT body:

    ```
    {
      “state : “delegated”,
      “assignee” : “Kermit”
    }
    
    
    
    ```

-   **Resolving a task**

    This returns a delegated task back to the owner. In order to delegate a task, the authenticated user must be the assignee of the task and the assignee must be different from the owner.

    To delegate a task, the authenticated user must be the assignee of the task, the owner of the task, or have started the process.

    An example PUT request:

    ```
    /tasks/127?select=state
    ```

    An example PUT body:

    ```
    {
      “state : “resolved”
    }
    
    
    
    ```


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

