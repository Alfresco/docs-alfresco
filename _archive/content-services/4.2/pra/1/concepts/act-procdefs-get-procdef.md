---
author: Alfresco Documentation
---

# Get a single process definition.

Use this to get a process definition identified by a process definition id.

## Authorization

In non-network deployments, any authenticated user will see all the process definitions.

If networks are enabled, the network admin can only see the deployments in the given network.

## Method

Using the HTTP GET method:-

```

process-definitions/<processDefinitionId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/process-definitions/<processDefinitionId>
```

## Example response body

The body of the response will be a single entry:

```
{ 
  "entry": {
  "id": "financialReport:1",
  "key": "financialReport",
  "version": 1,
  "name": "Monthly financial report",
  "category": "com.alfresco.workflows.internal",
  "deploymentId": "10",
  "startFormResourceKey": "wf:adhocTask",
  "graphicNotationDefined": true,
    } 
}


```

**Parent topic:**[Process definitions](../../../pra/1/concepts/act-procdefs.md)

