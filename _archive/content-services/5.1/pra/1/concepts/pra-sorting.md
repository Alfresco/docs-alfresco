---
author: Alfresco Documentation
---

# Sorting your returned objects

For some collections, you can control the order of the entities returned using the `orderBy` parameter.

`orderBy` specifies the name of one or more comma separated properties. For each property you can optionally specify the order direction. The following requests retrieve all site entities ordered by ascending title:

```
GET ...alfresco/versions/1/sites?orderBy=title
GET ...alfresco/versions/1/sites?orderBy=title%20ASC
```

The following request will return all site entities ordered by their `title` property in descending order and then by their `description` property in ascending order:

```
GET ...alfresco/versions/1/sites?orderBy=title%20DESC,description
```

If the entity type does not support ordering or if any of the specified properties do not exist or cannot be used for sorting purposes then a 400 HTTP status code is returned. An error object is returned that states why the requested sort cannot be performed.

**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

