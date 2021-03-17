---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Download a file

Downloading the file means getting the file content from the Repository, which has it stored on disk.

|API Call|GET nodes/\{id\}/content|
|--------|------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/getNodeContent](http://localhost:8080/api-explorer/#!/nodes/getNodeContent)|
|See also|[Downloading multiple files](dev-api-by-language-alf-rest-download-multiple-files.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When you know how to upload content to the Repository it is natural to want to download content from the Repository. The following HTTP GET call is used to download a file:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/content**

Here we are getting the content for a file with the Node Identifier specified as the `{id}` URL part.

The following example gets content for a text file with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier:

```
$ curl -X GET -H 'Accept: text/plain' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/content
Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
```

You can also just make this call \(i.e. **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/c4980e44-92ac-41a5-91dc-2b2183c61de8/content**\) in a Web Browser and the file will be downloaded. If you want to preview the file in the Web Browser you would need to add an extra query parameter called `attachment` and set it to `false` \(i.e.**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/c4980e44-92ac-41a5-91dc-2b2183c61de8/content?attachment=false**\).

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

