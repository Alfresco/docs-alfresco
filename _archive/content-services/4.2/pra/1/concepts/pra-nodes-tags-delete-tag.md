---
author: Alfresco Documentation
---

# Remove a tag

Use this to remove a tag from a specific node.

## Method

Using the HTTP DELETE method:-

```
nodes/<nodeId>/tags/<tagId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/tags/e8680e58-0701-4b64-950d-66cce277fbc7/tags/3ccdc60e-1853-4cc0-9d29-280a3f7d303
```

## Response

-   If the nodeId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP `No Content` is returned \(status 204\), and the tag is removed from the node.

**Parent topic:**[Tags](../../../pra/1/concepts/pra-nodes-tags.md)

