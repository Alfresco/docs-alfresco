---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, call services]
---

# Calling Alfresco services

Controller scripts have access to services provided by the Alfresco content application server. This allows a web script to query or perform operations against content residing in the Alfresco content repository. Services are exposed as root objects and each service provides its own API to program against.

Your Folder Listing web script needs to retrieve the folder value provided on the URI, identified by the `{folderpath}` token:

```
...
var folder = roothome.childByNamePath(folderpath);
...
```

The `roothome` root object is a special object provided by the Web Script Framework, which represents the root folder in the Alfresco content repository. From this object, it is possible to navigate through the content repository folder hierarchy or find sub-folders by name. Your controller script finds a sub-folder using the folder name provided in the URI.

There are many other root objects available to controller templates.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

**Related information**  


[Root objects](../references/api-ws-root.md)

