---
author: Alfresco Documentation
---

# Calling services

Controller scripts have access to services provided by Alfresco Content Services. This allows a web script to query or perform operations against content residing in the repository. Services are exposed as root objects and each service provides its own API to program against.

Your Folder Listing web script needs to retrieve the folder value provided on the URI, identified by the `{folderpath}` token:

```
...
var folder = roothome.childByNamePath(folderpath);
...
```

The `roothome` root object is a special object provided by the Web Script Framework, which represents the root folder in the repository. From this object, it is possible to navigate through the content repository folder hierarchy or find sub-folders by name. Your controller script finds a sub-folder using the folder name provided in the URI.

There are many other root objects available to controller templates.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

**Related information**  


[Root objects](../references/api-ws-root.md)

