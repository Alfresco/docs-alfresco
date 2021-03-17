---
author: Alfresco Documentation
---

# Using aspects

Alfresco Aspects are exposed as secondary types in CMIS 1.1. You can dynamically add aspects to an Alfresco object using the API.

You add an aspect to an object by updating the `cmis:secondaryObjectTypeIds` property with the Type Id of the Aspect. You can add and set an aspect in the same call.

`cmis:secondaryObjectTypeIds` is an array of strings, each of which is an an aspect type, for example `dublinCoreAspect`.

**Parent topic:**[CMIS 1.1](../../../pra/1/concepts/cmis-1.1-intro.md)

