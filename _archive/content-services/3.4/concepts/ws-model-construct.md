---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, call services]
---

# Constructing the model

The controller script creates a model for subsequent rendering by a response template. A model is a map of values indexed by their name, which can be read from and written to by the controller script.

The Folder Listing web script adds the verbose flag and retrieved folder to the model:

```
...
model.verbose = verbose;
model.folder = folder;
...
```

The `model` root object is provided to the controller script by the Web Script Framework. All items added to the model are available to the response template.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

