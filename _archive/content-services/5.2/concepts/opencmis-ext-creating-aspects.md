---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Adding aspects to a document or folder

Aspects can be applied when creating or updating a document or folder.

To demonstrate how to add an aspect when we are creating an object, we will add one of the out-of-the-box Alfresco aspects called Titled \(`cm:titled`\) when we create a folder. This aspect, or the CMIS secondary type, requires two extra properties to be filled in, title and description:

```
public void createFolderWithTitledAspect(Session session) {
	String folderName = "OpenCMISTestTitled";
	Folder parentFolder = session.getRootFolder();
		
	// Check if folder already exist, if not create it
	Folder newFolder = (Folder) getObject(session, parentFolder, folderName);
	if (newFolder == null) {
		List<Object> aspects = new ArrayList<Object>();
		aspects.add("P:cm:titled");

		Map<String, Object> newFolderProps = new HashMap<String, Object>();
		newFolderProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
		newFolderProps.put(PropertyIds.NAME, folderName);
		newFolderProps.put("cmis:secondaryObjectTypeIds", aspects);
		newFolderProps.put("cm:title", "Folder Title");
		newFolderProps.put("cm:description", "Folder Description");

		newFolder = parentFolder.createFolder(newFolderProps);

		System.out.println("Created new folder with Titled aspect: " +
				newFolder.getPath() + " [creator=" + newFolder.getCreatedBy()
				+ "][created=" + date2String(newFolder.getCreationDate().getTime()) + "]");
	} else {
		System.out.println("Cannot create folder, it already exist: " +
				newFolder.getPath());
	}
}
```

For information on how to get a `Session` object, `getObject` method implementation, and `date2String` method, see [this](opencmis-ext-intro.md) page.

Here we first check whether the folder we intend to create already exists. If it doesn't, we go ahead and create a list of aspects that we want to set for the folder object. In this case, it is just the one aspect called `P:cm:titled` \(P stands for policy; it's the way Alfresco traditionally exposes aspects, and you still have to use this prefix\), but the `cmis:secondaryObjectTypeIds` property is a multivalued property, so we need to keep the aspect name in a list.

Then the standard properties map is created where one of the properties is the `cmis:secondaryObjectTypeIds` property, keeping the list of aspects. The folder is then created with this map of properties, and the aspect is set for us and exposed as a secondary type via CMIS.

If we already have an object and want to add an aspect to it, we can also use the `cmis:secondaryObjectTypeIds` property and update it via the `updateProperties` operation. We are going to use another of Alfresco's out-of-the-box aspects called Effectivity \(`cm:effectivity`\). It can be used to set a from date and a to date for an object, representing some form of time period when the object is effective. To do this for a document object, do as follows:

```
public void addAspectToExistingDocument(Document document) {
	String aspectName = "P:cm:effectivity";

	// Make sure we got a document, and then add the aspect to it
	if (document != null) {
		// Check that document don't already got the aspect applied
		List<Object> aspects = document.getProperty("cmis:secondaryObjectTypeIds").getValues();
		if (!aspects.contains(aspectName)) {
			aspects.add(aspectName);

			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put("cmis:secondaryObjectTypeIds", aspects);
			properties.put("cm:from", new Date());
			Calendar toDate = Calendar.getInstance();
			toDate.add(Calendar.MONTH, 2);
			properties.put("cm:to", toDate.getTime());

			Document updatedDocument = (Document) document.updateProperties(properties);
	
       		System.out.println("Added aspect " + aspectName + " to " + getDocumentPath(updatedDocument));
		} else {
			System.out.println("Aspect " + aspectName + " is already applied to " + getDocumentPath(document));
		}
	} else {
		System.out.println("Document is null, cannot add aspect to it!");
	}
}
```

The document object that we want to apply the aspect to is passed to the method. We start by getting currently set aspects, so we can see if the `cm:effectivity` aspect is already set. We also need to keep a list of aspects that are already set as we need to add them to the aspect list together with the new aspect. If we don't include the aspects that are already set, we will basically unset them when we update the properties.

For information on how to implenent the `getDocumentPath` method see [this](opencmis-ext-intro.md) page.

**Parent topic:**[Working with the CMIS API from Java](../concepts/opencmis-ext-intro.md)

