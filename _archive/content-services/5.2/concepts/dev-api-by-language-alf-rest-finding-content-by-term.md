---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Finding folders and files by a term

Simple search in metadata and content with a term.

|API Call|GET queries/nodes?term=\{search term\}&orderBy=\{field\}|
|--------|--------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/queries/findNodes](http://localhost:8080/api-explorer/#!/queries/findNodes)|
|See also|[Complex search](dev-api-by-language-alf-rest-finding-content-by-search-query.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

The `/queries` endpoints are designed to be very simple to use and usable in "live search" scenarios. Meaning they can be executed upon each key press so clients can show results as the user types. The actual query used behind the scenes is hard-coded, if complex or custom queries are required the `/search` API should be used, which this section also covers.

To find content by specifying a term \(i.e. a word\) you use a GET call as follows:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/queries/nodes?term=\{search-term\}&orderBy=\{field\}**

This simple search query will look in the name \(`cm:name`\), title \(`cm:title`\) and description \(`cm:description`\) node properties, in the content, and in the tags for a match. Let’s say we have a file with the word dog in the text and another file with the word dog in the `cm:title` property, we can then search for these files as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/queries/nodes?term=dog&orderBy=name' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1105  100  1105    0     0   1247      0 --:--:-- --:--:-- --:--:--  1247
{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-09-05T08:52:16.785+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-09-16T08:31:22.936+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "somefile.txt",
          "id": "8f1c3f76-0eaf-452a-be66-c5405af67dbc",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 48,
            "encoding": "ISO-8859-1"
          },
          "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d"
        }
      },
      {
        "entry": {
          "createdAt": "2019-09-16T08:32:07.415+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-09-16T08:32:07.415+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "some-other.txt",
          "id": "6c5c4d89-132e-4761-83b9-088bd820e711",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 25,
            "encoding": "UTF-8"
          },
          "parentId": "5a858591-752f-49d0-b686-e2e1a830ea8d"
        }
      }
    ]
  }
}
```

The response contains only minimal metadata for each `entry`. Use the `include` and `fields` parameters to return more metadata in the response.

The type of nodes returned can be restricted via the `nodeType` query parameter, for example passing `acme:document` as the value will only return nodes of that type and any of it's subtypes.

**Parent topic:**[Searching](../concepts/dev-api-by-language-alf-rest-searching-for-nodes.md)

