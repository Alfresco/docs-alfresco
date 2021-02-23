---
author: Alfresco Documentation
---

# Get information for a deployment

Use this to get a specific deployment object.

## Authorization

The authenticated user must have role admin \(non-network deployments\) or network admin \(networks enabled\).

If networks is enabled, the deployment is only returned if the deployment is in the given network.

## Method

Using the HTTP GET method:-

```

deployments/<deploymentId>
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/deployments/92837492
```

## Response

-   If the deploymentId does not exist, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{ entry: {
 "id": "92837492",
 "name": "activiti-examples.bar",
 "category": "http://alfresco.org/workflows/examples",
 "deployedAt": "2010-10-13T14:54:26.750+02:00",
} }
```

**Parent topic:**[Deployments](../../../pra/1/concepts/act-deployments.md)

