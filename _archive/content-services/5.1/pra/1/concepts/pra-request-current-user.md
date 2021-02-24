---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Specifying the current user

When making an Alfresco REST API call, your application might not know the user ID of the currently authenticated user. You can use the string `-me-` to represent that user in request URLs, and PUT and POST request bodies.

For example, assuming the currently authenticated user is `fred.bloggs@yourcompany.com` the following URL will return a list of site memberships for the currently authenticated user:

```

      https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/sites
```

Using the current user `-me-`, the following URL will return the same list of site memberships:

```

      https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/-me-/sites
```

**Parent topic:**[What does a request look like?](../../../pra/1/concepts/pra-request.md)

