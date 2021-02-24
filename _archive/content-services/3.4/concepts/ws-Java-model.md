---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, APi/Script, Folder Listing, model]
---

# Constructing the model

The controller creates a model for subsequent rendering by a response template. A model is a map of values indexed by name. In Java, the model is simply returned from the `executeImpl()` method as a `Map`.

The Folder Listing web script constructs a `HashMap` and places the `verbose` flag and located `folder` into it:

```
. . .
  Map<String, Object> model = new HashMap<String, Object>();
  model.put("verbose", verbose);
  model.put("folder", folder);
  return model;
. . .
```

The model is then subsequently available to response templates, which can use the values to render the output. Values placed into the map by Java are converted to values that the FreeMarker template language can access. For example, your Java Folder Listing web script places a `NodeRef` into the model under the name `folder`, which it received from the `Repository` service. A `NodeRef` represents a reference to an object residing in the content repository. The Web Script Framework converts `NodeRefs` into full objects so that FreeMarker templates can easily reference their object properties and methods as demonstrated by your Folder Listing response template:

`Contents of folder ${**folder**.displayPath}/${**folder**.name}`

A Java-backed web script does not have to create a model. In this case, the `executeImpl()` method can return null.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

