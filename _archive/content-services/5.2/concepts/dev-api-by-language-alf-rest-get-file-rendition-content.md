---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get file rendition content

Get the rendition file content, if it has been generated.

|API Call|GET nodes/\{id\}/renditions/\{renditionId\}/content|
|--------|---------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/renditions/getRenditionContent](http://localhost:8080/api-explorer/#!/renditions/getRenditionContent)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

If you know that a file has a rendition you can retrieve the content for it with the following HTTP GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/renditions/\{renditionId\}/content**

Here we are getting the rendition content for the rendition specified with `{renditionId}` for the file with Node Identifier specified as the `{id}` URL part.

The following example gets the `doclib` rendition \(i.e. the thumbnail\) content for a text file with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier and stores it in a local file called **somerendition.png**:

```
$ curl -X GET --output somerendition.png -H 'Accept: image/png' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/renditions/doclib/content'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   432  100   432    0     0  19636      0 --:--:-- --:--:-- --:--:-- 19636
```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

