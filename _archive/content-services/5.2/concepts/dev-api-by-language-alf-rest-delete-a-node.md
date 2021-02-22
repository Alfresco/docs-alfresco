---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Delete a folder or file

Deleting a node, such as a folder or file, is easy. Here is how to do it.

|API Call|DELETE nodes/\{id\}|
|--------|-------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/deleteNode](http://localhost:8080/api-explorer/#!/nodes/deleteNode)|
|See also|[How to restore a deleted file](dev-api-by-language-alf-rest-restore-trashcan-items.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

There comes a point when you want to remove a folder or file from the Repository. This can be done with the following HTTP DELETE call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}**

The Node Identifier for the folder or file node to be deleted is specified with the `{id}` parameter.

The following call will delete the text file identified with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e'  
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
```

This doesn’t actually delete the node permanently, but instead it ends up in what’s referred to as the Trashcan. So it’s only soft deleted and can be restored if needed. If you want the file to be permanently deleted, then you can append a parameter called `permanent` and set it to `true`. This only works if you are the owner of the file or an administrator.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

