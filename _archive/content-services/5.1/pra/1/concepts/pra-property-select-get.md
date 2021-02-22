---
author: Alfresco Documentation
---

# Using SELECT to filter output

You might only be interested in a subset of properties in a returned entity or list of entities. You can use the SELECT parameter to restrict the returned properties.

For example, the following API method would return all people, but only include the properties id, firstName, and lastName

```
GET .../versions/1/people?select=id,firstName,lastName
```

**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

