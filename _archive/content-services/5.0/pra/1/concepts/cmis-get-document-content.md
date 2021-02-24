---
author: Alfresco Documentation
---

# Getting the contents of a document

You can get the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.

## URL format

Here is an example of a URL to retrieve the contents of a specific document in Alfresco Cloud:

```

https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

Here is an example of a URL to retrieve the contents of a specific document in an Alfresco on-premise instance:

```

https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

The response body is the content of the document. The format is specific to the type of content, so for example, getting the contents of a text document returns a text response body.

**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

