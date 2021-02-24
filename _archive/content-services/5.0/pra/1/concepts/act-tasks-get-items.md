---
author: Alfresco Documentation
---

# Get the items in a task

Use this to get items in a specific task.

## Authorization

An authenticated user will have access to a task's items if the user has started the process or if the user is involved in any of the task’s items. In a network, only items for a process that is inside the given network are returned.

In non-network deployments, administrators can see all tasks and perform all operations on those tasks. In network deployments, network administrators can see all tasks in their network and perform all operations on tasks in their network.

## Method

Using the HTTP GET method:-

```

tasks/<taskId>/items
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks/153/items
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be a list containing all the matching items for the specified taskId.

```
entry: {
             "id": "42eef795-857d-40cc-9fb5-5ca9fe6a0592",
             "name" : "FinancialResults.pdf"
             "title" : "FinancialResults"
             "description" : "the description"
             "mimeType" : "application/pdf"
             "createdBy" : "johndoe"
             "createdAt" : "2010-10-13T14:53:25.950+02:00"
             "modifiedBy" : "johndoe"
             "modifiedAt" : "2010-10-13T14:53:25.950+02:00"
             "size" : 28973
}

```

**Parent topic:**[Tasks](../../../pra/1/concepts/act-tasks.md)

