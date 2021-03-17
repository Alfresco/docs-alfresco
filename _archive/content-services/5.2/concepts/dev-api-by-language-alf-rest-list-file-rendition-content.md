---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List file renditions

A file can have a number of renditions generated for it. This is how you get a list these renditions.

|API Call|GET nodes/\{id\}/renditions|
|--------|---------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/renditions/listRenditions](http://localhost:8080/api-explorer/#!/renditions/listRenditions)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

A file can have a number of renditions for its content, such as a thumbnail or a preview. A rendition is basically a different representation of the file content. To see what renditions that are available for a file use the following HTTP GET call, it returns all renditions wether they have been created or not:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/renditions**

Here we are getting the renditions for the file with Node Identifier specified as the `{id}` URL part.

The following example gets renditions for a text file with the d8f561cc-e208-4c63-a316-1ea3d3a4e10e Node Identifier:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d8f561cc-e208-4c63-a316-1ea3d3a4e10e/renditions | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   867  100   867    0     0  41285      0 --:--:-- --:--:-- --:--:-- 41285
{
  "list": {
    "pagination": {
      "count": 6,
      "hasMoreItems": false,
      "totalItems": 6,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "id": "avatar",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "avatar32",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "doclib",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image",
            "sizeInBytes": 432,
            "encoding": "UTF-8"
          },
          "status": "CREATED"
        }
      },
      {
        "entry": {
          "id": "imgpreview",
          "content": {
            "mimeType": "image/jpeg",
            "mimeTypeName": "JPEG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "medium",
          "content": {
            "mimeType": "image/jpeg",
            "mimeTypeName": "JPEG Image"
          },
          "status": "NOT_CREATED"
        }
      },
      {
        "entry": {
          "id": "pdf",
          "content": {
            "mimeType": "application/pdf",
            "mimeTypeName": "Adobe PDF Document",
            "sizeInBytes": 8238,
            "encoding": "UTF-8"
          },
          "status": "CREATED"
        }
      }
    ]
  }
}
```

In this case we got back information about six renditions for this text file, each contained in an `entry` object. Note that only two of those have been created and can be downloaded \(i.e. they have `status` set to `CREATED`\).

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

