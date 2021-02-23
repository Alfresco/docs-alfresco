---
author: Alfresco Documentation
---

# Get a list of tasks

Use this to get a list of tasks visible to the authenticated user.

## Authorization

Tasks are returned for which the authenticated user is the assignee or a candidate. If networks are enabled, the only tasks that are inside the given network are returned.

In non-network deployments, administrators can see all processes and perform all operations on tasks. In network deployments, network administrators can see all processes in their network and perform all operations on tasks in their network.

## Method

Using the HTTP GET method:-

```

tasks
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks
```

You can use the `where` parameter to get tasks that meet certain criteria. The where parameter takes a single predicate that includes one or more conditions connected by `AND`.

The following table shows the `where` parameters you can use in this method:

|Name|Description|Operators|Type|
|status|\{any\|active\|completed\}: Active returns only tasks will be returned that are not completed. Completed, returns only completed tasks are returned. By default only active tasks will be returned.|=|String|
|assignee|The id of a user, for example `"johndoe"`. Only tasks with the given assignee are returned.|=, MATCHES|String|
|owner|The id of a user, for example `"johndoe"`. Only tasks with the given owner are returned.|=, MATCHES|String|
|candidateUser|The id of a user, for example `"johndoe"`. Only tasks for which the given user is a candidate are returned.|=|String|
|candidateGroup|Only tasks for which the given group is a candidate are returned.|=|String|
|name|Only returns tasks with the specified name|=, MATCHES|String|
|description|Only returns tasks with the specified description|=, MATCHES|String|
|priority|Only returns tasks with the specified priority value|=, \>=, <=|Number|
|startedAt|The date the task was started.|=, <, \>|Date time|
|endedAt|The date the task completed.|=, <, \>|Date time|
|dueAt|The date the task is due.|=, <, \>|Date time|
|activityDefinitionId|The activityDefinitionId in the process definition|=, MATCHES|String|
|processId|Tasks in the given process instance are returned|=|String|
|processDefinitionId|The process definition id, for example "financialReport:1".|=|String|
|processDefinitionKey|The process definition key, for example "financialReport".|=|String|
|processDefinitionName|The process definition name.|=|String|
|businessKey|The business key. For example "item928374".|=|String|
|includeProcessVariables|Should the process variables related to the task be included in the result? The default value is false.|=|Boolean|
|includeTaskVariables|Should the task variables in the task be included in the result? The default value is false.|=|Boolean|
|variables|Variables are referenced using the JSON pointer syntax, using the key "variables" as the root. For example, a variable named "variableA" would be referenced as `/variables/variableA’?>`. You can combine multiple variables with an AND clause.|\>, <, \>=, <=, = and matches\(..\). The value to compare to can be a literal string or a value prefixed with a model data-type followed by a single space, for example `d:text test`.|String representing variable value to compare and an operator, for example `variables/variableA > 'd:int 50'`.|

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

**Parent topic:**[Tasks](../../../pra/1/concepts/act-tasks.md)

