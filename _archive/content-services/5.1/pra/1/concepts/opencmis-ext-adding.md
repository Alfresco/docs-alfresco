---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Adding, removing and discovering aspects

To add and remove aspects to an existing object, you must cast OpenCMIS Document objects to `AlfrescoDocument` objects and Folder objects to `AlfrescoFolder` objects.

These two classes provide the following additional methods:

Methods for checking if an aspect is applied:

```

boolean hasAspect(String id);
boolean hasAspect(ObjectType type);
```

A method to retrieve the currently applied aspects:

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

The following code fragment adds an aspect to an existing object, and checks if the object has a second aspect to apply:

```

private static final String SECONDARY_OBJECT_TYPE_IDS_PROP_NAME = "cmis:secondaryObjectTypeIds";

public void addAspectToExistingDocument(Document document) {
        String aspectName = "P:cm:effectivity";
        // Make sure we have a document, and then add the aspect to it  
        if (document != null) {
            // Check that document doesn't already have the aspect applied
            List<Object> aspects = 
document.getProperty(SECONDARY_OBJECT_TYPE_IDS_PROP_NAME).getValues();
            if (!aspects.contains(aspectName)) {
                aspects.add(aspectName);
                Map<String, Object> properties = new HashMap<String, Object>();
                properties.put(SECONDARY_OBJECT_TYPE_IDS_PROP_NAME, aspects);
                properties.put("cm:from", new Date());
                Calendar toDate = Calendar.getInstance();
                toDate.add(Calendar.MONTH, 2);
                properties.put("cm:to", toDate.getTime());
                Document updatedDocument = (Document) document.updateProperties(properties);
                logger.info("Added aspect " + aspectName + " to " + getDocumentPath(updatedDocument));
            } else {
                logger.info("Aspect " + aspectName + " is already applied to " + 
getDocumentPath(document));
            }
        } else {
            logger.error("Document is null, cannot add aspect to it!");
        }
    }
```

**Parent topic:**[The Alfresco OpenCMIS Extension for CMIS 1.0](../../../pra/1/concepts/opencmis-ext-intro.md)

