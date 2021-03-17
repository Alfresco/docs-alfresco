---
author: Alfresco Documentation
---

# Get variables for a process

Use this to get all the variables for a specific process.

## Authorization

An authenticated user will have access to a processes variables if the user has started the process or if the user is involved in any of the process’s tasks. In a network, only variables for a process that is inside the given network are returned.

In non-network deployments, administrators can see all variables and perform all operations on those variable. In network deployments, network administrators can see all variables in their network and perform all operations on variables in their network.

## Method

Using the HTTP GET method:-

```

processes/<processId>/variables
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/2/variables
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be a list containing all the variables for the specified processId.

```
entry: {
   "name": "bpm_priority",
   "value": 1,
   "type": "d:int"
}
…


```

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

