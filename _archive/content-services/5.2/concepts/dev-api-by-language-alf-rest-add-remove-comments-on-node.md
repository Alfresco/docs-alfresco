---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Manage comments for a folder or file

Get, add, update, and remove comments for a folder or file node.

|API Calls|GET /nodes/\{id\}/commentsPOST /nodes/\{id\}/comments

DELETE /nodes/\{id\}/comments/\{id\}

PUT /nodes/\{id\}/comments/\{id\}

|
|---------|--------------------------------------------------------------------------------------------------------------------------------|
|API Explorer URLs|[https://api-explorer.alfresco.com/api-explorer/\#!/comments/listComments](https://localhost:8080/api-explorer/#!/comments/listComments) [https://api-explorer.alfresco.com/api-explorer/\#!/comments/createComment](https://localhost:8080/api-explorer/#!/comments/createComment)

[https://api-explorer.alfresco.com/api-explorer/\#!/comments/deleteComment](https://localhost:8080/api-explorer/#!/comments/deleteComment)

[https://api-explorer.alfresco.com/api-explorer/\#!/comments/updateComment](https://localhost:8080/api-explorer/#!/comments/updateComment)

|
|See also|[How to update a folder or file](dev-api-by-language-alf-rest-update-node-metadata.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

## Add a comment

You can add comments to both folders and files. This is part of the collaboration features that exists around nodes. There is also like/unlike and tagging of nodes.

Comments are added to nodes with the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/comments**

The Node Identifier for the folder or file node to add the comment to is specified with the `{id}` parameter. Then a POST body is created with the comment as follows:

```
{   
  "content": "This is a comment" 
}
```

It's possible to add more than one comment at a time as follows:

```
[
    {
     "content": "This is a comment"
    },
    {
     "content": "This is another comment"
    }
]
```

Let's look at an example of how to add a comment to a file \(it would be done in the same way for a folder\).

Let's assume we have a file with the 7279b5c5-da55-4e98-8b12-72d33b90c810 Node Identifier, the call would then look like this:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "content": "This is a comment" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/comments'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   544    0   510  100    34    717     47 --:--:-- --:--:-- --:--:--   764
{
  "entry": {
    "createdAt": "2019-12-03T09:32:54.803+0000",
    "createdBy": {
      "enabled": true,
      "firstName": "Administrator",
      "email": "admin@alfresco.com",
      "emailNotificationsEnabled": true,
      "company": {},
      "id": "admin"
    },
    "edited": false,
    "modifiedAt": "2019-12-03T09:32:54.803+0000",
    "canEdit": true,
    "modifiedBy": {
      "enabled": true,
      "firstName": "Administrator",
      "email": "admin@alfresco.com",
      "emailNotificationsEnabled": true,
      "company": {},
      "id": "admin"
    },
    "canDelete": true,
    "id": "cace6ed3-1e57-4690-86eb-d9bce01257cf",
    "content": "This is a comment"
  }
}

```

The response contains more information about the added comment, such as its Node Identifier \(i.e. `id`\).

## Listing comments

To list all the comments for a file \(or folder\) we can use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/comments**

The Node Identifier for the folder or file node to get the comments for is specified with the `{id}` parameter.

As an example we will get all the comments for the file we just added a comment to:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/comments' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1151    0  1151    0     0   7829      0 --:--:-- --:--:-- --:--:--  7829
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
          "createdAt": "2019-12-03T09:32:54.803+0000",
          "createdBy": {
            "enabled": true,
            "firstName": "Administrator",
            "email": "admin@alfresco.com",
            "emailNotificationsEnabled": true,
            "company": {},
            "id": "admin"
          },
          "edited": false,
          "modifiedAt": "2019-12-03T09:32:54.803+0000",
          "canEdit": true,
          "modifiedBy": {
            "enabled": true,
            "firstName": "Administrator",
            "email": "admin@alfresco.com",
            "emailNotificationsEnabled": true,
            "company": {},
            "id": "admin"
          },
          "canDelete": true,
          "id": "cace6ed3-1e57-4690-86eb-d9bce01257cf",
          "content": "This is a comment"
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-02T13:31:54.693+0000",
          "createdBy": {
            "enabled": true,
            "firstName": "Administrator",
            "email": "admin@alfresco.com",
            "emailNotificationsEnabled": true,
            "company": {},
            "id": "admin"
          },
          "edited": false,
          "modifiedAt": "2019-12-02T13:31:54.693+0000",
          "canEdit": true,
          "modifiedBy": {
            "enabled": true,
            "firstName": "Administrator",
            "email": "admin@alfresco.com",
            "emailNotificationsEnabled": true,
            "company": {},
            "id": "admin"
          },
          "canDelete": true,
          "id": "7eb1a859-6c00-49c0-9eec-36c8f45db88d",
          "content": "This is a comment on a file"
        }
      }
    ]
  }
}
```

The response is constructed in the usual way for lists, with a `pagination` section at the start and then `entries`.

Each comment has a `canEdit` and `canDelete` property, this can be used to determine whether the current user has the permission to edit or delete that comment, respectively.

We can see that the file has two comments. There is a lot of information returned for each comment. We can make it a bit more succinct and save bandwidth by using the `fields` parameter, let's return only the date the comment was made and the content of it:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/comments?fields=createdAt,content' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   299    0   299    0     0   5245      0 --:--:-- --:--:-- --:--:--  5155
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
          "createdAt": "2019-12-03T09:32:54.803+0000",
          "content": "This is a comment"
        }
      },
      {
        "entry": {
          "createdAt": "2019-12-02T13:31:54.693+0000",
          "content": "This is a comment on a file"
        }
      }
    ]
  }
}

