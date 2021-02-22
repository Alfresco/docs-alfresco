---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Add content to a site

Creating folders and adding files to an Alfresco Share site's Document Library.

|API Call|POST nodes/\{id\}/children|
|--------|--------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode)|
|See also|[How to create a folder](dev-api-by-language-alf-rest-create-folder.md) and [How to upload a file](dev-api-by-language-alf-rest-upload-file.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When you have a site, the next step is most likely to add some content to the Document Library. Each site "page" has a container in which it stores its data. The Document Library is no different, we can use the following endpoint to GET the details of a Document Library in a site with `{id}`:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/\{id\}/containers/documentLibrary**

The identifier for the site we want information about is specified with the `{id}` parameter.

Here is how to make the call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/my-stuff/containers/documentLibrary' | jq
100    84    0    84    0     0   3000      0 --:--:-- --:--:-- --:--:--  3000
{
  "entry": {
    "id": "896ec5b1-e348-4ddd-8262-c42b80eb0ce2",
    "folderId": "documentLibrary"
  }
}
```

The `id` property provides the node identifier of the 'documentLibrary' folder that we can then use in other APIs. Let’s create one new folder in the Document library and then upload a text file to it.

Create a folder called 'My Stuff'. To do this we POST to the **/nodes/\{id\}/children** URL as follows:

```
$ curl -H "Content-Type: application/json" -d '{"name":"My Stuff","nodeType":"cm:folder"}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/896ec5b1-e348-4ddd-8262-c42b80eb0ce2/children | jq
100   460    0   418  100    42   2824    283 --:--:-- --:--:-- --:--:--  3108
{
  "entry": {
    "aspectNames": [
      "cm:auditable"
    ],
    "createdAt": "2019-10-28T13:27:05.398+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-28T13:27:05.398+0000",
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "My Stuff",
    "id": "532d47c1-a8dc-4c00-8d82-a0623db85e06",
    "nodeType": "cm:folder",
    "parentId": "896ec5b1-e348-4ddd-8262-c42b80eb0ce2"
  }
}
```

Note that the 896ec5b1-e348-4ddd-8262-c42b80eb0ce2 id corresponds to the Document Library node of the site.

We can now use the `id` of the 'My Stuff' folder and upload a file to it \(assuming you have a text file locally to upload\):

```
$ curl -X POST -F filedata=@some-stuff.txt -F "name=some-stuff.txt" -F "nodeType=cm:content" -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/532d47c1-a8dc-4c00-8d82-a0623db85e06/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1106    0   635  100   471   4810   3568 --:--:-- --:--:-- --:--:--  8378
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-28T13:34:16.395+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 61,
      "encoding": "ISO-8859-1"
    },
    "parentId": "532d47c1-a8dc-4c00-8d82-a0623db85e06",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author"
    ],
    "createdAt": "2019-10-28T13:34:16.395+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "some-stuff.txt",
    "id": "5819518f-7adb-483c-bd8d-fca4fdf3bb73",
    "properties": {
      "cm:versionLabel": "1.0",
      "cm:versionType": "MAJOR"
    }
  }
}
```

**Parent topic:**[Managing Sites](../concepts/dev-api-by-language-alf-rest-manage-sites-intro.md)

