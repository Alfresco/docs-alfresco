---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Lock a file for editing

Locking a file is sometimes necessary when you want to edit it while no one else should be able to.

|API Call|POST nodes/\{id\}/lock, POST nodes/\{id\}/unlock|
|--------|------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/lockNode](http://localhost:8080/api-explorer/#!/nodes/lockNode), [http://localhost:8080/api-explorer/\#!/nodes/unlockNode](http://localhost:8080/api-explorer/#!/nodes/unlockNode)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Now, what if you wanted to make some changes to a file and not let anyone else make changes until you've finished?

For this situation we can lock the file by POSTing an empty JSON object \(i.e. `{}`\) to:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/lock**

The Node Identifier for the file to be locked is specified with the `{id}` parameter.

The following call will lock a text file identified with the 90d0dd09-93d2-448c-9c23-24de24c3f6ff Node Identifier:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/90d0dd09-93d2-448c-9c23-24de24c3f6ff/lock' -d '{}' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   819    0   817  100     2   1695      4 --:--:-- --:--:-- --:--:--  1695
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-07T14:01:29.943+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 20,
      "encoding": "UTF-8"
    },
    "parentId": "3e59f24a-3a5b-4370-b98e-10e5514ac24e",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:lockable",
      "app:inlineeditable",
      "cm:auditable",
      "cm:taggable",
      "cm:author"
    ],
    "createdAt": "2019-10-03T08:47:12.852+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "90d0dd09-93d2-448c-9c23-24de24c3f6ff",
    "properties": {
      "cm:lockType": "WRITE_LOCK",
      "cm:lockOwner": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "cm:versionType": "MINOR",
      "cm:versionLabel": "1.4",
      "cm:lockLifetime": "PERSISTENT",
      "app:editInline": true
    }
  }
}

```

The lock call results in the response above where we can see that the node has been locked with a `WRITE_LOCK`. The lock is owned by the **admin** user. We can also see that the `cm:lockable` aspect has been applied. Note that you can only lock files, more specifically anything of the type `cm:content` and its subtypes.

When you retrieve a file or a listing of files it is also possible to include an `isLocked` property so you don’t have to parse the lock associated aspect and properties.

As the owner of the lock you can make changes to the file including the content, using the update content URL to update the content and generate a new version. However, if you try the same request as another user you'll get a **409 Conflict** error response.

To unlock the file once you're done with your change you can POST an empty JSON object to:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}/unlock**

The Node Identifier for the file to be unlocked is specified with the `{id}` parameter.

The following call will unlock a text file identified with the 90d0dd09-93d2-448c-9c23-24de24c3f6ff Node Identifier:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/90d0dd09-93d2-448c-9c23-24de24c3f6ff/unlock' -d '{}' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   687    0   685  100     2   6116     17 --:--:-- --:--:-- --:--:--  6133
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-07T14:01:29.943+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 20,
      "encoding": "UTF-8"
    },
    "parentId": "3e59f24a-3a5b-4370-b98e-10e5514ac24e",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "app:inlineeditable",
      "cm:auditable",
      "cm:taggable",
      "cm:author"
    ],
    "createdAt": "2019-10-03T08:47:12.852+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "90d0dd09-93d2-448c-9c23-24de24c3f6ff",
    "properties": {
      "cm:versionType": "MINOR",
      "cm:versionLabel": "1.4",
      "app:editInline": true
    }
  }
}
```

We can now see that the `cm:lockable` aspect is no longer applied and the associated properties have been removed.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

