---
author: Alfresco Documentation
---

# Delete a process variable

Use this to delete a process variable.

## Authorization

An authenticated user can only delete a process variable if the authenticated user has started the process or if the user is involved in any of the process’s tasks.

If networks are enabled, the authenticated user can delete variables inside their network.

In non-network deployments, administrators can see all variables and perform all operations on variables. In network deployments, network administrators can see all variables in their network and perform all operations on variables in their network.

## Method

Using the HTTP DELETE method:-

```
processes/<processId>/variables/<variableName>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/2/variables/bpm:priority
```

## Response

-   If the request is successful the variable is removed and an HTTP `No Content` \(status 204\) is returned.
-   If the processId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the variableName does not exist for this processId, an HTTP `Not Found` \(status 404\) is returned.

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

