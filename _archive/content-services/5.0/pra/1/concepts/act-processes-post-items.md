---
author: Alfresco Documentation
---

# Add an item to a process

Use this to create an item for a given process. If the item already is part of that process the request will have no effect.

## Authorization

In non-network deployments, a user can add items to processes that the user started or if the user is involved in any of the process’s tasks.

If networks are enabled, the authenticated user can update items inside their network.

In non-network deployments, administrators can add items and perform all operations on processes. In network deployments, network administrators can see all items in their network and perform all operations on processes in their network.

## Method

Using the HTTP POST method:-

```
processes/<processId>/items
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/2/items
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|string|string|The node id of the item to add.|

## Example POST body

```

{
    "id": "42eef795-857d-40cc-9fb5-5ca9fe6a0592",
}


```

## Response

If the request is successful, an HTTP CREATED is returned \(status 201\).

## Example response body

The added item is returned.

```
{ entry: {
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

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

