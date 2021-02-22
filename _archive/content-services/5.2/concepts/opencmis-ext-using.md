---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Working with Alfresco aspects from OpenCMIS

It's possible to work with Alfresco aspects directly via OpenCMIS using CMIS secondary types.

Alfresco has two types of classes that can be used to classify content, types and aspects. A node in Alfresco \(that is, a CMIS object\) can have one and only one type set but zero or more aspects applied.

We can use so called CMIS secondary types to manage the aspects for an object in Alfresco, as Alfresco exposes any aspects that are set on an object as secondary types.

This will work if you are running Alfresco 4.2.e Community, Alfresco 4.2.0 Enterprise, or newer versions. With earlier versions, you have to use a special Alfresco OpenCMIS extension to manage aspects.

When we want to manage aspects via CMIS secondary types, we will just use standard OpenCMIS library functions. Secondary object types are managed in a specific multivalued property named `cmis:secondaryObjectTypeIds`.

See the following [page](opencmis-ext-creating-aspects.md) for how to add aspects to a CMIS object, such as a folder or document.

See the following [page](opencmis-ext-adding.md) for how to remove aspects from a CMIS object.

**Parent topic:**[Working with the CMIS API from Java](../concepts/opencmis-ext-intro.md)

