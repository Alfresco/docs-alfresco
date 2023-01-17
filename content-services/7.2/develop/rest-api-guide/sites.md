---
title: Managing Sites
---

This section walks through how to manage Alfresco Share sites via the ReST API.

Being able to manage sites remotely is useful as they are widely used when you want to collaborate on content in the 
Repository. The ReST API has a full set of calls to do most things around sites.

## Create a site {#createsite}

Creating an Alfresco Share site.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/sites/createSite](http://localhost:8080/api-explorer/#!/sites/createSite){:target="_blank"}

**See also:** [How to update site metadata](#updatesite)

Creating a site is done with the following POST call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites`

The body for a site create call looks like this:

```json
{
  "title": "{the name of the site}",
  "description": "{the description of the site}",
  "visibility": "[PUBLIC|PRIVATE|MODERATED]"
}
```

The `visibility` property is important to know more about as it determines how users can join and view the site:

* `PUBLIC` - the site and its content is viewable by all users, even if they are not members of the site. Users can search for the site and join themselves.
* `PRIVATE` - the site and its content is NOT viewable by any user that is not a member of the site. You have to be invited to the site by by a site manager.
* `MODERATED` - the site can be found by all users and they can join themselves. However, the joining process i#updatesites moderated by site managers. Site content is only viewable by users that are members of the site.

To create a site called **My Stuff** that is readable by anybody use the following call:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My stuff", "visibility": "PUBLIC"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   215  100   163  100    52    337    107 --:--:-- --:--:-- --:--:-* 444
{
  "entry": {
    "role": "SiteManager",
    "visibility": "PUBLIC",
    "guid": "7ef8798f-bbcd-4d92-8db5-4d51edf739f6",
    "id": "my-stuff",
    "preset": "site-dashboard",
    "title": "My stuff"
  }
}
```

The response contains some useful information about the new site, such as site `id` (i.e. `my-stuff`), which is used in 
other calls. By default a new site is set as favorite, if you don’t want that you can control this with the 
`skipAddToFavorites` parameter.

## Update a site {#updatesite}

Updating the metadata for an Alfresco Share site.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/sites/updateSite](http://localhost:8080/api-explorer/#!/sites/updateSite){:target="_blank"}

**See also:** [How to create a site](#createsite)

It’s also possible to update the site metadata after the site has been created. We can for example change the 
description and title, and it is even possible to change the visibility of the site. Use the following PUT call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/{id}`

The identifier for the site to be updated is specified with the `{id}` parameter.

The body for a site update call looks like this:

```json
{
  "title": "{the updated name of the site}",
  "description": "{the updated description of the site}",
  "visibility": "[PUBLIC|PRIVATE|MODERATED]"
}
```

To update a site with the `my-stuff` `id` make the following call:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My stuff UPDATED", "description": "My stuff Desc UPDATED", "visibility": "PRIVATE"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/my-stuff' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   303    0   208  100    95   1004    458 --:--:-- --:--:-- --:--:--  1463
{
  "entry": {
    "role": "SiteManager",
    "visibility": "PRIVATE",
    "guid": "7ef8798f-bbcd-4d92-8db5-4d51edf739f6",
    "description": "My stuff Desc UPDATED",
    "id": "my-stuff",
    "preset": "site-dashboard",
    "title": "My stuff UPDATED"
  }
}
```

The updated site metadata is returned so you can make sure it's correct.

## Add content to a site {#addcontent}

Creating folders and adding files to an Alfresco Share site's Document Library.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode){:target="_blank"}

**See also:**

* [How to create a folder]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#createfolder)
* [How to upload a file]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadfile)

When you have a site, the next step is most likely to add some content to the Document Library. Each site "page" has a 
container in which it stores its data. The Document Library is no different, we can use the following endpoint to GET 
the details of a Document Library in a site with `{id}`:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/{id}/containers/documentLibrary`

The identifier for the site we want information about is specified with the `{id}` parameter.

Here is how to make the call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/my-stuff/containers/documentLibrary' | jq
100    84    0    84    0     0   3000      0 --:--:-- --:--:-- --:--:--  3000
{
  "entry": {
    "id": "896ec5b1-e348-4ddd-8262-c42b80eb0ce2",
    "folderId": "documentLibrary"
  }
}
```

The `id` property provides the node identifier of the **documentLibrary** folder that we can then use in other APIs. 
Let’s create one new folder in the Document library and then upload a text file to it.

Create a folder called **My Stuff**. To do this we POST to the `/nodes/{id}/children` URL as follows:

```bash
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

We can now use the `id` of the **My Stuff** folder and upload a file to it (assuming you have a text file locally to upload):

```bash
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

## Adding members to a site {#addmemberstosite}

Adding members to an Alfresco Share site.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/sites/createSiteMembershipRequestForPerson](http://localhost:8080/api-explorer/#!/sites/createSiteMembershipRequestForPerson) and [http://localhost:8080/api-explorer/#!/sites/createSiteMembership](http://localhost:8080/api-explorer/#!/sites/createSiteMembership){:target="_blank"}

**See also:** [How to create a site](#createsite)

When you have a site and some content, the next step is most likely to invite people to it so they can work with its 
content. There are two different ways to do this. You can start with the person you want to invite as a member to the 
site, or you can start with the site and then think about what people you want to invite to it. You can add a person 
directly to a site or create a membership request for them that they have to approve before they are officially a member.

To prepare for the examples let’s create a public and a moderated site as follows:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My public stuff", "visibility": "PUBLIC"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   228    0   175  100    53    308     93 --:--:-- --:--:-- --:--:-* 402
{
  "entry": {
    "role": "SiteManager",
    "visibility": "PUBLIC",
    "guid": "f50cb6d9-fd87-4f1b-a4b6-64813d2158e6",
    "id": "my-public-stuff",
    "preset": "site-dashboard",
    "title": "My public stuff"
  }
}

$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My moderated stuff", "visibility": "MODERATED"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   243    0   184  100    59    346    111 --:--:-- --:--:-- --:--:-* 456
{
  "entry": {
    "role": "SiteManager",
    "visibility": "MODERATED",
    "guid": "f25f4e0b-f483-4a40-8885-b8801407340a",
    "id": "my-moderated-stuff",
    "preset": "site-dashboard",
    "title": "My moderated stuff"
  }
}
```

Then create a test user by POSTing the following body (normally you don't have to create users as they are usually imported 
from LDAP/AD, this is just a demo):

```json
{
  "id": "test",
  "firstName": "Test",
  "lastName": "User",
  "password": "test",
  "email": "test@alfresco.com"
}
```

to:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people`

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "test", "firstName": "Test", "lastName": "User", "password": "test", "email": "test@alfresco.com"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   321    0   215  100   106    576    284 --:--:-- --:--:-- --:--:-* 860
{
  "entry": {
    "firstName": "Test",
    "lastName": "User",
    "capabilities": {
      "isGuest": false,
      "isAdmin": false,
      "isMutable": true
    },
    "emailNotificationsEnabled": true,
    "company": {},
    "id": "test",
    "enabled": true,
    "email": "test@alfresco.com"
  }
}
```

We'll now use this new user to join the public site and the moderated site we just created. The same endpoint is used 
to do both these actions via a POST:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{userId}/site-membership-requests`

Join the public site by POSTing the body below:

```json
{
  "id": "my-public-stuff"
}
```

Here is how that call looks like:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "my-public-stuff"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/site-membership-requests' | jq
```

To join the moderated site POST:

```json
{
  "id": "my-moderated-stuff",
  "message": "I would like to join this site as it looks interesting"
}
```

Here is how that call looks like:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "my-moderated-stuff", "message": "I would like to join this site as it looks interesting"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/site-membership-requests' | jq
```
