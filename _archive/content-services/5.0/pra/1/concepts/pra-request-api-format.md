---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# API method format

The method itself consists of at least one entity type, or an entity type and an entity id, or concatenations of entity type and id pairs, optionally followed by HTTP parameters that filter the results.

For example the following API method will return a list of all site entities:

```

      sites
```

The entity type can be followed by an entity id, so for example the following API method will return on the site entity with the id `fred-bloggs-yourcompany-com`.

```

      sites/fred-bloggs-yourcompany-com
```

Entity types and ids can be concatenated, so for example the following API method will get site membership information for a specific person from a specific site

```

      sites/fred-bloggs-yourcompany-com/members/fred.bloggs@yourcompany.com
```

**Parent topic:**[What does a request look like?](../../../pra/1/concepts/pra-request.md)

