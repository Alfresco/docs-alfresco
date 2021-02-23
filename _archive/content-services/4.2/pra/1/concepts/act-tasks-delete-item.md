---
author: Alfresco Documentation
---

# Delete an item

Use this to delete an item from a specific task.

## Authorization

An authenticated user can only delete an item if the authenticated user has started the process or if the user is involved in any of the process’s tasks.

If networks are enabled, the authenticated user can delete items inside their network.

In non-network deployments, administrators can delete items and perform all operations on processes. In network deployments, network administrators can delete items in all processes in their network.

## Method

Using the HTTP DELETE method:-

```
tasks/<taskId>/items/<itemId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks/153/items/2eef795-857d-40cc-9fb5-5ca9fe6a0592
```

## Response

-   If the request is successful the item is removed and an HTTP `No Content` \(status 204\) is returned.
-   If the processId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the itemId does not exist for this taskId, an HTTP `Not Found` \(status 404\) is returned.

**Parent topic:**[Tasks](../../../pra/1/concepts/act-tasks.md)

