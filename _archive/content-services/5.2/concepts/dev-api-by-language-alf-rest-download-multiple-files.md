---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Download multiple files

It's possible to download multiple files as a ZIP.

|API Call|POST /downloads - create the download async GET /downloads/\{id\} - check download status

DELETE /downloads/\{id\} - cancel a download

|
|--------|-----------------------------------------------------------------------------------------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/getNodeContent](http://localhost:8080/api-explorer/#!/nodes/getNodeContent)|
|See also|[Downloading a single file](dev-api-by-language-alf-rest-get-file-content.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Sometimes it is useful to be able to download multiple files in one go. You can create such a download with the following HTTP POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads**

You POST the following type of body with the Node Identifiers for the files that should be downloaded:

```
{
    "nodeIds":
     [
       "node identifier for file 1",
       "node identifier for file 2",
       "node identifier for file 3", 
       and so on...
     ]
}
```

The response to this call will contain a ZIP Download Node Identifier that can be used in subsequent calls to check the status of the download and ultimately download the archive. This call will start an asynchronous process on the server side that will put together a ZIP package with the files. You can check the status of this process with the following HTTP GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads/\{id\}**

Here we are getting the status for a ZIP download with the Node Identifier specified as the `{id}` URL part.

Let's see how this works with an example. I got two text files with Node Identifiers 7279b5c5-da55-4e98-8b12-72d33b90c810 and 1cf35d69-f85f-4446-94cd-f31ccf16c2e3 that I want to download. So the POST data will look like this:

```
{
    "nodeIds":
     [
       "7279b5c5-da55-4e98-8b12-72d33b90c810",
       "1cf35d69-f85f-4446-94cd-f31ccf16c2e3"
     ]
}
```

The call will then look like this:

```
$ curl -X POST -H "Content-Type: application/json" -H 'Accept: application/json' -d '{"nodeIds":["7279b5c5-da55-4e98-8b12-72d33b90c810","1cf35d69-f85f-4446-94cd-f31ccf16c2e3"]}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   225    0   134  100    91    822    558 --:--:-- --:--:-- --:--:--  1380
{
  "entry": {
    "filesAdded": 0,
    "bytesAdded": 0,
    "totalBytes": 0,
    "id": "3ea71d75-e2fa-4f23-9239-438c9b048574",
    "totalFiles": 0,
    "status": "PENDING"
  }
}
```

The response contains the status of the download and its `id` that we can use later on to check the status and download the ZIP archive.

We can now make a GET call to the **/downloads/\{id\}** URL and check the status until we see `status` set to `DONE`:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/downloads/3ea71d75-e2fa-4f23-9239-438c9b048574 | jq
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   133    0   133    0     0   6650      0 --:--:-- --:--:-- --:--:--  6650
{
  "entry": {
    "filesAdded": 2,
    "bytesAdded": 56,
    "totalBytes": 56,
    "id": "3ea71d75-e2fa-4f23-9239-438c9b048574",
    "totalFiles": 2,
    "status": "DONE"
  }
}
```

The ZIP file with Node Identifier 3ea71d75-e2fa-4f23-9239-438c9b048574 is now ready to be downloaded. It is stored in the hidden `/sys:system/sys:downloads` folder.

To download the ZIP file follow instructions for [downloading a single file](dev-api-by-language-alf-rest-get-file-content.md). In this case the call to download the ZIP would look like this:

```
$ curl -X GET -H 'Accept: application/octet-stream' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/3ea71d75-e2fa-4f23-9239-438c9b048574/content
Binary output...
```

It's better to try the download from a browser.

**Note:** The download ZIP file node can be deleted using the [delete a file](dev-api-by-language-alf-rest-delete-a-node.md) endpoint if needed.

By default, if the download node is not deleted it will be picked up by a cleaner job which removes download nodes older than a configurable amount of time \(default is 1 hour\).

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

