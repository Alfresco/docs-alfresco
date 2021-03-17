---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Removing aspects from a document or folder

To remove aspects from an existing object, such as a document or folder, you must first get all aspects and then remove the unwanted ones from the list before updating.

If we have a document or folder and we want to remove an aspect from it, then we can use the `cmis:secondaryObjectTypeIds` property and update it via the `updateProperties` operation. Let's take an example where a document have the Alfresco out-of-the-box aspect called Effectivity \(`cm:effectivity`\) applied and we want to remove it. To do this for a document object, do as follows:

```
public void removeAspectFromDocument(Document document) {
	String aspectName = "P:cm:effectivity";

	// Make sure we got a document, and then remove the aspect from it
	if (document != null) {
		// Check that document got the aspect applied
		List<Object> aspects = document.getProperty("cmis:secondaryObjectTypeIds").getValues();
		if (aspects.contains(aspectName)) {
			aspects.remove(aspectName);
			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put("cmis:secondaryObjectTypeIds", aspects);
			Document updatedDocument = (Document) document.updateProperties(properties);
			
			System.out.println("Removed aspect " + aspectName + " from " + getDocumentPath(updatedDocument));
		} else {
			System.out.println("Aspect " + aspectName + " is not applied to " + getDocumentPath(document));
		}
	} else {
		System.out.println("Document is null, cannot remove aspect from it!");
	}
}
```

The document object that we want to remove the aspect from is passed into the method. We start by getting currently set aspects, so we can make sure that the `cm:effectivity` aspect is indeed set. We need to keep a list of all the aspects that are already set, and which we want to keep when updating. There is no method to remove just one aspect, we need to set all aspects that we want to keep when we update the properties.

Note that when you remove and aspect in this way, all the associated properties are removed as well automatically, in this case `cm:from` and `cm:to`.

For information on how to implenent the `getDocumentPath` method see [this](opencmis-ext-intro.md) page.

**Parent topic:**[Working with the CMIS API from Java](../concepts/opencmis-ext-intro.md)

