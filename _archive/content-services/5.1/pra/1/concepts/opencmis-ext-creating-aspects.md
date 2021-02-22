---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Creating a document or folder with aspects

Aspects can be specified when creating a document or folder.

To create an object, the property cmis:objectTypeId must be set to a valid CMIS object type id. With the Alfresco OpenCMIS Extension installed, the OpenCMIS library accepts a comma-separated list of type ids. The first type id in that list must be the object type id. The following type ids must be aspect type ids. Aspect properties can be set for all aspects in the list.

The following code fragment shows an example of creating a document with one aspect:-

```

Map<String, Object> properties = new HashMap<String, Object>();
properties.put(PropertyIds.NAME, "doc1");
properties.put(PropertyIds.OBJECT_TYPE_ID, "cmis:document,P:cm:titled");
properties.put("cm:description", "My document");

Document doc = session.getRootFolder().createDocument(properties, null, null);
```

This creates a document without content in the root folder, with the titled aspect applied and the description property set.

**Parent topic:**[The Alfresco OpenCMIS Extension for CMIS 1.0](../../../pra/1/concepts/opencmis-ext-intro.md)

