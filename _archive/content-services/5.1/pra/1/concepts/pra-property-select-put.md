---
author: Alfresco Documentation
---

# Using SELECT to set properties

You can use the SELECT parameter to request a partial update of an object.

For example, you might want to update just the state property of a task workflow object.

```
PUT .../tasks/02754d-32e0-4809-a722-8266e66e7b26?select=state
```

In the PUT request body you would write the following JSON to set the state to completed:

```
{
    "state" : "completed"
}
```

**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

