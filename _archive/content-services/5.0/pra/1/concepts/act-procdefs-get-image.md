---
author: Alfresco Documentation
---

# Get an image of a single process definition.

Use this to get an image that represents a single process definition.

## Authorization

In non-network deployments, any authenticated user will be able to see all process definitions. In a network, the authenticated user will only see the process definitions deployed inside their network.

## Method

Using the HTTP GET method:-

```

process-definitions/<processDefinitionId>/image
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/process-definitions/financialReport:1/image
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be an image of content-type `image/png`.

**Parent topic:**[Process definitions](../../../pra/1/concepts/act-procdefs.md)

