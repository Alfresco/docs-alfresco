---
author: Alfresco Documentation
---

# Get variables for a task

Use this to get all the variables for a specific task.

## Authorization

An authenticated user will have access to a tasks variables if the user has started the process or if the user is involved in any of the process’s tasks. In a network, only variables for a process that is inside the given network are returned.

In non-network deployments, administrators can see all variables and perform all operations on those variables. In network deployments, network administrators can see all variables in their network and perform all operations on variables in their network.

## Method

Using the HTTP GET method:-

```

tasks/<taskId>/variables
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks/153/variables
```

You can use the `where` parameter to get tasks that meet certain criteria. The where parameter takes a single predicate that includes one or more conditions connected by `AND` . For example, if you only want local tasks the `where` parameter would be `where=( scope='local')`

The following table shows the `where` parameters you can use in this method:

|Name|Description|Operators|Type|
|scope|Can have one of the values `{local|global|any}`. -   **local**

Return task local variables

-   **global**

Return process variables

-   **any**

Return task local and process variables. This is the default


|=|Enumerated String|

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be a list containing all the variables for the specified taskId.

```
entry: {
   "scope": "global",
   "name": "bpm_priority",
   "value": 1,
   "type": "d_int"
}

```

**Parent topic:**[Tasks](../../../pra/1/concepts/act-tasks.md)

