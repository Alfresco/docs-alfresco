---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Adding, removing and discovering aspects

To add and remove aspects to an existing object, you must cast OpenCMIS Document objects to `AlfrescoDocument` objects and Folder objects to `AlfrescoFolder` objects.

These two classes provide the following additional methods:

Methods for checking if an aspect is applied:-

```

boolean hasAspect(String id);
boolean hasAspect(ObjectType type);

```

A method to retrieve the currently applied aspects:-

```

Collection<ObjectType> getAspects();

```

A method to find the aspect type for a given property id

```

ObjectType findAspect(String propertyId);

```

Methods to add and remove aspects

```

void addAspect(String... id);
void addAspect(ObjectType... type);
void removeAspect(String... id);
void removeAspect(ObjectType... type);

```

The following code fragment adds an aspect to an existing object, checks if the object has a second aspect, and updates the \*description\* property if it does:-

```

Document doc = (Document) session.getObject(...);
  
AlfrescoDocument alfDoc = (AlfrescoDocument) doc;
alfDoc.addAspect("P:cm:taggable");

if(alfDoc.hasAspect("P:cm:titled")) {
  Map<String, Object> properties = new HashMap<String, Object>();
  properties.put("cm:description", "My taggable document");
  alfDoc.updateProperties(properties);
}

```

Note the format of the aspect type "P:cm:titled". In Alfresco, all aspect types visible through CMIS are prefixed with "P:", document types are prefixed with "D:" and folder types are prefixed with "F:".

**Parent topic:**[The Alfresco OpenCMIS Extension](../concepts/opencmis-ext-intro.md)

