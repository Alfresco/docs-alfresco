---
author: Alfresco Documentation
---

# Remove a comment

Use this to remove a comment.

## Method

Using the HTTP DELETE method:-

```
nodes/<nodeId>/comments/<commentId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/e8680e58-0701-4b64-950d-66cce277fbc7/comments/e1f349fb-79ee-4604-a563-16af8b78aa3c
```

## Response

-   If the nodeId or commentId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP `No Content` is returned \(status 204\), and the comment is removed.

**Parent topic:**[Comments](../../../pra/1/concepts/pra-nodes-comments.md)