```

That's better.

## Update a comment

Now, what if you wanted to update a comment. For this we can use the following PUT call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/comments/\{commentId\}**

The Node Identifier for the folder or file node to update the comment for is specified with the `{id}` parameter. And the comment we want to update is specified with the `{commentId}` parameter.

The PUT body contains the new comment text:

```
{
  "content": "Updated comment text"
}
```

As an example we will update the latest comment for the file, which has the cace6ed3-1e57-4690-86eb-d9bce01257cf Node Identifier \(can be seen in the first listing of comments above\):

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "content": "Updated comment text" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/comments/cace6ed3-1e57-4690-86eb-d9bce01257cf'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   549    0   512  100    37   1706    123 --:--:-- --:--:-- --:--:--  1823
{
  "entry": {
    "createdAt": "2019-12-03T09:32:54.803+0000",
    "createdBy": {
      "enabled": true,
      "firstName": "Administrator",
      "email": "admin@alfresco.com",
      "emailNotificationsEnabled": true,
      "company": {},
      "id": "admin"
    },
    "edited": true,
    "modifiedAt": "2019-12-03T09:54:10.891+0000",
    "canEdit": true,
    "modifiedBy": {
      "enabled": true,
      "firstName": "Administrator",
      "email": "admin@alfresco.com",
      "emailNotificationsEnabled": true,
      "company": {},
      "id": "admin"
    },
    "canDelete": true,
    "id": "cace6ed3-1e57-4690-86eb-d9bce01257cf",
    "content": "Updated comment text"
  }
}
```

The response contains all the information about the updated comment.

## Delete a comment

The last thing you would most likely want to do with comments is to delete them. We can do that with the following DELETE call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/comments/\{commentId\}**

The Node Identifier for the folder or file node to have its comment deleted is specified with the `{id}` parameter. And the comment we want to delete is specified with the `{commentId}` parameter.

As an example we will delete the latest comment for the file, which has the cace6ed3-1e57-4690-86eb-d9bce01257cf Node Identifier:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/7279b5c5-da55-4e98-8b12-72d33b90c810/comments/cace6ed3-1e57-4690-86eb-d9bce01257cf'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0

```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

