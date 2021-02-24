---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Manage tags for a folder or file

Get, add, and remove tags for a folder or file node.

|API Calls|GET /nodes/\{id\}/tagsPOST /nodes/\{id\}/tags

DELETE /nodes/\{id\}/tags/\{id\}

|
|---------|---------------------------------------------------------------------------------|
|API Explorer URLs|[https://localhost:8080/api-explorer/\#!/tags/listTagsForNode](https://localhost:8080/api-explorer/#!/tags/listTagsForNode) [https://localhost:8080/api-explorer/\#!/tags/createTagForNode](https://localhost:8080/api-explorer/#!/tags/createTagForNode)

[https://localhost:8080/api-explorer/\#!/tags/deleteTagFromNode](https://localhost:8080/api-explorer/#!/tags/deleteTagFromNode)

|
|See also|[How to manage comments for a folder or file](dev-api-by-language-alf-rest-add-remove-comments-on-node.md)[How to update a folder or file](dev-api-by-language-alf-rest-update-node-metadata.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

## Add a tag

You can add tags to both folders and files. This is part of the collaboration features that exists around nodes. There is also like/unlike and commenting on nodes.

Tags are added to nodes with the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/tags**

The Node Identifier for the folder or file node to add the tag to is specified with the `{id}` parameter. Then a POST body is created with the comment as follows:

```
{   
  "tag": "project-x" 
}
```

It's possible to add more than one tag at a time as follows:

```
[
    {
     "tag": "project-x"
    },
    {
     "tag": "meeting"
    }
]
```

Let's look at an example of how to add a tag to a file \(it would be done in the same way for a folder\).

Let's assume we have a file with the 7279b5c5-da55-4e98-8b12-72d33b90c810 Node Identifier, the call would then look like this:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "tag": "project-x" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/tags'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    95    0    73  100    22    182     55 --:--:-- --:--:-- --:--:--   238
{
  "entry": {
    "tag": "project-x",
    "id": "a427120f-a679-43e6-bcc5-4b0be1f91ea3"
  }
}
```

The response contains the tag identifier \(i.e. `id`\) together with the tag we just added to the node.

## Listing tags

To list all the tags for a file \(or folder\) we can use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/tags**

The Node Identifier for the folder or file node to get the tags for is specified with the `{id}` parameter.

As an example we will get all the tags for the file we just added a comment to:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/tags' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   186    0   186    0     0   5470      0 --:--:-- --:--:-- --:--:--  5470
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "tag": "project-x",
          "id": "a427120f-a679-43e6-bcc5-4b0be1f91ea3"
        }
      }
    ]
  }
}
```

The response is constructed in the usual way for lists, with a `pagination` section at the start and then `entries`.

We can see that the file has one tag. If you just wanted to return the tag text and leave out the tag id, then we can use the `fields` parameter as follows:

```
$   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   142    0   142    0     0  10142      0 --:--:-- --:--:-- --:--:-- 10923
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "tag": "project-x"
        }
      }
    ]
  }
}
```

That's better if you just wanted a list of tags.

## Delete a tag

The last thing you would most likely want to do with tags is to delete them. We can do that with the following DELETE call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/tags/\{tagId\}**

The Node Identifier for the folder or file node to have its tag deleted is specified with the `{id}` parameter. And the tag we want to delete is specified with the `{tagId}` parameter.

As an example we will delete the tag that we just added to the file, which has the a427120f-a679-43e6-bcc5-4b0be1f91ea3 Identifier:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/tags/a427120f-a679-43e6-bcc5-4b0be1f91ea3'  | jq  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
```

## Searching for a tag

Now when you have tagged a lot of files and folders you probably want to find them based on these tags. This can be done via the `/search` API and the `TAG:{tag}` keyword. See the [complex search](dev-api-by-language-alf-rest-finding-content-by-search-query.md) page for an example.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

