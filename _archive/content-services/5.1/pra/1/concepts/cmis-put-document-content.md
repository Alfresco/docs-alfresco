---
author: Alfresco Documentation
---

# Updating the contents of a document

You can replace the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.

## URL format

Here is an example of a URL to update the contents of a specific document in Alfresco Cloud:

```

https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

Here is an example of a URL to update the contents of a specific document in an Alfresco on-premise instance:

```

https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

## Request Header

The request Content-Type must be of the same mime-type as the target document. In this example, we are updating a plain text document.

```

Content-Type: text/plain; charset=utf-8
```

## Request body

The request body is the new content of the document.

```

Some updated text.
```

## Response

If the request is successful an HTTP CREATED response \(status 201\) is returned.

**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

