---
author: Alfresco Documentation
---

# Delete a process

Use this to delete a specific process

## Method

Using the HTTP DELETE method:-

```
processes/<processId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/<processId>
```

## Response

-   If the request is successful the process is removed and an HTTP `No Content` \(status 204\) is returned.
-   If the processId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

